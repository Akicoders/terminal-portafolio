"use client"

import React from "react"
import AkiAssistantPanel from "./AkiAssistantPanel"
import ChatComponent from "../chatComponent"
import {CloseIcon, TerminalIcon} from "../ui/icons"
import {portfolioContent} from "../../content/portfolio"
import {usePortfolio} from "../../utils/portfolioProvider"
import {useTerminalUi} from "../../utils/terminalUiProvider"
import {useTheme} from "../../utils/themeProvider"

const TerminalDock = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const {locale} = usePortfolio()
  const {theme} = useTheme()
  const {isOpen, panelMode, openAki, openTerminal, closeTerminal} =
    useTerminalUi()
  const copy = portfolioContent[locale]

  const title =
    panelMode === "aki" ? copy.labels.akiAssistant : copy.labels.commandCenter
  const subtitle =
    panelMode === "aki"
      ? locale === "es"
        ? "Asistente conversacional para discovery y leads"
        : "Conversational assistant for discovery and leads"
      : copy.labels.terminalSubtitle
  const footerText =
    panelMode === "aki"
      ? locale === "es"
        ? "Aki recopila contexto, detecta urgencia y prepara un brief listo para tu webhook."
        : "Aki captures context, detects urgency and prepares a brief ready for your webhook."
      : copy.labels.terminalHint

  return (
    <>
      <button
        type="button"
        className={`terminal-backdrop ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={closeTerminal}
      />

      <section
        id="terminal-dock"
        className={`terminal-dock ${isOpen ? "is-open" : ""}`}
        aria-label="terminal"
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } as any : {})}
      >
        <header className="terminal-shell-header terminal-dock-header">
          <div className="terminal-shell-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="terminal-dock-copy">
            <span className="terminal-dock-kicker">Overlay shell</span>
            <strong className="display-font terminal-dock-title">
              {title}
            </strong>
            <span>{subtitle}</span>
          </div>

          <div className="terminal-header-actions">
            <div
              className="terminal-mode-switch"
              role="tablist"
              aria-label="Panel mode"
            >
              <button
                type="button"
                className={`terminal-mode-tab ${panelMode === "terminal" ? "is-active" : ""}`}
                onClick={openTerminal}
              >
                {copy.labels.terminal}
              </button>
              <button
                type="button"
                className={`terminal-mode-tab ${panelMode === "aki" ? "is-active" : ""}`}
                onClick={openAki}
              >
                Aki
              </button>
            </div>
            <span className="terminal-theme-name terminal-theme-chip">
              {theme.name.toLowerCase()}
            </span>
            <button
              type="button"
              className="terminal-close"
              onClick={closeTerminal}
              aria-label={copy.labels.closeMenu}
            >
              <CloseIcon className="terminal-close-icon" />
            </button>
          </div>
        </header>

        <div className="terminal-shell-body">
          {panelMode === "aki" ? (
            <AkiAssistantPanel />
          ) : (
            <ChatComponent
              inputRef={inputRef}
              containerRef={containerRef}
              placeholder={copy.labels.commandPlaceholder}
              promptTitle={copy.labels.promptTitle}
              promptHint={copy.labels.promptHint}
            />
          )}
        </div>

        <div className="terminal-dock-footer">
          <TerminalIcon className="terminal-footer-icon" />
          <span>{footerText}</span>
        </div>
      </section>
    </>
  )
}

export default TerminalDock
