import {getStoredLocale, portfolioContent} from "../../content/portfolio"

export const blog = async (): Promise<string> => {
  const locale = getStoredLocale()
  const copy = portfolioContent[locale]
  const section = copy.sections.blog

  return `${copy.terminal.blog}

${section.posts
  .map((post) => `${post.title}\n${post.meta}\n${post.summary}`)
  .join("\n\n")}`
}
