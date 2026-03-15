const REQUEST_TIMEOUT_MS = 10000

const fetchWithTimeout = async (input: string, init?: RequestInit) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export const getWeather = async (city: string): Promise<string> => {
  const response = await fetchWithTimeout(
    `https://wttr.in/${encodeURIComponent(city)}?ATm`,
    {
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Unable to fetch weather right now")
  }

  return response.text()
}
