"use client"

import React from "react"
import {ShellProvider} from "../utils/shellProvider"
import {ThemeProvider} from "../utils/themeProvider"
import {I18nProvider} from "../utils/i18n"
import {AppearanceProvider} from "../utils/appearanceProvider"
import {ConfirmProvider} from "./context/ConfirmContext"
import {SpeedInsights} from "@vercel/speed-insights/next"

const ClientProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <div className="relative z-0 flex h-full w-full overflow-hidden overflow-y-scroll">
        <AppearanceProvider>
          <I18nProvider>
            <ThemeProvider>
              <ShellProvider>
                <ConfirmProvider>{children}</ConfirmProvider>
              </ShellProvider>
            </ThemeProvider>
          </I18nProvider>
        </AppearanceProvider>
      </div>
      <SpeedInsights />
    </>
  )
}

export default ClientProviders
