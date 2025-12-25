"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, TranslationKey, Language } from './translations'

interface I18nContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Detect browser language
const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'es'

    const browserLang = navigator.language || (navigator as any).userLanguage || 'es'
    const langCode = browserLang.split('-')[0].toLowerCase()

    return langCode === 'en' ? 'en' : 'es'
}

interface I18nProviderProps {
    children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('es')
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Check localStorage first, then browser language
        const stored = localStorage.getItem('portfolio-language') as Language | null
        if (stored && (stored === 'es' || stored === 'en')) {
            setLanguageState(stored)
        } else {
            const detected = detectBrowserLanguage()
            setLanguageState(detected)
            localStorage.setItem('portfolio-language', detected)
        }
        setIsInitialized(true)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('portfolio-language', lang)
    }

    const t = (key: TranslationKey): string => {
        const keys = key.split('.')
        let result: any = translations[language]

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k]
            } else {
                console.warn(`Translation not found for key: ${key}`)
                return key
            }
        }

        return typeof result === 'string' ? result : key
    }

    // Prevent hydration mismatch by not rendering until client is initialized
    if (!isInitialized) {
        return null
    }

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    )
}

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider')
    }
    return context
}

export const useLanguage = () => {
    const { language, setLanguage } = useI18n()
    return { language, setLanguage }
}

export const useTranslation = () => {
    const { t } = useI18n()
    return { t }
}
