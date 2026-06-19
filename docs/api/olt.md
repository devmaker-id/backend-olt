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
  "id": "clxxxx",
  "name": "OLT-BDG-01"
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

# Get System Information

Mengambil informasi sistem OLT secara realtime.

## Endpoint

```http
GET /api/olt/:id/system
```

## Success Response

```json
{
  "success": true,
  "data": {
    "systemName": "...",
    "hardwareVersion": "...",
    "softwareVersion": "..."
  }
}
```

---

# Get ONU Information

Mengambil informasi lengkap ONU dari OLT.

## Endpoint

```http
GET /api/olt/:id/onu?epon=1/1&onuId=1
```

## Query Parameters

| Parameter | Required |
|------------|------------|
| epon | Yes |
| onuId | Yes |

## Success Response

```json
{
  "success": true,
  "data": {
    "onu": {},
    "optical": {},
    "ethernet": {}
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "FAILED_GET_ONU_INFO"
}
```

---

# Get ONU Statistics Per Port

Mengambil jumlah ONU online dan offline pada port tertentu.

## Endpoint

```http
GET /api/olt/:id/onus?port=1/1
```

## Success Response

```json
{
  "success": true,
  "data": {
    "total": 64,
    "online": 58,
    "offline": 6
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

# Get Optical Ports

Mengambil daftar port optical pada OLT.

## Endpoint

```http
GET /api/olt/:id/optical
```

## Success Response

```json
{
  "data": {
    "success": true,
    "data": [
      {
        "port": "1/1"
      },
      {
        "port": "1/2"
      }
    ]
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
  "port": "1/1"
}
```

## Success Response

```json
{
  "success": true,
  "summary": {
    "total": 64,
    "registered": 58,
    "unauthorized": 6
  },
  "registered": [],
  "unauthorize": []
}
```

## Registered Item Example

```json
{
  "port": "1/1",
  "onuId": "1",
  "macAddress": "FC1234567890",
  "internetNo": "ISP000001",
  "name": "Budi",
  "type": "CUSTOMER"
}
```

## Unauthorized Item Example

```json
{
  "id": "clxxxx",
  "port": "1/1",
  "onuId": "2",
  "macAddress": "FC9999999999",
  "onuComtName": "ONU-BUDI"
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

# OLT Error Codes

```text
OLT_NAME_ALREADY_EXISTS
OLT_SYSLOG_NAME_ALREADY_EXISTS
OLT_IP_ALREADY_EXISTS

OLT_NOT_FOUND

FAILED_CONNECT_OLT
FAILED_GET_SYSTEM_INFO
FAILED_GET_ONU_INFO
```