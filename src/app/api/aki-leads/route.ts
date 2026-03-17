import {NextRequest, NextResponse} from "next/server"
import {checkRateLimit} from "../../../lib/rateLimit"
import {isTrustedOrigin} from "../../../lib/requestOrigin"

const REQUEST_TIMEOUT_MS = 10000

interface AkiLeadPayload {
  name: string
  email: string
  company?: string
  service: string
  challenge: string
  goal: string
  timeline: string
  budget: string
  summary: string
  proposal: string
  salesAngle: string
  website?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validatePayload = (payload: AkiLeadPayload) => {
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

  if (!payload.service || payload.service.length > 80) {
    return "Please provide a valid service."
  }

  if (payload.company && payload.company.length > 120) {
    return "Company name is too long."
  }

  if (
    !payload.challenge ||
    payload.challenge.trim().length < 12 ||
    payload.challenge.length > 1200
  ) {
    return "Please provide a valid challenge description."
  }

  if (
    !payload.goal ||
    payload.goal.trim().length < 8 ||
    payload.goal.length > 500
  ) {
    return "Please provide a valid goal."
  }

  if (
    !payload.timeline ||
    payload.timeline.trim().length < 2 ||
    payload.timeline.length > 120
  ) {
    return "Please provide a valid timeline."
  }

  if (
    !payload.budget ||
    payload.budget.trim().length < 2 ||
    payload.budget.length > 120
  ) {
    return "Please provide a valid budget range."
  }

  if (
    !payload.summary ||
    payload.summary.trim().length < 20 ||
    payload.summary.length > 2000
  ) {
    return "Please provide a valid conversation summary."
  }

  if (
    !payload.proposal ||
    payload.proposal.trim().length < 8 ||
    payload.proposal.length > 600
  ) {
    return "Please provide a valid proposal summary."
  }

  if (
    !payload.salesAngle ||
    payload.salesAngle.trim().length < 8 ||
    payload.salesAngle.length > 600
  ) {
    return "Please provide a valid sales angle."
  }

  return null
}

const forwardLead = async (
  webhookUrl: string,
  payload: Record<string, string>,
) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const authHeader = process.env.AKI_LEAD_WEBHOOK_AUTH_HEADER
  const username = process.env.AKI_LEAD_WEBHOOK_USERNAME
  const password = process.env.AKI_LEAD_WEBHOOK_PASSWORD
  const authorization = authHeader
    ? authHeader
    : username && password
      ? `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
      : undefined

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? {Authorization: authorization} : {}),
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
    const rateLimit = checkRateLimit(`aki:${ip}`, 5, 15 * 60 * 1000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {message: "Too many Aki submissions. Please wait before trying again."},
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      )
    }

    const payload = (await request.json()) as AkiLeadPayload

    if (payload.website) {
      return NextResponse.json({delivery: "ignored"}, {status: 200})
    }

    const validationError = validatePayload(payload)
    if (validationError) {
      return NextResponse.json({message: validationError}, {status: 400})
    }

    const webhookUrl = process.env.AKI_LEAD_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json(
        {
          message:
            "Aki lead webhook is not configured yet. Add AKI_LEAD_WEBHOOK_URL to enable Telegram or n8n delivery.",
        },
        {status: 503},
      )
    }

    const telegramText = [
      "New Aki lead",
      `Name: ${payload.name.trim()}`,
      `Email: ${payload.email.trim().toLowerCase()}`,
      `Company: ${payload.company?.trim() || "-"}`,
      `Service: ${payload.service.trim()}`,
      `Goal: ${payload.goal.trim()}`,
      `Timeline: ${payload.timeline.trim()}`,
      `Budget: ${payload.budget.trim()}`,
      "",
      "Challenge:",
      payload.challenge.trim(),
      "",
      "Summary:",
      payload.summary.trim(),
      "",
      "Proposal:",
      payload.proposal.trim(),
      "",
      "Sales angle:",
      payload.salesAngle.trim(),
    ].join("\n")

    const sanitizedLead = {
      source: "aki-assistant",
      receivedAt: new Date().toISOString(),
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company: payload.company?.trim() || "",
      service: payload.service.trim(),
      challenge: payload.challenge.trim(),
      goal: payload.goal.trim(),
      timeline: payload.timeline.trim(),
      budget: payload.budget.trim(),
      summary: payload.summary.trim(),
      proposal: payload.proposal.trim(),
      salesAngle: payload.salesAngle.trim(),
      telegramText,
    }

    const forwarded = await forwardLead(webhookUrl, sanitizedLead)

    if (!forwarded) {
      return NextResponse.json(
        {message: "Lead forwarding failed. Please try again shortly."},
        {status: 502},
      )
    }

    return NextResponse.json({delivery: "webhook"}, {status: 200})
  } catch {
    return NextResponse.json(
      {message: "Invalid request payload."},
      {status: 400},
    )
  }
}
