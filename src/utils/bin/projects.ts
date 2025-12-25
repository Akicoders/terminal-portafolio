import { getProjects } from "../../api"

export const projects = async (args: string[]): Promise<string> => {
  // Validate arguments - projects command doesn't accept any arguments
  if (args && args.length > 0) {
    const validFlags = ['--help', '-h']
    const arg = args[0]

    if (validFlags.includes(arg)) {
      return `Usage: projects
      
Lists all public GitHub repositories.

Options:
  --help, -h    Show this help message`
    }

    return `projects: invalid option '${args.join(' ')}'
Try 'projects --help' for more information.`
  }

  const projects = await getProjects()

  return projects
    .filter((repo) => !repo.fork)
    .map(
      (repo) =>
        `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
    )
    .join("\n")
}
