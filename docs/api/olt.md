# OLT API

Base URL

```text
/api/olt
```

Authentication Required: Yes (JWT)

---

# Create OLT

## Endpoint

```http
POST /api/olt
```

## Request

```json
{
  "name": "OLT-BDG-01",
  "syslogName": "OLT_BDG_01",
  "ipAddress": "192.168.1.1",
  "telnetPort": 23,
  "username": "admin",
  "password": "admin",
  "vendor": "Hisfocus",
  "location": "Bandung"
}
```

## Fields

| Field | Type | Required |
|---------|---------|---------|
| name | string | Yes |
| syslogName | string | Yes |
| ipAddress | string | Yes |
| telnetPort | number | No |
| username | string | Yes |
| password | string | Yes |
| vendor | string | Yes |
| location | string | No |

## Success Response

```json
{
  "id": "clxxxx",
  "name": "OLT-BDG-01",
  "syslogName": "OLT_BDG_01",
  "ipAddress": "192.168.1.1"
}
```

## Error Responses

### Duplicate Name

```json
{
  "message": "OLT_NAME_ALREADY_EXISTS"
}
```

### Duplicate Syslog Name

```json
{
  "message": "OLT_SYSLOG_NAME_ALREADY_EXISTS"
}
```

### Duplicate IP

```json
{
  "message": "OLT_IP_ALREADY_EXISTS"
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
[
  {
    "id": "clxxxx",
    "name": "OLT-BDG-01",
    "ipAddress": "192.168.1.1",
    "vendor": "Hisfocus"
  }
]
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
  "id": "clxxxx",
  "name": "OLT-BDG-01",
  "ipAddress": "192.168.1.1",
  "vendor": "Hisfocus"
}
```

---

# Update OLT

## Endpoint

```http
PUT /api/olt/:id
```

## Request

```json
{
  "name": "OLT-BDG-02",
  "location": "Jakarta"
}
```

## Available Fields

```json
{
  "name": "string",
  "ipAddress": "string",
  "telnetPort": 23,
  "username": "string",
  "password": "string",
  "vendor": "string",
  "location": "string"
}
```

## Success Response

```json
{
  "id": "clxxxx",
  "name": "OLT-BDG-02"
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
  "data": {
    "systemName": "...",
    "hardwareVersion": "...",
    "softwareVersion": "..."
  }
}
```

## Error Response

### OLT Not Found

```json
{
  "success": false,
  "message": "OLT_NOT_FOUND"
}
```

### Connection Failed

```json
{
  "success": false,
  "message": "FAILED_CONNECT_OLT",
  "error": "Connection timeout",
  "host": "192.168.1.1",
  "port": 23
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

## Error Response

```json
{
  "success": false,
  "message": "FAILED_GET_SYSTEM_INFO"
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