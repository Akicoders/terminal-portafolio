"use client"
import React, {useCallback, useEffect, useMemo, useState} from "react"
import Themes from "../../themes.json"
import {Theme} from "../interfaces/theme"
import config from "../../config.json"

export interface ThemeContextType {
  setTheme: (name: string) => string
  theme: Theme
}

const ThemeContext = React.createContext<ThemeContextType>(
  {} as ThemeContextType,
)

interface Props {
  children: React.ReactNode
}

export const useTheme = () => React.useContext(ThemeContext)

export const ThemeProvider: React.FC<Props> = ({children}) => {
  const [theme, _setTheme] = useState<Theme>(Themes[0])

  useEffect(() => {
    localStorage.setItem("visitedAt", new Date().toString())
  }, [])

  const setTheme = useCallback((name: string) => {
    const index = Themes.findIndex(
      (colorScheme) => colorScheme.name.toLowerCase() === name.toLowerCase(),
    )

    if (index === -1) {
      return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`
    }

    _setTheme(Themes[index])

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", Themes[index].name.toLowerCase())
    }

    return `Theme ${Themes[index].name} set successfully!`
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    setTheme(savedTheme || config.theme)
  }, [setTheme])

  const value = useMemo(() => ({theme, setTheme}), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
