import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "PropAutopilot — AI-Powered Property Investment Platform"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          position: "relative",
        }}
      >
        {/* Central glow */}
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span
            style={{
              color: "#fafafa",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            PropAutopilot
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#fafafa",
            fontSize: 52,
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: -1,
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 20,
          }}
        >
          Build Your Property Portfolio Smarter
        </div>

        {/* Subheadline */}
        <div
          style={{
            color: "#a1a1aa",
            fontSize: 22,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          AI-powered property acquisition platform. 15,000+ suburbs scored.
        </div>

        {/* Price pill */}
        <div
          style={{
            display: "flex",
            padding: "10px 28px",
            borderRadius: 22,
            border: "1px solid rgba(99,102,241,0.3)",
            backgroundColor: "rgba(99,102,241,0.1)",
            color: "#6366f1",
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          From $99/mo AUD
        </div>

        {/* Domain */}
        <div
          style={{
            color: "#52525b",
            fontSize: 16,
          }}
        >
          propautopilot.com
        </div>
      </div>
    ),
    { ...size }
  )
}
