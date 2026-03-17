"use client"

import React, {useEffect, useMemo, useState} from "react"
import {portfolioContent} from "../content/portfolio"
import {usePortfolio} from "./portfolioProvider"

type FieldKey =
  | "name"
  | "email"
  | "company"
  | "service"
  | "challenge"
  | "goal"
  | "timeline"
  | "budget"

interface LeadAnswers {
  name: string
  email: string
  company: string
  service: string
  challenge: string
  goal: string
  timeline: string
  budget: string
}

interface AkiMessage {
  id: string
  role: "assistant" | "user" | "system"
  content: string
}

interface AkiQuestion {
  key: FieldKey
  prompt: string
}

interface AkiCopy {
  title: string
  subtitle: string
  intro: string
  askAgain: string
  invalidEmail: string
  readyTitle: string
  readyBody: string
  sendLabel: string
  sendingLabel: string
  resetLabel: string
  deliverySuccess: string
  deliveryError: string
  questions: AkiQuestion[]
}

interface AkiAssistantContextType {
  copy: AkiCopy
  messages: AkiMessage[]
  input: string
  setInput: (value: string) => void
  completed: boolean
  submitting: boolean
  deliveryStatus: "idle" | "success" | "error"
  deliveryMessage: string
  currentQuestion?: AkiQuestion
  submitInput: () => void
  sendBrief: () => Promise<void>
  resetSession: () => void
}

const AkiAssistantContext = React.createContext<AkiAssistantContextType>(
  {} as AkiAssistantContextType,
)

export const useAkiAssistant = () => React.useContext(AkiAssistantContext)

const createEmptyAnswers = (): LeadAnswers => ({
  name: "",
  email: "",
  company: "",
  service: "",
  challenge: "",
  goal: "",
  timeline: "",
  budget: "",
})

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const AkiAssistantProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {locale} = usePortfolio()
  const [answers, setAnswers] = useState<LeadAnswers>(createEmptyAnswers())
  const [messages, setMessages] = useState<AkiMessage[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [input, setInput] = useState("")
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "success" | "error"
  >("idle")
  const [deliveryMessage, setDeliveryMessage] = useState("")

  const copy = useMemo<AkiCopy>(
    () =>
      locale === "es"
        ? {
            title: "Aki Assistant",
            subtitle:
              "Asistente conversacional en modo terminal para detectar necesidad, urgencia y dejarte un brief comercial listo.",
            intro:
              "Hola, soy Aki. Te haré algunas preguntas cortas para entender el proyecto y preparar un brief para JP Campos.",
            askAgain: "Necesito un poco mas de detalle para seguir.",
            invalidEmail: "Necesito un email valido para continuar.",
            readyTitle: "Brief listo",
            readyBody:
              "Ya tengo lo necesario. Si envias el brief, llegara al webhook de n8n para que puedas recibirlo en Telegram o en tu flujo comercial.",
            sendLabel: "Enviar brief",
            sendingLabel: "Enviando...",
            resetLabel: "Nueva sesion",
            deliverySuccess:
              "Brief enviado correctamente al webhook configurado.",
            deliveryError:
              "No pude enviar el brief. Configura AKI_LEAD_WEBHOOK_URL o revisa tu webhook.",
            questions: [
              {key: "name", prompt: "1. ?Como te llamas?"},
              {key: "email", prompt: "2. ?Cual es tu correo de contacto?"},
              {key: "company", prompt: "3. ?Empresa o marca? (si aplica)"},
              {
                key: "service",
                prompt:
                  "4. ?Que necesitas principalmente? Ejemplo: MVP, automatizacion, IA aplicada, consultoria.",
              },
              {
                key: "challenge",
                prompt: "5. ?Cual es el problema mas urgente?",
              },
              {key: "goal", prompt: "6. ?Que resultado quieres conseguir?"},
              {key: "timeline", prompt: "7. ?Que tiempo tienes en mente?"},
              {key: "budget", prompt: "8. ?Tienes un rango de presupuesto?"},
            ],
          }
        : {
            title: "Aki Assistant",
            subtitle:
              "A conversational terminal-style assistant to detect need, urgency and prepare a sales-ready brief.",
            intro:
              "Hi, I am Aki. I will ask a few short questions to understand the project and prepare a brief for JP Campos.",
            askAgain: "I need a little more detail to continue.",
            invalidEmail: "I need a valid email address to continue.",
            readyTitle: "Brief ready",
            readyBody:
              "I already have what I need. If you send the brief, it will go to your n8n webhook so you can receive it in Telegram or your sales flow.",
            sendLabel: "Send brief",
            sendingLabel: "Sending...",
            resetLabel: "New session",
            deliverySuccess:
              "Brief sent successfully to the configured webhook.",
            deliveryError:
              "I could not send the brief. Configure AKI_LEAD_WEBHOOK_URL or review your webhook.",
            questions: [
              {key: "name", prompt: "1. What is your name?"},
              {key: "email", prompt: "2. What is the best email to reach you?"},
              {key: "company", prompt: "3. Company or brand? (if any)"},
              {
                key: "service",
                prompt:
                  "4. What do you need the most? Example: MVP, automation, applied AI, consulting.",
              },
              {key: "challenge", prompt: "5. What is the most urgent problem?"},
              {key: "goal", prompt: "6. What outcome do you want?"},
              {
                key: "timeline",
                prompt: "7. What timeline do you have in mind?",
              },
              {key: "budget", prompt: "8. Do you have a budget range?"},
            ],
          },
    [locale],
  )

  const appendMessage = React.useCallback(
    (role: AkiMessage["role"], content: string) => {
      setMessages((current) => [...current, {id: createId(), role, content}])
    },
    [],
  )

  const getProposalFit = (currentAnswers: LeadAnswers) => {
    const context =
      `${currentAnswers.service} ${currentAnswers.challenge} ${currentAnswers.goal}`.toLowerCase()

    if (
      context.includes("automat") ||
      context.includes("n8n") ||
      context.includes("process")
    ) {
      return locale === "es"
        ? "Sprint de automatizacion con n8n, integraciones y mejora operativa"
        : "Automation sprint with n8n, integrations and operational improvements"
    }

    if (
      context.includes("ia") ||
      context.includes("ai") ||
      context.includes("llm") ||
      context.includes("rag")
    ) {
      return locale === "es"
        ? "Pilot de IA aplicada con discovery, evaluacion y arquitectura inicial"
        : "Applied AI pilot with discovery, evaluation and initial architecture"
    }

    if (
      context.includes("mvp") ||
      context.includes("producto") ||
      context.includes("product")
    ) {
      return locale === "es"
        ? "Build de MVP con foco en validacion rapida y roadmap corto"
        : "MVP build focused on fast validation and a short roadmap"
    }

    return locale === "es"
      ? "Consultoria tecnica + discovery para definir la mejor siguiente fase"
      : "Technical consulting + discovery to define the best next phase"
  }

  const getSalesAngle = (currentAnswers: LeadAnswers) => {
    const context =
      `${currentAnswers.challenge} ${currentAnswers.goal}`.toLowerCase()

    if (
      context.includes("tiempo") ||
      context.includes("manual") ||
      context.includes("cost") ||
      context.includes("costo")
    ) {
      return locale === "es"
        ? "Enfatizar ahorro operativo, velocidad de ejecucion y menos trabajo manual."
        : "Emphasize operational savings, faster execution and less manual work."
    }

    if (
      context.includes("ventas") ||
      context.includes("lead") ||
      context.includes("cliente")
    ) {
      return locale === "es"
        ? "Enfatizar conversion, seguimiento comercial y mejor experiencia para el cliente."
        : "Emphasize conversion, sales follow-up and better client experience."
    }

    return locale === "es"
      ? "Enfatizar claridad tecnica, roadmap accionable y entrega por etapas."
      : "Emphasize technical clarity, an actionable roadmap and phased delivery."
  }

  const getSummary = (currentAnswers: LeadAnswers) =>
    locale === "es"
      ? `Cliente: ${currentAnswers.name || "-"}\nCorreo: ${currentAnswers.email || "-"}\nEmpresa: ${currentAnswers.company || "-"}\nServicio: ${currentAnswers.service || "-"}\nProblema: ${currentAnswers.challenge || "-"}\nObjetivo: ${currentAnswers.goal || "-"}\nTiempo: ${currentAnswers.timeline || "-"}\nPresupuesto: ${currentAnswers.budget || "-"}`
      : `Client: ${currentAnswers.name || "-"}\nEmail: ${currentAnswers.email || "-"}\nCompany: ${currentAnswers.company || "-"}\nService: ${currentAnswers.service || "-"}\nChallenge: ${currentAnswers.challenge || "-"}\nGoal: ${currentAnswers.goal || "-"}\nTimeline: ${currentAnswers.timeline || "-"}\nBudget: ${currentAnswers.budget || "-"}`

  const resetSession = React.useCallback(() => {
    setAnswers(createEmptyAnswers())
    setMessages([
      {id: createId(), role: "assistant", content: copy.intro},
      {id: createId(), role: "assistant", content: copy.questions[0].prompt},
    ])
    setStepIndex(0)
    setInput("")
    setCompleted(false)
    setSubmitting(false)
    setDeliveryStatus("idle")
    setDeliveryMessage("")
  }, [copy])

  useEffect(() => {
    resetSession()
  }, [resetSession])

  const submitInput = React.useCallback(() => {
    const currentQuestion = copy.questions[stepIndex]
    const value = input.trim()

    if (!value || !currentQuestion) {
      return
    }

    if (currentQuestion.key === "email" && !emailPattern.test(value)) {
      appendMessage("system", copy.invalidEmail)
      return
    }

    if (value.length < 2) {
      appendMessage("system", copy.askAgain)
      return
    }

    appendMessage("user", value)
    const nextAnswers = {...answers, [currentQuestion.key]: value}
    setAnswers(nextAnswers)
    setInput("")

    const nextStep = stepIndex + 1

    if (nextStep < copy.questions.length) {
      setStepIndex(nextStep)
      appendMessage("assistant", copy.questions[nextStep].prompt)
      return
    }

    setCompleted(true)
    setStepIndex(copy.questions.length)
    appendMessage(
      "assistant",
      locale === "es"
        ? "Perfecto. Ya tengo la informacion necesaria para preparar una propuesta inicial y enviarla a JP Campos si decides compartir el brief."
        : "Perfect. I already have what I need to prepare an initial proposal and send the brief to JP Campos if you decide to share it.",
    )
  }, [answers, appendMessage, copy, input, locale, stepIndex])

  const sendBrief = React.useCallback(async () => {
    setSubmitting(true)
    setDeliveryStatus("idle")
    setDeliveryMessage("")

    const payload = {
      ...answers,
      summary: getSummary(answers),
      proposal: getProposalFit(answers),
      salesAngle: getSalesAngle(answers),
    }

    try {
      const response = await fetch("/api/aki-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {message?: string}

      if (!response.ok) {
        throw new Error(data.message || copy.deliveryError)
      }

      setDeliveryStatus("success")
      setDeliveryMessage(copy.deliverySuccess)
      appendMessage("assistant", copy.deliverySuccess)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : copy.deliveryError
      setDeliveryStatus("error")
      setDeliveryMessage(message)
      appendMessage("system", message)
    } finally {
      setSubmitting(false)
    }
  }, [answers, appendMessage, copy])

  const value = useMemo(
    () => ({
      copy,
      messages,
      input,
      setInput,
      completed,
      submitting,
      deliveryStatus,
      deliveryMessage,
      currentQuestion: copy.questions[stepIndex],
      submitInput,
      sendBrief,
      resetSession,
    }),
    [
      completed,
      copy,
      deliveryMessage,
      deliveryStatus,
      input,
      messages,
      resetSession,
      sendBrief,
      stepIndex,
      submitInput,
      submitting,
    ],
  )

  return (
    <AkiAssistantContext.Provider value={value}>
      {children}
    </AkiAssistantContext.Provider>
  )
}
