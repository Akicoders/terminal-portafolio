"use client"
import { useChat } from "ai/react"
import React, { useEffect, useState } from "react"
import { commandExists } from "./../utils/commandExists"
import { useShell } from "./../utils/shellProvider"
import { useTheme } from "./../utils/themeProvider"
import { useAppearance } from "./../utils/appearanceProvider"
import { useI18n } from "./../utils/i18n"
import { Ps1 } from "./ps1"
import { History } from "./history"
import ThreeCanvas from "./ps1/nes"

export const ChatComponent = ({ inputRef, containerRef }) => {
  const { t } = useI18n()
  const [placeholder, setPlaceholder] = useState("")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 555) {
        setPlaceholder(t('chat.placeholderShort'))
      } else {
        setPlaceholder(t('chat.placeholder'))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [t])

  const { input, setInput, handleInputChange, handleSubmit, messages } = useChat()

  const { theme } = useTheme()
  const { mode } = useAppearance()
  const [value, setValue] = useState("")
  const [showCanvas, setShowCanvas] = useState(false)
  var [lastKeyCode, setLastKeyCode] = useState(null)

  // Appearance-aware colors
  const inputBgColor = mode === 'light' ? '#f5f5f5' : theme.background
  const inputTextColor = mode === 'light'
    ? (commandExists(value) || value === "" ? '#22863a' : '#cb2431')
    : (commandExists(value) || value === "" ? theme.green : theme.red)
  const {
    setCommand,
    history,
    lastCommandIndex,
    setHistory,
    setLastCommandIndex,
    clearHistory,
  } = useShell()

  const onClickAnywhere = () => {
    if (inputRef.current && window.innerWidth >= 1280) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    inputRef.current.focus()

  }, [messages, history])

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((value: string) => value)

    if (event.key === "c" && event.ctrlKey) {
      event.preventDefault()

      setValue("")
      setHistory("")
      setLastCommandIndex(0)
    }

    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault()
      clearHistory()
    }

    if (event.key === "Enter" || event.code === "13" || event.code === "76") {
      if (lastKeyCode === 452 || lastKeyCode === 884) {
        setShowCanvas(true)
        setTimeout(() => {
          setShowCanvas(false)
        }, 10000)
      }
      event.preventDefault()
      setLastKeyCode(0)
      setLastCommandIndex(0)
      setCommand(value)

      setValue("")

    }

    if (event.key === "ArrowUp") {
      event.preventDefault()

      if (!commands.length) {
        return
      }

      const index: number = lastCommandIndex + 1

      if (index <= commands.length) {
        setLastCommandIndex(index)
        setValue(commands[commands.length - index])
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()

      if (!commands.length) {
        return
      }

      const index: number = lastCommandIndex - 1

      if (index > 0) {
        setLastCommandIndex(index)
        setValue(commands[commands.length - index])
      } else {
        setLastCommandIndex(0)
        setValue("")
      }
    }
  }

  return (
    <div onClick={onClickAnywhere}>
      <History history={history} messages={messages} />

      <form className="" onSubmit={handleSubmit} id="form">
        <Ps1 />
        <input
          ref={inputRef}
          id="prompt"
          type="text"
          className="focus:outline-none flex-grow"
          aria-label="prompt"
          style={{
            backgroundColor: inputBgColor,
            color: inputTextColor,
          }}
          value={input || value}
          onChange={(event) => {
            setValue(event.target.value)
            handleInputChange(event)
          }}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onKeyDown={(e) => {
            setLastKeyCode((lastKeyCode += e.keyCode))
            if (
              e.key === "Enter" &&
              !commandExists(value) &&
              lastKeyCode !== 452
            ) {
              handleSubmit
              setValue("")
            } else {
              onSubmit(e)
              if (e.key === "Enter") {
                setValue("")
                setInput("")
              }
            }
          }}
        />
      </form>
      <div id="smf" className="flex justify-center">
        {showCanvas && <ThreeCanvas />}
      </div>
    </div>
  )
}
export default ChatComponent
