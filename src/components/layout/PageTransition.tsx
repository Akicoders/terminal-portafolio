import React, {useEffect} from "react"
import {gsap} from "gsap"

const PageTransition = () => {
  const rows = 7
  const columns = 11

  // Create boxes for the grid
  const boxes = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      boxes.push(
        <div
          className="box"
          style={{
            backgroundColor: "white",
          }}
          key={`${row}-${col}`} // Changed the key format for consistency
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
      .to(
        ".overlay",
        {
          display: "none",
        },
        1.4,
      )
  }

  useEffect(() => {
    animateBoxes("end")
  }, [])

  return (
    <div
      className="overlay"
      style={{display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`}}
    >
      {boxes}
    </div>
  )
}

export default PageTransition
