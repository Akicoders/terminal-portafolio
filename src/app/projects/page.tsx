"use client"
import React from "react"
import Sidebar from "../../components/sideBar"
import Layout from "../../components/layout/Layout"
import {useI18n} from "../../utils/i18n"

const ProjectsPage = () => {
  const {t} = useI18n()

  const projects = [
    {
      title: "Chatbots con RAG",
      description:
        "Desarrollo de chatbots inteligentes utilizando Retrieval-Augmented Generation para respuestas precisas y contextuales.",
      tech: ["Python", "LangChain", "OpenAI", "Vector DB"],
      link: "#",
    },
    {
      title: "Sistemas de Automatización",
      description:
        "Automatización de procesos de negocio utilizando N8N y herramientas de IA.",
      tech: ["N8N", "Python", "APIs", "Webhooks"],
      link: "#",
    },
    {
      title: "Aplicaciones Web",
      description:
        "Desarrollo de aplicaciones web modernas con React, Next.js y Node.js.",
      tech: ["React", "Next.js", "TypeScript", "Node.js"],
      link: "#",
    },
    {
      title: "Proyectos de Machine Learning",
      description:
        "Implementación de modelos de ML para análisis de datos y predicción.",
      tech: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      link: "#",
    },
  ]

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-cyan-400">
              {t("projects.title") || "Proyectos"}
            </h1>

            <p className="text-gray-300 mb-8">
              Una selección de proyectos destacados en desarrollo web,
              inteligencia artificial y automatización empresarial.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-800 text-cyan-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-400">
                ¿Tienes un proyecto en mente?
                <a
                  href="/contact"
                  className="text-cyan-400 hover:underline ml-2"
                >
                  Hablemos →
                </a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ProjectsPage
