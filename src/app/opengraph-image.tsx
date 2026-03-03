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
          justifyContent: "space-between",
          backgroundColor: "#FDFDFD",
          color: "#0f172a", // slate-900
          fontFamily: "sans-serif",
          padding: 80,
          border: "16px solid #0f172a",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Precision Logo */}
            <div style={{ width: 32, height: 32, backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, backgroundColor: "#ffffff" }} />
            </div>
            <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              PropAutopilot
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "monospace", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            SYSTEM_READY // Q2 2026
          </div>
        </div>

        {/* Main Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40 }}>
          <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 0.85, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
            Acquire <br />
            With <br />
            Precision.
          </div>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#334155", maxWidth: 800 }}>
            Stop paying $15k buyer-agent fees.<br />
            One workspace for CoreLogic + PropTrack data.
          </div>
        </div>

        {/* Bottom Data Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", borderTop: "2px solid #e2e8f0", paddingTop: 32 }}>
          <div style={{ display: "flex", gap: 40, fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: "#0f172a" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, color: "#64748b", marginBottom: 8 }}>COVERAGE</span>
              <span>3,800+ SUBURBS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 16, color: "#64748b", marginBottom: 8 }}>ACCESS</span>
              <span>FROM $99/MO</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "16px 32px", fontSize: 20, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Execute
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
