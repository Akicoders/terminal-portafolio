"use client"
import React, {useEffect, useState} from "react"
import {useTheme} from "../../utils/themeProvider"

export const Ps1 = () => {
  const [hostname, setHostname] = useState("")
  const {theme} = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname)
    }
  }, [])

  const displayHost =
    hostname === "localhost" || hostname === "127.0.0.1" || !hostname
      ? "akicoders.site"
      : hostname

  return (
    <div className="terminal-ps1">
      <span style={{color: theme.green}}>{displayHost}</span>
      <span style={{color: theme.green}}>@mystery-visitor:$ </span>
      <span style={{color: theme.green}}>~</span>
    </div>
  )
}

export default Ps1
