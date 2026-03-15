import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const about = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]
  const section = copy.sections.about

  return `${copy.terminal.about}

${section.heroTitle}
${section.heroBody}

${section.cards[0].title}:
${section.cards[0].bullets.map((item) => `- ${item}`).join("\n")}

${section.timeline.title}:
${section.timeline.bullets.map((item) => `- ${item}`).join("\n")}`
}
