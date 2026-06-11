# ONU API

Base URL

```text
/api/onu
```

Authentication Required: Yes (JWT)

---

# Get Unauthorized ONU List

Mengambil seluruh ONU yang ditemukan di OLT tetapi belum diregistrasi ke sistem.

## Endpoint

```http
GET /api/onu/unregistered
```

## Success Response

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": "clxxxx",
      "macAddress": "FC1234567890",
      "eponPort": "1/1",
      "onuId": "1",
      "onuName": "ONU-BUDI",
      "status": "Up",
      "discoveredAt": "2025-01-01T00:00:00.000Z",
      "olt": {
        "id": "clxxxx",
        "name": "OLT-BDG-01",
        "syslogName": "OLT_BDG_01",
        "vendor": "Hisfocus",
        "location": "Bandung"
      }
    }
  ]
}
```

## Error Response

```json
{
  "success": false,
  "message": "ERROR_MESSAGE"
}
```

---

# Authorize ONU

Melakukan registrasi ONU ke sistem.

Proses yang dilakukan:

1. Validasi ONU belum terdaftar
2. Validasi ONU ada di Unauthorized ONU
3. Rename ONU pada OLT
4. Save Config OLT
5. Membuat Endpoint baru
6. Membuat ONU baru
7. Menghapus Unauthorized ONU

## Endpoint

```http
POST /api/onu/authorize
```

## Request

```json
{
  "macAddress": "FC1234567890",
  "endpoint": {
    "type": "CUSTOMER",
    "name": "Budi",
    "code": "BDG001",
    "address": "Bandung",
    "description": "Customer FTTH",
    "latitude": -6.917,
    "longitude": 107.619
  },
  "packageId": "clxxxx"
}
```

## Endpoint Types

```text
CUSTOMER
RESELLER
POP
BACKHAUL
```

## Fields

### Root

| Field | Type | Required |
|---------|---------|---------|
| macAddress | string | Yes |
| endpoint | object | Yes |
| packageId | string | No |

### Endpoint

| Field | Type | Required |
|---------|---------|---------|
| type | EndpointType | Yes |
| name | string | Yes |
| code | string | No |
| address | string | No |
| description | string | No |
| latitude | number | No |
| longitude | number | No |

## Success Response

```json
{
  "success": true,
  "message": "ONU BERHAIL DI REGISTRASI",
  "data": {
    "internetNo": "ISP000001",
    "name": "Budi",
    "type": "CUSTOMER",
    "macAddress": "FC1234567890",
    "port": "1/1:1"
  }
}
```

## Error Responses

### ONU Already Registered

```json
{
  "success": false,
  "message": "ONU_ALREADY_REGISTERED"
}
```

### Unauthorized ONU Not Found

```json
{
  "success": false,
  "message": "UNAUTHORIZED_ONU_NOT_FOUND"
}
```

### OLT Not Found

```json
{
  "success": false,
  "message": "OLT_NOT_FOUND"
}
```

---

# ONU Inventory API

Base URL

```text
/api/onu/inventory
```

Authentication Required: Yes (JWT)

---

# Get Inventory Summary

Mengambil statistik seluruh ONU dalam sistem.

## Endpoint

```http
GET /api/onu/inventory/summary
```

## Success Response

```json
{
  "data": {
    "total": 500,
    "registered": 480,
    "unregistered": 20,
    "online": 430,
    "offline": 25,
    "powerOff": 10,
    "fiberLos": 5,
    "authFailed": 2,
    "unknown": 8
  }
}
```

## Response Fields

| Field | Description |
|---------|---------|
| total | Total ONU |
| registered | ONU terdaftar |
| unregistered | ONU belum terdaftar |
| online | ONU online |
| offline | ONU offline |
| powerOff | ONU mati |
| fiberLos | Fiber LOS |
| authFailed | Auth gagal |
| unknown | Status tidak diketahui |

---

# ONU Reconcile Service

Saat ini belum memiliki REST API.

Digunakan oleh Scheduler internal.

## Scheduler

```text
*/5 * * * *
```

Dijalankan setiap 5 menit.

## Functions

### reconcileOltWithSession()

Sinkronisasi status ONU database dengan status ONU pada OLT.

### reconcileOnu()

Mengambil profil ONU realtime dari OLT.

### reconcileOlt()

Melakukan reconcile seluruh ONU pada OLT.

---

# ONU Event

Digunakan untuk mencatat perubahan status ONU.

## Event Example

```json
{
  "event": "RECONCILE_STATE_CHANGE",
  "oldState": "ONLINE",
  "newState": "OFFLINE",
  "source": "RECONCILE",
  "description": "DB=ONLINE OLT=OFFLINE"
}
```

---

# ONU Connection States

```text
ONLINE
OFFLINE
ONU_POWER_OFF
FIBER_LOS
ONU_AUTH_FAILED
UNKNOWN
```

---

# ONU Error Codes

```text
ONU_ALREADY_REGISTERED

ONU_ALREADY_REGISTERD

UNAUTHORIZED_ONU_NOT_FOUND

ONU_AVAILABLE_REGISTERD

OLT_NOT_FOUND

ONU_NOT_FOUND
```