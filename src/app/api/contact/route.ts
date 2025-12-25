import { NextRequest, NextResponse } from "next/server"

// Only initialize Resend if API key exists
const resend = process.env.RESEND_API_KEY
  ? new (require("resend").Resend)(process.env.RESEND_API_KEY)
  : null

// Your verified email (the one you used to sign up for Resend)
const YOUR_EMAIL = "josepaulcamposterrones@gmail.com"

export async function POST(req: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 503 }
      )
    }

    const { name, email, subject, message } = await req.json()

    await resend.emails.send({
      // Using Resend's test domain (no custom domain required)
      from: "Portfolio Contact <onboarding@resend.dev>",
      // Must be YOUR verified email (Resend free tier limitation)
      to: YOUR_EMAIL,
      subject: `[Portfolio] ${subject || 'New message'} from ${name}`,
      html: `
        <h2>📬 New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: #888; font-size: 12px;">
          Reply directly to: <a href="mailto:${email}">${email}</a>
        </p>
      `,
      // Add reply-to so you can respond directly
      replyTo: email,
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
