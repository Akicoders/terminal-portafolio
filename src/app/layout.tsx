"use client"

import React from "react"
import { usePathname } from "next/navigation"
import "../styles/global.css"
import { ShellProvider } from "../utils/shellProvider"
import { ThemeProvider } from "../utils/themeProvider"
import { I18nProvider } from "../utils/i18n"
import { AppearanceProvider } from "../utils/appearanceProvider"
import { ConfirmProvider } from "../components/context/ConfirmContext"
import { SpeedInsights } from "@vercel/speed-insights/next"
import MatrixRain from "../components/MatrixRain"
import Head from "next/head"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with your GA ID

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const metadata = {
    "/": {
      title: "JP Campos | Fullstack Developer & AI Specialist",
      description:
        "Jose Paul Campos Terrones - Fullstack Developer especializado en IA, Machine Learning y Automatización de Procesos. Transformando negocios con tecnología innovadora.",
    },
    "/me": {
      title: "JP Campos | Sobre Mí",
      description:
        "Conoce a Jose Paul Campos Terrones: Desarrollador Fullstack con experiencia en IA, ML y automatización. Optimización de LLMs, arquitecturas de agentes IA y más.",
    },
    "/skills": {
      title: "JP Campos | Skills & Tecnologías",
      description:
        "Stack tecnológico: React, Next.js, Python, Node.js, OpenAI, LangChain, N8N, y más. Especialista en soluciones de IA y automatización.",
    },
    "/projects": {
      title: "JP Campos | Proyectos",
      description:
        "Proyectos destacados en desarrollo web, inteligencia artificial, chatbots con RAG, y automatización empresarial.",
    },
    "/contact": {
      title: "JP Campos | Contacto",
      description:
        "¿Tienes un proyecto en mente? Contáctame para hablar sobre cómo puedo ayudarte con desarrollo, IA o automatización.",
    },
  };

  const currentMetadata = metadata[pathname] || metadata["/"];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jose Paul Campos Terrones",
    alternateName: "JP Campos",
    url: "https://jpcampos.dev", // TODO: Update with your domain
    description: "Fullstack Developer especializado en IA, Machine Learning y Automatización de Procesos.",
    jobTitle: "Fullstack Developer & AI Specialist",
    email: "josepaulcamposterrones@gmail.com",
    sameAs: [
      "https://github.com/Akicoders",
      "https://linkedin.com/in/paulct-dev",
      "https://instagram.com/paul04_ct",
    ],
    knowsAbout: [
      "React", "Next.js", "TypeScript", "Python", "Node.js",
      "Machine Learning", "Artificial Intelligence", "LLMs",
      "OpenAI", "LangChain", "RAG", "N8N", "Automation"
    ],
  };

  const Global = ({ children }: { children: React.ReactNode }) => (
    <div className="relative z-0 flex h-full w-full overflow-hidden overflow-y-scroll">
      {children}
    </div>
  );

  return (
    <html lang="es">
      <Head>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="JP Campos Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />

        <meta name="keywords" content="Fullstack Developer, AI Specialist, Machine Learning, Automation, React, Next.js, Python, Node.js, OpenAI, LangChain, JP Campos, Jose Paul Campos Terrones" />
        <meta name="author" content="Jose Paul Campos Terrones" />
        <meta name="theme-color" content="#00B4D8" />

      </Head>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="afterInteractive"
      />

      <body suppressHydrationWarning={true} className="scanlines">
        <MatrixRain enabled={true} density={15} speed={0.8} />
        <Global>
          <AppearanceProvider>
            <I18nProvider>
              <ThemeProvider>
                <ShellProvider>
                  <ConfirmProvider>{children}</ConfirmProvider>
                </ShellProvider>
              </ThemeProvider>
            </I18nProvider>
          </AppearanceProvider>
        </Global>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
