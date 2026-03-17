import {NextRequest, NextResponse} from "next/server"
import {checkRateLimit} from "../../../lib/rateLimit"
import {isTrustedOrigin} from "../../../lib/requestOrigin"

const FALLBACK_EMAIL = "josepaulcamposterrones@gmail.com"
const REQUEST_TIMEOUT_MS = 10000

const sendViaResend = async (payload: LeadPayload) => {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.RESEND_TO_EMAIL || FALLBACK_EMAIL

  if (!apiKey || !from) {
    return false
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Nuevo lead: ${payload.service || "portfolio-contact"}`,
        text: [
          `Nombre: ${payload.name.trim()}`,
          `Email: ${payload.email.trim().toLowerCase()}`,
          `Empresa: ${payload.company?.trim() || "-"}`,
          `Servicio: ${payload.service?.trim() || "-"}`,
          "",
          payload.message.trim(),
        ].join("\n"),
      }),
      signal: controller.signal,
    })

    return response.ok
  } finally {
    clearTimeout(timeoutId)
  }
}

interface LeadPayload {
  name: string
  email: string
  company?: string
  service?: string
  message: string
  website?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateLead = (payload: LeadPayload) => {
  if (
    !payload.name ||
    payload.name.trim().length < 2 ||
    payload.name.length > 80
  ) {
    return "Please provide a valid name."
  }

  if (
    !payload.email ||
    !emailPattern.test(payload.email) ||
    payload.email.length > 120
  ) {
    return "Please provide a valid email address."
  }

  if (payload.company && payload.company.length > 80) {
    return "Company name is too long."
  }

  if (payload.service && payload.service.length > 80) {
    return "Service value is too long."
  }

  if (
    !payload.message ||
    payload.message.trim().length < 20 ||
    payload.message.length > 1200
  ) {
    return "Please provide a brief project summary with at least 20 characters."
  }

  return null
}

const forwardLead = async (
  webhookUrl: string,
  payload: Record<string, string>,
) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    })

    return response.ok
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isTrustedOrigin(request)) {
      return NextResponse.json({message: "Untrusted origin."}, {status: 403})
    }

    const forwardedFor = request.headers.get("x-forwarded-for") || "unknown"
    const ip = forwardedFor.split(",")[0]?.trim() || "unknown"
    const rateLimit = checkRateLimit(`lead:${ip}`, 8, 10 * 60 * 1000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {message: "Too many submissions. Please wait before trying again."},
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      )
    }

    const payload = (await request.json()) as LeadPayload

    if (payload.website) {
      return NextResponse.json({delivery: "ignored"}, {status: 200})
    }

    const validationError = validateLead(payload)
    if (validationError) {
      return NextResponse.json({message: validationError}, {status: 400})
    }

    const sanitizedLead = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.company?.trim() || "",
      service: payload.service?.trim() || "",
      message: payload.message.trim(),
      source: "portfolio-contact-form",
      receivedAt: new Date().toISOString(),
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL

    if (webhookUrl) {
      const forwarded = await forwardLead(webhookUrl, sanitizedLead)

      if (!forwarded) {
        return NextResponse.json(
          {message: "Lead forwarding failed. Please try again shortly."},
          {status: 502},
        )
      }

      return NextResponse.json({delivery: "webhook"}, {status: 200})
    }

    const resendDelivered = await sendViaResend(payload)

    if (resendDelivered) {
      return NextResponse.json({delivery: "resend"}, {status: 200})
    }

    return NextResponse.json(
      {delivery: "mailto", fallbackEmail: FALLBACK_EMAIL},
      {status: 200},
    )
  } catch {
    return NextResponse.json(
      {message: "Invalid request payload."},
      {status: 400},
    )
  }
}
