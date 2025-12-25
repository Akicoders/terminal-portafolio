import { NextRequest, NextResponse } from "next/server"

// Only initialize Resend if API key exists
const resend = process.env.RESEND_API_KEY
  ? new (require("resend").Resend)(process.env.RESEND_API_KEY)
  : null

export async function POST(req: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 503 }
      )
    }

    const { NAME, EMAIL, FROM, SERVICE, PROJECT } = await req.json()

    await resend.emails.send({
      from: "JP Campos <noreply@example.com>",
      to: "josepaulcamposterrones@gmail.com",
      subject: `New message from ${NAME}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${NAME}</p>
        <p><strong>Email:</strong> ${EMAIL}</p>
        <p><strong>Heard from:</strong> ${FROM}</p>
        <p><strong>Service:</strong> ${SERVICE}</p>
        <p><strong>Project:</strong> ${PROJECT}</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}
