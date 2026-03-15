"use client"

import React, {useMemo, useState} from "react"

interface LeadContactFormProps {
  copy: {
    title: string
    subtitle: string
    nameLabel: string
    emailLabel: string
    companyLabel: string
    serviceLabel: string
    messageLabel: string
    submitLabel: string
    submittingLabel: string
    successTitle: string
    successBody: string
    errorBody: string
    errorTitle: string
    privacyNote: string
    aiLeadNote: string
    serviceOptions: string[]
  }
  fallbackEmail: string
}

type FormStatus = "idle" | "submitting" | "success" | "error"

const LeadContactForm: React.FC<LeadContactFormProps> = ({
  copy,
  fallbackEmail,
}) => {
  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      company: "",
      service: copy.serviceOptions[0] || "",
      message: "",
      website: "",
    }),
    [copy.serviceOptions],
  )

  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [message, setMessage] = useState("")

  const updateValue = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const {name, value} = event.target
    setValues((current) => ({...current, [name]: value}))
  }

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`Nuevo lead: ${values.service}`)
    const body = encodeURIComponent(
      [
        `Nombre: ${values.name}`,
        `Email: ${values.email}`,
        `Empresa: ${values.company || "-"}`,
        `Servicio: ${values.service || "-"}`,
        "",
        values.message,
      ].join("\n"),
    )

    return `mailto:${fallbackEmail}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = (await response.json()) as {
        delivery?: "mailto" | "webhook" | "ignored"
        message?: string
      }

      if (!response.ok) {
        throw new Error(data.message || copy.errorBody)
      }

      if (data.delivery === "mailto") {
        window.open(buildMailtoUrl(), "_blank", "noopener,noreferrer")
      }

      setValues(initialValues)
      setStatus("success")
      setMessage(copy.successBody)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : copy.errorBody)
    }
  }

  return (
    <div className="lead-form-card">
      <div className="lead-form-header">
        <strong>{copy.title}</strong>
        <span>{copy.subtitle}</span>
      </div>

      <form className="lead-form" onSubmit={handleSubmit}>
        <div className="lead-form-grid">
          <label className="field">
            <span>{copy.nameLabel}</span>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
            />
          </label>

          <label className="field">
            <span>{copy.emailLabel}</span>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
              autoComplete="email"
              required
              maxLength={120}
            />
          </label>

          <label className="field">
            <span>{copy.companyLabel}</span>
            <input
              type="text"
              name="company"
              value={values.company}
              onChange={updateValue}
              autoComplete="organization"
              maxLength={80}
            />
          </label>

          <label className="field">
            <span>{copy.serviceLabel}</span>
            <select
              name="service"
              value={values.service}
              onChange={updateValue}
            >
              {copy.serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="field field-full">
          <span>{copy.messageLabel}</span>
          <textarea
            name="message"
            value={values.message}
            onChange={updateValue}
            rows={4}
            required
            minLength={20}
            maxLength={1200}
          />
        </label>

        <input
          type="text"
          name="website"
          value={values.website}
          onChange={updateValue}
          className="honeypot-field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="lead-form-footer">
          <div className="lead-form-notes">
            <small>{copy.privacyNote}</small>
            {copy.aiLeadNote ? <small>{copy.aiLeadNote}</small> : null}
          </div>

          <button
            type="submit"
            className="lead-submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
          </button>
        </div>

        {status !== "idle" ? (
          <div className={`form-response is-${status}`} role="status">
            <strong>
              {status === "success" ? copy.successTitle : copy.errorTitle}
            </strong>
            <span>{message}</span>
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default LeadContactForm
