"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type AppearanceMode = 'dark' | 'light'

interface AppearanceContextType {
    mode: AppearanceMode
    setMode: (mode: AppearanceMode) => void
    toggleMode: () => void
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

interface AppearanceProviderProps {
    children: ReactNode
}

export const AppearanceProvider: React.FC<AppearanceProviderProps> = ({ children }) => {
    const [mode, setModeState] = useState<AppearanceMode>('dark')
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Check localStorage first
        const stored = localStorage.getItem('portfolio-appearance') as AppearanceMode | null
        if (stored && (stored === 'dark' || stored === 'light')) {
            setModeState(stored)
            document.documentElement.setAttribute('data-theme', stored)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const detected = prefersDark ? 'dark' : 'light'
            setModeState(detected)
            document.documentElement.setAttribute('data-theme', detected)
        }
        setIsInitialized(true)
    }, [])

    const setMode = (newMode: AppearanceMode) => {
        setModeState(newMode)
        localStorage.setItem('portfolio-appearance', newMode)
        document.documentElement.setAttribute('data-theme', newMode)
    }

    const toggleMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark'
        setMode(newMode)
    }

    if (!isInitialized) {
        return null // Prevent hydration mismatch
    }

    return (
        <AppearanceContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </AppearanceContext.Provider>
    )
}

export const useAppearance = (): AppearanceContextType => {
    const context = useContext(AppearanceContext)
    if (!context) {
        throw new Error('useAppearance must be used within an AppearanceProvider')
    }
    return context
}
