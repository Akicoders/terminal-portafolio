import {notFound} from "next/navigation"
import BlogArticlePage from "../../../components/portfolio/BlogArticlePage"
import {getAllBlogSlugs} from "../../../content/portfolio"

export const generateStaticParams = () =>
  getAllBlogSlugs().map((slug) => ({slug}))

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  if (!getAllBlogSlugs().includes(slug)) {
    notFound()
  }

  return <BlogArticlePage slug={slug} />
}
