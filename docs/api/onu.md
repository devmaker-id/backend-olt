# ONU API

Base URL

```text
/api/onu
```

Authentication Required: Yes (JWT)

---
## GET ALL ONUS DATA
GET /api/onu
## respon success
```json
{
  "success": true,
  "message": "ONUS_FOUND",
  "data": [
    {
      "id": "cmpqmmz4l0006g19fzxv16oja",
      "oltId": "cmpjspt4d0000g19839kspwrt",
      "endpointId": "cmpr7142n0004g18ykyy4img0",
      "onuId": "2",
      "portId": null,
      "serialNumber": null,
      "onuMac": "8C:E5:EF:F3:8B:7E",
      "onuName": "Asep Fahru",
      "onuComtName": "asep_fahru",
      "onuType": "SFU",
      "model": "45H5",
      "firmware": "3230",
      "status": "ACTIVE",
      "connectionState": "ONLINE",
      "temperature": "56.00 C",
      "voltage": "3.00  V",
      "txBias": "21.00 mA",
      "txPower": "1.98 dBm",
      "rxPower": "-14.44 dBm",
      "isActive": true,
      "createdAt": "2026-05-29T07:55:12.597Z",
      "updatedAt": "2026-06-16T18:49:12.809Z"
    },
    {
      "id": "cmpr2q3nr0002g14zazpfvik6",
      "oltId": "cmpkutl6y0000g1qfqww5pk0e",
      "endpointId": "cmpr6l8d4005mg15wz7d7mez8",
      "onuId": "17",
      "portId": null,
      "serialNumber": null,
      "onuMac": "F4:E4:AD:82:18:48",
      "onuName": "umriah",
      "onuComtName": "uum_malangnengah",
      "onuType": "SFU",
      "model": "F460",
      "firmware": "0101",
      "status": "ACTIVE",
      "connectionState": "OFFLINE",
      "temperature": "47.00 C",
      "voltage": "3.00  V",
      "txBias": "17.00 mA",
      "txPower": "1.69 dBm",
      "rxPower": "-15.51 dBm",
      "isActive": true,
      "createdAt": "2026-05-29T15:25:32.295Z",
      "updatedAt": "2026-06-16T18:55:29.414Z"
    }
  ],
  "meta": {
    "total": 2
  }
}
```
## respon not_found data onus
```json
{
  "success": false,
  "message": "ONUS_NOT_FOUND"
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
POST /api/onu
```
body table
| field             | type    | required |
| ----------------- | ------- | -------- |
| unauthorizeId     | String  | Yes      |
| endpointId        | String  | Yes      |

## RESPON SUCCESS
```json
{
  "success": true,
  "message": "ONU_CREATED_SUCCESS",
  "data": {
    "internetNo": "1998300526004",
    "name": "pak mamay",
    "type": "CUSTOMER",
    "serialNumber": null,
    "macAddress": "1C:27:04:B0:B3:AF",
    "port": "0/4:26"
  }
}
```

## Delete ONU isActive = false

```http
DELETE /api/onu
```
body table
| field  | type    | required |
| ------ | ------- | -------- |
| id     | String  | Yes      |

## RESPON SUCCESS
```json
{
  "success": true,
  "message": "ONU_DELETED",
  "data": {
      "id": "cmpr2q3nr0002g14zazpfvik6",
      "oltId": "cmpkutl6y0000g1qfqww5pk0e",
      "endpointId": "cmpr6l8d4005mg15wz7d7mez8",
      "onuId": "17",
      "portId": null,
      "serialNumber": null,
      "onuMac": "F4:E4:AD:82:18:48",
      "onuName": "umriah",
      "onuComtName": "uum_malangnengah",
      "onuType": "SFU",
      "model": "F460",
      "firmware": "0101",
      "status": "ACTIVE",
      "connectionState": "OFFLINE",
      "temperature": "47.00 C",
      "voltage": "3.00  V",
      "txBias": "17.00 mA",
      "txPower": "1.69 dBm",
      "rxPower": "-15.51 dBm",
      "isActive": false,
      "createdAt": "2026-05-29T15:25:32.295Z",
      "updatedAt": "2026-06-16T18:55:29.414Z"
    }
}
```