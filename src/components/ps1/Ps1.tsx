"use client"
import React, {useEffect, useState} from "react"
import {useTheme} from "../../utils/themeProvider"

export const Ps1 = () => {
  const [hostname, setHostname] = useState("")
  const {theme} = useTheme()

  useEffect(() => {
    if (typeof window !== undefined) {
      setHostname(window.location.hostname)
    }
  }, [])

  return (
    <div className="inline mr-2 log">
      <span
        style={{
          color: theme.yellow,
        }}
      >
        {hostname}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        @
      </span>
      <span
        style={{
          color: theme.green,
        }}
      >
        mystery-visitor
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        :$ ~
      </span>
    </div>
  )
}

export default Ps1
