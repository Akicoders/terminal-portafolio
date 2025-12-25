export type Language = 'es' | 'en'

// Note: Using string type for flexibility with nested keys
export type TranslationKey = string

export const translations: Record<Language, Record<string, any>> = {
    es: {
        sidebar: {
            aboutMe: "Sobre Mí",
            skills: "Skills",
            projects: "Proyectos",
            contact: "Contacto",
            description1: "Fullstack Developer especializado en IA, Machine Learning y Automatización de Procesos. Transformando ideas en realidad. 🚀",
            description2: "Cualquier proceso que se repite más de una vez es altamente automatizable. La eficiencia es la clave del éxito. 💡",
            moreOptions: "¿Más opciones?",
            config: "Configuración",
            understood: "¡Entendido!",
            configHelp: "Escribe 'help' para ver la lista de comandos. 🎉 Prueba el comando 'neofetch' o 'theme' para personalizar."
        },
        chat: {
            placeholder: "Habla con Aki o escribe \"help\" si necesitas ayuda...",
            placeholderShort: "Habla con Aki o escribe \"help\"...",
            error: "¡Ups! Parece que hay mucho tráfico ahora mismo. Por favor, intenta de nuevo en unos segundos 🙏"
        },
        theme: {
            dark: "Modo Oscuro",
            light: "Modo Claro"
        },
        commands: {
            help: "Escribe 'help' para ver comandos disponibles",
            notFound: "Comando no encontrado. Escribe 'help' para ver opciones."
        },
        me: {
            title: "Jose Paul Campos Terrones",
            subtitle: "JP Campos",
            tagFullstack: "Fullstack Developer",
            tagAI: "AI Specialist",
            tagAutomation: "Automation Expert",
            quote: "\"Cualquier proceso que se repite más de una vez es altamente automatizable\"",
            quoteAuthor: "— Mi filosofía de trabajo",
            aboutTitle: "Sobre Mí",
            aboutP1: "Soy un desarrollador Fullstack con una pasión profunda por la",
            aboutAI: "Inteligencia Artificial",
            aboutML: "Machine Learning",
            aboutAutomation: "Automatización de Procesos",
            aboutP1End: "Mi misión es transformar negocios mediante soluciones tecnológicas.",
            aboutP2: "Mi enfoque combina la creatividad del desarrollo frontend con la robustez de sistemas backend, todo potenciado por la IA moderna. Creo que la tecnología debe servir para simplificar y mejorar la vida de las personas.",
            achievementsTitle: "Logros Destacados",
            timelineTitle: "Trayectoria",
            ctaQuestion: "¿Tienes un proyecto en mente?",
            ctaButton: "Hablemos →"
        },
        skills: {
            title: "Skills & Tecnologías",
            subtitle: "Mi stack tecnológico y áreas de especialización",
            frontend: "Frontend",
            backend: "Backend",
            ai: "AI / Machine Learning",
            automation: "Automatización",
            impactTitle: "Impacto Medible"
        },
        projects: {
            title: "Proyectos",
            subtitle: "Una selección de mis trabajos más destacados",
            ctaQuestion: "¿Quieres ver más proyectos?",
            ctaButton: "Ver en GitHub"
        },
        contact: {
            title: "Contacto",
            subtitle: "¿Tienes un proyecto en mente? ¡Hablemos!",
            formTitle: "Envíame un mensaje",
            name: "Nombre",
            email: "Email",
            subject: "Asunto",
            message: "Mensaje",
            namePlaceholder: "Tu nombre",
            emailPlaceholder: "tu@email.com",
            subjectPlaceholder: "¿De qué quieres hablar?",
            messagePlaceholder: "Cuéntame sobre tu proyecto...",
            sendButton: "Enviar mensaje →",
            sending: "⏳ Enviando...",
            sent: "✅ ¡Enviado!",
            socialTitle: "Conecta conmigo",
            chatTitle: "🤖 ¿Prefieres chatear?",
            chatDesc: "Usa la terminal y escribe cualquier mensaje. Aki te responderá.",
            goToTerminal: "💻 Ir a la Terminal"
        }
    },
    en: {
        sidebar: {
            aboutMe: "About Me",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
            description1: "Fullstack Developer specialized in AI, Machine Learning, and Process Automation. Turning ideas into reality. 🚀",
            description2: "Any process that repeats more than once is highly automatable. Efficiency is the key to success. 💡",
            moreOptions: "More options?",
            config: "Settings",
            understood: "Got it!",
            configHelp: "Type 'help' to see the command list. 🎉 Try 'neofetch' or 'theme' to customize."
        },
        chat: {
            placeholder: "Talk to Aki or type \"help\" if you need assistance...",
            placeholderShort: "Talk to Aki or type \"help\"...",
            error: "Oops! There's a lot of traffic right now. Please try again in a few seconds 🙏"
        },
        theme: {
            dark: "Dark Mode",
            light: "Light Mode"
        },
        commands: {
            help: "Type 'help' to see available commands",
            notFound: "Command not found. Type 'help' to see options."
        },
        me: {
            title: "Jose Paul Campos Terrones",
            subtitle: "JP Campos",
            tagFullstack: "Fullstack Developer",
            tagAI: "AI Specialist",
            tagAutomation: "Automation Expert",
            quote: "\"Any process that repeats more than once is highly automatable\"",
            quoteAuthor: "— My work philosophy",
            aboutTitle: "About Me",
            aboutP1: "I'm a Fullstack developer with a deep passion for",
            aboutAI: "Artificial Intelligence",
            aboutML: "Machine Learning",
            aboutAutomation: "Process Automation",
            aboutP1End: "My mission is to transform businesses through technological solutions.",
            aboutP2: "My approach combines the creativity of frontend development with the robustness of backend systems, all powered by modern AI. I believe technology should serve to simplify and improve people's lives.",
            achievementsTitle: "Key Achievements",
            timelineTitle: "Career Path",
            ctaQuestion: "Do you have a project in mind?",
            ctaButton: "Let's talk →"
        },
        skills: {
            title: "Skills & Technologies",
            subtitle: "My tech stack and areas of expertise",
            frontend: "Frontend",
            backend: "Backend",
            ai: "AI / Machine Learning",
            automation: "Automation",
            impactTitle: "Measurable Impact"
        },
        projects: {
            title: "Projects",
            subtitle: "A selection of my most outstanding work",
            ctaQuestion: "Want to see more projects?",
            ctaButton: "View on GitHub"
        },
        contact: {
            title: "Contact",
            subtitle: "Do you have a project in mind? Let's talk!",
            formTitle: "Send me a message",
            name: "Name",
            email: "Email",
            subject: "Subject",
            message: "Message",
            namePlaceholder: "Your name",
            emailPlaceholder: "you@email.com",
            subjectPlaceholder: "What do you want to talk about?",
            messagePlaceholder: "Tell me about your project...",
            sendButton: "Send message →",
            sending: "⏳ Sending...",
            sent: "✅ Sent!",
            socialTitle: "Connect with me",
            chatTitle: "🤖 Prefer to chat?",
            chatDesc: "Use the terminal and type any message. Aki will respond.",
            goToTerminal: "💻 Go to Terminal"
        }
    }
}
