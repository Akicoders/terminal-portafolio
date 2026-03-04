import React from "react"
import type {Metadata, Viewport} from "next"
import "../styles/global.css"
import ClientProviders from "../components/ClientProviders"
import Script from "next/script"

// ══════════════════════════════════════════════════════════════
// SEO CONSTANTS - Tu información real
// ══════════════════════════════════════════════════════════════
const SITE_URL = "https://jpcampos.dev"
const FULL_NAME = "Jose Paul Campos Terrones"
const SHORT_NAME = "JP Campos"
const EMAIL = "josepaulcamposterrones@gmail.com"
const JOB_TITLE = "Fullstack Developer & AI Specialist"
const DESCRIPTION = `${FULL_NAME} - Fullstack Developer especializado en IA, Machine Learning y Automatización de Procesos. Transformando negocios con tecnología innovadora.`
const THEME_COLOR = "#00B4D8"

// ══════════════════════════════════════════════════════════════
// Next.js Metadata API (Server-side rendered)
// ══════════════════════════════════════════════════════════════
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Título global con template ──
  title: {
    default: `${SHORT_NAME} | ${JOB_TITLE}`,
    template: `%s | ${SHORT_NAME}`,
  },

  // ── Descripción principal ──
  description: DESCRIPTION,

  // ── Keywords exhaustivas para búsqueda por nombre y LLM ──
  keywords: [
    // Nombre completo y variaciones (incluyendo errores comunes)
    FULL_NAME,
    "Jose Paul Campo Terrones", // Sin 's' - error común
    "Jose Paul Campos", // Sin apellido
    "Jose Paul Campo",
    SHORT_NAME,
    "JP Campos",
    "Paul Campos Terrones",
    "Paul Campos",
    "Paul Campo Terrones",
    "Paul Campo",
    "jpaulcampos",
    "jpcampos",
    "Akicoders",
    // Títulos profesionales - Fullstack
    "Fullstack Developer",
    "Full Stack Developer",
    "Desarrollador Fullstack",
    "Desarrollador Full Stack",
    "Desarrollador Full-Stack",
    // Títulos profesionales - IA
    "AI Engineer",
    "Ingeniero de IA",
    "AI Specialist",
    "Especialista en IA",
    "Ingeniero Artificial Intelligence",
    // Títulos profesionales - Desarrollo
    "Frontend Developer",
    "Frontend Engineer",
    "Desarrollador Frontend",
    "Desarrollador Front-End",
    "Backend Developer",
    "Backend Engineer",
    "Desarrollador Backend",
    "Desarrollador Back-End",
    "Full Stack Engineer",
    // Títulos profesionales - Automatización
    "Automation Engineer",
    "Automation Expert",
    "Ingeniero de Automatización",
    "Automatizaciones de Negocio",
    "Automatización de Procesos",
    "Automatización Empresarial",
    "RPA Developer",
    // Tecnologías clave
    "React Developer",
    "Next.js Developer",
    "React Engineer",
    "Python Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    // IA y ML
    "Machine Learning",
    "Artificial Intelligence",
    "Inteligencia Artificial",
    "LLM Optimization",
    "LLM Engineer",
    "OpenAI Developer",
    "LangChain Developer",
    "RAG Developer",
    "Chatbot Developer",
    "Chatbot Engineer",
    "AI Chatbot",
    "Vector Database",
    // Automatización
    "N8N Automation",
    "N8N Developer",
    "Process Automation",
    "Business Automation",
    "Workflow Automation",
    "Make.com",
    "Zapier",
    "Flowise Developer",
    // Cloud y DevOps
    "AWS Developer",
    "Docker Developer",
    "Cloud Developer",
    // Ubicación
    "Desarrollador Perú",
    "Developer Peru",
    "Desarrollador Lima",
    "Freelance Developer Peru",
    // Otros
    "Portafolio Developer",
    "Portfolio Developer",
    "Web Developer Peru",
  ],

  // ── Autor ──
  authors: [{name: FULL_NAME, url: SITE_URL}],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical ──
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      en: `${SITE_URL}?lang=en`,
      "x-default": SITE_URL,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "es_PE",
    alternateLocale: ["en_US", "es_ES"],
    url: SITE_URL,
    siteName: `${SHORT_NAME} Portfolio`,
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} - ${JOB_TITLE} - Portfolio`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@paul04_ct",
  },

  // ── Icons ──
  icons: {
    icon: [
      {url: "/favicon.ico", sizes: "any"},
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicon-96x96.png", sizes: "96x96", type: "image/png"},
    ],
    apple: [
      {url: "/apple-icon-57x57.png", sizes: "57x57"},
      {url: "/apple-icon-60x60.png", sizes: "60x60"},
      {url: "/apple-icon-72x72.png", sizes: "72x72"},
      {url: "/apple-icon-76x76.png", sizes: "76x76"},
      {url: "/apple-icon-114x114.png", sizes: "114x114"},
      {url: "/apple-icon-120x120.png", sizes: "120x120"},
      {url: "/apple-icon-144x144.png", sizes: "144x144"},
      {url: "/apple-icon-152x152.png", sizes: "152x152"},
      {url: "/apple-icon-180x180.png", sizes: "180x180"},
    ],
  },

  // ── Manifest ──
  manifest: "/manifest.json",

  // ── Categoría ──
  category: "technology",

  // ── Other meta tags ──
  other: {
    "theme-color": THEME_COLOR,
    "msapplication-TileColor": THEME_COLOR,
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: THEME_COLOR,
}

// ══════════════════════════════════════════════════════════════
// JSON-LD Structured Data (Multiple schemas for max SEO)
// ══════════════════════════════════════════════════════════════
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: FULL_NAME,
  alternateName: [
    SHORT_NAME,
    "JP Campos",
    "Paul Campos",
    "Paul Campos Terrones",
    "Jose Paul Campos",
    "Jose Paul Campo Terrones", // Error común sin 's'
    "Jose Paul Campo",
    "Akicoders",
    "jpaulcampos",
    "jpcampos",
    "Fullstack Developer",
    "AI Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  givenName: "Jose Paul",
  familyName: "Campos Terrones",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  description: DESCRIPTION,
  jobTitle: [
    JOB_TITLE,
    "AI Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Automation Engineer",
    "Desarrollador Fullstack",
    "Ingeniero de IA",
  ],
  email: `mailto:${EMAIL}`,
  telephone: "+51XXXXXXXXX", // Agrega tu número si deseas
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  sameAs: [
    "https://github.com/Akicoders",
    "https://linkedin.com/in/paulct-dev",
    "https://instagram.com/paul04_ct",
  ],
  knowsAbout: [
    // Frameworks y lenguajes
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Node.js",
    "Express",
    "FastAPI",
    // IA y ML
    "Machine Learning",
    "Artificial Intelligence",
    "Large Language Models",
    "LLM",
    "OpenAI",
    "GPT",
    "LangChain",
    "RAG",
    "Retrieval Augmented Generation",
    "Chatbot Development",
    "AI Chatbot",
    "Vector Databases",
    "Pinecone",
    "Chroma",
    // Automatización
    "N8N",
    "Make.com",
    "Zapier",
    "Flowise",
    "Process Automation",
    "Business Automation",
    "Workflow Automation",
    "RPA",
    "Automatizaciones de Negocio",
    // Bases de datos
    "PostgreSQL",
    "MongoDB",
    "Redis",
    // Cloud y DevOps
    "AWS",
    "Docker",
    "Vercel",
    "Cloud Computing",
    // Otros
    "TailwindCSS",
    "LLM Optimization",
    "API Development",
    "Web Development",
  ],
  knowsLanguage: ["es", "en"],
  occupation: [
    {
      "@type": "Occupation",
      name: "Fullstack Developer",
      description: "Desarrollo web fullstack con React, Next.js, Node.js",
    },
    {
      "@type": "Occupation",
      name: "AI Engineer",
      description:
        "Desarrollo de soluciones de Inteligencia Artificial y Machine Learning",
    },
    {
      "@type": "Occupation",
      name: "Automation Engineer",
      description: "Automatización de procesos de negocio",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Independent",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${FULL_NAME} — Portfolio`,
  description: DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
  inLanguage: ["es", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${FULL_NAME} — ${JOB_TITLE}`,
  description: DESCRIPTION,
  mainEntity: {
    "@id": `${SITE_URL}/#person`,
  },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Me",
      item: `${SITE_URL}/me`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Skills",
      item: `${SITE_URL}/skills`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Projects",
      item: `${SITE_URL}/projects`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: `${SITE_URL}/contact`,
    },
  ],
}

// FAQ Schema para SEO - Preguntas frecuentes
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué servicios ofrece Jose Paul Campos Terrones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ofrezco servicios de desarrollo web fullstack, desarrollo de aplicaciones con IA y Machine Learning, creación de chatbots con RAG, automatización de procesos con N8N, optimización de LLMs, y automatizaciones de negocio.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuáles son las tecnologías principales que utilizas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mi stack tecnológico incluye React, Next.js, TypeScript, JavaScript, Python, Node.js, OpenAI, LangChain, N8N, PostgreSQL, MongoDB, Docker, AWS y TailwindCSS.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo contactar a Jose Paul Campos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes contactarme a través del formulario de contacto en jpcampos.dev/contact, por email a josepaulcamposterrones@gmail.com, o a través de LinkedIn.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es un Desarrollador Fullstack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un Desarrollador Fullstack es un profesional que puede trabajar tanto en el frontend (interfaz de usuario) como en el backend (lógica del servidor y bases de datos). Jose Paul Campos tiene experiencia en ambas áreas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es un AI Engineer o Ingeniero de IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un AI Engineer o Ingeniero de IA desarrolla soluciones basadas en inteligencia artificial, incluyendo modelos de Machine Learning, chatbots con IA, sistemas de RAG y optimización de Large Language Models (LLMs).",
      },
    },
    {
      "@type": "Question",
      name: "¿En qué puedo ayudarte con automatización de negocio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedo automatizar procesos de negocio utilizando N8N, Make.com, Zapier y Flowise. Esto incluye flujos de trabajo automatizados, integración de APIs, chatbots automatizados y optimización de procesos empresariales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde está ubicado Jose Paul Campos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Soy desarrollador freelance y trabajo de forma remota para clientes en cualquier parte del mundo, con disponibilidad para proyectos internacionales. Estoy basado en Lima, Perú.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué diferencia hay entre Frontend y Backend Developer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El Frontend Developer se enfoca en la interfaz de usuario y experiencia visual (React, Next.js, HTML, CSS). El Backend Developer trabaja en el servidor, bases de datos y lógica de aplicación (Node.js, Python, APIs). Jose Paul trabaja como Fullstack en ambas áreas.",
      },
    },
  ],
}

// Service Schema - Servicios ofrecidos
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desarrollo Fullstack, AI y Automatización",
  provider: {
    "@id": `${SITE_URL}/#person`,
  },
  description:
    "Servicios de desarrollo web fullstack, IA, Machine Learning, chatbots con RAG, automatización de procesos de negocio, y optimización de LLMs.",
  areaServed: "Worldwide",
  availableLanguage: ["es", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Desarrollo Web Fullstack",
        description:
          "Desarrollo de aplicaciones web con React, Next.js, Node.js, TypeScript",
      },
      {
        "@type": "Offer",
        name: "Desarrollo Frontend",
        description:
          "Interfaces de usuario modernas con React, Next.js, TailwindCSS",
      },
      {
        "@type": "Offer",
        name: "Desarrollo Backend",
        description:
          "APIs y servicios con Node.js, Python, FastAPI, PostgreSQL, MongoDB",
      },
      {
        "@type": "Offer",
        name: "AI Engineer - Desarrollo de IA",
        description:
          "Desarrollo de soluciones con OpenAI, LangChain, RAG, chatbots inteligentes",
      },
      {
        "@type": "Offer",
        name: "Machine Learning",
        description: "Implementación de modelos de ML y análisis de datos",
      },
      {
        "@type": "Offer",
        name: "Automatización de Procesos",
        description:
          "Automatización empresarial con N8N, Make.com, Zapier, Flowise",
      },
      {
        "@type": "Offer",
        name: "Chatbot Development",
        description:
          "Creación de chatbots con RAG, LangChain y vector databases",
      },
      {
        "@type": "Offer",
        name: "LLM Optimization",
        description: "Optimización y fine-tuning de Large Language Models",
      },
    ],
  },
}

const structuredData = [
  personSchema,
  websiteSchema,
  profilePageSchema,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
]

// ══════════════════════════════════════════════════════════════
// Root Layout (Server Component)
// ══════════════════════════════════════════════════════════════
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" dir="ltr">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for APIs */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
