# Endpoint API

Base URL

```text
/api/endpoint
```

Authentication Required: Yes (JWT)

---

# Create Endpoint

## Endpoint

```http
POST /api/endpoint
```

## Request

```json
{
  "internetNo": "ISP000001",
  "type": "CUSTOMER",
  "name": "Budi",
  "code": "BDG001",
  "address": "Bandung",
  "latitude": -6.917,
  "longitude": 107.619,
  "description": "FTTH Customer"
}
```

## Fields

| Field | Type | Required |
|---------|---------|---------|
| internetNo | string | Yes |
| type | EndpointType | Yes |
| name | string | Yes |
| code | string | No |
| address | string | No |
| latitude | number | No |
| longitude | number | No |
| description | string | No |

## Endpoint Types

```text
CUSTOMER
RESELLER
POP
BACKHAUL
```

## Success Response

```json
{
  "success": true,
  "data": {
    "id": "clxxxxx",
    "internetNo": "ISP000001",
    "type": "CUSTOMER",
    "name": "Budi"
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "ENDPOINT_CODE_ALREADY_EXISTS"
}
```

---

# Get Endpoint List

## Endpoint

```http
GET /api/endpoint
```

## Success Response

```json
[
  {
    "id": "clxxxx",
    "internetNo": "ISP000001",
    "name": "Budi",
    "type": "CUSTOMER",
    "onus": []
  }
]
```

---

# Get Endpoint By ID

## Endpoint

```http
GET /api/endpoint/:id
```

## Success Response

```json
{
  "id": "clxxxx",
  "internetNo": "ISP000001",
  "name": "Budi",
  "type": "CUSTOMER",
  "onus": []
}
```

---

# Update Endpoint

## Endpoint

```http
PUT /api/endpoint/:id
```

## Request

```json
{
  "name": "Budi Update",
  "address": "Bandung Barat",
  "description": "Updated"
}
```

## Available Fields

```json
{
  "type": "CUSTOMER",
  "name": "string",
  "code": "string",
  "address": "string",
  "latitude": -6.917,
  "longitude": 107.619,
  "description": "string"
}
```

## Success Response

```json
{
  "id": "clxxxx",
  "name": "Budi Update"
}
```

---

# Delete Endpoint

## Endpoint

```http
DELETE /api/endpoint/:id
```

## Success Response

```json
{
  "id": "clxxxx",
  "name": "Budi"
}
```

---

# Get Endpoint By Internet Number

Mengambil data realtime ONU langsung dari OLT melalui Telnet.

## Endpoint

```http
GET /api/endpoint/internet/:internetNo
```

## Success Response

```json
{
  "success": true,
  "data": {
    "internetNo": "ISP000001",
    "name": "Budi",
    "type": "CUSTOMER",
    "address": "Bandung",
    "olt": {
      "name": "OLT-BDG-01"
    },
    "onu": {
      "name": "BUDI_HOME",
      "status": "ONLINE",
      "signalStatus": "GOOD",
      "port": "1/1:1",
      "model": "HG6245D",
      "rxPower": "-20.1",
      "txPower": "2.3",
      "temperature": "40",
      "offlineCount": 3,
      "firstUptime": "...",
      "lastOfftime": "..."
    }
  }
}
```

## Error Response

### Internet Number Required

```json
{
  "success": false,
  "message": "Nomor internet wajib diisi"
}
```

### Endpoint Not Found

```json
{
  "success": false,
  "message": "Nomor internet ISP000001 tidak terdaftar"
}
```

### ONU Not Found

```json
{
  "success": false,
  "message": "ONU tidak ditemukan"
}
```

---

# Notes

Current duplicate validation:

```text
ENDPOINT_CODE_ALREADY_EXISTS
```

Validation available but currently unused:

```text
INTERNET_NUMBER_ALREADY_EXISTS
```