"use client"
import React from "react"
import { motion } from "framer-motion"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import { useThemeColors } from "../../utils/themeColors"
import { useI18n } from "../../utils/i18n"

const projectsES = [
    {
        title: "Sistema de Chat con RAG",
        description: "Chatbot empresarial con Retrieval Augmented Generation. Integrado con bases de datos vectoriales para respuestas contextuales.",
        tech: ["Python", "LangChain", "OpenAI", "Pinecone"],
        category: "AI/ML",
        icon: "💬",
    },
    {
        title: "Optimización de LLM",
        description: "Reducción de VRAM de 30GB a 14GB. Técnicas de quantización y optimización de memoria.",
        tech: ["Python", "PyTorch", "CUDA", "Transformers"],
        category: "AI/ML",
        icon: "🧠",
    },
    {
        title: "Automatización N8N",
        description: "Flujos de trabajo automatizados para empresas. Integración de APIs y CRMs.",
        tech: ["N8N", "APIs REST", "Webhooks"],
        category: "Automation",
        icon: "⚡",
    },
    {
        title: "Portfolio Terminal",
        description: "Este mismo sitio web. Portfolio interactivo con chat IA integrado.",
        tech: ["Next.js", "TypeScript", "TailwindCSS"],
        category: "Web",
        icon: "💻",
    },
    {
        title: "Agente IA Multimodal",
        description: "Arquitectura de agentes IA con procesamiento de texto e imágenes.",
        tech: ["LangChain", "OpenAI", "Flowise"],
        category: "AI/ML",
        icon: "🤖",
    },
    {
        title: "Dashboard Analytics",
        description: "Panel con métricas en tiempo real y visualizaciones interactivas.",
        tech: ["React", "D3.js", "Node.js"],
        category: "Web",
        icon: "📊",
    },
]

const projectsEN = [
    {
        title: "RAG Chat System",
        description: "Enterprise chatbot with Retrieval Augmented Generation. Integrated with vector databases for contextual responses.",
        tech: ["Python", "LangChain", "OpenAI", "Pinecone"],
        category: "AI/ML",
        icon: "💬",
    },
    {
        title: "LLM Optimization",
        description: "VRAM reduction from 30GB to 14GB. Quantization and memory optimization techniques.",
        tech: ["Python", "PyTorch", "CUDA", "Transformers"],
        category: "AI/ML",
        icon: "🧠",
    },
    {
        title: "N8N Automation",
        description: "Automated workflows for businesses. API and CRM integration.",
        tech: ["N8N", "APIs REST", "Webhooks"],
        category: "Automation",
        icon: "⚡",
    },
    {
        title: "Portfolio Terminal",
        description: "This website itself. Interactive portfolio with integrated AI chat.",
        tech: ["Next.js", "TypeScript", "TailwindCSS"],
        category: "Web",
        icon: "💻",
    },
    {
        title: "Multimodal AI Agent",
        description: "AI agent architecture with text and image processing capabilities.",
        tech: ["LangChain", "OpenAI", "Flowise"],
        category: "AI/ML",
        icon: "🤖",
    },
    {
        title: "Analytics Dashboard",
        description: "Dashboard with real-time metrics and interactive visualizations.",
        tech: ["React", "D3.js", "Node.js"],
        category: "Web",
        icon: "📊",
    },
]

export default function ProjectsPage() {
    const colors = useThemeColors()
    const { t, language } = useI18n()
    const projects = language === 'es' ? projectsES : projectsEN

    return (
        <>
            <Sidebar />
            <Layout>
                <div
                    className="h-full w-full overflow-y-auto overflow-x-hidden"
                    style={{
                        background: colors.bg,
                        scrollbarWidth: "thin",
                        scrollbarColor: colors.scrollbar
                    }}
                >
                    <div className="max-w-5xl mx-auto px-8 py-12">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center mb-16"
                        >
                            <h1
                                className="text-4xl font-bold mb-3"
                                style={{ color: colors.fg, fontFamily: "Technor-Variable" }}
                            >
                                {t('projects.title')}
                            </h1>
                            <p style={{ color: colors.muted }}>{t('projects.subtitle')}</p>
                        </motion.div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, borderColor: colors.accent }}
                                    className="p-6 border rounded cursor-pointer transition-all group"
                                    style={{ borderColor: colors.border, background: colors.cardBg }}
                                >
                                    {/* Category & Icon */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span
                                            className="text-xs px-2 py-1 border rounded"
                                            style={{ borderColor: colors.borderSubtle, color: colors.muted }}
                                        >
                                            {project.category}
                                        </span>
                                        <motion.span
                                            className="text-3xl"
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                        >
                                            {project.icon}
                                        </motion.span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-lg font-bold mb-2 group-hover:underline"
                                        style={{ color: colors.fg }}
                                    >
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm mb-4" style={{ color: colors.muted }}>
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="text-xs px-2 py-1 rounded font-mono"
                                                style={{ background: colors.bgSecondary, color: colors.fg }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* GitHub CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center pb-8"
                        >
                            <p className="mb-4" style={{ color: colors.muted }}>{t('projects.ctaQuestion')}</p>
                            <motion.a
                                href="https://github.com/Akicoders"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-8 py-3 border-2 font-bold transition-all"
                                style={{
                                    borderColor: colors.accent,
                                    color: colors.fg,
                                    background: "transparent"
                                }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                {t('projects.ctaButton')}
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
