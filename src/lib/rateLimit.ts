type Bucket = {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

export const checkRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
) => {
  const now = Date.now()
  const current = store.get(key)

  if (!current || now > current.resetAt) {
    store.set(key, {count: 1, resetAt: now + windowMs})
    return {allowed: true, retryAfter: 0}
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    }
  }

  current.count += 1
  store.set(key, current)

  return {allowed: true, retryAfter: 0}
}
