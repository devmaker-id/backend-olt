# Episode 1 — Backend OLT Monitoring Documentation

## Overview

Project ini adalah backend monitoring dan automation untuk OLT Hisfocus/Hioso menggunakan:

- Node.js
- Fastify
- PostgreSQL 16
- Prisma ORM
- JWT Authentication
- Raw Telnet Socket
- TypeScript

Fokus episode pertama:

- Authentication
- OLT CRUD
- Telnet Transport
- Vendor Adapter
- ONU Information
- Optical Information
- Network Architecture

---

# Architecture

```txt
HTTP API
↓
Controller
↓
Network Factory
↓
Connection Manager
↓
Vendor Adapter
↓
Transport Layer
↓
OLT Device
```

---

# Folder Structure
buka docs ./folder_structure.md

---

# Authentication

Authentication menggunakan JSON Web Token.

Role:

```txt
OWNER
TEKNISI
```

---

# Login Endpoint

## POST

```txt
/api/auth/login
```

## Body

```json
{
  "username": "owner",
  "password": "admin123"
}
```

## Response

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "cmxxxx",
    "username": "owner",
    "role": "OWNER"
  }
}
```

---

# Authorization Header

Semua endpoint protected menggunakan:

```txt
Authorization: Bearer JWT_TOKEN
```

---

# OLT CRUD

---

## Create OLT

### POST

```txt
/api/olt
```

syslogName @unique immutable -> dipurlukan untuk log
### Body

```json
{
  "name": "OLT POP PUSAT",
  "syslogName": "OLT_BIBITNET",
  "ipAddress": "192.168.10.253",
  "telnetPort": 23,
  "username": "admin",
  "password": "admin",
  "vendor": "HISFOCUS",
  "location": "POP PUSAT"
}
```

---

## Get All OLT

### GET

```txt
/api/olt
```

---

## Get OLT By ID

### GET

```txt
/api/olt/:id
```

---

## Update OLT

### PUT

```txt
/api/olt/:id
```

### Body

```json
{
  "location": "POP CABANG"
}
```

---

## Delete OLT

### DELETE

```txt
/api/olt/:id
```

---

# Network Layer

Backend menggunakan raw telnet socket.

Tidak menggunakan:

```txt
telnet-client
```

karena CLI Hisfocus/Hioso lebih stabil menggunakan:

```txt
net.Socket
```

---

# Telnet Features

Transport mendukung:

- Username prompt detection
- Password prompt detection
- Command queue
- Prompt detection
- Timeout handling
- Persistent connection
- Connection pooling
- Pagination handling

---

# Connection Manager

```txt
1 OLT
=
1 Persistent Connection
```

Connection manager bertugas:

- reuse telnet connection
- manage active session
- prevent duplicate login
- connection pooling

---

# Vendor Adapter

Saat ini fokus vendor:

```txt
HISFOCUS
HIOSO
```

Vendor adapter bertugas:

- abstraction command
- parsing output
- ONU intelligence
- optical logic

---

# Supported Commands

## System Info

```txt
show system
```

## Network Info

```txt
show network
```

## ONU Info

```txt
show onu info epon 0/1 1
```

## Optical Info

```txt
show onu optical-ddm epon 0/1 1
```

---

# Get System Info

## GET

```txt
/api/olt/:id/system
```

## Response

```json
{
  "success": true,
  "data": {
    "mac": "78:5c:72:ab:67:84",
    "name": "OLT_JMNET",
    "description": "Pt. Bibit Networks Indonesia",
    "location": "bibitnet.web.id",
    "model": "4P1GM",
    "software": "V2.2.84",
    "revisiondate": "20251201",
    "hardware": "V9.0",
    "sn": "SN2026-03-7960",
    "uptime": "2 days 5 hours"
  }
}
```

---

# Get Network Info

## GET

```txt
/api/olt/:id/network
```

---

# Get ONU Info

## GET

```txt
/api/olt/:id/onu?epon=0/1&onuId=1
```

---

# ONU Response Example

```json
{
  "success": true,
  "data": {
    "onu": {
      "onu_id": "0/1:1",
      "onu_mac": "60:d7:55:df:eb:49",
      "onu_name": "HUAWEI RUMAH",
      "online_status": "Up",
      "activate_status": "Activated",
      "onu_type": "SFU",
      "wifi": "1",
      "ctc_autoneg": "CtcNegDone",
      "connection_state": "ONLINE",
      "is_online": true,
      "online_time": "2D4H7M0S"
    },
    "optical": {
      "temperature": "52.00 C",
      "voltage": "3.00 V",
      "txbias": "16.00 mA",
      "txpower": "2.13 dBm",
      "rxpower": "-10.33 dBm"
    }
  }
}
```

---

# ONU Intelligence Mapping

Backend melakukan normalisasi status ONU.

## Mapping

### ONLINE

```txt
CtcNegDone
```

Makna:

```txt
ONU online normal
```

---

### ONU_POWER_OFF

```txt
MpcpDiscovery
```

Makna:

```txt
Adaptor/listrik ONU mati
```

---

### FIBER_LOS

```txt
--
```

Makna:

```txt
Kabel FO putus / LOS
```

---

### ONU_AUTH_FAILED

```txt
CtcInfo
```

Makna:

```txt
ONU gagal autentikasi ke OLT
```

---

# Optical DDM Rules

OLT Hisfocus hanya memberikan:

```txt
optical-ddm
```

jika ONU benar-benar online.

Kondisi:

```txt
CtcNegDone
```

Jika ONU offline:

```json
{
  "optical": null
}
```

---

# Error Handling

## ONU Tidak Ditemukan

```json
{
  "success": false,
  "message": "FAILED_GET_ONU_INFO",
  "error": "ONU_NOT_FOUND"
}
```

---

## Credential Salah

```json
{
  "success": false,
  "message": "FAILED_CONNECT_OLT",
  "error": "INVALID_TELNET_CREDENTIAL"
}
```

---

# Current Milestone

## Completed

```txt
AUTHENTICATION
JWT
POSTGRESQL
PRISMA
OLT CRUD
RAW TELNET TRANSPORT
CONNECTION MANAGER
VENDOR ADAPTER
SYSTEM INFO
NETWORK INFO
ONU INFO
OPTICAL INFO
ONU STATUS INTELLIGENCE
```

---

# Next Episode

Planned:

```txt
ONU DATABASE
SYSLOG SERVER
TELEGRAM BOT
ONU MONITORING
ONU REBOOT
ONU AUTHORIZATION
REALTIME ALARM
NOC DASHBOARD
```

