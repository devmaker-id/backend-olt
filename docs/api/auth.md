# Authentication API

Base URL

```text
/api/auth
```

---

# Login

Authenticate user and generate JWT token.

## Endpoint

```http
POST /api/auth/login
```

## Authentication

Not Required

---

## Request

### Body

```json
{
  "username": "admin",
  "password": "secret"
}
```

### Fields

| Field    | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

---

## Success Response

### Status

```http
200 OK
```

### Body

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "clxxxx",
    "username": "admin",
    "role": "OWNER"
  }
}
```

---

## Error Response

### User Not Found

```http
401 Unauthorized
```

```json
{
  "message": "USER_NOT_FOUND"
}
```

### Invalid Password

```http
401 Unauthorized
```

```json
{
  "message": "INVALID_PASSWORD"
}
```

---

## JWT Payload

Generated token contains:

```json
{
  "id": "USER_ID",
  "role": "OWNER"
}
```

or

```json
{
  "id": "USER_ID",
  "role": "TEKNISI"
}
```

---

## User Roles

```text
OWNER
TEKNISI
```

---

## Backend Flow

POST /login
↓
loginController
↓
auth.service.login()
↓
Find User
↓
Validate Password (bcrypt)
↓
Generate JWT
↓
Return Token + User

```
```
