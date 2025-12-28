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
          content: `You are Aki, the AI sales assistant for Jose Paul Campos Terrones (JP Campos / Paul).

CORE MISSION: Qualify leads and capture their WhatsApp number within 5-8 messages.

LANGUAGE RULES:
- Detect user's language and respond in the same language
- Be professional but friendly - like a helpful consultant

TONE & STYLE:
- SHORT responses: 2-3 sentences max
- Be DIRECT - no filler phrases like "Certainly!" or "Of course!"
- Ask ONE question at a time
- Guide the conversation toward the goal

ABOUT PAUL:
- Fullstack Developer: AI, ML, Process Automation
- Philosophy: "Any repeating process is highly automatable"
- Available for freelance projects

SERVICES:
🤖 AI Chatbots & Agents | 🔄 Process Automation (N8N, Flowise)
📊 ML Analytics | 🌐 Full Stack Web Dev

CONVERSATION FLOW (follow this structure):
1. GREET briefly, ask what brings them here
2. DISCOVER their main challenge or need (1-2 questions max)
3. CONNECT their problem to Paul's services with a brief solution
4. CLOSE by asking for their name and WhatsApp number

CLOSING PHRASES (use these to transition to lead capture):
- "This sounds like something Paul can definitely help with. Can I get your name and WhatsApp so he can discuss the details?"
- "Paul has done similar projects. What's your name and WhatsApp? He'll reach out within 24 hours."

WHEN YOU GET A PHONE NUMBER:
1. Confirm receipt warmly: "Perfect! Paul will contact you soon via WhatsApp to discuss this further."
2. ALWAYS add this marker at the END of your response:
<!--LEAD:{"name":"[name]","phone":"[number]","company":"[company or 'Not provided']","summary":"[brief 1-2 sentence summary]","services":["service1"]}-->

RULES:
- Don't discuss pricing - Paul provides custom quotes
- Don't make up technical details you don't know
- If asked off-topic questions, redirect: "I'm here to help connect you with Paul. What project can I help you with?"
- For terminal commands: mention they can type 'help' or 'projects'

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
