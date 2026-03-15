export type Locale = "es" | "en"
export type Mode = "dark" | "light"
export type SectionId = "about" | "skills" | "projects" | "contact" | "blog"

interface NavItem {
  id: SectionId
  label: string
  icon: string
}

interface KpiItem {
  value: string
  label: string
}

interface BulletCard {
  title: string
  bullets: string[]
}

interface SkillGroup {
  title: string
  bullets: string[]
}

interface ProjectItem {
  title: string
  summary: string
  tags: string[]
  href: string
  metric: string
  category: string
}

interface ContactItem {
  label: string
  value: string
  href?: string
}

interface ContactFormCopy {
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

interface BlogPost {
  slug: string
  title: string
  meta: string
  summary: string
  category: string
  body: string[]
}

interface LocaleContent {
  brand: {
    name: string
    role: string
    bio: string
    status: string
  }
  nav: NavItem[]
  labels: {
    language: string
    mode: string
    dark: string
    light: string
    openMenu: string
    closeMenu: string
    terminal: string
    launchTerminal: string
    commandCenter: string
    moreOptions: string
    openLink: string
    readArticle: string
    backToHome: string
    akiAssistant: string
    terminalHint: string
    terminalSubtitle: string
    commandPlaceholder: string
    shortcuts: string
    promptTitle: string
    promptHint: string
  }
  sections: Record<
    SectionId,
    {
      title: string
      subtitle: string
    }
  > & {
    about: {
      title: string
      subtitle: string
      intro: string
      heroTitle: string
      heroBody: string
      kpis: KpiItem[]
      cards: BulletCard[]
      timeline: BulletCard
    }
    skills: {
      title: string
      subtitle: string
      intro: string
      groups: SkillGroup[]
      delivery: BulletCard
      stack: BulletCard
    }
    projects: {
      title: string
      subtitle: string
      filters: string[]
      items: ProjectItem[]
    }
    contact: {
      title: string
      subtitle: string
      ctaTitle: string
      ctaBody: string
      form: ContactFormCopy
      methods: ContactItem[]
      availability: BulletCard
      process: BulletCard
    }
    blog: {
      title: string
      subtitle: string
      filters: string[]
      notes: BulletCard
      posts: BlogPost[]
    }
  }
  terminal: {
    bannerLead: string
    bannerHint: string
    about: string
    skills: string
    projects: string
    contact: string
    blog: string
    social: string
    neofetchQuote: string
  }
}

const baseProjects = {
  es: [
    {
      title: "Startup Validator",
      summary:
        "Aplicacion React + TypeScript conectada a flujos de n8n para validar ideas de negocio con analisis asistido por IA.",
      tags: ["React", "TypeScript", "n8n", "Vite"],
      href: "https://github.com/Akicoders/startup-validator",
      metric: "AI Validation",
      category: "AI / Automation",
    },
    {
      title: "makers-of-ayllu",
      summary:
        "Plataforma colaborativa para comunidad makers construida con Astro, React y Django, enfocada en contenido y comunidad.",
      tags: ["Astro", "React", "Django", "TypeScript"],
      href: "https://github.com/Akicoders/makers-of-ayllu",
      metric: "Community Platform",
      category: "Platforms",
    },
    {
      title: "LibrerIA AI",
      summary:
        "Biblioteca digital potenciada por IA con arquitectura de microservicios, lectura asistida, recomendaciones y backend desacoplado.",
      tags: ["FastAPI", "React", "Spring Boot", "Redis"],
      href: "https://github.com/Akicoders/librerIA-ai",
      metric: "AI Platform",
      category: "AI / Automation",
    },
    {
      title: "estacionamiento",
      summary:
        "Sistema web de parking orientado a negocio, con modelado de dominio y logica operativa para gestion de espacios y flujo de usuarios.",
      tags: ["Java", "Web", "Business Logic"],
      href: "https://github.com/Akicoders/estacionamiento",
      metric: "Business System",
      category: "Software",
    },
    {
      title: "Reserva Canchas CRUD",
      summary:
        "Aplicacion Java con arquitectura MVC y SQLite para gestionar reservas deportivas, persistencia y operaciones CRUD.",
      tags: ["Java", "SQLite", "MVC"],
      href: "https://github.com/Akicoders/Reserva_Canchas-CRUD-",
      metric: "Java + SQLite",
      category: "Software",
    },
  ],
  en: [
    {
      title: "Startup Validator",
      summary:
        "A React + TypeScript application connected to n8n workflows to validate startup ideas with AI-assisted analysis.",
      tags: ["React", "TypeScript", "n8n", "Vite"],
      href: "https://github.com/Akicoders/startup-validator",
      metric: "AI Validation",
      category: "AI / Automation",
    },
    {
      title: "makers-of-ayllu",
      summary:
        "A collaborative platform for the makers community built with Astro, React and Django, focused on content and community.",
      tags: ["Astro", "React", "Django", "TypeScript"],
      href: "https://github.com/Akicoders/makers-of-ayllu",
      metric: "Community Platform",
      category: "Platforms",
    },
    {
      title: "LibrerIA AI",
      summary:
        "An AI-powered digital library with microservices, assisted reading, recommendations and a decoupled backend approach.",
      tags: ["FastAPI", "React", "Spring Boot", "Redis"],
      href: "https://github.com/Akicoders/librerIA-ai",
      metric: "AI Platform",
      category: "AI / Automation",
    },
    {
      title: "estacionamiento",
      summary:
        "A parking system built around business logic and operational flow for space management and user handling.",
      tags: ["Java", "Web", "Business Logic"],
      href: "https://github.com/Akicoders/estacionamiento",
      metric: "Business System",
      category: "Software",
    },
    {
      title: "Reserva Canchas CRUD",
      summary:
        "A Java MVC application with SQLite to handle sports booking, persistence and CRUD operations.",
      tags: ["Java", "SQLite", "MVC"],
      href: "https://github.com/Akicoders/Reserva_Canchas-CRUD-",
      metric: "Java + SQLite",
      category: "Software",
    },
  ],
}

export const portfolioContent: Record<Locale, LocaleContent> = {
  es: {
    brand: {
      name: "JP Campos",
      role: "Full-Stack & AI Engineer",
      bio: "Construyo software escalable y soluciones con IA para transformar operaciones de negocio.",
      status: "Disponible.",
    },
    nav: [
      {id: "about", label: "Sobre mi", icon: "01"},
      {id: "skills", label: "Skills", icon: "02"},
      {id: "projects", label: "Proyectos", icon: "03"},
      {id: "contact", label: "Contacto", icon: "04"},
      {id: "blog", label: "Blog", icon: "05"},
    ],
    labels: {
      language: "Idioma",
      mode: "Modo",
      dark: "Oscuro",
      light: "Claro",
      openMenu: "Abrir menu",
      closeMenu: "Cerrar menu",
      terminal: "Terminal",
      launchTerminal: "Abrir terminal",
      commandCenter: "Terminal interactiva",
      moreOptions: "Ver comandos",
      openLink: "Abrir",
      readArticle: "Leer articulo",
      backToHome: "Volver al portfolio",
      akiAssistant: "Aki Assistant",
      terminalHint:
        "Escribe 'help' o usa comandos como about, skills, projects, contact, blog o neofetch.",
      terminalSubtitle: "Comandos y navegacion rapida",
      commandPlaceholder: "Escribe 'help' para ver comandos",
      shortcuts: "Atajos",
      promptTitle: "Escribe tu comando",
      promptHint: "Tab autocompleta y Enter ejecuta",
    },
    sections: {
      about: {
        title: "Perfil Ejecutivo",
        subtitle:
          "Full-Stack & AI Engineer orientado a automatizacion, software e inteligencia aplicada.",
        intro: "Cambiemos el mundo con tecnologia.",
        heroTitle:
          "Construyo aplicaciones escalables y soluciones con IA que transforman operaciones de negocio.",
        heroBody:
          "Mi enfoque esta en cerrar la brecha entre ingenieria de software robusta y AI de frontera. Trabajo con React, TypeScript, Python, Docker, n8n y LLMs para crear sistemas inteligentes que impulsen crecimiento y eficiencia.",
        kpis: [
          {
            value: "30GB→14GB",
            label: "optimizacion real de VRAM con quantization",
          },
          {value: "LoRA", label: "fine-tuning para contexto de negocio"},
          {
            value: "n8n + Docker",
            label: "automatizacion y orquestacion de operaciones",
          },
        ],
        cards: [
          {
            title: "Core Impact & Expertise",
            bullets: [
              "AI Optimization: reduccion de VRAM de 30GB a 14GB con LLM quantization",
              "Model Fine-Tuning: personalizacion de modelos con LoRA segun contexto especifico",
              "Agentic Architecture: agentes capaces de planificacion autonoma y tareas complejas",
              "Intelligent Automation: si un proceso se repite, lo automatizo con n8n, Python y Docker",
            ],
          },
          {
            title: "Servicios",
            bullets: [
              "Desarrollo de software a medida",
              "Monitoreo, proteccion y auditoria tecnica de servidores y sistemas",
              "Automatizaciones con n8n o Python",
              "Capacitacion en herramientas de IA para equipos tecnicos",
            ],
          },
          {
            title: "Investigacion & Colaboracion",
            bullets: [
              "Interes en investigar nuevos frameworks para LLMs y metodologias de trabajo",
              "Busco colaborar en creacion de LLMs para casos de uso especificos",
              "Interes en ciencia de datos aplicada, filtracion de datos y algoritmos para investigacion",
              "Power user de Arch Linux para desarrollo y DevOps optimizado",
            ],
          },
        ],
        timeline: {
          title: "Limites de trabajo",
          bullets: [
            "No soporte 24/7",
            "No hacking ofensivo",
            "No garantia de resultados sin discovery previo",
            "Trabajo remoto, no presencial",
          ],
        },
      },
      skills: {
        title: "Skills Executive",
        subtitle:
          "Capacidades reales en frontend, backend, AI/ML, automatizacion e infraestructura.",
        intro:
          "Tecnologias con las que trabajo para construir software, agentes y automatizaciones empresariales.",
        groups: [
          {
            title: "Frontend",
            bullets: [
              "Next.js",
              "React",
              "TypeScript",
              "Astro",
              "Ionic",
              "shadcn/ui",
              "Tailwind",
              "Motion/GSAP",
            ],
          },
          {
            title: "Backend",
            bullets: [
              "FastAPI",
              "Django",
              "Java",
              "SQLite",
              "MongoDB",
              "Redis",
            ],
          },
          {
            title: "AI / ML",
            bullets: [
              "Prompt Engineering",
              "Unsloth",
              "vLLM",
              "Python",
              "Pandas",
            ],
          },
          {
            title: "Automation",
            bullets: ["n8n", "Flowise", "LangChain", "LangGraph"],
          },
        ],
        delivery: {
          title: "Como entrego",
          bullets: [
            "Discovery rapido con foco en metricas",
            "Arquitectura simple y extensible",
            "Iteraciones cortas con pruebas visibles",
            "Documentacion y handoff operable",
          ],
        },
        stack: {
          title: "Stack recurrente",
          bullets: [
            "React / Next.js / Tailwind / shadcn/ui",
            "Python / FastAPI / Redis / MongoDB",
            "n8n / Flowise / LangChain / LangGraph",
            "Docker / Linux / Git / AWS path",
          ],
        },
      },
      projects: {
        title: "Proyectos Estrategicos",
        subtitle:
          "Proyectos reales curados entre software, IA, automatizacion y plataformas.",
        filters: ["Destacados", "AI / Automation", "Platforms", "Software"],
        items: baseProjects.es,
      },
      contact: {
        title: "Contacto Ejecutivo",
        subtitle: "Propuestas, consultorias y colaboraciones.",
        ctaTitle:
          "Si tienes un producto o flujo que necesita claridad tecnica, puedo ayudarte.",
        ctaBody:
          "Trabajo bien en discovery, MVPs, automatizacion operativa, auditoria tecnica y adopcion de IA en equipos.",
        form: {
          title: "Cuentame tu necesidad",
          subtitle: "Formulario corto para iniciar contacto rapido.",
          nameLabel: "Nombre",
          emailLabel: "Email",
          companyLabel: "Empresa",
          serviceLabel: "Servicio",
          messageLabel: "Necesidad",
          submitLabel: "Enviar",
          submittingLabel: "Enviando...",
          successTitle: "Lead enviado",
          successBody:
            "Recibi tu consulta. Si no hay webhook configurado, se abrira tu cliente de correo como respaldo.",
          errorTitle: "Lead no enviado",
          errorBody:
            "No pude enviar el lead ahora. Intenta otra vez o escribeme al correo directo.",
          privacyNote: "Solo pido lo minimo para responderte rapido.",
          aiLeadNote: "",
          serviceOptions: [
            "MVP / Producto",
            "Automatizacion",
            "IA aplicada",
            "Consultoria tecnica",
            "Capacitacion en IA",
            "Monitoreo y auditoria tecnica",
          ],
        },
        methods: [
          {
            label: "Email",
            value: "josepaulcamposterrones@gmail.com",
            href: "mailto:josepaulcamposterrones@gmail.com",
          },
          {
            label: "GitHub",
            value: "github.com/Akicoders",
            href: "https://github.com/Akicoders",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/paulct-dev",
            href: "https://linkedin.com/in/paulct-dev",
          },
          {
            label: "Instagram",
            value: "instagram.com/paul04_ct",
            href: "https://instagram.com/paul04_ct",
          },
        ],
        availability: {
          title: "Disponibilidad",
          bullets: [
            "Freelance y colaboraciones por sprint",
            "Consultoria tecnica para IA y automatizacion",
            "Soporte en discovery, MVP y escalado temprano",
          ],
        },
        process: {
          title: "Proceso de trabajo",
          bullets: [
            "1. Contexto del negocio y objetivo principal",
            "2. Propuesta tecnica enfocada en impacto",
            "3. Entrega iterativa con validacion visible",
          ],
        },
      },
      blog: {
        title: "Blog Ejecutivo",
        subtitle:
          "Ideas, casos reales y aprendizajes en SaaS, IA y automatizacion.",
        filters: ["Todos", "SaaS", "IA", "Automatizacion"],
        notes: {
          title: "Micro-interacciones",
          bullets: [
            "Titulos y tarjetas con hover suave",
            "Filtros visibles y faciles de distinguir",
            "Lectura rapida con jerarquia clara",
            "Entrada escalonada de contenido",
          ],
        },
        posts: [
          {
            slug: "reducir-costos-llm-sin-bajar-calidad",
            title: "Como reducir costos de LLM sin bajar calidad",
            meta: "Ene 2026 - 8 min - IA",
            summary:
              "Framework practico para evaluar prompts, caching y routing de modelos.",
            category: "IA",
            body: [
              "Cuando un equipo adopta LLMs sin una capa de evaluacion, caching y routing, el costo sube rapido y la calidad se vuelve inconsistente. El primer paso no es cambiar de modelo, sino entender que parte del flujo realmente necesita inteligencia de alto costo.",
              "En proyectos reales, separar prompts por nivel de complejidad, guardar respuestas reutilizables y medir calidad por caso de uso permite bajar gasto sin romper la experiencia. La clave es tratar el uso de IA como arquitectura de producto, no como consumo aislado de API.",
            ],
          },
          {
            slug: "playbook-automatizacion-equipos-operaciones",
            title: "Playbook de automatizacion para equipos de operaciones",
            meta: "Dic 2025 - 10 min - Automatizacion",
            summary:
              "Caso real con n8n + APIs para eliminar tareas repetitivas y errores manuales.",
            category: "Automatizacion",
            body: [
              "Los equipos de operaciones suelen convivir con tareas manuales repartidas entre correo, hojas de calculo y CRM. Antes de automatizar, conviene detectar donde se pierde tiempo, donde hay errores recurrentes y que aprobaciones si o si deben mantenerse humanas.",
              "Con flujos bien pensados en n8n, webhooks y reglas de negocio simples, se puede crear un sistema que clasifique solicitudes, dispare alertas y mantenga trazabilidad sin saturar al equipo. El objetivo no es solo ahorrar tiempo, sino mejorar confiabilidad y respuesta.",
            ],
          },
          {
            slug: "de-mvp-a-producto-estable-en-6-semanas",
            title: "De MVP a producto estable en 6 semanas",
            meta: "Nov 2025 - 7 min - SaaS",
            summary:
              "Estrategia de priorizacion, arquitectura y metricas para lanzamientos rapidos.",
            category: "SaaS",
            body: [
              "Lanzar rapido no significa lanzar desordenado. Un MVP sano parte de un alcance corto, metricas definidas y una arquitectura que permita crecer sin rehacer lo esencial en la semana dos.",
              "En escenarios SaaS, priorizar onboarding, propuesta de valor y observabilidad basica suele rendir mejor que intentar cubrir todos los modulos desde el inicio. La estabilidad se construye cuando cada iteracion deja una base mas simple de operar y medir.",
            ],
          },
        ],
      },
    },
    terminal: {
      bannerLead: "Hybrid portfolio ready.",
      bannerHint: "Sidebar for fast browsing, terminal for power users.",
      about:
        "Perfil abierto en el panel principal. Usa el sidebar o escribe 'neofetch' para un resumen tecnico.",
      skills:
        "Skills cargadas en el panel principal. Stack: frontend, backend, AI/ML y automatizacion.",
      projects:
        "Proyectos destacados cargados. Usa 'repo' para abrir GitHub completo.",
      contact:
        "Seccion de contacto abierta. Puedes usar 'email', 'linkedin' o 'github'.",
      blog: "Blog cargado con notas y articulos recientes.",
      social:
        "GitHub: https://github.com/Akicoders\nLinkedIn: https://linkedin.com/in/paulct-dev\nInstagram: https://instagram.com/paul04_ct",
      neofetchQuote:
        "Cualquier proceso repetitivo es candidato a ser automatizado.",
    },
  },
  en: {
    brand: {
      name: "JP Campos",
      role: "Full-Stack & AI Engineer",
      bio: "I build scalable software and AI-driven solutions that transform business operations.",
      status: "Available.",
    },
    nav: [
      {id: "about", label: "About", icon: "01"},
      {id: "skills", label: "Skills", icon: "02"},
      {id: "projects", label: "Projects", icon: "03"},
      {id: "contact", label: "Contact", icon: "04"},
      {id: "blog", label: "Blog", icon: "05"},
    ],
    labels: {
      language: "Language",
      mode: "Mode",
      dark: "Dark",
      light: "Light",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      terminal: "Terminal",
      launchTerminal: "Open terminal",
      commandCenter: "Interactive terminal",
      moreOptions: "Show commands",
      openLink: "Open",
      readArticle: "Read article",
      backToHome: "Back to portfolio",
      akiAssistant: "Aki Assistant",
      terminalHint:
        "Type 'help' or use commands like about, skills, projects, contact, blog or neofetch.",
      terminalSubtitle: "Commands and fast navigation",
      commandPlaceholder: "Type 'help' to list commands",
      shortcuts: "Shortcuts",
      promptTitle: "Type your command",
      promptHint: "Tab autocompletes and Enter runs",
    },
    sections: {
      about: {
        title: "Executive Profile",
        subtitle:
          "Full-Stack & AI Engineer focused on automation, software and applied intelligence.",
        intro: "Let’s change the world with technology.",
        heroTitle:
          "I build scalable applications and AI-driven solutions that transform business operations.",
        heroBody:
          "My focus is on bridging robust software engineering and frontier AI. I work with React, TypeScript, Python, Docker, n8n and LLM tooling to create intelligent systems that drive growth and efficiency.",
        kpis: [
          {
            value: "30GB→14GB",
            label: "real VRAM reduction through LLM quantization",
          },
          {
            value: "LoRA",
            label: "model fine-tuning aligned with business context",
          },
          {
            value: "n8n + Docker",
            label: "automation and orchestration of repeated processes",
          },
        ],
        cards: [
          {
            title: "Core Impact & Expertise",
            bullets: [
              "AI optimization, quantization and infrastructure efficiency",
              "Model fine-tuning with LoRA for specific business contexts",
              "Agentic architectures for planning and multi-step execution",
              "Intelligent automation with n8n, Python and Docker",
            ],
          },
          {
            title: "Services",
            bullets: [
              "Custom software development",
              "Monitoring, hardening and technical audits",
              "Automation with n8n or Python",
              "AI tooling training for technical teams",
            ],
          },
          {
            title: "Research & Collaboration",
            bullets: [
              "Interest in testing new LLM frameworks and working methodologies",
              "Open to contributing to domain-specific LLM creation",
              "Interested in data science for filtering, modeling and research support",
              "Arch Linux power-user workflow for highly optimized development",
            ],
          },
        ],
        timeline: {
          title: "Working boundaries",
          bullets: [
            "No 24/7 support",
            "No offensive hacking work",
            "No guaranteed outcomes without proper discovery",
            "Remote-first, not on-site",
          ],
        },
      },
      skills: {
        title: "Skills Executive",
        subtitle:
          "Real capabilities across frontend, backend, AI/ML, automation and infrastructure.",
        intro:
          "Technologies I use to build software, agents and business automation systems.",
        groups: [
          {
            title: "Frontend",
            bullets: [
              "Next.js",
              "React",
              "TypeScript",
              "Astro",
              "Ionic",
              "shadcn/ui",
              "Tailwind",
              "Motion/GSAP",
            ],
          },
          {
            title: "Backend",
            bullets: [
              "FastAPI",
              "Django",
              "Java",
              "SQLite",
              "MongoDB",
              "Redis",
            ],
          },
          {
            title: "AI / ML",
            bullets: [
              "Prompt Engineering",
              "Unsloth",
              "vLLM",
              "Python",
              "Pandas",
            ],
          },
          {
            title: "Automation",
            bullets: ["n8n", "Flowise", "LangChain", "LangGraph"],
          },
        ],
        delivery: {
          title: "How I deliver",
          bullets: [
            "Fast discovery with clear metrics",
            "Simple architecture that can grow",
            "Short iterations with visible checkpoints",
            "Documentation and operable handoff",
          ],
        },
        stack: {
          title: "Recurring stack",
          bullets: [
            "React / Next.js / Tailwind / shadcn/ui",
            "Python / FastAPI / Redis / MongoDB",
            "n8n / Flowise / LangChain / LangGraph",
            "Docker / Linux / Git / AWS path",
          ],
        },
      },
      projects: {
        title: "Strategic Projects",
        subtitle:
          "Real curated projects across software, AI, automation and platforms.",
        filters: ["Featured", "AI / Automation", "Platforms", "Software"],
        items: baseProjects.en,
      },
      contact: {
        title: "Executive Contact",
        subtitle: "Proposals, consulting and collaborations.",
        ctaTitle:
          "If your product or workflow needs technical clarity, I can help.",
        ctaBody:
          "I work especially well in discovery, MVPs, operational automation, technical audits and AI adoption for teams.",
        form: {
          title: "Tell me what you need",
          subtitle: "A short form to start the conversation quickly.",
          nameLabel: "Name",
          emailLabel: "Email",
          companyLabel: "Company",
          serviceLabel: "Service",
          messageLabel: "Need",
          submitLabel: "Send",
          submittingLabel: "Sending...",
          successTitle: "Lead sent",
          successBody:
            "I received your inquiry. If no webhook is configured, your email client will open as a fallback.",
          errorTitle: "Lead not sent",
          errorBody:
            "I could not send the lead right now. Please try again or email me directly.",
          privacyNote: "I only ask for the minimum needed to reply quickly.",
          aiLeadNote: "",
          serviceOptions: [
            "MVP / Product",
            "Automation",
            "Applied AI",
            "Technical consulting",
            "AI team training",
            "Monitoring & technical audit",
          ],
        },
        methods: [
          {
            label: "Email",
            value: "josepaulcamposterrones@gmail.com",
            href: "mailto:josepaulcamposterrones@gmail.com",
          },
          {
            label: "GitHub",
            value: "github.com/Akicoders",
            href: "https://github.com/Akicoders",
          },
          {
            label: "LinkedIn",
            value: "linkedin.com/in/paulct-dev",
            href: "https://linkedin.com/in/paulct-dev",
          },
          {
            label: "Instagram",
            value: "instagram.com/paul04_ct",
            href: "https://instagram.com/paul04_ct",
          },
        ],
        availability: {
          title: "Availability",
          bullets: [
            "Freelance work and sprint-based collaborations",
            "Technical consulting for AI and automation",
            "Support in discovery, MVPs and early scaling",
          ],
        },
        process: {
          title: "Working model",
          bullets: [
            "1. Business context and main objective",
            "2. Technical proposal focused on impact",
            "3. Iterative delivery with visible validation",
          ],
        },
      },
      blog: {
        title: "Executive Blog",
        subtitle:
          "Ideas, case studies and lessons from SaaS, AI and automation.",
        filters: ["All", "SaaS", "AI", "Automation"],
        notes: {
          title: "Micro-interactions",
          bullets: [
            "Soft hover states for titles and cards",
            "Filters that are easy to spot",
            "Fast reading with clear hierarchy",
            "Staggered entrance for content blocks",
          ],
        },
        posts: [
          {
            slug: "reducir-costos-llm-sin-bajar-calidad",
            title: "How to cut LLM costs without losing quality",
            meta: "Jan 2026 - 8 min - AI",
            summary:
              "A practical framework for prompt evaluation, caching and model routing.",
            category: "AI",
            body: [
              "When teams adopt LLMs without evaluation, caching and routing layers, costs rise quickly and quality becomes inconsistent. The first step is rarely changing the model. It is understanding which parts of the flow truly need high-cost intelligence.",
              "In real products, splitting prompts by complexity, caching reusable responses and measuring quality per use case reduces spend without hurting the user experience. The key is to treat AI usage as product architecture, not isolated API consumption.",
            ],
          },
          {
            slug: "playbook-automatizacion-equipos-operaciones",
            title: "An automation playbook for operations teams",
            meta: "Dec 2025 - 10 min - Automation",
            summary:
              "A real case using n8n + APIs to remove repetitive tasks and manual errors.",
            category: "Automation",
            body: [
              "Operations teams usually live across email, spreadsheets and CRM tools. Before automating, it helps to identify where time is lost, where recurring errors happen and which approvals must remain human.",
              "With well-designed flows in n8n, webhooks and simple business rules, you can classify requests, trigger alerts and keep full traceability without overwhelming the team. The goal is not only to save time but to improve reliability and response speed.",
            ],
          },
          {
            slug: "de-mvp-a-producto-estable-en-6-semanas",
            title: "From MVP to stable product in 6 weeks",
            meta: "Nov 2025 - 7 min - SaaS",
            summary:
              "Prioritization, architecture and metrics for fast launches.",
            category: "SaaS",
            body: [
              "Shipping fast does not mean shipping messy. A healthy MVP starts with a narrow scope, clear metrics and an architecture that can grow without rewriting the core in week two.",
              "In SaaS settings, prioritizing onboarding, value proposition and basic observability usually pays off more than trying to launch every module at once. Stability comes from leaving each iteration easier to operate and measure.",
            ],
          },
        ],
      },
    },
    terminal: {
      bannerLead: "Hybrid portfolio ready.",
      bannerHint: "Sidebar for quick browsing, terminal for power users.",
      about:
        "Profile opened in the main panel. Use the sidebar or type 'neofetch' for a technical summary.",
      skills:
        "Skills loaded in the main panel. Stack covers frontend, backend, AI/ML and automation.",
      projects:
        "Featured projects loaded. Use 'repo' to open the full GitHub profile.",
      contact:
        "Contact section opened. You can use 'email', 'linkedin' or 'github'.",
      blog: "Blog loaded with notes and recent articles.",
      social:
        "GitHub: https://github.com/Akicoders\nLinkedIn: https://linkedin.com/in/paulct-dev\nInstagram: https://instagram.com/paul04_ct",
      neofetchQuote: "Any repetitive process is a candidate for automation.",
    },
  },
}

export const sectionIds: SectionId[] = [
  "about",
  "skills",
  "projects",
  "contact",
  "blog",
]

export const getStoredLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "es"
  }

  return localStorage.getItem("portfolio-locale") === "en" ? "en" : "es"
}

export const getStoredMode = (): Mode => {
  if (typeof window === "undefined") {
    return "dark"
  }

  return localStorage.getItem("portfolio-mode") === "light" ? "light" : "dark"
}

export const getBlogPosts = (locale: Locale) =>
  portfolioContent[locale].sections.blog.posts

export const getBlogPostBySlug = (locale: Locale, slug: string) =>
  getBlogPosts(locale).find((post) => post.slug === slug)

export const getAllBlogSlugs = () =>
  Array.from(
    new Set(
      (Object.keys(portfolioContent) as Locale[]).flatMap((locale) =>
        getBlogPosts(locale).map((post) => post.slug),
      ),
    ),
  )
