import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const contact = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]
  const section = copy.sections.contact

  return `${copy.terminal.contact}

${section.methods.map((item) => `${item.label}: ${item.value}`).join("\n")}`
}
