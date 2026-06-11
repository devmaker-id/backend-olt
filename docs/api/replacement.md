# ONU Replacement API

Base URL

```text
/api/onu-replacement
```

Authentication Required: Yes (JWT)

---

# Get Replacement History

Mengambil seluruh histori penggantian ONU.

## Endpoint

```http
GET /api/onu-replacement
```

## Success Response

```json
{
  "data": [
    {
      "id": "clxxxx",

      "endpoint": {
        "id": "clxxxx",
        "internetNo": "ISP000001",
        "name": "Budi",
        "address": "Bandung"
      },

      "oldOnu": {
        "onuId": "1",
        "onuMac": "FC1111111111",
        "onuName": "Budi",
        "model": "HG6245D"
      },

      "newOnu": {
        "onuId": "2",
        "onuMac": "FC2222222222",
        "onuName": "Budi",
        "model": "HG6245D"
      },

      "reason": "ONU Mati",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

Response diurutkan berdasarkan:

```text
createdAt DESC
```

---

# Get Replacement Detail

Mengambil detail satu histori replacement.

## Endpoint

```http
GET /api/onu-replacement/:id
```

## Example

```http
GET /api/onu-replacement/clxxxx
```

## Success Response

```json
{
  "data": {
    "id": "clxxxx",

    "endpoint": {
      "id": "clxxxx",
      "internetNo": "ISP000001",
      "name": "Budi",
      "address": "Bandung"
    },

    "oldOnu": {
      "onuId": "1",
      "onuMac": "FC1111111111",
      "onuName": "Budi",
      "model": "HG6245D"
    },

    "newOnu": {
      "onuId": "2",
      "onuMac": "FC2222222222",
      "onuName": "Budi",
      "model": "HG6245D"
    }
  }
}
```

---

# Replace ONU

Mengganti ONU lama dengan ONU baru yang berasal dari Unauthorized ONU.

## Business Flow

```text
1. Cari Endpoint
2. Cari ONU aktif milik Endpoint
3. Cari Unauthorized ONU
4. Connect Telnet ke OLT
5. Ambil informasi ONU baru
6. Rename ONU baru sesuai nama pelanggan
7. Delete ONU lama dari OLT
8. Save Config OLT
9. Disable ONU lama
10. Create ONU baru
11. Create Replacement History
12. Delete Unauthorized ONU
```

---

## Endpoint

```http
POST /api/onu-replacement
```

## Request

```json
{
  "endpointId": "clendpoint",
  "unauthorizedOnuId": "clunauthorized",
  "reason": "ONU Mati"
}
```

## Fields

| Field | Type | Required |
|---------|---------|---------|
| endpointId | string | Yes |
| unauthorizedOnuId | string | Yes |
| reason | string | No |
| replacedBy | string | No |

---

## Success Response

```json
{
  "data": {
    "success": true,
    "message": "ONU berhasil diganti",
    "data": {
      "internetNo": "ISP000001",
      "oldOnuMac": "FC1111111111",
      "newOnuMac": "FC2222222222",
      "port": "1/1:2"
    }
  }
}
```

---

## Error Response

### Endpoint Not Found

```json
{
  "data": {
    "success": false,
    "message": "endpoint ID tidak ditemukan",
    "data": null
  }
}
```

### Active ONU Not Found

```json
{
  "data": {
    "success": false,
    "message": "ONU tidak ditemukan",
    "data": null
  }
}
```

### Unauthorized ONU Not Found

```json
{
  "data": {
    "success": false,
    "message": "Unauthorize ONU tidak ditemukan",
    "data": null
  }
}
```

---

# Data Updated During Replacement

## Old ONU

Diubah menjadi:

```json
{
  "isActive": false,
  "status": "REPLACED"
}
```

---

## New ONU

Dibuat menggunakan:

```json
{
  "status": "ACTIVE",
  "isActive": true
}
```

serta mengambil:

```text
ONU Type
Model
Firmware
Connection State
Temperature
Voltage
Tx Bias
Tx Power
Rx Power
```

langsung dari OLT.

---

# Replacement History

Saat replacement berhasil maka sistem membuat record:

```json
{
  "endpointId": "clendpoint",
  "oldOnuId": "cloldonu",
  "newOnuId": "clnewonu",
  "reason": "ONU Mati"
}
```

---

# Side Effects

Replacement akan:

```text
Rename ONU Baru
Delete ONU Lama dari OLT
Save Config OLT
Disable ONU Lama
Create ONU Baru
Create Replacement History
Delete Unauthorized ONU
```

---

# Error Codes

```text
endpoint ID tidak ditemukan

ONU tidak ditemukan

Unauthorize ONU tidak ditemukan
```