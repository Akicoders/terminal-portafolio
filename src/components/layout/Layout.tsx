import React, {useEffect, useMemo, useRef, useState} from "react"
import gsap from "gsap"
import TerminalDock from "../portfolio/TerminalDock"
import SideBar from "../sideBar"
import TerminalLauncher from "../portfolio/TerminalLauncher"
import {CloseIcon, MenuIcon, TerminalIcon} from "../ui/icons"
import {portfolioContent} from "../../content/portfolio"
import {Theme} from "../../interfaces/theme"
import {usePortfolio} from "../../utils/portfolioProvider"
import {useTerminalUi} from "../../utils/terminalUiProvider"
import {useTheme} from "../../utils/themeProvider"

interface Props {
  children: React.ReactNode
  contextLabel?: string
}

const hexToRgb = (value: string) => {
  const hex = value.replace("#", "")
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => char + char)
          .join("")
      : hex

  const integer = Number.parseInt(normalized, 16)

  return {
    r: (integer >> 16) & 255,
    g: (integer >> 8) & 255,
    b: integer & 255,
  }
}

const withAlpha = (value: string, alpha: number) => {
  const {r, g, b} = hexToRgb(value)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getAccent = (theme: Theme, mode: "dark" | "light") =>
  mode === "dark" ? theme.green : theme.blue

const Layout: React.FC<Props> = ({children, contextLabel}) => {
  const {locale, mode, section} = usePortfolio()
  const {theme} = useTheme()
  const {openAki, openTerminal} = useTerminalUi()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const copy = portfolioContent[locale]
  const currentSectionLabel =
    contextLabel ||
    copy.nav.find((item) => item.id === section)?.label ||
    copy.brand.name
  const accent = getAccent(theme, mode)
  const themeVars = useMemo(
    () =>
      ({
        "--brand-accent": accent,
        "--brand-accent-soft": withAlpha(accent, mode === "dark" ? 0.16 : 0.12),
        "--brand-accent-border": withAlpha(
          accent,
          mode === "dark" ? 0.36 : 0.28,
        ),
        "--brand-accent-glow": withAlpha(accent, 0.18),
        "--brand-accent-strong": withAlpha(accent, 0.42),
        "--brand-accent-muted": withAlpha(accent, 0.08),
        "--brand-grid-line": withAlpha(
          theme.foreground,
          mode === "dark" ? 0.06 : 0.08,
        ),
        "--brand-secondary": theme.cyan,
        "--terminal-theme-background": theme.background,
        "--terminal-theme-foreground": theme.foreground,
      }) as React.CSSProperties,
    [accent, mode, theme.background, theme.cyan, theme.foreground],
  )

  const rows = 7
  const columns = 11
  const boxes = useMemo(
    () =>
      Array.from({length: rows * columns}, (_, index) => (
        <div
          className="sweep-box"
          style={{backgroundColor: theme.green}}
          key={index}
        />
      )),
    [theme.green],
  )

  useEffect(() => {
    if (!overlayRef.current) {
      return
    }

    const localBoxes =
      overlayRef.current.querySelectorAll<HTMLElement>(".sweep-box")
    const timeline = gsap.timeline()

    timeline
      .set(overlayRef.current, {autoAlpha: 1})
      .to(localBoxes, {
        duration: 0.28,
        autoAlpha: 1,
        ease: "power1.inOut",
        stagger: {
          grid: [rows, columns],
          from: "end",
          each: 0.03,
        },
      })
      .to(
        localBoxes,
        {
          duration: 0.28,
          autoAlpha: 0,
          ease: "power2.out",
          stagger: {
            grid: [rows, columns],
            from: "end",
            each: 0.03,
          },
        },
        0.42,
      )
      .to(overlayRef.current, {
        duration: 0.2,
        autoAlpha: 0,
      })
  }, [theme.green])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const params = new URLSearchParams(window.location.search)

    if (params.get("assistant") === "aki") {
      openAki()
      const nextUrl = `${window.location.pathname}${window.location.hash}`
      window.history.replaceState(null, "", nextUrl)
    }
  }, [openAki])

  return (
    <div className="terminal-root" data-mode={mode} style={themeVars}>
      <div className="mobile-shellbar">
        <div className="mobile-shellbar-copy">
          <strong className="display-font">{copy.brand.name}</strong>
          <span>{currentSectionLabel}</span>
        </div>

        <div className="mobile-shellbar-actions">
          <button
            type="button"
            className="mobile-shell-action"
            onClick={() => {
              openTerminal()
              window.setTimeout(() => {
                document.getElementById("prompt")?.focus()
              }, 180)
            }}
            aria-label={copy.labels.launchTerminal}
          >
            <TerminalIcon className="mobile-shell-icon" />
          </button>

          <button
            type="button"
            className="mobile-shell-action"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={copy.labels.openMenu}
          >
            <MenuIcon className="mobile-shell-icon" />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`sidebar-backdrop ${mobileMenuOpen ? "is-open" : ""}`}
        tabIndex={mobileMenuOpen ? 0 : -1}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className="portfolio-layout">
        <div
          className={`terminal-sidebar-wrap ${mobileMenuOpen ? "is-open" : ""}`}
        >
          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={copy.labels.closeMenu}
          >
            <CloseIcon className="mobile-shell-icon" />
          </button>
          <SideBar onCommand={() => setMobileMenuOpen(false)} />
        </div>

        <main className="terminal-main">{children}</main>
      </div>

      <TerminalLauncher />
      <TerminalDock />

      <div
        ref={overlayRef}
        className="layout-sweep-overlay"
        style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
        aria-hidden="true"
      >
        {boxes}
      </div>
    </div>
  )
}

export default Layout
