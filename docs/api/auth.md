# Authentication API

Base URL

```text
/api/auth
```

---

# Login

Authenticate user and generate JWT token.
## token jwt
token ini valid sementara 1d atau 24 jam

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
  "success": true,
  "message": "LOGIN_SUCCESS",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcGpzMDQyeDAwMDBnMTM3Y3AyM3RscGsiLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE3ODE1Mjc1NzksImV4cCI6MTc4MTYxMzk3OX0._76hO2DUl1ZtJDzF3MwH9ihQWoHgDE0D19P9_xn61YA",
    "user": {
      "id": "cmpjs042x0000g137cp23tlpk",
      "username": "owner",
      "role": "OWNER"
    }
  }
}
```

---

## Error Response

### User Not Found

```http
404 Not Found
```

```json
{
  "success": false,
  "message": "USER_NOT_FOUND"
}
```

### Invalid Password

```http
401 Unauthorized
```

```json
{
  "success": false,
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
