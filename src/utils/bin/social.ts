import config from "../../../config.json"

export const instagram = async (args: string[]): Promise<string> => {
  window.open(`https://www.instagram.com/lyra.haruto/`)

  return "Opening instagram..."
}

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`)

  return "Opening github..."
}

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://linkedin.com/in/oussamaammar/`)

  return "Opening linkedin..."
}
