"use client"

import React, {useEffect, useRef} from "react"
import {useAkiAssistant} from "../../utils/akiAssistantProvider"
import {usePortfolio} from "../../utils/portfolioProvider"

const AkiAssistantPanel = () => {
  const {locale} = usePortfolio()
  const {
    copy,
    messages,
    input,
    setInput,
    completed,
    submitting,
    deliveryStatus,
    deliveryMessage,
    currentQuestion,
    submitInput,
    sendBrief,
    resetSession,
  } = useAkiAssistant()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  useEffect(() => {
    if (!completed) {
      inputRef.current?.focus()
    }
  }, [completed, messages.length])

  return (
    <div className="aki-overlay-shell">
      <div className="aki-terminal-head">
        <strong className="display-font terminal-dock-title">
          {copy.title}
        </strong>
        <span>{copy.subtitle}</span>
      </div>

      <div
        ref={scrollRef}
        className="aki-chat-log"
        role="log"
        aria-live="polite"
      >
        {messages.map((message) => (
          <article
            key={message.id}
            className={`aki-message is-${message.role}`}
          >
            <span className="aki-message-role">
              {message.role === "assistant"
                ? "Aki"
                : message.role === "user"
                  ? locale === "es"
                    ? "Tu"
                    : "You"
                  : locale === "es"
                    ? "Sistema"
                    : "System"}
            </span>
            <pre className="aki-message-body">{message.content}</pre>
          </article>
        ))}
      </div>

      <div className="aki-input-shell">
        <div className="terminal-prompt-meta">
          <strong className="display-font terminal-prompt-title">
            {completed ? copy.readyTitle : copy.title}
          </strong>
          <span>{completed ? copy.readyBody : currentQuestion?.prompt}</span>
        </div>

        {!completed ? (
          <form
            className="terminal-form terminal-prompt aki-input-form"
            onSubmit={(event) => {
              event.preventDefault()
              submitInput()
            }}
          >
            <span className="aki-input-prefix">aki@assistant:$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                locale === "es" ? "Escribe tu respuesta" : "Type your answer"
              }
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        ) : (
          <div className="aki-actions">
            <button
              type="button"
              className="lead-submit"
              onClick={() => void sendBrief()}
              disabled={submitting}
            >
              {submitting ? copy.sendingLabel : copy.sendLabel}
            </button>
            <button
              type="button"
              className="inline-action"
              onClick={resetSession}
            >
              {copy.resetLabel}
            </button>
          </div>
        )}

        {deliveryMessage ? (
          <div className={`form-response is-${deliveryStatus}`}>
            <strong>{copy.readyTitle}</strong>
            <span>{deliveryMessage}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AkiAssistantPanel
