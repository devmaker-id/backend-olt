# Authentication API
Devmaker-id, 16 Juni 2026


## Base URL

```text
/api/auth
```

---

# Login

Authenticate user and generate JWT token.

## JWT Token

Token berlaku selama:

```text
1 hari (24 jam)
```

---

## Endpoint

```http
POST /api/auth/login
```

## Authentication

```text
Not Required
```

---

# Standard Success Response

```json
{
  "success": true,
  "message": "MESSAGE_CODE",
  "data": {}
}
```

---

# Standard Error Response

## Validation Error

```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "fieldErrors": {
      "username": [
        "Required"
      ]
    }
  }
}
```

## Unauthorized

```json
{
  "success": false,
  "message": "INVALID_PASSWORD"
}
```

## Not Found

```json
{
  "success": false,
  "message": "USER_NOT_FOUND"
}
```

## Internal Server Error

```json
{
  "success": false,
  "message": "INTERNAL_SERVER_ERROR"
}
```

---

# Request

## Body

```json
{
  "username": "owner",
  "password": "admin123"
}
```

## Fields

| Field    | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| password | string | Yes      |

---

# Success Response

## Status

```http
200 OK
```

## Body

```json
{
  "success": true,
  "message": "LOGIN_SUCCESS",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "cmpjs042x0000g137cp23tlpk",
      "username": "owner",
      "role": "OWNER",
      "email": "admin@bibit.net",
      "telepon": "08123456789",
      "alamat": "Jakarta",
      "telegramId": "111111",
      "createdAt": "2026-05-24T12:51:00.394Z",
      "updatedAt": "2026-06-15T17:02:02.980Z"
    }
  }
}
```

> Password tidak pernah dikembalikan oleh API.

---

# Error Responses

## User Not Found

### Status

```http
404 Not Found
```

### Body

```json
{
  "success": false,
  "message": "USER_NOT_FOUND"
}
```

---

## Invalid Password

### Status

```http
401 Unauthorized
```

### Body

```json
{
  "success": false,
  "message": "INVALID_PASSWORD"
}
```

---

## Validation Error

### Status

```http
400 Bad Request
```

### Body

```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "fieldErrors": {
      "username": [
        "Required"
      ],
      "password": [
        "Required"
      ]
    }
  }
}
```

---

# JWT Payload

Token JWT berisi payload berikut:

## OWNER

```json
{
  "id": "USER_ID",
  "role": "OWNER"
}
```

## TEKNISI

```json
{
  "id": "USER_ID",
  "role": "TEKNISI"
}
```

---

# User Roles

```text
OWNER
TEKNISI
```

---

# Message Codes

## Success

```text
LOGIN_SUCCESS
```

## Error

```text
USER_NOT_FOUND

INVALID_PASSWORD

VALIDATION_ERROR

INTERNAL_SERVER_ERROR
```

---

# Authentication Flow

```text
POST /api/auth/login
        ↓
loginController
        ↓
loginSchema.parse()
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
