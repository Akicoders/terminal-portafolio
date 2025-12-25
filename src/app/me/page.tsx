"use client"
import React from "react"
import { motion } from "framer-motion"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import { useThemeColors } from "../../utils/themeColors"
import { useI18n } from "../../utils/i18n"

export default function MePage() {
  const colors = useThemeColors()
  const { t, language } = useI18n()

  const timeline = language === 'es' ? [
    {
      year: "Presente",
      title: "Fullstack Developer & AI Specialist",
      description: "Desarrollando soluciones innovadoras con IA, automatización y tecnologías modernas.",
    },
    {
      year: "2023",
      title: "Especialización en IA",
      description: "Optimización de LLMs, arquitecturas RAG y desarrollo de chatbots empresariales.",
    },
    {
      year: "2022",
      title: "Automatización Empresarial",
      description: "Implementación de flujos de trabajo automatizados con N8N y Flowise.",
    },
  ] : [
    {
      year: "Present",
      title: "Fullstack Developer & AI Specialist",
      description: "Developing innovative solutions with AI, automation, and modern technologies.",
    },
    {
      year: "2023",
      title: "AI Specialization",
      description: "LLM optimization, RAG architectures, and enterprise chatbot development.",
    },
    {
      year: "2022",
      title: "Business Automation",
      description: "Implementation of automated workflows with N8N and Flowise.",
    },
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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full border-2 flex items-center justify-center text-4xl"
                style={{ borderColor: colors.accent }}
              >
                👨‍💻
              </motion.div>

              <h1
                className="text-4xl font-bold mb-2"
                style={{ color: colors.fg, fontFamily: "Technor-Variable" }}
              >
                {t('me.title')}
              </h1>
              <p style={{ color: colors.muted }}>{t('me.subtitle')}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.borderLight, color: colors.fg }}>
                  {t('me.tagFullstack')}
                </span>
                <span className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.borderLight, color: colors.fg }}>
                  {t('me.tagAI')}
                </span>
                <span className="px-3 py-1 text-sm border rounded" style={{ borderColor: colors.borderLight, color: colors.fg }}>
                  {t('me.tagAutomation')}
                </span>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-16 p-6 border-l-2"
              style={{ borderColor: colors.accent, background: colors.cardBg }}
            >
              <p className="text-lg italic" style={{ color: colors.fg }}>
                {t('me.quote')}
              </p>
              <p className="mt-3 text-sm" style={{ color: colors.muted }}>{t('me.quoteAuthor')}</p>
            </motion.div>

            {/* About */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: colors.fg }}>
                <span style={{ color: colors.muted }}>01.</span> {t('me.aboutTitle')}
              </h2>
              <div className="space-y-4" style={{ color: colors.muted }}>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {t('me.aboutP1')}
                  <span style={{ color: colors.fg }}> {t('me.aboutAI')}</span>,
                  {language === 'es' ? ' el ' : ' '}<span style={{ color: colors.fg }}>{t('me.aboutML')}</span>{language === 'es' ? ' y la' : ' and'}
                  <span style={{ color: colors.fg }}> {t('me.aboutAutomation')}</span>.
                  {' '}{t('me.aboutP1End')}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {t('me.aboutP2')}
                </motion.p>
              </div>
            </motion.section>

            {/* Achievements */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: colors.fg }}>
                <span style={{ color: colors.muted }}>02.</span> {t('me.achievementsTitle')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(language === 'es' ? [
                  { icon: "🧠", title: "Optimización LLM", desc: "30GB → 14GB VRAM" },
                  { icon: "🤖", title: "Agentes IA", desc: "Arquitecturas custom" },
                  { icon: "⚡", title: "Automatización", desc: "N8N y Flowise" },
                  { icon: "💬", title: "Chatbots RAG", desc: "Bases vectoriales" },
                ] : [
                  { icon: "🧠", title: "LLM Optimization", desc: "30GB → 14GB VRAM" },
                  { icon: "🤖", title: "AI Agents", desc: "Custom architectures" },
                  { icon: "⚡", title: "Automation", desc: "N8N & Flowise" },
                  { icon: "💬", title: "RAG Chatbots", desc: "Vector databases" },
                ]).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, borderColor: colors.accent }}
                    className="p-4 border rounded cursor-pointer transition-all"
                    style={{ borderColor: colors.border, background: colors.cardBg }}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="font-bold" style={{ color: colors.fg }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: colors.muted }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Timeline */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: colors.fg }}>
                <span style={{ color: colors.muted }}>03.</span> {t('me.timelineTitle')}
              </h2>
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-20">
                      <span
                        className="text-sm font-mono"
                        style={{ color: colors.muted }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-grow pl-4 pb-6 relative" style={{ borderLeft: `1px solid ${colors.border}` }}>
                      <div
                        className="absolute -left-1 top-1 w-2 h-2 rounded-full"
                        style={{ background: colors.accent }}
                      />
                      <h3 className="font-bold" style={{ color: colors.fg }}>{item.title}</h3>
                      <p className="text-sm mt-1" style={{ color: colors.muted }}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pb-8"
            >
              <p className="mb-4" style={{ color: colors.muted }}>{t('me.ctaQuestion')}</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 border-2 font-bold transition-all"
                style={{
                  borderColor: colors.accent,
                  color: colors.fg,
                  background: "transparent"
                }}
              >
                {t('me.ctaButton')}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  )
}
