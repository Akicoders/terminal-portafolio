"use client"

import Link from "next/link"
import React, {useEffect} from "react"
import {getBlogPostBySlug, portfolioContent} from "../../content/portfolio"
import {usePortfolio} from "../../utils/portfolioProvider"
import {Layout} from "../layout"

interface BlogArticlePageProps {
  slug: string
}

const BlogArticlePage: React.FC<BlogArticlePageProps> = ({slug}) => {
  const {locale, setSection} = usePortfolio()
  const copy = portfolioContent[locale]
  const post = getBlogPostBySlug(locale, slug)
  const fallbackPost = getBlogPostBySlug("es", slug)
  const article = post || fallbackPost

  useEffect(() => {
    setSection("blog")
  }, [setSection])

  if (!article) {
    return null
  }

  const relatedPosts = copy.sections.blog.posts
    .filter((item) => item.slug !== slug)
    .slice(0, 2)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: {
      "@type": "Person",
      name: "Jose Paul Campos Terrones",
    },
    publisher: {
      "@type": "Organization",
      name: "JP Campos",
    },
    url: `https://akicoders.site/blog/${article.slug}`,
    articleSection: article.category,
  }

  return (
    <Layout contextLabel={copy.sections.blog.title}>
      <div className="workspace-grid article-workspace">
        <article className="executive-surface article-surface">
          <div className="executive-scroll article-scroll">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}}
            />
            <div className="article-topbar">
              <Link href="/#blog" className="inline-action article-back-link">
                {copy.labels.backToHome}
              </Link>
              <span className="article-category">{article.category}</span>
            </div>

            <header className="article-header">
              <p className="executive-kicker">
                JP Campos / {copy.sections.blog.title}
              </p>
              <h1 className="display-font article-title">{article.title}</h1>
              <p className="article-meta">{article.meta}</p>
              <p className="article-summary">{article.summary}</p>
            </header>

            <div className="article-body">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {relatedPosts.length ? (
              <section className="article-related">
                <h2 className="display-font section-card-title">
                  {locale === "es" ? "Mas articulos" : "More articles"}
                </h2>
                <div className="post-list article-related-grid">
                  {relatedPosts.map((item) => (
                    <article
                      key={item.slug}
                      className="executive-card post-card"
                    >
                      <p className="post-meta">{item.meta}</p>
                      <h3 className="display-font section-card-title">
                        {item.title}
                      </h3>
                      <p className="project-summary">{item.summary}</p>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="inline-action post-read-link"
                      >
                        {copy.labels.readArticle}
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default BlogArticlePage
