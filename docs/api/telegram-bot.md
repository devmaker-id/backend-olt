# Telegram Bot API

Base URL

```text
/api/telegram-bots
```

Authentication Required: Yes (JWT)

---

# Create Telegram Bot

Mendaftarkan Telegram Bot baru ke sistem.

Saat create:

1. Validasi token Telegram
2. Memanggil Telegram API `getMe`
3. Mengambil Bot ID dan Username
4. Validasi bot belum terdaftar
5. Menyimpan bot ke database

## Endpoint

```http
POST /api/telegram-bots
```

## Request

```json
{
  "name": "NMS Bot",
  "token": "123456:ABCDEF",
  "defaultChatId": "-1001234567890",
  "description": "Main monitoring bot"
}
```

## Fields

| Field | Type | Required |
|---------|---------|---------|
| name | string | Yes |
| token | string | Yes |
| defaultChatId | string | No |
| description | string | No |
| webhookUrl | string | No |

## Success Response

```json
{
  "data": {
    "id": "clxxxx",
    "telegramBotId": "123456789",
    "name": "NMS Bot",
    "username": "nms_bot",
    "token": "123456:ABCDEF",
    "isActive": true
  }
}
```

## Error Responses

### Invalid Token

```json
{
  "message": "Token Telegram tidak valid"
}
```

### Duplicate Bot

```json
{
  "message": "Bot Telegram sudah terdaftar"
}
```

---

# Get Telegram Bot List

## Endpoint

```http
GET /api/telegram-bots
```

## Success Response

```json
{
  "data": [
    {
      "id": "clxxxx",
      "telegramBotId": "123456789",
      "name": "NMS Bot",
      "username": "nms_bot",
      "defaultChatId": "-1001234567890",
      "description": "Main monitoring bot",
      "isActive": true,
      "users": []
    }
  ]
}
```

Response diurutkan berdasarkan:

```text
createdAt DESC
```

---

# Get Telegram Bot By ID

## Endpoint

```http
GET /api/telegram-bots/:id
```

## Example

```http
GET /api/telegram-bots/clxxxx
```

## Success Response

```json
{
  "data": {
    "id": "clxxxx",
    "telegramBotId": "123456789",
    "name": "NMS Bot",
    "username": "nms_bot",
    "users": []
  }
}
```

---

# Update Telegram Bot

## Endpoint

```http
PATCH /api/telegram-bots/:id
```

## Request

```json
{
  "name": "NMS Monitoring Bot",
  "defaultChatId": "-1001234567890",
  "description": "Monitoring"
}
```

## Available Fields

```json
{
  "name": "string",
  "username": "string",
  "token": "string",
  "webhookUrl": "string",
  "defaultChatId": "string",
  "description": "string",
  "isActive": true
}
```

## Success Response

```json
{
  "data": {
    "id": "clxxxx",
    "name": "NMS Monitoring Bot"
  }
}
```

---

# Delete Telegram Bot

## Endpoint

```http
DELETE /api/telegram-bots/:id
```

## Success Response

```json
{
  "id": "clxxxx",
  "name": "NMS Bot"
}
```

## Error Response

```json
{
  "success": false,
  "message": "Telegram Bot, tidak ditemukan"
}
```

---

# Send Test Message

Mengirim pesan test ke Telegram Chat ID tertentu.

## Endpoint

```http
POST /api/telegram-bots/:id/test
```

## Request

```json
{
  "chatId": "-1001234567890"
}
```

## Success Response

Response langsung dari Telegram API.

```json
{
  "data": {
    "ok": true,
    "result": {
      "message_id": 123
    }
  }
}
```

## Error Response

```json
{
  "message": "Telegram bot tidak ditemukan"
}
```

---

# Get Webhook Information

Mengambil status webhook Telegram saat ini.

## Endpoint

```http
GET /api/telegram-bots/:id/webhook-info
```

## Success Response

```json
{
  "data": {
    "ok": true,
    "result": {
      "url": "https://example.com/webhook/telegram/clxxxx",
      "pending_update_count": 0
    }
  }
}
```

## Error Response

```json
{
  "message": "Bot tidak ditemukan"
}
```

---

# Set Webhook

Mengatur webhook Telegram.

URL webhook yang disimpan:

```text
{baseUrl}/webhook/telegram/{botId}
```

## Endpoint

```http
POST /api/telegram-bots/:id/set-webhook
```

## Request

```json
{
  "url": "https://example.com"
}
```

## Generated Webhook URL

```text
https://example.com/webhook/telegram/clxxxx
```

## Success Response

```json
{
  "data": {
    "ok": true,
    "result": true,
    "description": "Webhook was set"
  }
}
```

## Error Response

```json
{
  "message": "Bot tidak ditemukan"
}
```

---

# Delete Webhook

Menghapus webhook Telegram.

Jika berhasil:

```text
webhookUrl = null
```

di database.

## Endpoint

```http
DELETE /api/telegram-bots/:id/webhook
```

## Success Response

```json
{
  "data": {
    "ok": true,
    "result": true
  }
}
```

## Error Response

```json
{
  "message": "Bot tidak ditemukan"
}
```

---

# Telegram Access Logs

Base URL

```text
/api/telegram-bots/access-logs
```

---

# Get Access Logs

Mengambil seluruh log akses Telegram.

## Endpoint

```http
GET /api/telegram-bots/access-logs
```

## Success Response

```json
[
  {
    "id": "clxxxx",
    "telegramId": "123456789",
    "username": "budi",
    "firstName": "Budi",
    "message": "/start",
    "chatType": "private",
    "isAuthorized": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "bot": {
      "id": "clbot",
      "name": "NMS Bot"
    }
  }
]
```

Response diurutkan berdasarkan:

```text
createdAt DESC
```

---

# Delete Access Log

## Endpoint

```http
DELETE /api/telegram-bots/access-logs/:id
```

## Success Response

```json
{
  "success": true,
  "message": "Berhasil dihapus",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Telegram Access, tidak ditemukan"
}
```

---

# Telegram Webhook Payload

Contoh payload yang diterima sistem.

```json
{
  "update_id": 123456,
  "message": {
    "message_id": 1,
    "from": {
      "id": 123456789,
      "is_bot": false,
      "first_name": "Budi",
      "username": "budi"
    },
    "chat": {
      "id": 123456789,
      "type": "private"
    },
    "date": 1700000000,
    "text": "/start"
  }
}
```

---

# Message Extraction Types

Webhook logger akan menyimpan:

```text
Text      => isi pesan
Photo     => [PHOTO]
Document  => [DOCUMENT]
Sticker   => [STICKER]
Video     => [VIDEO]
Voice     => [VOICE]
Unknown   => [UNKNOWN]
```

---

# Error Codes

```text
Bot Telegram sudah terdaftar

Token Telegram tidak valid

Telegram bot tidak ditemukan

Bot tidak ditemukan

Telegram Bot, tidak ditemukan

Telegram Access, tidak ditemukan
```