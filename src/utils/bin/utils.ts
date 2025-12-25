import packageJson from "../../../package.json"
import * as bin from "./index"

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(", ")

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`
}

export const echo = async (args: string[]): Promise<string> => {
  return args.join(" ")
}

export const whoami = async (args: string[]): Promise<string> => {
  return "mystery-visitor"
}

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString()
}

export const gui = async (args: string[]): Promise<string> => {
  window.open("https://linkedin.com/in/paulct-dev/", "_self")

  return "Opening LinkedIn profile... 💼"
}

export const email = async (args: string[]): Promise<string> => {
  window.open("mailto:josepaulcamposterrones@gmail.com")

  return "Opening email client... 📧 josepaulcamposterrones@gmail.com"
}

export const vi = async (args: string[]): Promise<string> => {
  return `why use vi? try 'emacs'.`
}

export const vim = async (args: string[]): Promise<string> => {
  return `why use vim? try 'emacs'.`
}

export const emacs = async (args?: string[]): Promise<string> => {
  return `really? emacs? you should be using 'vim'`
}

export const sudo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  }, 1000)

  if (args) {
    return `Permission denied: unable to run the command '${args[0]}' as root.`
  } else {
    return "Permission denied: no command specified."
  }
}

export const repo = async (args?: string[]): Promise<string> => {
  setTimeout(function () {
    window.open("https://github.com/Akicoders", "_blank")
  }, 1000)

  return "Opening GitHub repositories... 🐙"
}

export const donate = async (args?: string[]): Promise<string> => {
  window.open(packageJson.funding.url, "_blank")

  return "Opening donation url..."
}

export const banner = (args?: string[]): string => {
  return `
  ╔═══════════════════════════════════════════════════════════════════╗
  ║      ██╗██████╗      ██████╗ █████╗ ███╗   ███╗██████╗  ██████╗  ║
  ║      ██║██╔══██╗    ██╔════╝██╔══██╗████╗ ████║██╔══██╗██╔═══██╗ ║
  ║      ██║██████╔╝    ██║     ███████║██╔████╔██║██████╔╝██║   ██║ ║
  ║ ██   ██║██╔═══╝     ██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║ ║
  ║ ╚█████╔╝██║         ╚██████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝ ║
  ║  ╚════╝ ╚═╝          ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝  ║
  ╚═══════════════════════════════════════════════════════════════════╝
  
  🚀 Fullstack Developer | AI Specialist | Automation Expert
  
  v${packageJson.version}
  
  Escribe 'help' para ver los comandos disponibles.
  Escribe 'about' para conocerme.
  O simplemente escríbeme algo y hablaremos con Aki 🤖
  
   ──────────────────────────────────────────────────────────────────────
  💡 Tips: 'impact', 'video', 'projects', 'theme', 'neofetch'
  ──────────────────────────────────────────────────────────────────────
`
}
