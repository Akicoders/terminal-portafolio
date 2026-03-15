"use client"

import React, {useEffect} from "react"
import config from "../../config.json"
import {sectionIds} from "../content/portfolio"
import {History} from "../interfaces/history"
import * as bin from "./bin"
import {usePortfolio} from "./portfolioProvider"
import {useTerminalUi} from "./terminalUiProvider"
import {useTheme} from "./themeProvider"

interface ShellContextType {
  history: History[]
  setCommand: (command: string) => void
  clearHistory: () => void
}

const ShellContext = React.createContext<ShellContextType>({
  history: [],
  setCommand: () => undefined,
  clearHistory: () => undefined,
})

interface ShellProviderProps {
  children: React.ReactNode
}

export const useShell = () => React.useContext(ShellContext)

export const ShellProvider: React.FC<ShellProviderProps> = ({children}) => {
  const [history, setHistoryState] = React.useState<History[]>([])
  const {setTheme} = useTheme()
  const {setSection} = usePortfolio()
  const {openAki} = useTerminalUi()
  const hasInitializedRef = React.useRef(false)

  const appendHistory = React.useCallback((command: string, output: string) => {
    setHistoryState((previous) => [
      ...previous,
      {
        id: previous.length,
        date: new Date(),
        command,
        output,
      },
    ])
  }, [])

  const clearHistory = React.useCallback(() => {
    setHistoryState([])
  }, [])

  const execute = React.useCallback(
    async (rawCommand: string) => {
      const trimmed = rawCommand.trim()

      if (!trimmed) {
        return
      }

      const [cmdRaw, ...args] = trimmed.split(/\s+/)
      const cmd = cmdRaw.toLowerCase()

      if (cmd === "clear") {
        clearHistory()
        return
      }

      try {
        if (cmd === "theme") {
          const output = await bin.theme(args, setTheme)
          appendHistory(trimmed, output)
          return
        }

        if (cmd === "aki") {
          openAki()
        }

        if (sectionIds.includes(cmd as (typeof sectionIds)[number])) {
          setSection(cmd as (typeof sectionIds)[number])
        }

        const handler = bin[cmd as keyof typeof bin]
        const isCallable = typeof handler === "function"

        if (!isCallable) {
          appendHistory(trimmed, `Command not found: ${cmd}. Try 'help'.`)
          return
        }

        const commandHandler = handler as (
          commandArgs: string[],
        ) => string | Promise<string>
        const output = await commandHandler(args)
        appendHistory(trimmed, output)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unexpected terminal error"
        appendHistory(trimmed, message)
      }
    },
    [appendHistory, clearHistory, openAki, setSection, setTheme],
  )

  const setCommand = React.useCallback(
    (command: string) => {
      void execute(command)
    },
    [execute],
  )

  useEffect(() => {
    if (hasInitializedRef.current) {
      return
    }

    hasInitializedRef.current = true
    const preferredTheme =
      typeof window === "undefined"
        ? config.theme
        : localStorage.getItem("theme") || config.theme

    setTheme(preferredTheme)
    appendHistory("", bin.banner())
  }, [appendHistory, setTheme])

  return (
    <ShellContext.Provider
      value={{
        history,
        setCommand,
        clearHistory,
      }}
    >
      {children}
    </ShellContext.Provider>
  )
}
