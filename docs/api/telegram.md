# Telegram User API

Base URL

```text
/api/telegram
```

Authentication Required: Yes (JWT)

---

# Create Telegram User

Mendaftarkan Telegram User yang diperbolehkan mengakses Telegram Bot.

## Endpoint

```http
POST /api/telegram
```

## Request

```json
{
  "telegramId": "123456789",
  "username": "budi",
  "fullName": "Budi Setiawan",
  "role": "TEKNISI"
}
```

## Fields

| Field | Type | Required |
|---------|---------|---------|
| telegramId | string | Yes |
| username | string | No |
| fullName | string | No |
| role | TelegramRole | No |

## Telegram Roles

```text
ADMIN
TEKNISI
```

## Success Response

```json
{
  "id": "clxxxx",
  "telegramId": "123456789",
  "username": "budi",
  "fullName": "Budi Setiawan",
  "role": "TEKNISI",
  "isActive": true,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## Error Response

### Duplicate Telegram User

```json
{
  "message": "TELEGRAM_USER_ALREADY_EXISTS"
}
```

---

# Get Telegram User List

Mengambil seluruh Telegram User.

## Endpoint

```http
GET /api/telegram
```

## Success Response

```json
[
  {
    "id": "clxxxx",
    "telegramId": "123456789",
    "username": "budi",
    "fullName": "Budi Setiawan",
    "role": "TEKNISI",
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

Response diurutkan berdasarkan:

```text
createdAt DESC
```

---

# Get Telegram User By ID

## Endpoint

```http
GET /api/telegram/:id
```

## Example

```http
GET /api/telegram/clxxxx
```

## Success Response

```json
{
  "id": "clxxxx",
  "telegramId": "123456789",
  "username": "budi",
  "fullName": "Budi Setiawan",
  "role": "TEKNISI",
  "isActive": true
}
```

---

# Update Telegram User

## Endpoint

```http
PATCH /api/telegram/:id
```

## Request

```json
{
  "username": "budi_update",
  "fullName": "Budi Update",
  "role": "ADMIN",
  "isActive": true
}
```

## Available Fields

| Field | Type |
|---------|---------|
| username | string |
| fullName | string |
| role | TelegramRole |
| isActive | boolean |

## Success Response

```json
{
  "id": "clxxxx",
  "telegramId": "123456789",
  "username": "budi_update",
  "fullName": "Budi Update",
  "role": "ADMIN",
  "isActive": true
}
```

---

# Delete Telegram User

## Endpoint

```http
DELETE /api/telegram/:id
```

## Success Response

```json
{
  "id": "clxxxx",
  "telegramId": "123456789",
  "username": "budi"
}
```

---

# Internal Authorization Helper

Digunakan oleh Telegram Bot untuk memvalidasi apakah pengguna Telegram diperbolehkan menggunakan bot.

Bukan REST API.

## Function

```ts
validateTelegramUser(
  telegramId: string
)
```

## Validation Rules

User dianggap valid jika:

```text
telegramId ditemukan
dan
isActive = true
```

Jika tidak:

```text
return null
```

Jika valid:

```text
return TelegramUser
```

---

# Telegram User Schema

```json
{
  "id": "string",
  "telegramId": "string",
  "username": "string | null",
  "fullName": "string | null",
  "role": "ADMIN | TEKNISI",
  "isActive": true,
  "telegramBotId": "string | null",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

# Error Codes

```text
TELEGRAM_USER_ALREADY_EXISTS
```