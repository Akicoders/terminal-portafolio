import config from "../../../config.json"
import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const social = async (): Promise<string> => {
  const locale = getStoredLocale()
  return portfolioContent[locale].terminal.social
}

export const instagram = async (args: string[]): Promise<string> => {
  window.open(
    `https://www.instagram.com/${config.social.instagram}/`,
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening Instagram..."
}

export const github = async (args: string[]): Promise<string> => {
  window.open(
    `https://github.com/${config.social.github}/`,
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening GitHub..."
}

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(
    `https://linkedin.com/in/${config.social.linkedin}/`,
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening LinkedIn..."
}

export const youtube = async (args: string[]): Promise<string> => {
  if (config.social.youtube) {
    window.open(
      `https://youtube.com/@${config.social.youtube}/`,
      "_blank",
      "noopener,noreferrer",
    )
    return "Opening YouTube..."
  }

  window.open(
    "https://www.youtube.com/results?search_query=jp+campos+ai",
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening YouTube search..."
}
