"use client"
import React from "react"
import Sidebar from "../../components/sideBar"
import Layout from "../../components/layout/Layout"
import {useI18n} from "../../utils/i18n"

const ContactPage = () => {
  const {t} = useI18n()
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({name: "", email: "", message: ""})
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <Layout>
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-cyan-400">
              {t("contact.title") || "Contacto"}
            </h1>

            <p className="mb-8 text-gray-400">
              {t("contact.description") ||
                "¿Tienes un proyecto en mente? ¡Hablemos!"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({...formData, name: e.target.value})
                  }
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({...formData, email: e.target.value})
                  }
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({...formData, message: e.target.value})
                  }
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 disabled:opacity-50 transition-colors"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "success" && (
                <p className="text-green-500">
                  ¡Mensaje enviado correctamente!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500">
                  Error al enviar el mensaje. Intenta de nuevo.
                </p>
              )}
            </form>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Otros medios</h2>
              <div className="space-y-2">
                <a
                  href="https://github.com/Akicoders"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub - Visitar perfil de GitHub"
                  className="block text-cyan-400 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/paulct-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn - Visitar perfil de LinkedIn"
                  className="block text-cyan-400 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/paul04_ct"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram - Visitar perfil de Instagram"
                  className="block text-cyan-400 hover:underline"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default ContactPage
