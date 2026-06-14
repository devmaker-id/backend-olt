# Backend OLT Syslog Project Status

Tanggal: 14 Juni 2026

Author: devmaker

---

# Project Overview

Backend OLT dikembangkan sebagai platform monitoring dan manajemen multi-vendor OLT dengan fokus pada:

* Monitoring realtime ONU
* Alarm & Notification
* Syslog Collection
* Audit Log
* Troubleshooting
* Analytics
* Integrasi Telegram
* Database PostgreSQL
* Prisma ORM
* NodeJS + TypeScript

---

# Target Arsitektur

```text
OLT Vendor
   │
   │ Syslog UDP/514
   ▼
Backend Syslog Server
   │
   ├── Vendor Resolver
   │
   ├── Parser
   │
   ├── Service
   │
   ├── Event Handler
   │
   ├── PostgreSQL
   │
   └── Telegram Notification
```

---

# Vendor Yang Sudah Didukung

## HISFOCUS / HIOSO

Status:

✅ Production Ready

Syslog yang berhasil diproses:

* ONU LINKUP
* ONU LINKDOWN
* ONU REGISTERED
* ONU UNREGISTERED

---

## VSOL / GLOBAL GPON

Status:

✅ Core Completed

Syslog yang berhasil diproses:

* ONU Online
* ONU Offline
* WEB Login
* SSH Login
* SSH Logout
* ONU Deregister

---

# Database Schema Yang Sudah Ditambahkan

## SyslogEventLog

Tujuan:

* Audit
* Analytics
* Troubleshooting
* Histori Syslog

Schema:

```text
SyslogEventLog
```

Field utama:

* id
* oltId
* onuIdRef
* type
* sourceIp
* oltName
* eponPort
* onuId
* onuMac
* serialNumber
* payload
* rawLog
* createdAt

Status:

✅ Selesai

---

## Onu

Field baru:

```text
serialNumber
```

Tujuan:

Lookup ONU berbasis Serial Number untuk vendor VSOL.

Status:

✅ Selesai

---

# Multi Vendor Architecture

Struktur:

```text
src/services/syslog/vendors

├── hisfocus
│
└── vsol
```

Resolver:

```text
VendorResolver
```

Flow:

```text
Raw Syslog
    ↓
OltNameResolver
    ↓
Database OLT
    ↓
VendorResolver
    ↓
Vendor Parser
    ↓
Vendor Service
    ↓
Event Handler
```

Status:

✅ Selesai

---

# Vendor HISFOCUS

Folder:

```text
src/services/syslog/vendors/hisfocus
```

Komponen:

* hisfocus.syslog.parser.ts
* hisfocus.syslog.service.ts

Status:

✅ Berjalan

---

# Vendor VSOL

Folder:

```text
src/services/syslog/vendors/vsol
```

Komponen:

* vsol.syslog.parser.ts
* vsol.syslog.service.ts

Status:

✅ Berjalan

---

# Parser VSOL Yang Sudah Dibuat

## onu-status.parser.ts

Menangani:

```text
ONU Online
ONU Offline
```

Status:

✅ Selesai

---

## login.parser.ts

Menangani:

```text
WEB Login
SSH Login
SSH Logout
```

Status:

✅ Selesai

---

## onu-deregister.parser.ts

Menangani:

```text
ONU Deregister
```

Status:

✅ Selesai

---

# Event Handler Yang Sudah Ada

## OnuEventHandler

Fungsi:

* Update Connection State
* Simpan Alarm
* Simpan Event
* Kirim Telegram

Status:

✅ Berjalan

---

## LoginEventHandler

Fungsi:

* Audit Login
* Audit Logout

Status:

🟡 Basic Version

Masih menggunakan log sederhana.

---

## OnuDeregisterHandler

Fungsi:

* Audit Penghapusan ONU

Status:

🟡 Basic Version

Belum ada Telegram Notification.

---

# Telegram Integration

Status:

✅ Berjalan

Fitur:

* ONU ONLINE
* ONU OFFLINE
* ONU UNREGISTERED

Sudah berhasil dikirim ke Telegram.

---

# PostgreSQL Logging

Status:

✅ Berjalan

Data yang tersimpan:

* AlarmLog
* OnuEvent
* SyslogEventLog

---

# Fitur Yang Sudah Teruji

## HISFOCUS

### ONU Down

Status:

✅ Tested

### ONU Up

Status:

✅ Tested

### Telegram

Status:

✅ Tested

---

## VSOL

### ONU Online

Status:

✅ Tested

### ONU Offline

Status:

✅ Tested

### WEB Login

Status:

✅ Tested

### SSH Login

Status:

✅ Tested

### SSH Logout

Status:

✅ Tested

### ONU Deregister

Status:

✅ Tested

---

# Yang Belum Dikerjakan

## Phase 9C

### ONU Dying Gasp

Status:

❌ Belum

Target:

```text
ONU_DYING_GASP
```

---

### ONU LOS

Status:

❌ Belum

Target:

```text
ONU_LOS
```

---

### ONU Auth Failed

Status:

❌ Belum

Target:

```text
ONU_AUTH_FAILED
```

---

## Phase 9D

### Telegram Audit Login

Status:

❌ Belum

Pilihan:

* Aktifkan
* Simpan DB saja

---

### Telegram ONU Delete

Status:

❌ Belum

Contoh:

```text
ONU Deleted

OLT : OLT-MUNCANG
PON : 0/1
ONU : 3
```

---

## Phase 10

### Dashboard Syslog

Status:

❌ Belum

Target:

* Realtime Syslog
* Filter Vendor
* Filter ONU
* Filter Event Type

---

### Dashboard Audit

Status:

❌ Belum

Target:

* Login History
* Logout History
* ONU Delete History

---

### Dashboard Analytics

Status:

❌ Belum

Target:

* ONU Flapping
* Top Offline ONU
* Login Frequency
* Alarm Trend

---

# Technical Debt

## UnauthorizedOnu

Saat ini:

```text
macAddress mandatory
```

Masalah:

Vendor VSOL menggunakan:

```text
serialNumber
```

Perlu redesign:

```text
macAddress?
serialNumber?
```

Status:

🟡 Pending

---

## Payload Standardization

Belum semua parser memiliki struktur payload yang konsisten.

Target:

```json
{
  "vendor": "...",
  "event": "...",
  "details": {}
}
```

Status:

🟡 Pending

---

# Current Project Health

Core Syslog Server:
✅ Stable

Multi Vendor Architecture:
✅ Stable

Hisfocus Integration:
✅ Stable

VSOL Integration:
✅ Stable

Telegram Notification:
✅ Stable

Database Logging:
✅ Stable

Production Readiness:
🟢 Good

---

# Next Recommended Milestone

Phase 9C

Prioritas:

1. ONU Dying Gasp
2. ONU LOS
3. ONU Auth Failed
4. ONU Delete Telegram Notification
5. Audit Dashboard
6. Syslog Dashboard

---

End of Document
