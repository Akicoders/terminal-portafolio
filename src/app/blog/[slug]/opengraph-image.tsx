import {ImageResponse} from "next/og"
import {getBlogPostBySlug} from "../../../content/portfolio"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const post = getBlogPostBySlug("es", slug) || getBlogPostBySlug("en", slug)

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
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{display: "flex", flexDirection: "column", gap: 8}}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8ea0bb",
            }}
          >
            JP Campos / Blog
          </div>
          <div style={{fontSize: 28, color: "#28bda4"}}>
            {post?.category || "AI"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 100,
            height: 100,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(40, 189, 164, 0.12)",
            border: "1px solid rgba(40, 189, 164, 0.28)",
            color: "#28bda4",
            fontSize: 44,
            fontWeight: 700,
          }}
        >
          AK
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 920,
        }}
      >
        <div style={{fontSize: 72, lineHeight: 1.02, fontWeight: 700}}>
          {post?.title || "JP Campos Blog"}
        </div>
        <div style={{fontSize: 28, lineHeight: 1.5, color: "#a8b4c4"}}>
          {post?.summary || "AI, automation and product engineering notes."}
        </div>
      </div>

      <div style={{fontSize: 24, color: "#8ea0bb"}}>akicoders.site</div>
    </div>,
    size,
  )
}
