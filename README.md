# JP Campos Portfolio

Portfolio hibrido con navegacion web clara, terminal interactiva, blog con rutas reales y Aki Assistant para calificar leads.

## Setup rapido

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Webhooks

- `LEAD_WEBHOOK_URL`: webhook para el formulario compacto de contacto
- `AKI_LEAD_WEBHOOK_URL`: webhook dedicado para los briefs de `Aki Assistant`

Ejemplo en `.env.local`:

```env
LEAD_WEBHOOK_URL=https://tu-n8n.com/webhook/contact-leads
AKI_LEAD_WEBHOOK_URL=https://tu-n8n.com/webhook/aki-leads
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
