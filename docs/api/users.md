# Users API
Devmaker-id, 16 Juni 2026


## Base URL

```text
/api/users
```

## Authentication

Semua endpoint membutuhkan JWT Bearer Token.

```http
Authorization: Bearer <token>
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

## Business Error

```json
{
  "success": false,
  "message": "USERNAME_ALREADY_EXISTS"
}
```

## Unauthorized

```json
{
  "success": false,
  "message": "UNAUTHORIZED"
}
```

## Forbidden

```json
{
  "success": false,
  "message": "INSUFFICIENT_PERMISSION"
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

# User Object

```json
{
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
```

> Password tidak pernah dikembalikan oleh API.

---

# Self Service

Endpoint yang dapat diakses semua user yang sudah login.

---

## Get Current User

```http
GET /api/users/me
```

### Authorization

```text
Required
```

### Success Response

```json
{
  "success": true,
  "message": "CURRENT_USER_FOUND",
  "data": {
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
```

---

## Update Profile

```http
PATCH /api/users/me
```

### Authorization

```text
Required
```

### Request Body

| Field      | Type   | Required |
| ---------- | ------ | -------- |
| username   | string | No       |
| email      | string | No       |
| telepon    | string | No       |
| alamat     | string | No       |
| telegramId | string | No       |

### Example

```json
{
  "username": "owner123",
  "email": "owner@bibit.net",
  "telepon": "08123456789",
  "alamat": "Bandung",
  "telegramId": "999999"
}
```

### Success Response

```json
{
  "success": true,
  "message": "USER_UPDATED",
  "data": {}
}
```

---

## Change Password

```http
PATCH /api/users/password
```

### Authorization

```text
Required
```

### Request Body

```json
{
  "oldPassword": "admin123",
  "newPassword": "admin123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "PASSWORD_CHANGED",
  "data": null
}
```

### Possible Errors

```text
INVALID_OLD_PASSWORD
```

---

# User Management (OWNER Only)

Endpoint berikut hanya dapat diakses role OWNER.

---

## Get All Users

```http
GET /api/users
```

### Success Response

```json
{
  "success": true,
  "message": "USERS_FOUND",
  "data": [],
  "meta": {
    "total": 2
  }
}
```

---

## Get User By ID

```http
GET /api/users/:id
```

### Success Response

```json
{
  "success": true,
  "message": "USER_FOUND",
  "data": {}
}
```

### Possible Errors

```text
USER_NOT_FOUND
```

---

## Create User

```http
POST /api/users
```

### Request Body

| Field      | Type            | Required |
| ---------- | --------------- | -------- |
| username   | string          | Yes      |
| password   | string          | Yes      |
| role       | OWNER | TEKNISI | Yes      |
| email      | string          | Yes      |
| telepon    | string          | Yes      |
| alamat     | string          | Yes      |
| telegramId | string          | Yes      |

### Example

```json
{
  "username": "teknisi",
  "password": "admin123",
  "role": "TEKNISI",
  "email": "teknisi@bibit.net",
  "telepon": "08123456789",
  "alamat": "Bandung",
  "telegramId": "222222"
}
```

### Success Response

```json
{
  "success": true,
  "message": "USER_CREATED",
  "data": {}
}
```

### Possible Errors

```text
USERNAME_ALREADY_EXISTS
```

---

## Update User

```http
PATCH /api/users/:id
```

### Request Body

Semua field bersifat optional.

```json
{
  "username": "teknisi",
  "role": "TEKNISI",
  "email": "updated@bibit.net",
  "telepon": "089999999",
  "alamat": "Surabaya",
  "telegramId": "333333"
}
```

### Success Response

```json
{
  "success": true,
  "message": "USER_UPDATED",
  "data": {}
}
```

---

## Reset Password

```http
PATCH /api/users/:id/reset-password
```

### Request Body

```json
{
  "password": "admin123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "PASSWORD_RESET",
  "data": null
}
```

---

## Delete User

```http
DELETE /api/users/:id
```

### Success Response

```json
{
  "success": true,
  "message": "USER_DELETED",
  "data": null
}
```

### Possible Errors

```text
USER_NOT_FOUND

LAST_OWNER_CANNOT_BE_DELETED
```

---

# Roles

```text
OWNER
TEKNISI
```

---

# Message Codes

## Success

```text
CURRENT_USER_FOUND
USERS_FOUND
USER_FOUND

USER_CREATED
USER_UPDATED
USER_DELETED

PASSWORD_CHANGED
PASSWORD_RESET
```

## Error

```text
USER_NOT_FOUND

USERNAME_ALREADY_EXISTS

INVALID_OLD_PASSWORD

LAST_OWNER_CANNOT_BE_DELETED

UNAUTHORIZED

INSUFFICIENT_PERMISSION

VALIDATION_ERROR

INTERNAL_SERVER_ERROR
```

---

# Route Map

## Self Service

```text
GET    /users/me
PATCH  /users/me
PATCH  /users/password
```

## Management (OWNER)

```text
GET    /users
GET    /users/:id

POST   /users

PATCH  /users/:id
PATCH  /users/:id/reset-password

DELETE /users/:id
```
