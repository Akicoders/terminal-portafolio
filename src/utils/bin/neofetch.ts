import packageJson from "../../../package.json"
import {
  getStoredLocale,
  getStoredMode,
  portfolioContent,
} from "../../content/portfolio"

const getPlatform = (): "Unknown" | "Windows" | "MacOS" | "Linux" => {
  if (navigator.userAgent.includes("Win")) {
    return "Windows"
  }

  if (navigator.userAgent.includes("Mac")) {
    return "MacOS"
  }

  if (navigator.userAgent.includes("Linux")) {
    return "Linux"
  }

  return "Unknown"
}

const getUptimeLabel = () => {
  const visited = localStorage.getItem("visitedAt")

  if (!visited) {
    return "just now"
  }

  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(visited).getTime()) / 1000),
  )

  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}h ${minutes % 60}m`
  }

  const days = Math.floor(hours / 24)
  return `${days}d ${hours % 24}h`
}

export const neofetch = async (): Promise<string> => {
  const locale = getStoredLocale()
  const mode = getStoredMode()
  const copy = portfolioContent[locale]
  const themeName = localStorage.getItem("theme") || "homebrew"

  return `JP CAMPOS
========================================
Role    : ${copy.brand.role}
Focus   : AI, automation, product engineering
OS      : ${getPlatform()}
Mode    : ${mode}
Theme   : ${themeName}
Version : ${packageJson.version}
Uptime  : ${getUptimeLabel()}

Sections:
- ${copy.nav.map((item) => item.label).join(" | ")}

Links:
- Email    : josepaulcamposterrones@gmail.com
- GitHub   : https://github.com/Akicoders
- LinkedIn : https://linkedin.com/in/paulct-dev
- Instagram: https://instagram.com/paul04_ct

Quote:
"${copy.terminal.neofetchQuote}"`
}
