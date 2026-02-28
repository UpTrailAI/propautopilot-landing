import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

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

    if (!exists) {
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
