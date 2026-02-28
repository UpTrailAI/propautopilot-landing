import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

const LAUNCH_DATE = new Date("2026-04-01T00:00:00+10:00")

// GET /api/waitlist/stats — admin stats (protected)
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-admin-secret")

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const total = (await kv.scard("waitlist:emails")) || 0
    const advisors = (await kv.scard("waitlist:advisors")) || 0
    const investors = total - advisors

    // Get daily counts for last 7 days
    const daily: Record<string, number> = {}
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = date.toISOString().slice(0, 10)
      const count = await kv.get<number>(`waitlist:daily:${key}`)
      daily[key] = count || 0
    }

    const now = new Date()
    const daysUntilLaunch = Math.max(
      0,
      Math.ceil((LAUNCH_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    )

    return NextResponse.json({
      total,
      advisors,
      investors,
      daily,
      target: 10000,
      daysUntilLaunch,
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
