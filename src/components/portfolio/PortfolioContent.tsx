"use client"

import Image from "next/image"
import Link from "next/link"
import React, {useEffect, useMemo, useRef, useState} from "react"
import {
  siAstro,
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGreensock,
  siIonic,
  siLangchain,
  siLinux,
  siMongodb,
  siN8n,
  siNextdotjs,
  siOpenjdk,
  siPandas,
  siPython,
  siReact,
  siRedis,
  siShadcnui,
  siSqlite,
  siTailwindcss,
  siTypescript,
} from "simple-icons"
import fondoImage from "../../assets/fondo.webp"
import {portfolioContent} from "../../content/portfolio"
import {usePortfolio} from "../../utils/portfolioProvider"
import LeadContactForm from "./LeadContactForm"
import {MailIcon} from "../ui/icons"

const techBadgeMap: Record<
  string,
  {
    path?: string
    color?: string
    fallback?: string
  }
> = {
  "Next.js": {path: siNextdotjs.path, color: `#${siNextdotjs.hex}`},
  React: {path: siReact.path, color: `#${siReact.hex}`},
  TypeScript: {path: siTypescript.path, color: `#${siTypescript.hex}`},
  Astro: {path: siAstro.path, color: `#${siAstro.hex}`},
  Ionic: {path: siIonic.path, color: `#${siIonic.hex}`},
  "shadcn/ui": {path: siShadcnui.path, color: `#${siShadcnui.hex}`},
  Tailwind: {path: siTailwindcss.path, color: `#${siTailwindcss.hex}`},
  "Motion/GSAP": {path: siGreensock.path, color: `#${siGreensock.hex}`},
  FastAPI: {path: siFastapi.path, color: `#${siFastapi.hex}`},
  Django: {path: siDjango.path, color: `#${siDjango.hex}`},
  Java: {path: siOpenjdk.path, color: `#${siOpenjdk.hex}`},
  SQLite: {path: siSqlite.path, color: `#${siSqlite.hex}`},
  MongoDB: {path: siMongodb.path, color: `#${siMongodb.hex}`},
  Redis: {path: siRedis.path, color: `#${siRedis.hex}`},
  Python: {path: siPython.path, color: `#${siPython.hex}`},
  Pandas: {path: siPandas.path, color: `#${siPandas.hex}`},
  "Prompt Engineering": {fallback: "spark"},
  Unsloth: {fallback: "chip"},
  vLLM: {fallback: "chip"},
  n8n: {path: siN8n.path, color: `#${siN8n.hex}`},
  Flowise: {fallback: "flow"},
  LangChain: {path: siLangchain.path, color: `#${siLangchain.hex}`},
  LangGraph: {fallback: "graph"},
  Docker: {path: siDocker.path, color: `#${siDocker.hex}`},
  Linux: {path: siLinux.path, color: `#${siLinux.hex}`},
  Git: {path: siGit.path, color: `#${siGit.hex}`},
}

const GenericTechIcon = ({variant}: {variant?: string}) => {
  switch (variant) {
    case "spark":
      return (
        <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
          <path
            d="M12 2 14.2 8.2 20 10.5 14.2 12.8 12 19 9.8 12.8 4 10.5 9.8 8.2 12 2Z"
            fill="currentColor"
          />
        </svg>
      )
    case "flow":
      return (
        <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
          <path
            d="M5 6h4v4H5V6Zm10 0h4v4h-4V6ZM10 14h4v4h-4v-4ZM9 8h6v2h-2v4h-2v-4H9V8Z"
            fill="currentColor"
          />
        </svg>
      )
    case "graph":
      return (
        <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
          <path
            d="M6 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM12 15a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM7.8 8.2l2.8 6.2m2.6 0 2.8-6.2M8 7h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
          <path
            d="M7 7h4v4H7V7Zm6 0h4v4h-4V7ZM7 13h4v4H7v-4Zm6 0h4v4h-4v-4Z"
            fill="currentColor"
          />
        </svg>
      )
  }
}

const TechBadge = ({label}: {label: string}) => {
  const badge = techBadgeMap[label] || {fallback: "chip"}

  return (
    <li className="tech-badge-item">
      <span
        className="tech-badge-mark"
        style={{color: badge.color || "currentColor"}}
      >
        {badge.path ? (
          <svg viewBox="0 0 24 24" className="tech-icon-svg" aria-hidden="true">
            <path d={badge.path} fill="currentColor" />
          </svg>
        ) : (
          <GenericTechIcon variant={badge.fallback} />
        )}
      </span>
      <span>{label}</span>
    </li>
  )
}

const PortfolioContent = () => {
  const {locale, section} = usePortfolio()
  const copy = portfolioContent[locale]
  const currentSection = copy.sections[section]
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.scrollTo({top: 0, behavior: "smooth"})
  }, [section])

  return (
    <section className="executive-surface" aria-labelledby="section-title">
      <div ref={containerRef} className="executive-scroll">
        <div className="executive-heading">
          <p className="executive-kicker">JP Campos / {currentSection.title}</p>
          <h1 id="section-title" className="display-font executive-title">
            {currentSection.title}
          </h1>
          <p className="executive-subtitle">{currentSection.subtitle}</p>
        </div>

        {section === "about" ? <AboutSection /> : null}
        {section === "skills" ? <SkillsSection /> : null}
        {section === "projects" ? <ProjectsSection /> : null}
        {section === "contact" ? <ContactSection /> : null}
        {section === "blog" ? <BlogSection /> : null}
      </div>
    </section>
  )
}

const AboutSection = () => {
  const {locale} = usePortfolio()
  const content = portfolioContent[locale].sections.about

  return (
    <div className="section-stack">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="hero-eyebrow">{content.intro}</p>
          <h2 className="display-font hero-title">{content.heroTitle}</h2>
          <p className="hero-body">{content.heroBody}</p>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-photo-frame">
            <Image
              src={fondoImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1180px) 60vw, 320px"
              className="hero-image"
            />
            <div className="hero-image-overlay" />
          </div>
        </div>
      </div>

      <div className="kpi-grid">
        {content.kpis.map((item) => (
          <article key={item.label} className="executive-card kpi-card">
            <strong className="display-font kpi-value">{item.value}</strong>
            <span className="kpi-label">{item.label}</span>
          </article>
        ))}
      </div>

      <div className="detail-grid">
        {content.cards.map((card) => (
          <article key={card.title} className="executive-card">
            <h3 className="display-font section-card-title">{card.title}</h3>
            <ul className="detail-list">
              {card.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="executive-card timeline-card">
        <h3 className="display-font section-card-title">
          {content.timeline.title}
        </h3>
        <ul className="detail-list timeline-list">
          {content.timeline.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </div>
  )
}

const SkillsSection = () => {
  const {locale} = usePortfolio()
  const content = portfolioContent[locale].sections.skills

  const skillCards = useMemo(
    () => [
      ...content.groups.map((group) => ({
        key: group.title,
        filter: group.title,
        title: group.title,
        bullets: group.bullets,
      })),
    ],
    [content.groups],
  )

  const filters = useMemo(
    () => skillCards.map((card) => card.filter),
    [skillCards],
  )

  const [activeFilter, setActiveFilter] = useState(filters[0] || "")

  useEffect(() => {
    setActiveFilter(filters[0] || "")
  }, [filters, locale])

  const filteredCards = skillCards.filter(
    (card) => card.filter === activeFilter,
  )

  return (
    <div className="section-stack">
      <p className="section-intro">{content.intro}</p>

      <div className="chip-row" aria-label="Skill filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chip ${activeFilter === filter ? "is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredCards.map((card) => (
          <article key={card.key} className="executive-card skill-card">
            <h3 className="display-font section-card-title">{card.title}</h3>
            <ul className="tech-badge-list">
              {card.bullets.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="stack-card-grid">
        {content.stack.bullets.map((item) => (
          <article key={item} className="executive-card stack-card">
            <h3 className="display-font section-card-title">
              {content.stack.title}
            </h3>
            <p className="project-summary">{item}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

const ProjectsSection = () => {
  const {locale} = usePortfolio()
  const copy = portfolioContent[locale]
  const content = copy.sections.projects
  const allLabel = content.filters[0]
  const [activeFilter, setActiveFilter] = useState(allLabel)
  const [activeStack, setActiveStack] = useState("")

  const stackFilters = useMemo(
    () =>
      Array.from(
        new Set(content.items.flatMap((project) => project.tags)),
      ).sort(),
    [content.items],
  )

  useEffect(() => {
    setActiveFilter(allLabel)
    setActiveStack("")
  }, [allLabel, locale])

  const filteredProjects = content.items.filter((project) => {
    const matchesCategory =
      activeFilter === allLabel ? true : project.category === activeFilter
    const matchesStack = activeStack ? project.tags.includes(activeStack) : true
    return matchesCategory && matchesStack
  })

  const automationProjects = filteredProjects.filter(
    (project) => project.kind === "automation",
  )
  const standardProjects = filteredProjects.filter(
    (project) => project.kind === "project",
  )
  const showSeparatedAutomation = activeFilter === allLabel

  const renderProjectCards = (items: typeof filteredProjects) => (
    <div className="project-list">
      {items.map((project) => (
        <article key={project.title} className="executive-card project-card">
          <div className="project-topline">
            <strong className="project-metric">{project.metric}</strong>
            <a
              className="inline-action"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.labels.openLink}
            </a>
          </div>
          <h3 className="display-font section-card-title">{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )

  return (
    <div className="section-stack">
      <div className="chip-row" aria-label={copy.labels.shortcuts}>
        {content.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chip ${activeFilter === filter ? "is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div
        className="chip-row stack-filter-row"
        aria-label="Project stack filters"
      >
        {stackFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chip ${activeStack === filter ? "is-active" : ""}`}
            onClick={() =>
              setActiveStack((current) => (current === filter ? "" : filter))
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {showSeparatedAutomation ? (
        <>
          <div className="section-block">
            <div className="section-block-header">
              <h3 className="display-font section-card-title">
                {locale === "es" ? "Proyectos destacados" : "Featured projects"}
              </h3>
              <p className="project-summary">
                {locale === "es"
                  ? "Software y productos reales seleccionados para mostrar capacidad tecnica y de negocio."
                  : "Selected software and product work that reflects technical and business execution."}
              </p>
            </div>
            {renderProjectCards(standardProjects)}
          </div>

          <div className="section-block">
            <div className="section-block-header">
              <h3 className="display-font section-card-title">
                Automation Cases
              </h3>
              <p className="project-summary">
                {locale === "es"
                  ? "Workflows de automatizacion, agentes y pipelines conectados a operaciones reales."
                  : "Automation workflows, agents and pipelines connected to real operations."}
              </p>
            </div>
            {renderProjectCards(automationProjects)}
          </div>
        </>
      ) : (
        renderProjectCards(filteredProjects)
      )}
    </div>
  )
}

const ContactSection = () => {
  const {locale} = usePortfolio()
  const content = portfolioContent[locale].sections.contact
  const emailItem = content.methods[0]
  const boundaries =
    locale === "es"
      ? [
          "Trabajo remoto y por alcance definido",
          "Sin soporte 24/7 ni urgencias abiertas permanentes",
          "Discovery necesario antes de comprometer resultados",
        ]
      : [
          "Remote work with clear scoped engagements",
          "No 24/7 support or permanent open urgency coverage",
          "Discovery is required before committing outcomes",
        ]
  const quickBrief =
    locale === "es"
      ? [
          "Objetivo del proyecto o problema principal",
          "Tiempo ideal de entrega o urgencia",
          "Herramientas, stack o sistema actual",
          "Referencias o links clave para contexto",
        ]
      : [
          "Primary project goal or problem to solve",
          "Ideal timeline or urgency level",
          "Current stack, tools or system involved",
          "References or links that add context",
        ]

  return (
    <div className="section-stack">
      <div className="hero-panel contact-panel">
        <div className="hero-copy">
          <h2 className="display-font hero-title">{content.ctaTitle}</h2>
          <p className="hero-body">{content.ctaBody}</p>
          <LeadContactForm
            copy={content.form}
            fallbackEmail={
              emailItem?.value || "josepaulcamposterrones@gmail.com"
            }
          />
        </div>

        <aside className="contact-summary-panel">
          <div className="contact-summary-card is-primary">
            <div className="contact-summary-head">
              <MailIcon className="contact-summary-icon" />
              <div>
                <small>{emailItem?.label}</small>
                <strong>{emailItem?.value}</strong>
              </div>
            </div>
            <a
              href={emailItem?.href}
              className="inline-action contact-summary-action"
            >
              {locale === "es" ? "Escribir ahora" : "Email now"}
            </a>
          </div>

          <div className="contact-summary-card">
            <small>{locale === "es" ? "Brief rapido" : "Quick brief"}</small>
            <ul className="detail-list compact-list">
              {quickBrief.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="contact-summary-card">
            <small>
              {locale === "es"
                ? "Condiciones de trabajo"
                : "Working boundaries"}
            </small>
            <ul className="detail-list compact-list">
              {boundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

const BlogSection = () => {
  const {locale} = usePortfolio()
  const content = portfolioContent[locale].sections.blog
  const allLabel = content.filters[0]
  const [activeFilter, setActiveFilter] = useState(allLabel)

  useEffect(() => {
    setActiveFilter(allLabel)
  }, [allLabel, content.posts, locale])

  const filteredPosts =
    activeFilter === allLabel
      ? content.posts
      : content.posts.filter((post) => post.category === activeFilter)

  return (
    <div className="section-stack">
      <div className="chip-row">
        {content.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chip ${activeFilter === filter ? "is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="post-list">
        {filteredPosts.map((post) => (
          <article
            key={post.title}
            className="executive-card post-card post-card-button"
          >
            <p className="post-meta">{post.meta}</p>
            <h3 className="display-font section-card-title">{post.title}</h3>
            <p className="project-summary">{post.summary}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-action post-read-link"
            >
              {portfolioContent[locale].labels.readArticle}
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PortfolioContent
