"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react"
import {
  getStoredLocale,
  getStoredMode,
  sectionIds,
  type Locale,
  type Mode,
  type SectionId,
} from "../content/portfolio"

interface PortfolioContextType {
  locale: Locale
  mode: Mode
  section: SectionId
  setLocale: (value: Locale) => void
  setMode: (value: Mode) => void
  setSection: (value: SectionId) => void
}

const PortfolioContext = React.createContext<PortfolioContextType>(
  {} as PortfolioContextType,
)

export const usePortfolio = () => React.useContext(PortfolioContext)

const isSectionId = (value: string | null): value is SectionId =>
  value !== null && sectionIds.includes(value as SectionId)

export const PortfolioProvider = ({children}: {children: React.ReactNode}) => {
  const [locale, setLocaleState] = useState<Locale>("es")
  const [mode, setModeState] = useState<Mode>("dark")
  const [section, setSectionState] = useState<SectionId>("about")

  const getHashSection = useCallback(() => {
    if (typeof window === "undefined") {
      return null
    }

    const hashSection = window.location.hash.replace("#", "")
    return isSectionId(hashSection) ? hashSection : null
  }, [])

  useEffect(() => {
    setLocaleState(getStoredLocale())
    setModeState(getStoredMode())

    if (typeof window !== "undefined") {
      const hashSection = getHashSection()
      const storedSection = localStorage.getItem("portfolio-section")

      if (hashSection) {
        setSectionState(hashSection)
      } else if (isSectionId(storedSection)) {
        setSectionState(storedSection)
      }
    }
  }, [getHashSection])

  const setLocale = (value: Locale) => {
    setLocaleState(value)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", value)
    }
  }

  const setMode = (value: Mode) => {
    setModeState(value)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-mode", value)
    }
  }

  const setSection = (value: SectionId) => {
    setSectionState(value)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    localStorage.setItem("portfolio-section", section)

    const nextHash = `#${section}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash)
    }
  }, [section])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handleHashChange = () => {
      const hashSection = getHashSection()
      if (hashSection) {
        setSectionState(hashSection)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target?.isContentEditable

      if (isTypingTarget || event.altKey || event.ctrlKey || event.metaKey) {
        return
      }

      const numericKey = Number.parseInt(event.key, 10)

      if (
        Number.isNaN(numericKey) ||
        numericKey < 1 ||
        numericKey > sectionIds.length
      ) {
        return
      }

      event.preventDefault()
      setSectionState(sectionIds[numericKey - 1])
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [getHashSection])

  const value = useMemo(
    () => ({locale, mode, section, setLocale, setMode, setSection}),
    [locale, mode, section],
  )

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}
