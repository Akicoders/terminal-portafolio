import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface NotificationPayload {
    name?: string
    phone: string
    company?: string
    summary: string
    services?: string[]
}

export async function POST(request: NextRequest) {
    try {
        const data: NotificationPayload = await request.json()

        const pushoverToken = process.env.PUSHOVER_TOKEN
        const pushoverUser = process.env.PUSHOVER_USER

        if (!pushoverToken || !pushoverUser) {
            console.log('Pushover not configured. Lead data:', data)
            return NextResponse.json({
                success: true,
                message: 'Lead recorded (notifications not configured)'
            })
        }

        // Build notification message
        const serviceSuggestions = data.services?.length
            ? `\n\n🎯 Servicios sugeridos:\n${data.services.map(s => `• ${s}`).join('\n')}`
            : ''

        const message = `🔔 NUEVO LEAD DEL PORTFOLIO

👤 Nombre: ${data.name || 'No proporcionado'}
📱 WhatsApp: ${data.phone}
🏢 Empresa: ${data.company || 'No proporcionada'}

📝 Resumen de la conversación:
${data.summary}${serviceSuggestions}

---
Enviado desde: JP Campos Portfolio`

        // Send to Pushover
        const pushoverResponse = await fetch('https://api.pushover.net/1/messages.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: pushoverToken,
                user: pushoverUser,
                message: message,
                title: '🚀 Nuevo Lead - Portfolio',
                priority: 1, // High priority
                sound: 'cashregister',
            }),
        })

        if (!pushoverResponse.ok) {
            console.error('Pushover API error:', await pushoverResponse.text())
            return NextResponse.json({
                success: false,
                error: 'Failed to send notification'
            }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Notification sent successfully'
        })

    } catch (error) {
        console.error('Notification error:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}
