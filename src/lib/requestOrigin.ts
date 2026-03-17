import {NextRequest} from "next/server"

export const isTrustedOrigin = (request: NextRequest) => {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")

  if (!origin || !host) {
    return true
  }

  try {
    const originUrl = new URL(origin)
    return originUrl.host === host
  } catch {
    return false
  }
}
