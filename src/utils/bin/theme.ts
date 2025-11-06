import Themes from "../../../themes.json"

export const theme = async (
  args: string[],
  callback?: (value: string) => string,
): Promise<string> => {
  if (args.length === 0) {
    return `Usage: theme [arg]
Args:
  - ls: list all themes
  - set: set a theme
  - random: set a random theme

Example: 
  theme ls # to list all themes
  theme set Gruvbox # to set a theme`
  }

  switch (args[0]) {
    case "ls":
      const result =
        Themes.map((theme) => theme.name.toLowerCase()).join(", ") + "\n\n"
      return result

    case "set":
      const selectedTheme = args[1]

      // Check if callback is provided before calling it
      if (callback) {
        return callback(selectedTheme)
      } else {
        // Handle the case when callback is not provided
        return "Callback not provided"
      }

    case "random":
      const randomTheme = Themes[Math.floor(Math.random() * Themes.length)]

      // Check if callback is provided before calling it
      if (callback) {
        return callback(randomTheme.name.toLowerCase())
      } else {
        // Handle the case when callback is not provided
        return "Callback not provided"
      }

    default:
      return "Invalid argument. Use 'ls', 'set', or 'random'."
  }
}
