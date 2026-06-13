# Syslog Refactor & Event Catalog Development

**Tanggal:** 14 Juni 2026

## Tujuan

Membangun fondasi Syslog Service yang scalable, modular, dan siap untuk:

* Monitoring realtime
* Audit aktivitas perangkat
* Troubleshooting jaringan
* Analytics historis

---

# Kondisi Awal

Implementasi awal Syslog hanya mendukung:

* UDP Syslog Server
* Parsing ONU LinkUp
* Parsing ONU LinkDown
* Update status ONU
* Alarm
* Telegram Notification

Seluruh logic masih berada dalam satu service:

```text
src/services/syslog/vendors/hisfocus/hisfocus.syslog.service.ts
```

dan parser masih berupa single parser.

---

# Phase 1 - Syslog Listener

## Tujuan

Membangun pondasi Syslog Server.

### Hasil

Mendengarkan Syslog pada:

```env
SYSLOG_BIND_ADDRESS=0.0.0.0
SYSLOG_PORT=514
```

Server menerima Syslog dari seluruh interface.

---

# Phase 2 - Environment Refactor

## Tujuan

Migrasi konfigurasi environment ke Zod.

### File

```text
src/config/env.ts
```

### Hasil

Menggunakan validasi:

```ts
z.object(...)
```

Keuntungan:

* Type-safe
* Validasi startup
* Tidak ada lagi undefined env

---

# Phase 3 - IP Filtering

## Tujuan

Validasi sumber Syslog.

### File

```text
src/services/syslog/core/syslog-ip-filter.ts
```

### Hasil

Support:

```env
SYSLOG_STRICT_MODE=true
SYSLOG_ALLOWED_IPS=...
```

Validasi source IP dilakukan sebelum event diproses.

---

# Phase 4 - Syslog Event Standardization

## Tujuan

Membuat representasi event yang seragam.

### File

```text
src/services/syslog/core/syslog-event.ts
```

### Hasil

Seluruh parser menghasilkan:

```ts
SyslogEvent
```

bukan lagi ParsedSyslog.

---

## Event Type

```ts
export type SyslogEventType =
  | 'ONU_LINKUP'
  | 'ONU_LINKDOWN'
  | 'ONU_LOS'
  | 'ONU_DYING_GASP'
  | 'ONU_REGISTER'
  | 'ONU_UNREGISTER'
  | 'WEB_LOGIN'
  | 'WEB_LOGOUT'
  | 'WEB_CONNECTION'
  | 'WEB_DISCONNECTION'
  | 'SYSTEM'
  | 'UNKNOWN'
```

---

# Phase 5 - Vendor Architecture

## Tujuan

Membangun plugin architecture.

### Struktur

```text
src/services/syslog

├── contracts
├── core
├── processors
├── handlers
├── resolvers
└── vendors
```

---

## Contracts

### File

```text
src/services/syslog/contracts/syslog-parser.ts
src/services/syslog/contracts/syslog-service.ts
src/services/syslog/contracts/syslog-vendor.ts
```

---

## Vendor

### File

```text
src/services/syslog/vendors/hisfocus
```

---

### Hasil

Parser dan Service vendor menjadi independen.

Siap untuk:

```text
Huawei
ZTE
Fiberhome
HisFocus
```

---

# Phase 6 - Parser Modularization

## Tujuan

Memecah parser berdasarkan kategori event.

---

### File Baru

```text
src/services/syslog/vendors/hisfocus/parsers/onu.parser.ts
```

Handle:

```text
ONU_LINKUP
ONU_LINKDOWN
```

---

### File Baru

```text
src/services/syslog/vendors/hisfocus/parsers/web.parser.ts
```

Handle:

```text
WEB_LOGIN
WEB_CONNECTION
WEB_DISCONNECTION
```

---

### File

```text
src/services/syslog/vendors/hisfocus/hisfocus.syslog.parser.ts
```

Menjadi parser orchestrator.

---

# Phase 7 - Syslog Event Catalog

## Tujuan

Menyimpan seluruh event Syslog yang berhasil diparse.

---

## Prisma Schema

### Enum

```prisma
enum SyslogEventType {
  ONU_LINKUP
  ONU_LINKDOWN
  ONU_LOS
  ONU_DYING_GASP
  ONU_REGISTER
  ONU_UNREGISTER
  WEB_LOGIN
  WEB_LOGOUT
  WEB_CONNECTION
  WEB_DISCONNECTION
  SYSTEM
  UNKNOWN
}
```

---

### Model

```prisma
model SyslogEventLog {

  id        String   @id @default(cuid())

  oltId     String?
  olt       Olt?     @relation(fields: [oltId], references: [id])

  onuIdRef  String?
  onu       Onu?     @relation(fields: [onuIdRef], references: [id])

  type      SyslogEventType

  sourceIp  String

  oltName   String?

  eponPort  String?

  onuId     String?

  onuMac    String?

  onuName   String?

  rawLog    String   @db.Text

  payload   Json?

  createdAt DateTime @default(now())

  @@index([type])
  @@index([createdAt])
  @@index([oltId])
  @@index([onuIdRef])
  @@index([onuMac])
}
```

---

## Relasi Tambahan

### Model Olt

```prisma
syslogEvents SyslogEventLog[]
```

### Model Onu

```prisma
syslogEvents SyslogEventLog[]
```

---

# Phase 7.1 - Syslog Event Storage

## Tujuan

Menjadikan database sebagai source of truth.

---

### File Baru

```text
src/services/syslog/processors/syslog-event-log.processor.ts
```

---

### Flow

```text
SyslogEvent
    ↓
SyslogEventLogProcessor
    ↓
PostgreSQL
```

Event disimpan terlebih dahulu sebelum business logic berjalan.

---

# Phase 8 - Event Handler Architecture

## Tujuan

Menghilangkan God Service.

---

### File Baru

```text
src/services/syslog/contracts/syslog-event-handler.ts
```

---

### File Baru

```text
src/services/syslog/handlers/onu-event.handler.ts
```

Berisi:

* ONU Lookup
* ONU State Update
* Alarm
* Unauthorized ONU
* Telegram Notification

---

### File Baru

```text
src/services/syslog/handlers/web-event.handler.ts
```

Berisi logic event WEB.

---

### File Baru

```text
src/services/syslog/handlers/event-handler.registry.ts
```

Resolver event handler berdasarkan type.

---

## Hasil

### Sebelum

```text
HisfocusSyslogService

  ONU Logic
  Alarm
  Notification
  Unauthorized ONU
```

---

### Sesudah

```text
HisfocusSyslogService
      ↓
EventHandlerRegistry
      ↓
OnuEventHandler

atau

WebEventHandler
```

---

# Event WEB Yang Berhasil Didukung

## WEB_LOGIN

Contoh:

```text
User admin login from Web 172.10.0.247
```

---

## WEB_CONNECTION

Contoh:

```text
New web connection , current web client=15
```

---

## WEB_DISCONNECTION

Contoh:

```text
Delete web connection 172.10.0.247, current web client=14
```

---

# Debugging Yang Dilakukan

## Syslog Strict Mode

Ditemukan bahwa:

```text
OLT IP
≠
Syslog Source IP
```

Contoh:

```text
OLT Database
192.168.x.x

Syslog Source
172.10.0.1
```

Mengakibatkan:

```text
INVALID SYSLOG SOURCE
```

Solusi sementara:

```env
SYSLOG_STRICT_MODE=false
```

---

## UNKNOWN Event

Parser mengembalikan:

```ts
type: 'UNKNOWN'
```

untuk event yang belum dikenali.

Keuntungan:

* Tidak ada log yang hilang
* Tetap tersimpan ke database
* Mempermudah pengembangan parser berikutnya

---

# Arsitektur Akhir

```text
OLT

 ↓

UDP Syslog Server

 ↓

Dispatcher

 ↓

Vendor Resolver

 ↓

Vendor Parser

 ↓

SyslogEvent

 ↓

SyslogEventLogProcessor

 ↓

PostgreSQL

 ↓

EventHandlerRegistry

 ├── OnuEventHandler
 └── WebEventHandler

 ↓

Alarm
Notification
ONU Update
Unauthorized ONU
```

---

# Status Saat Ini

Selesai:

* Syslog Server
* Zod Config
* IP Filter
* Vendor Architecture
* Event Catalog
* PostgreSQL Event Storage
* ONU Parser
* WEB Parser
* Event Handler Architecture

Siap untuk tahap berikutnya:

* ONU_LOS Parser
* ONU_DYING_GASP Parser
* API Syslog History
* Web UI Syslog Monitoring
* Analytics Dashboard
* Multi Vendor Support
