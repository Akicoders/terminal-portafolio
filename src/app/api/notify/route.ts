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

        const resendApiKey = process.env.RESEND_API_KEY

        if (!resendApiKey) {
            console.log('Resend not configured. Lead data:', data)
            return NextResponse.json({
                success: true,
                message: 'Lead recorded (notifications not configured)'
            })
        }

        // Build notification email
        const serviceSuggestions = data.services?.length
            ? `<h3>🎯 Servicios sugeridos:</h3><ul>${data.services.map(s => `<li>${s}</li>`).join('')}</ul>`
            : ''

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00B4D8;">🔔 NUEVO LEAD DEL PORTFOLIO</h1>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>👤 Nombre:</strong> ${data.name || 'No proporcionado'}</p>
                <p><strong>📱 WhatsApp:</strong> <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}">${data.phone}</a></p>
                <p><strong>🏢 Empresa:</strong> ${data.company || 'No proporcionada'}</p>
            </div>
            
            <h3>📝 Resumen de la conversación:</h3>
            <p style="background: #e8f4f8; padding: 15px; border-left: 4px solid #00B4D8; border-radius: 4px;">
                ${data.summary}
            </p>
            
            ${serviceSuggestions}
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="color: #888; font-size: 12px;">
                Enviado desde: JP Campos Portfolio - akicoders.site
            </p>
        </div>
        `

        // Send email via Resend
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Portfolio Leads <leads@akicoders.site>',
                to: 'josepaulcamposterrones@gmail.com',
                subject: `🚀 Nuevo Lead: ${data.name || 'Visitante'} - ${data.phone}`,
                html: htmlContent,
            }),
        })

        if (!resendResponse.ok) {
            console.error('Resend API error:', await resendResponse.text())
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
