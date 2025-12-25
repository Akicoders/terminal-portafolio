"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "../../utils/themeProvider"
import { useAppearance } from "../../utils/appearanceProvider"

export const Ps1 = () => {
  const [hostname, setHostname] = useState("")
  const { theme } = useTheme()
  const { mode } = useAppearance()

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.hostname)
    }
  }, [])

  // Light mode uses darker, more visible colors
  const colors = mode === 'light'
    ? { yellow: '#b58900', white: '#586e75', green: '#2aa198' }
    : { yellow: theme.yellow, white: theme.white, green: theme.green }

  return (
    <div className="inline mr-2 log">
      <span style={{ color: colors.green }}>
        {hostname}
      </span>
      <span style={{ color: colors.green }}>
        @
      </span>
      <span style={{ color: colors.green }}>
        mystery-visitor
      </span>
      <span style={{ color: colors.green }}>
        :$ ~
      </span>
    </div>
  )
}

export default Ps1
