import type {Metadata} from "next"
import {notFound} from "next/navigation"
import BlogArticlePage from "../../../components/portfolio/BlogArticlePage"
import {getAllBlogSlugs, getBlogPostBySlug} from "../../../content/portfolio"

const siteUrl = "https://akicoders.site"

export const generateStaticParams = () =>
  getAllBlogSlugs().map((slug) => ({slug}))

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const post = getBlogPostBySlug("es", slug) || getBlogPostBySlug("en", slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      title: post.title,
      description: post.summary,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.summary,
    },
  }
}

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
