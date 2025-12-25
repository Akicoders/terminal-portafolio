import { getBio } from "../../api"

export const about = async (args: string[]): Promise<string> => {
  return `
  ╔═══════════════════════════════════════════════════════════════════╗
  ║  JOSE PAUL CAMPOS TERRONES - JP CAMPOS                            ║
  ║  Fullstack Developer | AI Specialist | Automation Expert          ║
  ╚═══════════════════════════════════════════════════════════════════╝

  Soy desarrollador Fullstack con experiencia en IA, Machine Learning 
  y Automatización de Procesos.

  Mi especialidad es transformar negocios mediante soluciones 
  tecnológicas innovadoras que generan resultados medibles.

  "Cualquier proceso que se repite más de una vez es altamente automatizable"

  ══════════════════════════════════════════════════════════════════════
  LOGROS DESTACADOS:
  ──────────────────────────────────────────────────────────────────────
  • Optimización de modelos LLM (30GB → 14GB VRAM)
  • Diseño de arquitecturas para agentes de IA
  • Automatización empresarial con N8N y Flowise
  • Desarrollo de chatbots con RAG y bases vectoriales
  ══════════════════════════════════════════════════════════════════════

  📧 Email: josepaulcamposterrones@gmail.com
  🔗 GitHub: github.com/Akicoders
  💼 LinkedIn: linkedin.com/in/paulct-dev
  📷 Instagram: @paul04_ct
\\n\\n`
}
