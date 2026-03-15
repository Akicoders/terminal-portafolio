"use client"

import React, {useEffect, useMemo, useState} from "react"
import {History} from "./history"
import {Ps1} from "./ps1"
import {commandExists, getAvailableCommands} from "../utils/commandExists"
import {useShell} from "../utils/shellProvider"
import {useTheme} from "../utils/themeProvider"

interface ChatComponentProps {
  inputRef: React.RefObject<HTMLInputElement>
  containerRef: React.RefObject<HTMLDivElement>
  placeholder?: string
  promptTitle?: string
  promptHint?: string
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  inputRef,
  containerRef,
  placeholder,
  promptTitle,
  promptHint,
}) => {
  const {theme} = useTheme()
  const {history, setCommand, clearHistory} = useShell()
  const [value, setValue] = useState("")
  const [commandIndex, setCommandIndex] = useState(0)
  const availableCommands = useMemo(() => getAvailableCommands(), [])

  const commands = useMemo(
    () => history.map((item) => item.command).filter(Boolean),
    [history],
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [history.length, inputRef])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history.length, containerRef])

  const submitCommand = () => {
    const trimmed = value.trim()

    if (!trimmed) {
      return
    }

    setCommand(trimmed)
    setValue("")
    setCommandIndex(0)
  }

  const handleArrowUp = () => {
    if (!commands.length) {
      return
    }

    const nextIndex = Math.min(commandIndex + 1, commands.length)
    setCommandIndex(nextIndex)
    setValue(commands[commands.length - nextIndex])
  }

  const handleArrowDown = () => {
    if (!commands.length) {
      return
    }

    const nextIndex = Math.max(commandIndex - 1, 0)
    setCommandIndex(nextIndex)

    if (nextIndex === 0) {
      setValue("")
      return
    }

    setValue(commands[commands.length - nextIndex])
  }

  const handleAutocomplete = () => {
    const typed = value.trim().toLowerCase()

    if (!typed || typed.includes(" ")) {
      return
    }

    const suggestion = availableCommands.find((command) =>
      command.startsWith(typed),
    )

    if (suggestion) {
      setValue(suggestion)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault()
      clearHistory()
      setValue("")
      setCommandIndex(0)
      return
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault()
      setValue("")
      setCommandIndex(0)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      handleArrowUp()
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      handleArrowDown()
      return
    }

    if (event.key === "Tab") {
      event.preventDefault()
      handleAutocomplete()
      return
    }

    if (event.key === "Enter") {
      event.preventDefault()
      submitCommand()
    }
  }

  const inputColor =
    value.length === 0 || commandExists(value) ? theme.green : theme.red

  return (
    <div
      className="terminal-console"
      onClick={() => inputRef.current?.focus()}
      role="region"
      aria-label="Terminal de comandos"
    >
      <div ref={containerRef} className="terminal-history">
        <History history={history} />
      </div>

      <div className="terminal-prompt-shell">
        <div className="terminal-prompt-meta">
          <strong className="display-font terminal-prompt-title">
            {promptTitle || "Linea de comandos"}
          </strong>
          <span>{promptHint || "Tab autocompleta y Enter ejecuta"}</span>
        </div>

        <form
          className="terminal-form terminal-prompt"
          onSubmit={(event) => {
            event.preventDefault()
            submitCommand()
          }}
        >
          <Ps1 />
          <input
            ref={inputRef}
            id="prompt"
            className="terminal-input"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            style={{color: inputColor}}
            placeholder={placeholder || "Escribe 'help' para ver comandos"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Prompt de terminal"
          />
        </form>
      </div>
    </div>
  )
}

export default ChatComponent
