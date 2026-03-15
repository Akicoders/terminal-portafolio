import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const projects = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]

  return `${copy.terminal.projects}

${copy.sections.projects.items
  .map(
    (project) =>
      `${project.title} | ${project.metric}\n${project.summary}\n${project.href}`,
  )
  .join("\n\n")}`
}
