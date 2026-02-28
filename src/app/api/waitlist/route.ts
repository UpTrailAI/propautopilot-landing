import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { Resend } from "resend"

interface WaitlistBody {
  email: string
  isAdvisor?: boolean
  source?: string
  referrer?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

// Send welcome email via Resend (fire-and-forget, don't block signup)
async function sendWelcomeEmail(email: string, position: number) {
  if (!process.env.RESEND_API_KEY) return

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "PropAutopilot <hello@propautopilot.com.au>",
      to: email,
      subject: `You're #${position} on the PropAutopilot waitlist 🎉`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px; padding: 8px 12px;">
              <span style="color: white; font-weight: bold; font-size: 18px;">P</span>
            </div>
          </div>

          <h1 style="font-size: 24px; font-weight: 700; color: #09090b; margin-bottom: 8px; text-align: center;">
            You're on the list!
          </h1>

          <p style="text-align: center; color: #6366f1; font-size: 18px; font-weight: 600; margin-bottom: 24px;">
            Position #${position}
          </p>

          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            Thanks for joining the PropAutopilot waitlist. We're building the AI-powered property investment platform that replaces spreadsheets, multi-website research, and expensive buyer's agents.
          </p>

          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            Here's what happens next:
          </p>

          <ul style="color: #3f3f46; font-size: 15px; line-height: 1.8; padding-left: 20px;">
            <li><strong>April 2026</strong> — Early access opens for waitlist members</li>
            <li><strong>You'll get first dibs</strong> — priority access before the public launch</li>
            ${position <= 100 ? '<li>🎁 <strong>Founding member pricing</strong> — 30% off for life with code <code style="background: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-size: 13px;">FOUNDER30</code></li>' : ''}
          </ul>

          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            We'll only email you with important updates — no spam, ever.
          </p>

          <p style="color: #3f3f46; font-size: 16px; line-height: 1.6;">
            — The PropAutopilot Team
          </p>

          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 32px 0;" />

          <p style="color: #a1a1aa; font-size: 12px; text-align: center;">
            PropAutopilot Pty Ltd · Made in Australia 🇦🇺
            <br />
            <a href="https://propautopilot.com" style="color: #a1a1aa;">propautopilot.com</a>
          </p>
        </div>
      `,
    })
  } catch (err) {
    // Don't fail the signup if email fails
    console.error("Welcome email failed:", err)
  }
}

// POST /api/waitlist — email signup
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WaitlistBody
    const email = body.email?.trim().toLowerCase()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    const ip = getClientIp(request)

    // Rate limiting: 3 signups per IP per hour
    const rateKey = `waitlist:rate:${ip}`
    const rateCount = await kv.incr(rateKey)
    if (rateCount === 1) {
      await kv.expire(rateKey, 3600)
    }
    if (rateCount > 3) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      )
    }

    // Check for duplicate — return success either way (don't leak info)
    const exists = await kv.sismember("waitlist:emails", email)
    let isNew = false

    if (!exists) {
      isNew = true

      // Add to emails set
      await kv.sadd("waitlist:emails", email)

      // Store full entry
      await kv.hset(`waitlist:entry:${email}`, {
        email,
        isAdvisor: body.isAdvisor || false,
        source: body.source || "direct",
        referrer: body.referrer || "",
        ip,
        createdAt: new Date().toISOString(),
      })

      // Increment counters
      await kv.incr("waitlist:count")
      await kv.incr(`waitlist:daily:${todayKey()}`)

      // Track advisors
      if (body.isAdvisor) {
        await kv.sadd("waitlist:advisors", email)
      }
    }

    // Get position (total count)
    const position = await kv.scard("waitlist:emails")

    // Send welcome email for new signups (non-blocking)
    if (isNew) {
      sendWelcomeEmail(email, position)
    }

    return NextResponse.json({
      message: "You're on the list!",
      position,
    })
  } catch (error) {
    console.error("Waitlist POST error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

// GET /api/waitlist — return current count for social proof
export async function GET() {
  try {
    const count = await kv.scard("waitlist:emails")
    return NextResponse.json({ count: count || 0 })
  } catch {
    // If KV is not configured (local dev), return 0
    return NextResponse.json({ count: 0 })
  }
}
