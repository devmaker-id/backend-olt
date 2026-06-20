# OLT API

Base URL

```text
/api/olt
```

Authentication Required: Yes (JWT)

---

# Create OLT
```http
POST /api/olt
```
## table required
| field          | type                   | required    |
| -------------- | ---------------------- | ----------- |
| name           | String                 | Yes         |
| syslogName     | String                 | Yes         |
| ipAddress      | String                 | Yes @unique |
| managementPort | Number                 | Yes         |
| username       | String                 | Yes         |
| password       | String                 | Yes         |
| vendor         | String                 | Yes         |
| platform       | [Enum](../enum/olt.md) | Yes         |
| connectionType | [Enum](../enum/olt.md) | Yes         |
| location       | String                 | Yes         |

## Success Response

```json
{
  "success": true,
  "message": "OLT_CREATED",
  "data": {
    "id": "cmql71iwz0000g1sgwm7subwi",
    "name": "olt-tes",
    "syslogName": "test",
    "ipAddress": "192.168.1.1",
    "managementPort": 23,
    "username": "admin",
    "password": "admin",
    "vendor": "test-vendor",
    "platform": "HIOSO",
    "connectionType": "TELNET",
    "location": "negri konoha",
    "createdAt": "2026-06-19T17:19:29.028Z",
    "updatedAt": "2026-06-19T17:19:29.028Z"
  }
}
```
## already registered
```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": "OLT_ALREADY_REGISTERED"
}
```

---

# Get OLT List

## Endpoint

```http
GET /api/olt
```

## Success Response

```json
{
  "success": true,
  "message": "OLT_LIST_FOUND",
  "data": [
    {
      "id": "cmql71iwz0000g1sgwm7subwi",
      "name": "olt-tes",
      "syslogName": "test",
      "ipAddress": "192.168.1.1",
      "managementPort": 23,
      "username": "admin",
      "password": "admin",
      "vendor": "test-vendor",
      "platform": "HIOSO",
      "connectionType": "TELNET",
      "location": "negri konoha",
      "createdAt": "2026-06-19T17:19:29.028Z",
      "updatedAt": "2026-06-19T17:19:29.028Z"
    }
  ],
  "meta": {
    "total": 1
  }
}
```

---

# Get OLT By ID

## Endpoint

```http
GET /api/olt/:id
```

## Success Response

```json
{
  "success": true,
  "message": "OLT_FOUND",
  "data": {
    "id": "cmql71iwz0000g1sgwm7subwi",
    "name": "olt-tes",
    "syslogName": "test",
    "ipAddress": "192.168.1.1",
    "managementPort": 23,
    "username": "admin",
    "password": "admin",
    "vendor": "test-vendor",
    "platform": "HIOSO",
    "connectionType": "TELNET",
    "location": "negri konoha",
    "createdAt": "2026-06-19T17:19:29.028Z",
    "updatedAt": "2026-06-19T17:19:29.028Z"
  }
}
```

# GET OPTICAL OLT INFO
## Endpoint
```http
GET /api/olt/:id/optical
```

## respon success
### contoh pertama
```json
{
  "success": true,
  "message": "OPTICAL_INFO_PORT",
  "data": [
    {
      "port": "0/1",
      "status": "ONLINE",
      "temperature": "45.00 C",
      "voltage": "3.00  V",
      "txBias": "25.00 mA",
      "txPower": "6.98 dBm"
    },
    {
      "port": "0/2",
      "status": "ONLINE",
      "temperature": "45.00 C",
      "voltage": "3.00  V",
      "txBias": "29.00 mA",
      "txPower": "10.17 dBm"
    },
    {
      "port": "0/3",
      "status": "ONLINE",
      "temperature": "47.00 C",
      "voltage": "3.00  V",
      "txBias": "25.00 mA",
      "txPower": "9.94 dBm"
    },
    {
      "port": "0/4",
      "status": "ONLINE",
      "temperature": "44.00 C",
      "voltage": "3.00  V",
      "txBias": "23.00 mA",
      "txPower": "6.62 dBm"
    }
  ]
}
```
### contoh kedua
```json
{
  "success": true,
  "message": "OPTICAL_INFO_PORT",
  "data": [
    {
      "port": "0/1",
      "status": "ONLINE",
      "temperature": "42.00 C",
      "voltage": "3.00  V",
      "txBias": "29.00 mA",
      "txPower": "11.06 dBm"
    },
    {
      "port": "0/2",
      "status": "NO_MODULE",
      "temperature": "255.00 C",
      "voltage": "6.00  V",
      "txBias": "131.00 mA",
      "txPower": "32.27 dBm"
    },
    {
      "port": "0/3",
      "status": "NO_MODULE",
      "temperature": "255.00 C",
      "voltage": "6.00  V",
      "txBias": "131.00 mA",
      "txPower": "32.27 dBm"
    },
    {
      "port": "0/4",
      "status": "NO_MODULE",
      "temperature": "255.00 C",
      "voltage": "6.00  V",
      "txBias": "131.00 mA",
      "txPower": "32.27 dBm"
    }
  ]
}
```

---

# Update OLT

## Endpoint

```http
PUT /api/olt/:id
```
## table required
| field          | type                   | required    |
| -------------- | ---------------------- | ----------- |
| name           | String                 | Yes         |
| syslogName     | String                 | Yes         |
| managementPort | Number                 | Yes         |
| username       | String                 | Yes         |
| password       | String                 | Yes         |
| vendor         | String                 | Yes         |
| platform       | [Enum](../enum/olt.md) | Yes         |
| connectionType | [Enum](../enum/olt.md) | Yes         |
| location       | String                 | Yes         |


## Success Response

```json
{
  "success": true,
  "message": "OLT_UPDATED",
  "data": {
    "id": "cmql71iwz0000g1sgwm7subwi",
    "name": "olt-tes",
    "syslogName": "test",
    "ipAddress": "192.168.1.1",
    "managementPort": 23,
    "username": "admin",
    "password": "updatePassword",
    "vendor": "HISFOCUS",
    "platform": "HIOSO",
    "connectionType": "TELNET",
    "location": "negri konoha",
    "createdAt": "2026-06-19T17:19:29.028Z",
    "updatedAt": "2026-06-19T19:16:45.659Z"
  }
}
```
## 404
```json
{
  "success": false,
  "message": "OLT_NOT_FOUND"
}
```

---

# Delete OLT

## Endpoint

```http
DELETE /api/olt/:id
```

## Success Response

```json
{
  "success": true,
  "message": "OLT_DELETED",
  "data": {
    "id": "cmql71iwz0000g1sgwm7subwi",
    "name": "olt-tes",
    "syslogName": "test",
    "ipAddress": "192.168.1.1",
    "managementPort": 23,
    "username": "admin",
    "password": "updatePassword",
    "vendor": "HISFOCUS",
    "platform": "HIOSO",
    "connectionType": "TELNET",
    "location": "negri konoha",
    "createdAt": "2026-06-19T17:19:29.028Z",
    "updatedAt": "2026-06-19T19:22:45.561Z"
  }
}
```

---

# Test OLT Connection

Menguji koneksi Telnet ke OLT.

## Endpoint

```http
GET /api/olt/:id/connect
```

## Success Response

```json
{
  "success": true,
  "message": "OLT_CONNECTED",
  "data": {
    "mac": "78:5c:72:a4:5b:bc",
    "name": "OLT_BIBITNET",
    "description": "Pt. Bibit Networks Indonesia",
    "location": "bibitnet.web.id",
    "model": "OLT",
    "software": "V2.2.67",
    "revisiondate": "20240513",
    "hardware": "V6.0",
    "sn": "SNxxx-xx-xxxx",
    "uptime": "1 days 4 hours 9 minites 54 seconds"
  }
}
```

### Connection Failed

```json
{
  "success": false,
  "message": "FAILED_CONNET_OLT",
  "errors": {
    "errno": -60,
    "code": "ETIMEDOUT",
    "syscall": "connect",
    "address": "192.168.77.254",
    "port": 23
  }
}
```

---

# Get ONU Information

Mengambil informasi lengkap ONU dari OLT.

## Endpoint

```http
GET /api/olt/:id/onu?portid=1/1&onuid=1
```

## Query Parameters

| Parameter | Required |
| --------- | -------- |
| portid    | Yes      |
| onuid     | Yes      |

## Success Response

```json
{
  "success": true,
  "data": {
    "onu": {
      "onu_id": "0/4:26",
      "onu_mac": "1c:27:04:b0:b3:af",
      "onu_name": "pak_mamay",
      "online_status": "Up",
      "activate_status": "Activated",
      "firmware_version": "0101",
      "chip_id": "9127",
      "model_string": "F663",
      "onu_type": "SFU",
      "ge_number": "1",
      "fe_number": "3",
      "pots_number": "1",
      "wifi": "1",
      "catv": "0",
      "ctc_autoneg": "CtcNegDone",
      "connectionState": "ONLINE",
      "is_online": true,
      "first_uptime": "2026-06-06 21:15:42",
      "last_uptime": "2026-06-18 22:20:55",
      "last_offtime": "2026-06-18 22:20:11",
      "online_time": "2H17M25S",
      "offline_event_count": "4"
    },
    "optical": {
      "status": "OK",
      "temperature": "55.00 C",
      "voltage": "3.00  V",
      "txbias": "12.00 mA",
      "txpower": "2.34 dBm",
      "rxpower": "-20.32 dBm"
    }
  }
}
```
respon akan suksess jika onu telah di daftarkan ke database, meskipun di olt sudah ada porId dan onuId yang sesuai, jika kamu belum regiskan ke database maka akan di tolak
## Error Response

```json
{
  "success": false,
  "message": "REQUIRED_FALID_PORID_ONUID_EXIST"
}
```

---

# Get ONU Statistics Per Port

Mengambil jumlah ONU online dan offline pada port tertentu.

## Endpoint

```http
GET /api/olt/:id/onus?portid=0/1
```

## Success Response

```json
{
  "success": true,
  "message": "ONUS_LISTED",
  "data": [
    {
      "port": "0/4",
      "onuId": "1",
      "macAddress": "A4:F3:3B:77:96:87",
      "status": "Up",
      "ctcStatus": "CtcNegDone",
      "onuComtName": "ibu_neni",
      "name": "ibu_neni"
    },
    {
      "port": "0/4",
      "onuId": "2",
      "macAddress": "70:2E:22:2B:87:F3",
      "status": "Up",
      "ctcStatus": "CtcNegDone",
      "onuComtName": "subhi_nurpadilah",
      "name": "Subhi_nurpadilah"
    }
  ],
  "meta": {
    "total": 2
  }
}
```

---

# Sync OLT Inventory

Sinkronisasi ONU dari OLT ke database.

Endpoint ini:

- membaca ONU dari OLT
- memperbarui ONU terdaftar
- membuat Unauthorized ONU baru
- menghitung statistik sinkronisasi

## Endpoint

```http
POST /api/olt/sync
```

## Request

```json
{
  "oltId": "clxxxx",
  "portId": "0/1"
}
```

## Success Response

```json
{
  "success": true,
  "message": "SYNC_OLT_TO_DB",
  "data": {
    "summary": {
      "total": 3,
      "registered": 1,
      "unauthorized": 2
    },
    "registered": [
      {
        "port": "0/3",
        "onuId": "3",
        "macAddress": "1C:27:04:B0:B3:AF",
        "status": "Up",
        "ctcStatus": "CtcNegDone",
        "onuComtName": "pak_mamay",
        "name": "pak mamay",
        "type": "CUSTOMER",
        "internetNo": "1998300526004",
        "endPointId": "cmpr7142n0004g18ykyy4img0",
        "dbId": "cmqkrygf80002g1gghxmehe5t"
      }
    ],
    "unauthorize": [
      {
        "port": "0/3",
        "onuId": "1",
        "macAddress": "C8:3A:35:4B:05:40",
        "status": "Up",
        "ctcStatus": "CtcNegDone",
        "onuComtName": "teh_risna",
        "name": "Teh Risna",
        "id": "cmqljxsvf0020g1k28m4g4d34"
      },
      {
        "port": "0/3",
        "onuId": "2",
        "macAddress": "A4:F3:3B:65:AC:7D",
        "status": "Up",
        "ctcStatus": "CtcNegDone",
        "onuComtName": "teh_neneng",
        "name": "Teh Neneng",
        "id": "cmqljxswp0022g1k29sx8rwr9"
      }
    ]
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "OLT_NOT_FOUND"
}
```

---

# OLT Module 20, Juni 2026 Only
1. Connection Type TELNET
2. Platform HIOSO
```json
{
  "success": false,
  "message": "CONNECTION_FAILED",
  "errors": {
    "statusCode": 403,
    "code": "IS_DEVELOPMENT_SORRY",
    "name": "ForbiddenError"
  }
}
```