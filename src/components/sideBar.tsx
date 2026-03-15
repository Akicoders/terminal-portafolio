"use client"

import React from "react"
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
} from "./ui/icons"
import {
  portfolioContent,
  type Locale,
  type Mode,
  type SectionId,
} from "../content/portfolio"
import {usePortfolio} from "../utils/portfolioProvider"
import {useTerminalUi} from "../utils/terminalUiProvider"

interface SideBarProps {
  onCommand?: () => void
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Akicoders",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/paulct-dev",
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/paul04_ct",
    icon: InstagramIcon,
  },
]

const locales: Locale[] = ["es", "en"]
const modes: Mode[] = ["dark", "light"]

const SideBar: React.FC<SideBarProps> = ({onCommand}) => {
  const {locale, mode, section, setLocale, setMode, setSection} = usePortfolio()
  const {openAki, openTerminal} = useTerminalUi()
  const copy = portfolioContent[locale]

  const focusTerminal = () => {
    openTerminal()
    window.setTimeout(() => {
      document.getElementById("prompt")?.focus()
    }, 180)
    onCommand?.()
  }

  const selectSection = (value: SectionId) => {
    setSection(value)
    onCommand?.()
  }

  return (
    <aside className="sidebar-panel" aria-label="Panel lateral">
      <header className="sidebar-header">
        <p className="sidebar-kicker">akicoders.site</p>
        <h1 className="display-font">{copy.brand.name}</h1>
        <p>{copy.brand.role}</p>
      </header>

      <div className="sidebar-controls">
        <div className="toggle-group">
          <span className="toggle-label">{copy.labels.language}</span>
          <div
            className="segmented-control"
            role="tablist"
            aria-label={copy.labels.language}
          >
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                className={`segment ${locale === item ? "is-active" : ""}`}
                onClick={() => setLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="toggle-group">
          <span className="toggle-label">{copy.labels.mode}</span>
          <div
            className="segmented-control"
            role="tablist"
            aria-label={copy.labels.mode}
          >
            {modes.map((item) => (
              <button
                key={item}
                type="button"
                className={`segment ${mode === item ? "is-active" : ""}`}
                onClick={() => setMode(item)}
                aria-label={
                  item === "dark" ? copy.labels.dark : copy.labels.light
                }
              >
                {item === "dark" ? (
                  <MoonIcon className="segment-icon" />
                ) : (
                  <SunIcon className="segment-icon" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sidebar-description">{copy.brand.bio}</p>
      <p className="sidebar-status">{copy.brand.status}</p>

      <nav className="sidebar-links" aria-label="Navegacion rapida">
        {copy.nav.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${section === item.id ? "is-active" : ""}`}
            onClick={() => selectSection(item.id)}
            aria-label={`${item.label} ${item.icon}`}
            title={`${item.icon} - ${item.label}`}
          >
            <span className="sidebar-link-copy">
              <strong>{item.label}</strong>
              <small className="sidebar-link-index" aria-hidden="true">
                {item.icon}
              </small>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-socials" aria-label="Social links">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-social"
            aria-label={item.label}
            title={item.label}
          >
            <item.icon className="social-icon" />
          </a>
        ))}
      </div>

      <div className="sidebar-cta-row">
        <button type="button" className="sidebar-more" onClick={focusTerminal}>
          {copy.labels.moreOptions}
        </button>

        <button
          type="button"
          className="sidebar-aki-link"
          onClick={() => {
            openAki()
            onCommand?.()
          }}
        >
          {copy.labels.akiAssistant}
        </button>
      </div>
    </aside>
  )
}

export default SideBar
