import type {Metadata, Viewport} from "next"
import {JetBrains_Mono, Oswald} from "next/font/google"
import ClientProviders from "../components/ClientProviders"
import "../styles/global.css"

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
})

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "JP Campos | Hybrid Terminal Portfolio",
  description:
    "Portfolio ejecutivo de Jose Paul Campos Terrones con navegacion web clara, terminal interactiva y contenido bilingue.",
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
  return (
    <html lang="es">
      <body className={`${displayFont.variable} ${monoFont.variable}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
