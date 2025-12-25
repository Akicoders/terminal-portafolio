import config from "../../../config.json"

export const instagram = async (args: string[]): Promise<string> => {
  window.open(`https://www.instagram.com/${config.social.instagram}/`)

  return "Opening Instagram... 📷"
}

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`)

  return "Opening GitHub... 🐙"
}

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://linkedin.com/in/${config.social.linkedin}/`)

  return "Opening LinkedIn... 💼"
}

export const youtube = async (args: string[]): Promise<string> => {
  if (config.social.youtube) {
    window.open(`https://youtube.com/@${config.social.youtube}/`)
    return "Opening YouTube... 🎬"
  }
  return "YouTube channel not configured yet. Stay tuned! 🎬"
}
