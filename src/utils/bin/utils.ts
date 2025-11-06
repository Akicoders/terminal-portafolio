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
  window.open("https://linkedin.com/in/oussamaammar/", "_self")

  return "Opening GUI version..."
}

export const email = async (args: string[]): Promise<string> => {
  window.open("mailto:iam@thelyraharuto.com")

  return "Opening mailto:hello@thehanasachikocompany.com..."
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
    window.open("https://github.com/e-cesar9/The-Hana-Sachiko-Company", "_blank")
  }, 1000)

  return "Opening repository..."
}

export const donate = async (args?: string[]): Promise<string> => {
  window.open(packageJson.funding.url, "_blank")

  return "Opening donation url..."
}

export const banner = (args?: string[]): string => {
  return `
v${packageJson.version}

Type 'help' to see list of available commands.

--
The project is visible 🎉 type 'repo' to check out the repository.

New 🎉: Try out the new 'theme' command. See all available themes <a href="https://daedelium.com">in the docs</a>.
New 🎉: New command 'neofetch', for you linux.
--
`
}
