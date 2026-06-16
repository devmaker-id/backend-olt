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

## Fields
```table
____________________________________________________
| Field       | Type         | Required | isUnique |
|-------------|--------------|----------|----------|
| internetNo  | string       |   Yes    |   Yes    |
| type        | EndpointType |   Yes    |    -     |
| name        | string       |   Yes    |    -     |
| email       | string       |   Yes    |   Yes    |
| telepon     | string       |   No     |    -     |
| address     | string       |   No     |    -     |
| latitude    | number       |   No     |    -     |
| longitude   | number       |   No     |    -     |
| description | string       |   No     |    -     |
----------------------------------------------------
```
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
  "message": "NEW_ENDPOINT_CREATED",
  "data": {
    "id": "cmqguesla0000g1hqvpguza73",
    "type": "CUSTOMER",
    "internetNo": "123456",
    "name": "budi",
    "email": "customer12@bibit.net",
    "telepon": "6281234567890",
    "address": "indonesia",
    "latitude": 1234.567,
    "longitude": -1234.567,
    "description": "",
    "packageId": null,
    "createdAt": "2026-06-16T16:14:48.383Z",
    "updatedAt": "2026-06-16T16:14:48.383Z"
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "type": [
      "Invalid enum value. Expected 'CUSTOMER' | 'RESELLER' | 'POP' | 'BACKHAUL', received 'teknisi1'"
    ],
    "latitude": [
      "Expected number, received string"
    ],
    "longitude": [
      "Expected number, received string"
    ]
  }
}

{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": "INTERNET_NUMBER_ALREADY_EXISTS"
}

{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": "EMAIL_ALREADY_EXISTS"
}
```

---

# Get Endpoint

## Endpoint lIST

```http
GET /api/endpoint
```

## Success Response

```json
-----200------
{
  "success": true,
  "message": "ENDPOINTS_FOUND",
  "data": [
    {
      "id": "cmqguesla0000g1hqvpguza73",
      "type": "CUSTOMER",
      "internetNo": "123456",
      "name": "budi",
      "email": "customer12@bibit.net",
      "telepon": "6281234567890",
      "address": "indonesia",
      "latitude": 1234.567,
      "longitude": -1234.567,
      "description": "",
      "packageId": null,
      "createdAt": "2026-06-16T16:14:48.383Z",
      "updatedAt": "2026-06-16T16:14:48.383Z",
      "onus": []
    },
    {
      "id": "cmqbecul70001g17b1wt23qq8",
      "type": "CUSTOMER",
      "internetNo": "12321",
      "name": "nob3432",
      "email": "customer11@bibit.net",
      "telepon": "087812345678",
      "address": "customer1@bibit.net",
      "latitude": null,
      "longitude": null,
      "description": null,
      "packageId": null,
      "createdAt": "2026-06-12T20:46:32.924Z",
      "updatedAt": "2026-06-16T15:50:44.350Z",
      "onus": []
    },
    {
      "id": "cmqbecbim0000g17bdd2u6xuo",
      "type": "POP",
      "internetNo": "909",
      "name": "tedin",
      "email": "customer10@bibit.net",
      "telepon": "087812345678",
      "address": "tersing addres",
      "latitude": null,
      "longitude": null,
      "description": null,
      "packageId": null,
      "createdAt": "2026-06-12T20:46:08.205Z",
      "updatedAt": "2026-06-16T15:50:44.350Z",
      "onus": []
    }
  ],
  "meta": {
    "total": 3
  }
}
---------404--------
{
  "success": false,
  "message": "ENDPOINT_NOTFOUND"
}
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
  "success": true,
  "message": "ENDPOINT_FOUND",
  "data": {
    "id": "cmqguesla0000g1hqvpguza73",
    "type": "CUSTOMER",
    "internetNo": "123456",
    "name": "budi",
    "email": "customer12@bibit.net",
    "telepon": "6281234567890",
    "address": "indonesia",
    "latitude": 1234.567,
    "longitude": -1234.567,
    "description": "",
    "packageId": null,
    "createdAt": "2026-06-16T16:14:48.383Z",
    "updatedAt": "2026-06-16T16:14:48.383Z",
    "onus": []
  }
}
```

## 404 Response
```json
{
  "success": false,
  "message": "ENDPOINT_BY_ID_NOTFOUND"
}
```

---

# Update Endpoint

## Endpoint

```http
PUT /api/endpoint/:id
```

## Fields
```table
____________________________________________________
| Field       | Type         | Required | isUnique |
|-------------|--------------|----------|----------|
| type        | EndpointType |   Yes    |    -     |
| name        | string       |   Yes    |    -     |
| email       | string       |   Yes    |   Yes    |
| telepon     | string       |   No     |    -     |
| address     | string       |   No     |    -     |
| latitude    | number       |   No     |    -     |
| longitude   | number       |   No     |    -     |
| description | string       |   No     |    -     |
| packageId   | string       |   No     |    -     |
----------------------------------------------------
```

## Success Response

```json
{
  "success": true,
  "message": "ENDPOINT_UPDATED",
  "data": {
    "id": "cmqguesla0000g1hqvpguza73",
    "type": "CUSTOMER",
    "internetNo": "123456",
    "name": "budi",
    "email": "budi_doremifa@bibit.net",
    "telepon": "6281234567890",
    "address": "indonesia",
    "latitude": 1234.567,
    "longitude": -1234.567,
    "description": "Customer FTTH BANDUNG",
    "packageId": null,
    "createdAt": "2026-06-16T16:14:48.383Z",
    "updatedAt": "2026-06-16T17:56:37.697Z"
  }
}
```

## tambah packageId ke endpoint
body, id package falid

```json
{
  ...
  "packageId": "cmqg4bb2f0001g16t4laisyhm"
}
```

respon
```json
{
  "success": true,
  "message": "ENDPOINT_UPDATED",
  "data": {
    "id": "cmqguesla0000g1hqvpguza73",
    "type": "CUSTOMER",
    "internetNo": "123456",
    "name": "budi",
    "email": "budi_doremifa@bibit.net",
    "telepon": "6281234567890",
    "address": "indonesia",
    "latitude": 1234.567,
    "longitude": -1234.567,
    "description": "Customer FTTH BANDUNG",
    "packageId": "cmqg4bb2f0001g16t4laisyhm",
    "createdAt": "2026-06-16T16:14:48.383Z",
    "updatedAt": "2026-06-16T18:06:13.830Z",
    "package": {
      "id": "cmqg4bb2f0001g16t4laisyhm",
      "type": "PPP",
      "name": "UPTO 10 MBPS",
      "speed": "10 MBPS",
      "price": 175000,
      "normalDevice": "7",
      "createdAt": "2026-06-16T04:04:15.688Z",
      "updatedAt": "2026-06-16T04:03:49.161Z"
    }
  }
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
  "success": true,
  "message": "ENDPOINT_DELETED",
  "data": {
    "id": "cmqguesla0000g1hqvpguza73",
    "type": "CUSTOMER",
    "internetNo": "123456",
    "name": "budi",
    "email": "budi_doremifa@bibit.net",
    "telepon": "6281234567890",
    "address": "indonesia",
    "latitude": 1234.567,
    "longitude": -1234.567,
    "description": "Customer FTTH BANDUNG",
    "packageId": "cmqg4bb2f0001g16t4laisyhm",
    "createdAt": "2026-06-16T16:14:48.383Z",
    "updatedAt": "2026-06-16T18:06:13.830Z",
    "onus": [
      {
        "id": "cmpr6l8d8005og15w4rnwzgb1"
      },
      {
        "id": "cmq3y8hty0001g1p9ocxzzxhb"
      },
      {
        "id": "cmpr7142w0006g18ys3u2ohct"
      },
      {
        "id": "cmpr6r1a6005rg15w5li518md"
      }
    ],
    "package": {
      "id": "cmqg4bb2f0001g16t4laisyhm",
      "type": "PPP",
      "name": "UPTO 10 MBPS",
      "speed": "10 MBPS",
      "price": 175000,
      "normalDevice": "7",
      "createdAt": "2026-06-16T04:04:15.688Z",
      "updatedAt": "2026-06-16T04:03:49.161Z"
    }
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
single onu

```json
{
  "success": true,
  "message": "ENDPOINT_FOUND",
  "data": {
    "internetNo": "1998290526004",
    "name": "ka mandra",
    "type": "CUSTOMER",
    "address": "malangnengah",
    "description": null,
    "package": {
      "id": "cmqg4bb2f0001g16t4laisyhm",
      "type": "PPP",
      "name": "UPTO 10 MBPS",
      "speed": "10 MBPS",
      "price": 175000,
      "normalDevice": "7",
      "createdAt": "2026-06-16T04:04:15.688Z",
      "updatedAt": "2026-06-16T04:03:49.161Z"
    },
    "onuCount": 1,
    "onus": [
      {
        "id": "cmpr22km70002g1103wn5wird",
        "olt": {
          "id": "cmpkutl6y0000g1qfqww5pk0e",
          "name": "OLT NANGGELA"
        },
        "port": "0/3:20",
        "name": "bpk_mandra_mlh",
        "status": "ONLINE",
        "signalStatus": "GOOD",
        "model": "GM22",
        "rxPower": "-16.50 dBm",
        "txPower": "2.58 dBm",
        "temperature": "42.00 C",
        "offlineCount": "0",
        "firstUptime": "2025-10-18 02:45:00",
        "lastOfftime": "2026-06-09 11:49:47"
      }
    ]
  }
}
```

## Success response
multi onu
```json
{
  "success": true,
  "message": "ENDPOINT_FOUND",
  "data": {
    "internetNo": "1998290526002",
    "name": "Huawei Rumah",
    "type": "POP",
    "address": "jakarta",
    "description": null,
    "package": null,
    "onuCount": 2,
    "onus": [
      {
        "id": "cmpqpiqkb0014g1ontyzajulv",
        "olt": {
          "id": "cmpkutl6y0000g1qfqww5pk0e",
          "name": "OLT JAKARTA"
        },
        "port": "0/3:18",
        "name": "naung",
        "status": "ONLINE",
        "signalStatus": "GOOD",
        "model": "120C",
        "rxPower": "-10.08 dBm",
        "txPower": "2.39 dBm",
        "temperature": "44.00 C",
        "offlineCount": "0",
        "firstUptime": "2026-01-24 01:36:04",
        "lastOfftime": "2026-06-12 20:53:51"
      },
      {
        "id": "cmpqo7et50002g1ysz48aho02",
        "olt": {
          "id": "cmpjspt4d0000g19839kspwrt",
          "name": "OLT BANDUNG"
        },
        "port": "0/1:1",
        "name": "budi",
        "status": "ONLINE",
        "signalStatus": "FAIR",
        "model": "GM22",
        "rxPower": "-20.27 dBm",
        "txPower": "2.59 dBm",
        "temperature": "46.00 C",
        "offlineCount": "0",
        "firstUptime": "2024-07-13 01:37:50",
        "lastOfftime": "2026-06-09 15:38:11"
      }
    ]
  }
}
```

## Error Response

### Internet Number Required

```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "internetNo": [
      "String must contain at least 1 character(s)"
    ]
  }
}
```

### Endpoint Not Found

```json
{
  "success": false,
  "message": "ENDPOINT_NOT_FOUND"
}
```

### Endpoint ready, tapi ONU&PACKAGE Belum di set

```json
{
  "success": true,
  "message": "ENDPOINT_FOUND",
  "data": {
    "internetNo": "1998290526005",
    "name": "umriah",
    "type": "CUSTOMER",
    "address": "malangnengah",
    "package": null,
    "onus": []
  }
}
```