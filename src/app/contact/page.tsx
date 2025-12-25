"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import { useThemeColors } from "../../utils/themeColors"
import { useI18n } from "../../utils/i18n"

export default function ContactPage() {
    const colors = useThemeColors()
    const { t } = useI18n()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("sending")

        setTimeout(() => {
            setStatus("sent")
            setFormData({ name: "", email: "", subject: "", message: "" })
        }, 1000)
    }

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/Akicoders", icon: "🐙" },
        { name: "LinkedIn", url: "https://linkedin.com/in/paulct-dev", icon: "💼" },
        { name: "Instagram", url: "https://instagram.com/paul04_ct", icon: "📸" },
        { name: "Email", url: "mailto:josepaulcamposterrones@gmail.com", icon: "📧" },
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
                                {t('contact.title')}
                            </h1>
                            <p style={{ color: colors.muted }}>{t('contact.subtitle')}</p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-3 p-6 border rounded"
                                style={{ borderColor: colors.border, background: colors.cardBg }}
                            >
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.fg }}>
                                    <span style={{ color: colors.muted }}>01.</span> {t('contact.formTitle')}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm mb-2" style={{ color: colors.muted }}>{t('contact.name')}</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full rounded px-4 py-3 focus:outline-none transition-all"
                                                style={{
                                                    background: colors.inputBg,
                                                    border: `1px solid ${colors.border}`,
                                                    color: colors.fg
                                                }}
                                                placeholder={t('contact.namePlaceholder')}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm mb-2" style={{ color: colors.muted }}>{t('contact.email')}</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full rounded px-4 py-3 focus:outline-none transition-all"
                                                style={{
                                                    background: colors.inputBg,
                                                    border: `1px solid ${colors.border}`,
                                                    color: colors.fg
                                                }}
                                                placeholder={t('contact.emailPlaceholder')}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-2" style={{ color: colors.muted }}>{t('contact.subject')}</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full rounded px-4 py-3 focus:outline-none transition-all"
                                            style={{
                                                background: colors.inputBg,
                                                border: `1px solid ${colors.border}`,
                                                color: colors.fg
                                            }}
                                            placeholder={t('contact.subjectPlaceholder')}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-2" style={{ color: colors.muted }}>{t('contact.message')}</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="w-full rounded px-4 py-3 focus:outline-none resize-none transition-all"
                                            style={{
                                                background: colors.inputBg,
                                                border: `1px solid ${colors.border}`,
                                                color: colors.fg
                                            }}
                                            placeholder={t('contact.messagePlaceholder')}
                                            required
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 border-2 font-bold transition-all disabled:opacity-50"
                                        style={{
                                            borderColor: colors.accent,
                                            color: colors.fg,
                                            background: "transparent"
                                        }}
                                    >
                                        {status === "sending" ? t('contact.sending') : status === "sent" ? t('contact.sent') : t('contact.sendButton')}
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* Right Column */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-2 space-y-6"
                            >
                                {/* Social Links */}
                                <div
                                    className="p-6 border rounded"
                                    style={{ borderColor: colors.border, background: colors.cardBg }}
                                >
                                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.fg }}>
                                        <span style={{ color: colors.muted }}>02.</span> {t('contact.socialTitle')}
                                    </h2>

                                    <div className="space-y-2">
                                        {socialLinks.map((link, index) => (
                                            <motion.a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ x: 5, borderColor: colors.accent }}
                                                className="flex items-center gap-3 p-3 border rounded transition-all"
                                                style={{ borderColor: colors.border, background: colors.bgSecondary }}
                                            >
                                                <span className="text-xl">{link.icon}</span>
                                                <span style={{ color: colors.fg }}>{link.name}</span>
                                                <span className="ml-auto" style={{ color: colors.borderSubtle }}>→</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* Terminal CTA */}
                                <motion.div
                                    whileHover={{ borderColor: colors.accent }}
                                    className="p-6 border rounded transition-all"
                                    style={{ borderColor: colors.border, background: colors.cardBg }}
                                >
                                    <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.fg }}>
                                        {t('contact.chatTitle')}
                                    </h2>
                                    <p className="text-sm mb-4" style={{ color: colors.muted }}>
                                        {t('contact.chatDesc')}
                                    </p>
                                    <motion.a
                                        href="/"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block px-4 py-2 border font-bold transition-all"
                                        style={{
                                            borderColor: colors.accent,
                                            color: colors.fg,
                                            background: "transparent"
                                        }}
                                    >
                                        {t('contact.goToTerminal')}
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
