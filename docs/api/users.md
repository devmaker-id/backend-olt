# User API

Base URL

```json
/api/users
```

Authentication Required: Yes (JWT)

## get me (user login)
```json
GET /api/users/me
Authorize: Bearer token

respon json
{
  "success": true,
  "message": "CURRENT_USER_FOUND",
  "data": {
    "id": "cmpjs042x0000g137cp23tlpk",
    "username": "owner",
    "role": "OWNER",
    "email": "admin@bibit.net",
    "telepon": "08123456789",
    "alamat": "jakarta",
    "telegramId": "111111",
    "createdAt": "2026-05-24T12:51:00.394Z",
    "updatedAt": "2026-06-15T16:28:48.728Z"
  }
}
```

## update profile (user login)
```json
PATCH /api/users/me
Authorize: Bearer token

filed dalm update
username -> opsional
telepon -> opsional
email -> opsional
alamat -> opsional
telegram -> opsional

body
{
  "username": "teknisi1234",
  "telepon": "09876543123",
  "email": "changed@bibit.net",
  "alamat": "bondowoso",
  "telegramId": "12121212"
}

respon
{
  "success": true,
  "message": "USER_UPDATED",
  "data": {
    "id": "cmpjs042x0000g137cp23tlpk",
    "username": "teknisi1234",
    "role": "OWNER",
    "email": "changed@bibit.net",
    "telepon": "09876543123",
    "alamat": "bondowoso",
    "telegramId": "12121212",
    "createdAt": "2026-05-24T12:51:00.394Z",
    "updatedAt": "2026-06-15T17:02:02.980Z"
  }
}

jika username already
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": "USERNAME_ALREADY_EXISTS"
}
```
## change password (user login)
```json
PATCH /api/users/password
Authorize: Bearer token

body
{
  "oldPassword": "owner123456",
  "newPassword": "owner123"
}

response
{
  "success": true,
  "message": "PASSWORD_CHANGED",
  "data": null
}
```

## create user
POST /api/users
```json
Authorize Bearer token

semua field wajib di isi (required)
body json
{
  "username": "teknisi",
  "password": "tesing123",
  "role": "TEKNISI",
  "email": "teknisi_CHANGED@bibit.net",
  "telepon": "08987654321",
  "alamat": "bandung",
  "telegramId": "99999"
}

respon json
{
  "success": true,
  "message": "USER_CREATED",
  "data": {
    "id": "cmqffbynf0000g195unqibin3",
    "username": "teknisi",
    "role": "TEKNISI",
    "email": "teknisi_CHANGED@bibit.net",
    "telepon": "08987654321",
    "alamat": "bandung",
    "telegramId": "99999",
    "createdAt": "2026-06-15T16:24:55.851Z",
    "updatedAt": "2026-06-15T16:24:55.851Z"
  }
}
```

## get all users
```json
GET /api/users
Authorize: Bearer token

respons
{
  "success": true,
  "message": "USERS_FOUND",
  "data": [
    {
      "id": "cmqbb7s1q0001g1tv4ppokpip",
      "username": "teknisi",
      "role": "TEKNISI",
      "email": "teknisi@bibit.net",
      "telepon": "08987654321",
      "alamat": "bogor",
      "telegramId": "222222",
      "createdAt": "2026-06-12T19:18:37.503Z",
      "updatedAt": "2026-06-15T14:44:36.672Z"
    },
    {
      "id": "cmpjs042x0000g137cp23tlpk",
      "username": "owner",
      "role": "OWNER",
      "email": "admin@bibit.net",
      "telepon": "08123456789",
      "alamat": "jakarta",
      "telegramId": "111111",
      "createdAt": "2026-05-24T12:51:00.394Z",
      "updatedAt": "2026-06-15T14:44:36.672Z"
    }
  ],
  "meta": {
    "total": 2
  }
}
```

## get user by id
GET /api/users/:id
```json
respon json
{
  "success": true,
  "message": "USER_FOUND",
  "data": {
    "id": "cmpjs042x0000g137cp23tlpk",
    "username": "owner",
    "role": "OWNER",
    "createdAt": "2026-05-24T12:51:00.394Z",
    "updatedAt": "2026-06-15T14:44:36.672Z"
  }
}
```

## patch user (OWNER only)
/api/users/:id
```json
Authorize: Bearer token

body json
{
  "username": "teknisi",
  "role": "TEKNISI",
  "email": "teknisi_CHANGED@bibit.net",
  "telepon": "08987654321",
  "alamat": "bandung",
  "telegramId": "99999"
}

respon json
{
  "success": true,
  "message": "USER_UPDATED",
  "data": {
    "id": "cmqbb7s1q0001g1tv4ppokpip",
    "username": "teknisi",
    "role": "TEKNISI",
    "email": "teknisi_CHANGED@bibit.net",
    "telepon": "08987654321",
    "alamat": "bandung",
    "telegramId": "99999",
    "createdAt": "2026-06-12T19:18:37.503Z",
    "updatedAt": "2026-06-15T16:20:17.921Z"
  }
}
```

## reset password (OWNER only)
```
PATCH /api/users/:id/reset-password
Authorize: Bearer token

```json

body
{
  "password": "admin123"
}

response
{
  "success": true,
  "message": "PASSWORD_RESET",
  "data": null
}
```

## user delete (OWNER only)
DELETE /api/users/:id
```json
Authorize: Bearer token

respon json
{
  "success": true,
  "message": "USER_DELETED",
  "data": null
}

respon jika owner terakhir di hapus
respon json
{
  "success": false,
  "message": "LAST_OWNER_CANNOT_BE_DELETED"
}
```

## flow map
```prisma
Users Self Service
────────────────────
GET    /users/me
PATCH  /users/me
PATCH  /users/password

Users Management
────────────────────
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id

Protection
────────────────────
✅ Prevent deleting last OWNER
```