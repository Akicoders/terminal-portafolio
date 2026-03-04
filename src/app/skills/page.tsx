"use client"
import React from "react"
import Sidebar from "../../components/sideBar"
import Layout from "../../components/layout/Layout"
import {useI18n} from "../../utils/i18n"

const SkillsPage = () => {
  const {t} = useI18n()

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Python", "Express", "FastAPI", "REST APIs"],
    },
    {
      title: "IA & Machine Learning",
      skills: ["OpenAI", "LangChain", "RAG", "Vector Databases", "Chatbots"],
    },
    {
      title: "Automatización",
      skills: ["N8N", "Webhooks", "APIs", "Scripting", "Python"],
    },
    {
      title: "Bases de Datos",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Vector DB", "Prisma"],
    },
    {
      title: "Herramientas",
      skills: ["Git", "Docker", "AWS", "Vercel", "GitHub"],
    },
  ]

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-cyan-400">
              {t("skills.title") || "Skills & Tecnologías"}
            </h1>

            <p className="text-gray-300 mb-8">
              Mi stack tecnológico está orientado al desarrollo de soluciones
              modernas con enfoque en inteligencia artificial y automatización.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-5 hover:border-cyan-500 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-3 text-cyan-400">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, i) => (
                      <li key={i} className="text-gray-300 flex items-center">
                        <span className="text-cyan-500 mr-2">▸</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold mb-4">
                En constante aprendizaje
              </h2>
              <p className="text-gray-400">
                Siempre explorando nuevas tecnologías y metodologías para
                ofrecer soluciones innovadoras.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default SkillsPage
