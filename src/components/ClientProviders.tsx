"use client"

import React from "react"
import {AkiAssistantProvider} from "../utils/akiAssistantProvider"
import {ShellProvider} from "../utils/shellProvider"
import {PortfolioProvider} from "../utils/portfolioProvider"
import {TerminalUiProvider} from "../utils/terminalUiProvider"
import {ThemeProvider} from "../utils/themeProvider"

const ClientProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <TerminalUiProvider>
          <AkiAssistantProvider>
            <ShellProvider>{children}</ShellProvider>
          </AkiAssistantProvider>
        </TerminalUiProvider>
      </PortfolioProvider>
    </ThemeProvider>
  )
}

export default ClientProviders
