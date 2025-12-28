// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = "edge"


const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// Filter out the LEAD marker from the stream
function filterLeadMarker(stream: ReadableStream): ReadableStream {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''

  return new ReadableStream({
    async start(controller) {
      const reader = stream.getReader()

      try {
        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            // Process any remaining buffer (filter LEAD marker)
            const filtered = buffer.replace(/<!--LEAD:\{[\s\S]*?\}-->/g, '')
            if (filtered) {
              controller.enqueue(encoder.encode(filtered))
            }
            controller.close()
            break
          }

          buffer += decoder.decode(value, { stream: true })

          // Check if we might have a partial LEAD marker
          const leadStart = buffer.indexOf('<!--LEAD:')

          if (leadStart === -1) {
            // No LEAD marker, safe to output
            controller.enqueue(encoder.encode(buffer))
            buffer = ''
          } else if (buffer.includes('-->')) {
            // Complete LEAD marker found, filter it out
            const filtered = buffer.replace(/<!--LEAD:\{[\s\S]*?\}-->/g, '')
            controller.enqueue(encoder.encode(filtered))
            buffer = ''
          }
          // If partial LEAD marker, keep buffering
        }
      } catch (err) {
        controller.error(err)
      }
    }
  })
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      stream: true,
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: `You are Aki, the AI assistant for Jose Paul Campos Terrones (JP Campos).

LANGUAGE RULES:
- Detect the user's language from their message
- If they write in English, respond in English
- If they write in Spanish, respond in Spanish
- Match their formality level

TONE & STYLE:
- Professional but approachable - like a friendly consultant
- Keep responses SHORT: 2-3 sentences max
- Avoid bullet lists unless specifically asked
- Be direct, no filler phrases like "Certainly!" or "Of course!"
- Use emojis sparingly (1 max per response)

ABOUT JP CAMPOS:
- Fullstack Developer specialized in AI, ML, and Process Automation
- Philosophy: "Any repeating process is highly automatable"
- Available for freelance projects and consulting

KEY ACHIEVEMENTS:
- LLM optimization: reduced VRAM from 30GB to 14GB (52% savings)
- AI agent architecture design
- Business automation with N8N, Flowise
- RAG chatbots with vector databases
- 30% operational cost reduction for clients

SERVICES:
🤖 AI Chatbots | 🔄 Process Automation | 📊 ML Analytics
🌐 Full Stack Web Dev | 💡 Digital Transformation Consulting

SALES APPROACH:
1. Ask about their challenges, don't wait for them to explain everything
2. Connect their problem to a specific service Paul offers
3. Suggest concrete solutions with expected benefits
4. When they show interest, smoothly ask for their WhatsApp number:
   - "I'd love to connect you with Paul. What's your WhatsApp number?"
   - "Paul can discuss this further. May I get your name and WhatsApp?"

LEAD CAPTURE CRITICAL:
When you receive a phone/WhatsApp number, you MUST include this special marker at the END of your response:
<!--LEAD:{"name":"[their name or 'Not provided']","phone":"[their WhatsApp number]","company":"[company or 'Not provided']","summary":"[2-3 sentence summary of what they need]","services":["service1","service2"]}-->

Example: If someone says "Me llamo Juan, mi WhatsApp es +51 999888777, necesito un chatbot para mi tienda"
Your response should end with:
<!--LEAD:{"name":"Juan","phone":"+51 999888777","company":"Not provided","summary":"Necesita un chatbot para su tienda de retail","services":["AI Chatbots","Process Automation"]}-->

This marker will trigger a notification to Paul. ALWAYS include it when you get a phone number.

IMPORTANT RESPONSES:
- For "projects" command mention: type 'projects' in terminal
- For pricing: Paul provides custom quotes after understanding needs
- For availability: Paul is currently available for new projects

CONTACT: josepaulcamposterrones@gmail.com | GitHub: @Akicoders`,
        },
        ...messages,
      ],
    })

    // Callback to process the full response when streaming completes
    const onCompletion = async (completion: string) => {
      // Check for LEAD marker in the response
      const leadMatch = completion.match(/<!--LEAD:(\{[\s\S]*?\})-->/)

      if (leadMatch) {
        try {
          const leadData = JSON.parse(leadMatch[1])

          // Call the notify API
          const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000'

          await fetch(`${baseUrl}/api/notify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          }).catch(err => console.error('Failed to send notification:', err))

        } catch (e) {
          console.error('Failed to parse LEAD data:', e)
        }
      }
    }

    const stream = await OpenAIStream(response, { onCompletion })

    // Filter out the LEAD marker before sending to client
    const filteredStream = filterLeadMarker(stream)

    return new StreamingTextResponse(filteredStream)
  } catch (err) {

    return new Response(
      JSON.stringify({
        type: "message",
        role: "assistant",
        content: "¡Ups! Parece que hay mucho tráfico ahora mismo. Por favor, intenta de nuevo en unos segundos 🙏",
        date: new Date().toISOString(),
        error: true,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
