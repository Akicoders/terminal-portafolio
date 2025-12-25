"use client"
import React, { useEffect, useState } from "react"

interface MatrixRainProps {
    enabled?: boolean
    density?: number // columns count
    speed?: number // animation speed multiplier
}

const MatrixRain: React.FC<MatrixRainProps> = ({
    enabled = true,
    density = 20,
    speed = 1
}) => {
    const [columns, setColumns] = useState<Array<{ id: number; left: string; delay: string; duration: string; chars: string }>>([])

    useEffect(() => {
        if (!enabled) return

        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

        const newColumns = Array.from({ length: density }, (_, i) => {
            const randomChars = Array.from({ length: 30 }, () =>
                chars[Math.floor(Math.random() * chars.length)]
            ).join("\n")

            return {
                id: i,
                left: `${(i / density) * 100}%`,
                delay: `${Math.random() * 5}s`,
                duration: `${(8 + Math.random() * 10) / speed}s`,
                chars: randomChars
            }
        })

        setColumns(newColumns)
    }, [enabled, density, speed])

    if (!enabled) return null

    return (
        <div className="matrix-rain" aria-hidden="true">
            {columns.map((col) => (
                <div
                    key={col.id}
                    className="matrix-column"
                    style={{
                        left: col.left,
                        animationDelay: col.delay,
                        animationDuration: col.duration,
                    }}
                >
                    {col.chars}
                </div>
            ))}
        </div>
    )
}

export default MatrixRain
