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

const MAX_MESSAGES = 15
const STORAGE_KEY = 'aki_chat_session'

interface ChatSession {
  messageCount: number
  leadCaptured: boolean
  expiresAt: number
}

const getSession = (): ChatSession => {
  if (typeof window === 'undefined') return { messageCount: 0, leadCaptured: false, expiresAt: 0 }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const session = JSON.parse(stored)
      // Session expires after 24 hours
      if (session.expiresAt > Date.now()) {
        return session
      }
    }
  } catch (e) {
    console.error('Error reading session:', e)
  }

  return { messageCount: 0, leadCaptured: false, expiresAt: Date.now() + 24 * 60 * 60 * 1000 }
}

const saveSession = (session: ChatSession) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch (e) {
    console.error('Error saving session:', e)
  }
}

export const ChatComponent = ({ inputRef, containerRef }) => {
  const { t, language } = useI18n()
  const [placeholder, setPlaceholder] = useState("")
  const [session, setSession] = useState<ChatSession>({ messageCount: 0, leadCaptured: false, expiresAt: 0 })
  const [isDisabled, setIsDisabled] = useState(false)

  // Load session on mount
  useEffect(() => {
    const loadedSession = getSession()
    setSession(loadedSession)
    setIsDisabled(loadedSession.leadCaptured || loadedSession.messageCount >= MAX_MESSAGES)
  }, [])

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

  // Check for lead capture in messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      // If assistant response contains lead confirmation phrases
      if (lastMessage.role === 'assistant') {
        const content = lastMessage.content.toLowerCase()
        const leadIndicators = [
          'te contactará pronto',
          'will contact you soon',
          'paul se comunicará',
          'te escribirá por whatsapp',
          'gracias por tu interés',
          'thank you for your interest'
        ]

        if (leadIndicators.some(indicator => content.includes(indicator))) {
          const newSession = { ...session, leadCaptured: true }
          setSession(newSession)
          saveSession(newSession)
          setIsDisabled(true)
        }
      }
    }
  }, [messages])

  // Increment message count when user sends a message
  const incrementMessageCount = () => {
    const newCount = session.messageCount + 1
    const newSession = { ...session, messageCount: newCount }
    setSession(newSession)
    saveSession(newSession)

    if (newCount >= MAX_MESSAGES) {
      setIsDisabled(true)
    }
  }

  // Get status message
  const getStatusMessage = () => {
    if (session.leadCaptured) {
      return language === 'es'
        ? "✅ ¡Gracias! Paul te contactará pronto por WhatsApp."
        : "✅ Thanks! Paul will contact you soon via WhatsApp."
    }
    if (session.messageCount >= MAX_MESSAGES) {
      return language === 'es'
        ? "⚠️ Has alcanzado el límite de mensajes. Usa el formulario de contacto para comunicarte."
        : "⚠️ You've reached the message limit. Use the contact form to get in touch."
    }
    if (session.messageCount >= MAX_MESSAGES - 3) {
      return language === 'es'
        ? `💬 Te quedan ${MAX_MESSAGES - session.messageCount} mensajes`
        : `💬 You have ${MAX_MESSAGES - session.messageCount} messages left`
    }
    return null
  }

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) {
      event.preventDefault()
      return
    }

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

      // Increment message count for non-command messages
      if (!commandExists(value)) {
        incrementMessageCount()
      }

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

  const statusMessage = getStatusMessage()

  return (
    <div onClick={onClickAnywhere}>
      <History history={history} messages={messages} />

      {statusMessage && (
        <div
          style={{
            color: session.leadCaptured ? '#22c55e' : (mode === 'light' ? '#666' : '#888'),
            padding: '8px 0',
            fontSize: '14px'
          }}
        >
          {statusMessage}
        </div>
      )}

      <form className="" onSubmit={handleSubmit} id="form">
        <Ps1 />
        <input
          ref={inputRef}
          id="prompt"
          type="text"
          className="focus:outline-none flex-grow"
          aria-label="prompt"
          disabled={isDisabled}
          style={{
            backgroundColor: inputBgColor,
            color: isDisabled ? '#666' : inputTextColor,
            cursor: isDisabled ? 'not-allowed' : 'text',
            opacity: isDisabled ? 0.6 : 1,
          }}
          value={input || value}
          onChange={(event) => {
            setValue(event.target.value)
            handleInputChange(event)
          }}
          placeholder={isDisabled
            ? (language === 'es' ? 'Chat deshabilitado' : 'Chat disabled')
            : placeholder
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onKeyDown={(e) => {
            if (isDisabled) {
              e.preventDefault()
              return
            }
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
