import React, { useEffect } from "react"
import { useTheme } from "../../utils/themeProvider"
import { useAppearance } from "../../utils/appearanceProvider"
import gsap from "gsap"

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme()
  const { mode } = useAppearance()

  // Light mode colors
  const bgColor = mode === 'light' ? '#f5f5f5' : theme.background
  const fgColor = mode === 'light' ? '#1a1a1a' : theme.foreground

  const rows = 7
  const columns = 11
  const boxes = []

  // Create boxes for the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      boxes.push(
        <div
          className="box"
          style={{
            backgroundColor: fgColor,
          }}
          key={`${row}+${col}`}
        ></div>,
      )
    }
  }

  // Animation function
  const animateBoxes = (from) => {
    const tl = gsap.timeline({})
    tl.to(".box", {
      duration: 0.3,
      transformOrigin: "50% 50%",
      opacity: 1,
      ease: "power1.inOut",
      stagger: {
        grid: [rows, columns],
        from: from,
        each: 0.035,
      },
    })
      .to(
        ".box",
        {
          duration: 0.3,
          // scale: 0.1,
          opacity: 0,
          transformOrigin: "50% 50%",
          ease: "power3",
          stagger: {
            grid: [rows, columns],
            from: from,
            each: 0.035,
          },
        },
        0.5,
      )
      .to(
        ".overlay",
        {
          duration: 0.4,
          opacity: 0,
        },
        1,
      )
  }

  useEffect(() => {
    animateBoxes("end")
  }, [])

  return (
    <div
      className="terminal relative flex h-full max-w-full flex-1 flex-col overflow-hidden"
      style={{
        color: fgColor,
      }}
    >
      <main
        className="w-full h-full p-2"
        style={{
          background: bgColor,
        }}
      >
        {children}
      </main>
      {/* <div className="scanlines"></div> */}
      {/* <div className="noise"></div> */}
      <div className="overlay">{boxes}</div>
    </div>
  )
}

export default Layout
