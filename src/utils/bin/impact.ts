// Video presentation command - displays a video introduction
export const video = async (args?: string[]): Promise<string> => {
    // For now, return a placeholder that can be updated with your actual video URL
    const videoUrl = "https://www.youtube.com/embed/YOUR_VIDEO_ID" // TODO: Update with your video

    if (args && args.includes('--help')) {
        return `Usage: video

Displays a video presentation introducing JP Campos.

Options:
  --help    Show this help message`
    }

    return `
<div class="video-container" style="margin: 20px 0; text-align: center;">
  <h3 style="color: var(--color-celeste); margin-bottom: 15px;">🎬 Video Presentación - JP Campos</h3>
  <p style="margin-bottom: 20px; opacity: 0.8;">Conoce quién soy, mi experiencia y cómo puedo ayudarte.</p>
  <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 800px; margin: 0 auto; border: 2px solid var(--color-celeste); border-radius: 8px;">
    <iframe 
      src="${videoUrl}" 
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
  <p style="margin-top: 15px; font-size: 12px; opacity: 0.6;">Tip: Escribe 'contact' para ponerte en contacto conmigo 🚀</p>
</div>
`
}

// Impact command - shows measurable business impact metrics
export const impact = async (args?: string[]): Promise<string> => {
    if (args && args.includes('--help')) {
        return `Usage: impact

Shows measurable business impact that JP Campos can deliver to your company.

Options:
  --help    Show this help message`
    }

    return `
<div class="impact-container" style="margin: 20px 0;">
  <h2 style="color: var(--color-celeste); text-shadow: 0 0 10px currentColor; margin-bottom: 20px;">
    📊 IMPACTO MEDIBLE EN TU NEGOCIO
  </h2>
  
  <div style="display: grid; gap: 15px; max-width: 900px;">
    <div style="border-left: 3px solid #00ff88; padding-left: 15px;">
      <span style="color: #00ff88; font-size: 28px; font-weight: bold;">-52%</span>
      <p>Reducción en requisitos de VRAM para modelos LLM</p>
      <small style="opacity: 0.6;">Optimización de 30GB a 14GB sin pérdida de rendimiento</small>
    </div>
    
    <div style="border-left: 3px solid #00b4d8; padding-left: 15px;">
      <span style="color: #00b4d8; font-size: 28px; font-weight: bold;">-30%</span>
      <p>Reducción en costos operativos</p>
      <small style="opacity: 0.6;">Mediante automatización inteligente de procesos repetitivos</small>
    </div>
    
    <div style="border-left: 3px solid #ff6b6b; padding-left: 15px;">
      <span style="color: #ff6b6b; font-size: 28px; font-weight: bold;">24/7</span>
      <p>Disponibilidad de sistemas de IA</p>
      <small style="opacity: 0.6;">Chatbots y asistentes virtuales siempre activos</small>
    </div>
    
    <div style="border-left: 3px solid #ffd93d; padding-left: 15px;">
      <span style="color: #ffd93d; font-size: 28px; font-weight: bold;">10x</span>
      <p>Aceleración en desarrollo</p>
      <small style="opacity: 0.6;">Con flujos de trabajo automatizados y código reutilizable</small>
    </div>
  </div>

  <h3 style="color: var(--color-celeste); margin-top: 30px; margin-bottom: 15px;">🎯 ¿QUÉ PUEDO HACER POR TU EMPRESA?</h3>
  
  <ul style="list-style: none; padding: 0; line-height: 2;">
    <li>🤖 <strong>Chatbots Inteligentes</strong> - Atención 24/7 con IA conversacional y RAG</li>
    <li>🔄 <strong>Automatización</strong> - Elimina tareas repetitivas con N8N/Flowise</li>
    <li>📊 <strong>Análisis de Datos</strong> - Insights accionables con Machine Learning</li>
    <li>🌐 <strong>Desarrollo Web</strong> - Aplicaciones modernas y escalables</li>
    <li>💡 <strong>Consultoría IA</strong> - Estrategia de adopción de inteligencia artificial</li>
    <li>🔗 <strong>Integraciones</strong> - Conecta tus sistemas con APIs inteligentes</li>
  </ul>

  <div style="margin-top: 25px; padding: 15px; background: rgba(0, 180, 216, 0.1); border-radius: 8px; border: 1px solid var(--color-celeste);">
    <p style="margin: 0;">💬 <strong>¿Tienes un desafío técnico?</strong></p>
    <p style="margin: 5px 0 0 0; opacity: 0.8;">Escribe "Habla con Aki" y cuéntame sobre tu proyecto para recibir una propuesta personalizada.</p>
  </div>
</div>
`
}
