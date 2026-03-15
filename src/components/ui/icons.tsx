import React from "react"

interface IconProps {
  className?: string
}

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
}

export const SunIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
  </svg>
)

export const MoonIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
  </svg>
)

export const GithubIcon = ({className}: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.22 1.84 1.22 1.08 1.82 2.82 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.31-5.47-5.85 0-1.3.47-2.36 1.23-3.19-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.22A11.6 11.6 0 0 1 12 6.58c1.02 0 2.05.14 3.01.42 2.29-1.54 3.29-1.22 3.29-1.22.66 1.65.25 2.87.12 3.17.77.83 1.23 1.89 1.23 3.19 0 4.55-2.81 5.54-5.49 5.84.43.37.81 1.08.81 2.18v3.24c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedinIcon = ({className}: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.98 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM3.5 8.25h2.96V20.5H3.5V8.25ZM8.66 8.25h2.84v1.67h.04c.4-.75 1.37-1.84 2.82-1.84 3.02 0 3.58 1.99 3.58 4.58v7.84h-2.96v-6.95c0-1.66-.03-3.79-2.31-3.79-2.32 0-2.67 1.81-2.67 3.67v7.07H8.66V8.25Z" />
  </svg>
)

export const InstagramIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const TerminalIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="m7 9 3 3-3 3M12.5 15H17" />
  </svg>
)

export const MailIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m5 7 7 5 7-5" />
  </svg>
)

export const MenuIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = ({className}: IconProps) => (
  <svg className={className} {...baseProps} aria-hidden="true">
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
)
