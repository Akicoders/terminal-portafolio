"use client"
import React from "react"
import { motion } from "framer-motion"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import { useThemeColors } from "../../utils/themeColors"
import { useI18n } from "../../utils/i18n"

const skills = {
    frontend: [
        { name: "React", level: 90, icon: "⚛️" },
        { name: "Next.js", level: 85, icon: "▲" },
        { name: "TypeScript", level: 85, icon: "📘" },
        { name: "Astro", level: 80, icon: "🚀" },
        { name: "TailwindCSS", level: 90, icon: "🎨" },
    ],
    backend: [
        { name: "Python", level: 90, icon: "🐍" },
        { name: "Node.js", level: 85, icon: "💚" },
        { name: "FastAPI", level: 80, icon: "⚡" },
        { name: "PostgreSQL", level: 75, icon: "🐘" },
        { name: "MongoDB", level: 75, icon: "🍃" },
    ],
    ai: [
        { name: "OpenAI/GPT", level: 90, icon: "🤖" },
        { name: "LangChain", level: 85, icon: "🔗" },
        { name: "RAG Systems", level: 85, icon: "📚" },
        { name: "LLM Optimization", level: 80, icon: "🧠" },
        { name: "Flowise", level: 85, icon: "🌊" },
    ],
    automation: [
        { name: "N8N", level: 90, icon: "🔄" },
        { name: "Make/Zapier", level: 80, icon: "⚙️" },
        { name: "Docker", level: 75, icon: "🐳" },
        { name: "AWS", level: 70, icon: "☁️" },
        { name: "Git/GitHub", level: 90, icon: "🐙" },
    ],
}

export default function SkillsPage() {
    const colors = useThemeColors()
    const { t, language } = useI18n()

    const categories = [
        { key: "frontend", title: t('skills.frontend'), num: "01" },
        { key: "backend", title: t('skills.backend'), num: "02" },
        { key: "ai", title: t('skills.ai'), num: "03" },
        { key: "automation", title: t('skills.automation'), num: "04" },
    ]

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
                    <div className="max-w-4xl mx-auto px-8 py-12">
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
                                {t('skills.title')}
                            </h1>
                            <p style={{ color: colors.muted }}>{t('skills.subtitle')}</p>
                        </motion.div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {categories.map((category, catIndex) => (
                                <motion.div
                                    key={category.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: catIndex * 0.1 }}
                                    className="p-6 border rounded"
                                    style={{ borderColor: colors.border, background: colors.cardBg }}
                                >
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.fg }}>
                                        <span style={{ color: colors.muted }}>{category.num}.</span> {category.title}
                                    </h2>

                                    <div className="space-y-4">
                                        {skills[category.key].map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <div className="flex justify-between mb-1 items-center">
                                                    <span className="flex items-center gap-2 text-sm" style={{ color: colors.fg }}>
                                                        <span>{skill.icon}</span>
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-xs font-mono" style={{ color: colors.muted }}>
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div
                                                    className="w-full h-2 rounded overflow-hidden"
                                                    style={{ background: colors.progressBg }}
                                                >
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                                                        className="h-full rounded"
                                                        style={{ background: colors.progressFill }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.fg }}>
                                {t('skills.impactTitle')}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {(language === 'es' ? [
                                    { value: "30→14GB", label: "LLM Optimizado", icon: "🧠" },
                                    { value: "52%", label: "↑ Eficiencia", icon: "📈" },
                                    { value: "24/7", label: "IA Disponible", icon: "🤖" },
                                    { value: "30%", label: "↓ Costos", icon: "💰" },
                                ] : [
                                    { value: "30→14GB", label: "Optimized LLM", icon: "🧠" },
                                    { value: "52%", label: "↑ Efficiency", icon: "📈" },
                                    { value: "24/7", label: "AI Available", icon: "🤖" },
                                    { value: "30%", label: "↓ Costs", icon: "💰" },
                                ]).map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, borderColor: colors.accent }}
                                        className="p-4 border rounded text-center cursor-pointer transition-all"
                                        style={{ borderColor: colors.border, background: colors.cardBg }}
                                    >
                                        <div className="text-2xl mb-2">{stat.icon}</div>
                                        <div className="text-xl font-bold font-mono" style={{ color: colors.fg }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs" style={{ color: colors.muted }}>{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
