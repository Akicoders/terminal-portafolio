"use client"
import { useAppearance } from './appearanceProvider'

export const useThemeColors = () => {
    const { mode } = useAppearance()

    return {
        bg: mode === 'light' ? '#f5f5f5' : '#0a0a0a',
        bgSecondary: mode === 'light' ? '#ffffff' : '#1a1a1a',
        fg: mode === 'light' ? '#1a1a1a' : '#ECECF1',
        muted: mode === 'light' ? '#666666' : '#888',
        border: mode === 'light' ? '#e0e0e0' : '#333',
        borderLight: mode === 'light' ? '#cccccc' : '#444',
        borderSubtle: mode === 'light' ? '#555555' : '#555',
        accent: mode === 'light' ? '#0077B6' : '#ECECF1',
        scrollbar: mode === 'light' ? '#ccc #f5f5f5' : '#333 #0a0a0a',
        cardBg: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        inputBg: mode === 'light' ? '#ffffff' : '#1a1a1a',
        // Progress bar colors
        progressBg: mode === 'light' ? '#d0d0d0' : '#333',
        progressFill: mode === 'light' ? '#0077B6' : '#ECECF1',
    }
}
