# User API

Base URL

```text
/api/users
```

Authentication Required: Yes (JWT)

---

# Get Current User

Mengambil informasi user yang sedang login berdasarkan JWT token.

## Endpoint

```http
GET /api/users/me
```

## Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Success Response

```json
{
  "user": {
    "id": "clxxxx",
    "username": "admin",
    "role": "OWNER"
  }
}
```

Field `user` berasal dari payload JWT yang telah divalidasi oleh:

```text
authMiddleware
```

---

## Authentication Flow

```text
Request
   ↓
Authorization Header
   ↓
authMiddleware
   ↓
JWT Verify
   ↓
req.user
   ↓
GET /me
   ↓
Return Current User
```

---

## JWT Payload

Token yang valid akan menghasilkan:

```json
{
  "id": "clxxxx",
  "username": "admin",
  "role": "OWNER"
}
```

atau

```json
{
  "id": "clxxxx",
  "username": "teknisi",
  "role": "TEKNISI"
}
```

---

## Roles

```text
OWNER
TEKNISI
```

---

## Error Responses

### Missing Token

```json
{
  "message": "Unauthorized"
}
```

### Invalid Token

```json
{
  "message": "Unauthorized"
}
```

### Expired Token

```json
{
  "message": "Unauthorized"
}
```

---

# Notes

Saat ini module User hanya menyediakan endpoint:

```text
GET /api/users/me
```

## create user
POST /api/users
```json
Authorize Bearer token
body json
{
  "username": "teknisi1",
  "password": "123456",
  "role": "TEKNISI"
}

respon json
{
  "success": true,
  "message": "USER_CREATED",
  "data": {
    "id": "cmqayjncd0000g18fp8va3paj",
    "username": "teknisi1",
    "role": "TEKNISI",
    "createdAt": "2026-06-12T13:23:56.267Z"
  }
}
```

## get user by id
GET /api/users/:id
```json
respon json
{
  "id": "cmqayjncd0000g18fp8va3paj",
  "username": "teknisi1",
  "role": "TEKNISI",
  "createdAt": "2026-06-12T13:23:56.267Z",
  "updatedAt": "2026-06-12T13:23:56.267Z"
}
```

Belum tersedia:
```text
PATCH /api/users/:id
DELETE /api/users/:id
```