# JP Campos Portfolio

Portfolio hibrido con navegacion web clara, terminal interactiva, blog con rutas reales y Aki Assistant para calificar leads.

## Setup rapido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Nunca subas `.env`, `.env.local` ni credenciales reales al repositorio.

## Webhooks

- `LEAD_WEBHOOK_URL`: webhook para el formulario compacto de contacto
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`: envio opcional por correo con Resend para el formulario compacto
- `AKI_LEAD_WEBHOOK_URL`: webhook dedicado para los briefs de `Aki Assistant`
- `AKI_LEAD_WEBHOOK_AUTH_HEADER` o `AKI_LEAD_WEBHOOK_USERNAME` + `AKI_LEAD_WEBHOOK_PASSWORD`: autenticacion opcional para el webhook de Aki

Ejemplo en `.env.local`:

```env
LEAD_WEBHOOK_URL=https://tu-n8n.com/webhook/contact-leads
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=portfolio@tu-dominio.com
RESEND_TO_EMAIL=josepaulcamposterrones@gmail.com
AKI_LEAD_WEBHOOK_URL=https://tu-n8n.com/webhook/aki-leads
AKI_LEAD_WEBHOOK_USERNAME=tu-usuario
AKI_LEAD_WEBHOOK_PASSWORD=tu-password
```

## Flujo recomendado con n8n

Para `AKI_LEAD_WEBHOOK_URL`:

1. `Webhook` recibe el JSON desde `/api/aki-leads`
2. `Set` o `Code` prepara el mensaje para venta/seguimiento
3. `Telegram` envia el brief a tu chat o canal privado
4. Opcional: guardar en Airtable, Notion, Google Sheets o CRM

El payload incluye:

- datos del cliente (`name`, `email`, `company`)
- contexto comercial (`service`, `challenge`, `goal`, `timeline`, `budget`)
- resumen ya trabajado por Aki (`summary`, `proposal`, `salesAngle`)
- texto listo para Telegram (`telegramText`)

## Rutas importantes

- `/` portfolio principal
- `/aki` Aki Assistant
- `/blog/[slug]` articulos reales del blog

## Comandos utiles

- `help`
- `theme set <tema>`
- `blog`
- `skills`
- `projects`
- `aki`
