import {ImageResponse} from "next/og"

export const size = {
  width: 128,
  height: 128,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 28,
        background: "linear-gradient(135deg, #08111f 0%, #10203a 100%)",
        border: "1px solid rgba(40, 189, 164, 0.28)",
        color: "#28bda4",
        fontSize: 58,
        fontWeight: 800,
        letterSpacing: 4,
        fontFamily: "Arial, sans-serif",
      }}
    >
      AK
    </div>,
    size,
  )
}
