import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const skills = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]
  const section = copy.sections.skills

  return `${copy.terminal.skills}

${section.groups
  .map(
    (group) =>
      `${group.title}:\n${group.bullets.map((item) => `- ${item}`).join("\n")}`,
  )
  .join("\n\n")}`
}
