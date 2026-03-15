"use client"

import React, {useEffect, useMemo, useState} from "react"

type TerminalPanelMode = "terminal" | "aki"

interface TerminalUiContextType {
  isOpen: boolean
  panelMode: TerminalPanelMode
  openTerminal: () => void
  openAki: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
}

const TerminalUiContext = React.createContext<TerminalUiContextType>(
  {} as TerminalUiContextType,
)

export const useTerminalUi = () => React.useContext(TerminalUiContext)

export const TerminalUiProvider = ({children}: {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [panelMode, setPanelMode] = useState<TerminalPanelMode>("terminal")

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      panelMode,
      openTerminal: () => {
        setPanelMode("terminal")
        setIsOpen(true)
      },
      openAki: () => {
        setPanelMode("aki")
        setIsOpen(true)
      },
      closeTerminal: () => setIsOpen(false),
      toggleTerminal: () => setIsOpen((current) => !current),
    }),
    [isOpen, panelMode],
  )

  return (
    <TerminalUiContext.Provider value={value}>
      {children}
    </TerminalUiContext.Provider>
  )
}
