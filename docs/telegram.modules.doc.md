## ENDPOINT
```prisma
POST   /api/telegram/users
GET    /api/telegram/users
GET    /api/telegram/users/:id
PATCH  /api/telegram/users/:id
DELETE /api/telegram/users/:id
```

## CRUD WAJIB HEADER
Authorize Bearer tokenXXXXXxxxxx

## create body
ROLE -> TelegramRole ADMIN | TEKNISI
```json
{
  "telegramId": "12345678",
  "username": "test_tele",
  "fullName": "full_tele",
  "role": "ADMIN"
}
```

## get respon
```json
[
  {
    "id": "cmpm826dt0000g18af6qe5ll3",
    "telegramId": "12345678",
    "username": "test_tele",
    "fullName": "full_tele",
    "role": "ADMIN",
    "isActive": true,
    "createdAt": "2026-05-26T05:56:02.897Z"
  }
]
```

## update PATCH
wajib header json token
```json
/api/telegram/users/cmpm826dt0000g18af6qe5ll3
```
## body patch
```json
{
  "role": "TEKNISI",
  "isActive": false
}
``` 
