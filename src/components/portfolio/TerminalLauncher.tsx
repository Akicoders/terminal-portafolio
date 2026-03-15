"use client"

import React from "react"
import {TerminalIcon} from "../ui/icons"
import {portfolioContent} from "../../content/portfolio"
import {usePortfolio} from "../../utils/portfolioProvider"
import {useTerminalUi} from "../../utils/terminalUiProvider"

const TerminalLauncher = () => {
  const {locale} = usePortfolio()
  const {isOpen, openTerminal, closeTerminal} = useTerminalUi()
  const copy = portfolioContent[locale]

  const handleClick = () => {
    if (isOpen) {
      closeTerminal()
      return
    }

    openTerminal()
    window.setTimeout(() => {
      document.getElementById("prompt")?.focus()
    }, 180)
  }

  return (
    <button
      type="button"
      className={`terminal-launcher ${isOpen ? "is-active" : ""}`}
      onClick={handleClick}
      aria-label={copy.labels.launchTerminal}
    >
      <span className="terminal-launcher-badge">
        <TerminalIcon className="terminal-launcher-icon" />
      </span>
      <span>{copy.labels.launchTerminal}</span>
    </button>
  )
}

export default TerminalLauncher
