# ONU UNAUTHORIZE ENDPOINT API

semua request wajib JWT token
```json
HEADER

Authorize: Beare <token>
```

## create data unauthoreze
POST /api/onu-unauthorize
```body table
_________________________________________
| field        |   type     | reqiured  |
-----------------------------------------
| oltId        | String     |    Yes    |
| onuComtName  | String     |    Yes    |
| onuName      | String     |    Yes    |
| status       | String     |    Yes    |
| serialNumber | String     |    Yes    |
| macAddress   | String     |    Yes    |
| portId       | String     |    Yes    |
| onuId        | String     |    Yes    |
| discoveredAt | Datetime   |   default |
| createdAt    | Datetime   |   default |
-----------------------------------------
```
Sebenarnya saya tidak rekomendasi create data ini, karna create di lakukan oleh Syslog
## Documenttation
- [Syslog Docs](../syslogs/project-status-2026-06-14.md)

jadi kita skip dulu create via API

## validation error
```json
{
  "success": false,
  "message": "VALIDATION_ERROR",
  "errors": {
    "oltId": ["Required"],
    "onuComtName": ["Required"],
    "onuName": ["Required"],
    "status": ["Required"],
    "serialNumber": ["Required"],
    "macAddress": ["Required"],
    "portId": ["Required"],
    "onuId": ["Required"]
  }
}
```

## get all data
GET /api/onu-unauthorize

## 404 respon not found data
```json
{
  "success": false,
  "message": "ONU_UNAUTHORIZE_NOT_FOUND"
}
```

## 200 success respon
```json
{
  "success": true,
  "message": "ONU_UNAUTHORIZE_FOUND",
  "data": [
    {
      "id": "cmpr6ig5d005jg15wgexzkn4j",
      "oltId": "cmpkutl6y0000g1qfqww5pk0e",
      "onuComtName": "ka_yayan_nanggela",
      "onuName": "Ka Yayan - Nanggela",
      "status": "Up",
      "serialNumber": null,
      "macAddress": "64:58:AD:13:88:78",
      "portId": null,
      "onuId": "40",
      "discoveredAt": "2026-05-29T17:11:33.697Z",
      "createdAt": "2026-05-29T17:11:33.697Z"
    },
    {
      "id": "cmpr6ig56005fg15w8627rchg",
      "oltId": "cmpkutl6y0000g1qfqww5pk0e",
      "onuComtName": "bpk_cecep_nanggela",
      "onuName": "Bpk Cecep - Nanggela",
      "status": "Up",
      "serialNumber": null,
      "macAddress": "1C:78:4E:68:06:D8",
      "portId": null,
      "onuId": "37",
      "discoveredAt": "2026-05-29T17:11:33.690Z",
      "createdAt": "2026-05-29T17:11:33.690Z"
    },
  ],
  "meta": {
    "total": 2
  }
}
```

## GET AUTHORIZE ONU BY [field]
1. GET /api/onu-unauthorize/:id
2. GET /api/onu-unauthorize/mac/:mac
3. GET /api/onu-unauthorize/sn/:sn

## 404
```json
{
  "success": false,
  "message": "ONU_UNAUTHORIZE_ID_NOT_FOUND"
}
{
  "success": false,
  "message": "ONU_UNAUTHORIZE_MAC_NOT_FOUND"
}
{
  "success": false,
  "message": "ONU_UNAUTHORIZE_SN_NOT_FOUND"
}
```

## 200
```json
{
  "success": true,
  "message": "ONU_UNAUTHORIZE_FOUND",
  "data": {
    "id": "cmpr6ig56005fg15w8627rchg",
    "oltId": "cmpkutl6y0000g1qfqww5pk0e",
    "onuComtName": "bpk_cecep_nanggela",
    "onuName": "Bpk Cecep - Nanggela",
    "status": "Up",
    "serialNumber": null,
    "macAddress": "1C:78:4E:68:06:D8",
    "portId": null,
    "onuId": "37",
    "discoveredAt": "2026-05-29T17:11:33.690Z",
    "createdAt": "2026-05-29T17:11:33.690Z"
  }
}
```

## DELETE UNAUTHORIZE ONU
DELETE /api/onu-unauthorize/:id

## respon NOT_FOUND
```json
{
  "success": false,
  "message": "AUTHORIZE_ONU_NOT_FOUND"
}
```

## response delete success
```json
{
  "success": true,
  "message": "UNAUTHORIZE_ONU_DELETED",
  "data": {
    "id": "cmpr6i42p0017g15wdf8n5ayr",
    "oltId": "cmpkutl6y0000g1qfqww5pk0e",
    "onuComtName": "tobari_cuping",
    "onuName": "Tobari - Cuping",
    "status": "Up",
    "serialNumber": null,
    "macAddress": "20:28:3E:7E:73:04",
    "portId": null,
    "onuId": "4",
    "discoveredAt": "2026-05-29T17:11:18.049Z",
    "createdAt": "2026-05-29T17:11:18.049Z"
  }
}
```

[⬆ Kembali ke Atas](#onu-unauthorize-endpoint-api)