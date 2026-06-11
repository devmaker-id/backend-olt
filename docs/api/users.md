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

Belum tersedia:

```text
GET /api/users
GET /api/users/:id

POST /api/users

PATCH /api/users/:id

DELETE /api/users/:id
```

Sehingga manajemen User masih dilakukan langsung melalui database atau belum diimplementasikan.