const buildBubble = (message: string) => {
  const content = message.trim() || "moo"
  const line = "-".repeat(content.length + 2)

  return [` ${line}`, `< ${content} >`, ` ${line}`].join("\n")
}

export const cowsay = async (args: string[]): Promise<string> => {
  const message = args.join(" ") || "Automatiza lo repetitivo."

  return `${buildBubble(message)}
        \\\   ^__^
         \\\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
}
