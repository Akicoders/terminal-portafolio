"use client"
import React from "react"
import Sidebar from "../../components/sideBar"
import Layout from "../../components/layout/Layout"
import {useI18n} from "../../utils/i18n"

const MePage = () => {
  const {t} = useI18n()

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-cyan-400">
              {t("about.title") || "Sobre Mí"}
            </h1>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Jose Paul Campos Terrones
              </h2>
              <p className="text-gray-300 mb-4">
                Fullstack Developer especializado en IA, Machine Learning y
                Automatización de Procesos. Transformando negocios con
                tecnología innovadora.
              </p>
              <p className="text-gray-300">
                Con experiencia en el desarrollo de soluciones tecnológicas de
                vanguardia, me enfoco en crear aplicaciones escalables y
                eficientes que generan valor real a los negocios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Especialidades</h2>
              <ul className="space-y-2 text-gray-300">
                <li>🤖 Desarrollo de IA y Machine Learning</li>
                <li>🔗 Arquitecturas de agentes IA</li>
                <li>💬 Chatbots con RAG</li>
                <li>⚙️ Automatización de procesos con N8N</li>
                <li>
                  🌐 Desarrollo Fullstack (React, Next.js, Node.js, Python)
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Experiencia</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-500 pl-4">
                  <h3 className="font-medium">
                    Fullstack Developer & AI Specialist
                  </h3>
                  <p className="text-sm text-gray-400">
                    Desarrollo de soluciones web y de IA
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Contacto</h2>
              <p className="text-gray-300">
                ¿Tienes un proyecto en mente? ¡Hablemos!
                <a
                  href="/contact"
                  className="text-cyan-400 hover:underline ml-2"
                >
                  Contáctame →
                </a>
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MePage
