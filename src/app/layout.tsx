import type {Metadata, Viewport} from "next"
import {JetBrains_Mono, Oswald} from "next/font/google"
import ClientProviders from "../components/ClientProviders"
import "../styles/global.css"

const siteUrl = "https://akicoders.site"
const siteName = "JP Campos Portfolio"
const siteDescription =
  "Portfolio de JP Campos, Full-Stack & AI Engineer especializado en software, automatizacion empresarial, agentes y soluciones con IA."

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
  applicationName: siteName,
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
  },
  twitter: {
    card: "summary",
    title: "JP Campos | Full-Stack & AI Engineer",
    description: siteDescription,
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
      "React",
      "TypeScript",
      "Python",
      "n8n",
      "LLM Engineering",
    ],
  }

  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
