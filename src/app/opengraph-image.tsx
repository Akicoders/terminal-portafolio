import {ImageResponse} from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background:
          "linear-gradient(135deg, #08111f 0%, #0c1526 50%, #0f1d34 100%)",
        color: "#e6ecf5",
        padding: "56px",
        fontFamily: "Arial, sans-serif",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "68%",
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: 18}}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(40, 189, 164, 0.12)",
              border: "1px solid rgba(40, 189, 164, 0.28)",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#28bda4",
            }}
          >
            AK
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            <div
              style={{
                fontSize: 28,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#8ea0bb",
              }}
            >
              JP Campos
            </div>
            <div style={{fontSize: 30, color: "#d8e3f0"}}>
              Full-Stack &amp; AI Engineer
            </div>
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "column", gap: 18}}>
          <div style={{fontSize: 72, lineHeight: 1, fontWeight: 700}}>
            Software, AI &amp; Automation
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#a8b4c4",
              maxWidth: 760,
            }}
          >
            Building scalable applications, intelligent automations and
            business-ready AI systems.
          </div>
        </div>

        <div style={{display: "flex", gap: 16, flexWrap: "wrap"}}>
          {[
            "Full-Stack Engineering",
            "AI Optimization",
            "Agentic Workflows",
            "n8n Automation",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: 999,
                border: "1px solid rgba(142, 160, 187, 0.22)",
                color: "#d8e3f0",
                fontSize: 22,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          width: 250,
          borderRadius: 36,
          border: "1px solid rgba(142, 160, 187, 0.16)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 120,
          color: "#28bda4",
          fontWeight: 700,
          letterSpacing: 6,
        }}
      >
        AK
      </div>
    </div>,
    size,
  )
}
