# API Documentation

Base URL

```text
/api
```

---

# Authentication

## Login

```http
POST /api/auth/login
```

Request

```json
{
  "username": "admin",
  "password": "secret"
}
```

Response

```json
{
  "token": "...",
  "user": {}
}
```

---

# User

## Current User

```http
GET /api/users/me
```

Authentication Required

Response

```json
{
  "user": {}
}
```

---

# OLT

Prefix

```text
/api/olt
```

## Create OLT

```http
POST /api/olt
```

---

## Get OLT List

```http
GET /api/olt
```

---

## Get OLT By ID

```http
GET /api/olt/:id
```

---

## Update OLT

```http
PUT /api/olt/:id
```

---

## Delete OLT

```http
DELETE /api/olt/:id
```

---

## Test Connection

```http
GET /api/olt/:id/connect
```

---

## System Information

```http
GET /api/olt/:id/system
```

---

## ONU Information

```http
GET /api/olt/:id/onu
```

---

## ONU List

```http
GET /api/olt/:id/onus
```

---

## Optical Ports

```http
GET /api/olt/:id/optical
```

---

## Sync OLT Inventory

```http
POST /api/olt/sync
```

---

# ONU

Prefix

```text
/api/onu
```

## Unauthorized ONU List

```http
GET /api/onu/unregistered
```

---

## Authorize ONU

```http
POST /api/onu/authorize
```

Request

```json
{
  "macAddress": "FC1234567890",
  "endpoint": {
    "type": "CUSTOMER",
    "name": "Budi",
    "address": "Bandung"
  }
}
```

Supported Endpoint Types

```text
CUSTOMER
RESELLER
POP
BACKHAUL
```

---

# ONU Inventory

Prefix

```text
/api/onu/inventory
```

## Inventory Summary

```http
GET /api/onu/inventory/summary
```

---

# Endpoint

Prefix

```text
/api/endpoint
```

## Create Endpoint

```http
POST /api/endpoint
```

---

## Get Endpoint List

```http
GET /api/endpoint
```

---

## Get Endpoint By Internet Number

```http
GET /api/endpoint/internet/:internetNo
```

---

## Get Endpoint By ID

```http
GET /api/endpoint/:id
```

---

## Update Endpoint

```http
PUT /api/endpoint/:id
```

---

## Delete Endpoint

```http
DELETE /api/endpoint/:id
```

---

# ONU Replacement

Prefix

```text
/api/onu-replacement
```

## Replacement History

```http
GET /api/onu-replacement
```

---

## Replacement Detail

```http
GET /api/onu-replacement/:id
```

---

## Replace ONU

```http
POST /api/onu-replacement
```

---

# Telegram User

Prefix

```text
/api/telegram/users
```

## Create Telegram User

```http
POST /api/telegram/users
```

---

## Get Telegram Users

```http
GET /api/telegram/users
```

---

## Get Telegram User By ID

```http
GET /api/telegram/users/:id
```

---

## Update Telegram User

```http
PATCH /api/telegram/users/:id
```

---

## Delete Telegram User

```http
DELETE /api/telegram/users/:id
```

---

# Telegram Bot

Prefix

```text
/api/telegram-bots
```

## Create Telegram Bot

```http
POST /api/telegram-bots
```

---

## Get Telegram Bot List

```http
GET /api/telegram-bots
```

---

## Get Telegram Bot By ID

```http
GET /api/telegram-bots/:id
```

---

## Update Telegram Bot

```http
PATCH /api/telegram-bots/:id
```

---

## Delete Telegram Bot

```http
DELETE /api/telegram-bots/:id
```

---

## Send Test Message

```http
POST /api/telegram-bots/:id/test
```

---

## Get Webhook Info

```http
GET /api/telegram-bots/:id/webhook-info
```

---

## Set Webhook

```http
POST /api/telegram-bots/:id/set-webhook
```

---

## Delete Webhook

```http
DELETE /api/telegram-bots/:id/webhook
```

---

# Telegram Access Logs

## Get Access Logs

```http
GET /api/telegram-bots/access-logs
```

---

## Delete Access Log

```http
DELETE /api/telegram-bots/access-logs/:id
```

---

# Authentication

Semua endpoint berikut memerlukan JWT:

```text
/api/users/*
/api/olt/*
/api/onu/*
/api/endpoint/*
/api/telegram/*
/api/telegram-bots/*
/api/onu-replacement/*
```

Endpoint yang tidak memerlukan JWT:

```text
POST /api/auth/login
```
