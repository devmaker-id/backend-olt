# Backend Standard v1

## Tujuan

Membangun backend yang:

* Konsisten
* Mudah dikembangkan
* Mudah dipahami developer baru
* Memiliki format response yang seragam
* Memiliki error handling terpusat
* Memiliki logging yang konsisten

---

# Struktur Project

```text
src/
│
├── app.ts
├── server.ts
│
├── bootstrap/
│
├── config/
│   ├── env.ts
│   └── prisma.ts
│
├── core/
│   ├── errors/
│   ├── http/
│   └── logger/
│
├── middleware/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── olt/
│   ├── onu/
│   └── ...
│
├── services/
│
└── types/
```

---

# Standard Response

Semua endpoint wajib menggunakan response helper.

Success:

```json
{
  "success": true,
  "message": "LOGIN_SUCCESS",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "USER_NOT_FOUND"
}
```

Validation:

```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "fieldErrors": {}
  }
}
```

---

# Response Helper

Lokasi:

```text
src/core/http/
```

File:

```text
response.ts
response.types.ts
```

Helper:

```ts
ok()
create()
list()
fail()
```

---

# Error Handling

Lokasi:

```text
src/core/errors/
```

Class:

```text
AppError
NotFoundError
UnauthorizedError
ForbiddenError
ValidationError
```

Contoh:

```ts
throw new NotFoundError(
  'USER_NOT_FOUND'
)
```

---

# Global Error Handler

Lokasi:

```text
src/core/http/error-handler.ts
```

Menangani:

* AppError
* ZodError
* Internal Server Error

Contoh output:

```json
{
  "success": false,
  "message": "VALIDATION_ERROR"
}
```

---

# Logger

Library:

```text
Pino
```

Lokasi:

```text
src/core/logger/
```

Digunakan sebagai logger utama Fastify.

app.ts:

```ts
const app = Fastify({
  loggerInstance: logger
})
```
RULE #7
setelah gunakan PINO
```
Dilarang menggunakan:

console.log
console.error
console.warn

Gunakan:

logger.info
logger.warn
logger.error
logger.debug
```
---

# JWT

Plugin:

```text
src/plugins/jwt.ts
```

Konfigurasi:

```ts
app.register(jwt, {
  secret: env.jwtSecret,
  sign: {
    expiresIn: '1d'
  }
})
```

JWT tidak global.

JWT hanya aktif melalui middleware:

```ts
authMiddleware
```

---

# Middleware

## Auth Middleware

Tugas:

* Verify JWT

Contoh:

```ts
await req.jwtVerify()
```

Jika gagal:

```ts
throw new UnauthorizedError(
  'UNAUTHORIZED'
)
```

---

## Role Middleware

Tugas:

* Authorization

Contoh:

```ts
roleMiddleware(
  Role.OWNER
)
```

atau

```ts
roleMiddleware(
  Role.OWNER,
  Role.ADMIN
)
```

Jika gagal:

```ts
throw new ForbiddenError(
  'INSUFFICIENT_PERMISSION'
)
```

---

# Module Standard

Struktur minimum:

```text
module-name/
│
├── module.routes.ts
├── module.controller.ts
├── module.service.ts
│
└── schemas/
```

Contoh:

```text
auth/
├── auth.routes.ts
├── auth.controller.ts
├── auth.service.ts
└── schemas/
    └── login.schema.ts
```

---

# Controller Rule

Controller hanya:

1. Parse request
2. Panggil service
3. Return response helper

Contoh:

```ts
const body =
  loginSchema.parse(
    req.body
  )

const result =
  await login(body)

return reply.send(
  ok(
    result,
    'LOGIN_SUCCESS'
  )
)
```

Controller dilarang:

```ts
prisma.*
bcrypt.*
try/catch
throw Error()
```

---

# Service Rule

Service bertanggung jawab untuk:

* Business Logic
* Database Access
* Validation Business Rule

Contoh:

```ts
if (!user) {
  throw new NotFoundError(
    'USER_NOT_FOUND'
  )
}
```

Service dilarang:

```ts
reply.send()
reply.status()
```

---

# Schema Rule

Gunakan Zod.

Contoh:

```ts
import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})
```

---

# DTO Rule

Request DTO tidak dibuat file terpisah.

Gunakan:

```ts
export type LoginDto =
  z.infer<typeof loginSchema>
```

Schema menjadi source of truth.

Controller cukup:

```ts
const body =
  loginSchema.parse(
    req.body
  )
```

---

# Auth Module Example

## login.schema.ts

```ts
import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export type LoginDto =
  z.infer<typeof loginSchema>
```

---

## auth.service.ts

```ts
export async function login(
  payload: LoginDto
) {
  ...
}
```

---

## auth.controller.ts

```ts
const body =
  loginSchema.parse(
    req.body
  )

const user =
  await login(body)

const token =
  await reply.jwtSign({
    id: user.id,
    role: user.role,
  })

return reply.send(
  ok(
    {
      token,
      user,
    },
    'LOGIN_SUCCESS',
  ),
)
```

---

# Current Architecture Flow

```text
Route
↓
Controller
↓
Zod Schema
↓
Service
↓
AppError
↓
Global Error Handler
↓
Response Helper
↓
Client
```

---

# Status

Completed:

* Env Validation
* Pino Logger
* Response Helper
* Error Classes
* Global Error Handler
* Zod Validation
* JWT Middleware
* Role Middleware
* Auth Module Refactor

Next:

* Fastify JWT Typing
* Users Module Refactor
* Endpoint Module Refactor
* ONU Module Refactor
* OLT Module Refactor

```
```
