import {NextRequest, NextResponse} from "next/server"
import {checkRateLimit} from "../../../lib/rateLimit"

const FALLBACK_EMAIL = "josepaulcamposterrones@gmail.com"
const REQUEST_TIMEOUT_MS = 10000

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
