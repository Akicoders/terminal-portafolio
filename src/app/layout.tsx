import type {Metadata, Viewport} from "next"
import {JetBrains_Mono, Oswald} from "next/font/google"
import ClientProviders from "../components/ClientProviders"
import "../styles/global.css"

const siteUrl = "https://akicoders.site"
const siteName = "JP Campos Portfolio"
const siteDescription =
  "Portafolio profesional de Jose Paul Campos Terrones, Full-Stack & AI Engineer especializado en desarrollo de software, automatizacion empresarial, entrenamiento de IA y soluciones con agentes."

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
})

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JP Campos | Full-Stack & AI Engineer",
    template: "%s | JP Campos",
  },
  description: siteDescription,
  keywords: [
    "Jose Paul Campos Terrones",
    "Paul Campos Terrones",
    "JP Campos",
    "Full-Stack & AI Engineer",
    "desarrollo de software",
    "automatizacion empresarial",
    "entrenamiento de IA",
    "adaptacion de IA",
    "n8n automation",
    "AI engineer Peru",
  ],
  applicationName: siteName,
  authors: [{name: "Jose Paul Campos Terrones", url: siteUrl}],
  creator: "Jose Paul Campos Terrones",
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "JP Campos | Full-Stack & AI Engineer",
    description: siteDescription,
    siteName,
    locale: "es_PE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JP Campos portfolio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "JP Campos | Full-Stack & AI Engineer",
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1020",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jose Paul Campos Terrones",
    alternateName: "JP Campos",
    additionalName: "Paul Campos Terrones",
    url: siteUrl,
    jobTitle: "Full-Stack & AI Engineer",
    email: "mailto:josepaulcamposterrones@gmail.com",
    sameAs: [
      "https://github.com/Akicoders",
      "https://linkedin.com/in/paulct-dev",
      "https://instagram.com/paul04_ct",
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Automation",
      "AI Training",
      "React",
      "TypeScript",
      "Python",
      "n8n",
      "LLM Engineering",
    ],
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    provider: {
      "@type": "Person",
      name: "Jose Paul Campos Terrones",
    },
    areaServed: "Remote",
    serviceType: [
      "Software Development",
      "Business Automation",
      "AI Training",
      "AI Adaptation",
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
  }

  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd)}}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
