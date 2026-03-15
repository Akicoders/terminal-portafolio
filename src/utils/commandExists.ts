import * as bin from "./bin"

export const getAvailableCommands = () => ["clear", ...Object.keys(bin)].sort()

export const commandExists = (command: string) => {
  const commands = getAvailableCommands()

  return commands.indexOf(command.split(" ")[0]) !== -1
}
