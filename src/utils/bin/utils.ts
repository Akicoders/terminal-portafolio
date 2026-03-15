import packageJson from "../../../package.json"
import {getStoredLocale, portfolioContent} from "../../content/portfolio"

const fundingUrl: string =
  "funding" in packageJson &&
  packageJson.funding &&
  typeof packageJson.funding === "object" &&
  "url" in packageJson.funding
    ? String(packageJson.funding.url)
    : "https://github.com/Akicoders"

const COMMANDS = [
  "about",
  "aki",
  "banner",
  "blog",
  "contact",
  "cowsay",
  "curiosity",
  "date",
  "donate",
  "echo",
  "emacs",
  "email",
  "enigma",
  "github",
  "gui",
  "help",
  "impact",
  "instagram",
  "linkedin",
  "neofetch",
  "projects",
  "repo",
  "skills",
  "snake",
  "social",
  "sudo",
  "theme",
  "vi",
  "video",
  "vim",
  "weather",
  "whoami",
  "youtube",
]

export const help = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]

  return `Available commands:
${COMMANDS.join(", ")}

${copy.labels.shortcuts}:
[tab] autocomplete command
[ctrl+l] clear terminal
[ctrl+c] cancel current input
[enter] run command`
}

export const echo = async (args: string[]): Promise<string> => {
  return args.join(" ")
}

export const whoami = async (): Promise<string> => {
  return "mystery-visitor"
}

export const date = async (): Promise<string> => {
  return new Date().toString()
}

export const gui = async (): Promise<string> => {
  window.open("https://akicoders.site", "_self")
  return "Opening portfolio GUI..."
}

export const email = async (): Promise<string> => {
  window.open(
    "mailto:josepaulcamposterrones@gmail.com",
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening email client... josepaulcamposterrones@gmail.com"
}

export const video = async (): Promise<string> => {
  window.open(
    "https://www.youtube.com/results?search_query=jp+campos+ai",
    "_blank",
    "noopener,noreferrer",
  )

  return "Opening featured videos..."
}

export const vi = async (): Promise<string> => {
  return "why use vi? try 'emacs'."
}

export const vim = async (): Promise<string> => {
  return "why use vim? try 'emacs'."
}

export const emacs = async (): Promise<string> => {
  return "really? emacs? you should be using 'vim'"
}

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(() => {
    window.open(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "_blank",
      "noopener,noreferrer",
    )
  }, 900)

  if (args && args.length > 0) {
    return `Permission denied: unable to run the command '${args[0]}' as root.`
  }

  return "Permission denied: no command specified."
}

export const repo = async (): Promise<string> => {
  window.open("https://github.com/Akicoders", "_blank", "noopener,noreferrer")
  return "Opening GitHub repositories..."
}

export const donate = async (): Promise<string> => {
  window.open(fundingUrl, "_blank", "noopener,noreferrer")
  return "Opening donation url..."
}

export const banner = (): string => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]

  return `JP CAMPOS // ${copy.brand.role}
v${packageJson.version}

${copy.terminal.bannerLead}
${copy.terminal.bannerHint}

${copy.labels.terminalHint}
`
}
