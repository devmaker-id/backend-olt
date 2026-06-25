# SYSLOG EVENT
Base URL
```text
/api/syslog-event
```

1. Authentication Required: Yes (JWT)
2. Routes: ONLY Role OWNER
---
## TYPE DATA
sysylog type = SyslogEventType
```tsx
enum SyslogEventType {

  ONU_LINKUP
  ONU_LINKDOWN

  ONU_ONLINE
  ONU_OFFLINE

  ONU_REGISTER
  ONU_UNREGISTER

  ONU_LOS
  ONU_DYING_GASP

  WEB_LOGIN
  WEB_LOGOUT

  SSH_LOGIN
  SSH_LOGOUT

  WEB_CONNECTION
  WEB_DISCONNECTION

  SYSTEM
  UNKNOWN
}
```
## GET ALL DATA
GET /api/syslog-event

### respon success
```json
{
  "success": true,
  "message": "SYSLOG_EVENT_FOUND",
  "data": [
    {
      "id": "cmqsmtr2o000ag1hdgms3friv",
      "oltId": null,
      "onuIdRef": null,
      "type": "ONU_LINKUP",
      "sourceIp": "192.168.77.254",
      "oltName": "OLT_BIBITNET",
      "portId": "0/4",
      "onuId": "26",
      "onuMac": "1C:27:04:B0:B3:AF",
      "serialNumber": null,
      "onuName": "pak_mamay",
      "rawLog": "<30>Jun 24 01:53:09 OLT_BIBITNET: [2026-06-24 01:53:09] ONU 0/4:26     [ 1C:27:04:B0:B3:AF ] [pak_mamay] linkup\n",
      "payload": "{\"status\":\"linkup\"}",
      "createdAt": "2026-06-24T22:15:43.440Z"
    },
    {
      "id": "cmqsmst3k0005g1hdf3ygwncm",
      "oltId": null,
      "onuIdRef": null,
      "type": "ONU_LINKDOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "OLT_BIBITNET",
      "portId": "0/4",
      "onuId": "26",
      "onuMac": "1C:27:04:B0:B3:AF",
      "serialNumber": null,
      "onuName": "pak_mamay",
      "rawLog": "<30>Jun 24 01:52:25 OLT_BIBITNET: [2026-06-24 01:52:25] ONU 0/4:26     [ 1C:27:04:B0:B3:AF ] [pak_mamay] linkdown\n",
      "payload": "{\"status\":\"linkdown\"}",
      "createdAt": "2026-06-24T22:14:59.408Z"
    },
    {
      "id": "cmqsmsb5u0004g1hdkytbwsb4",
      "oltId": null,
      "onuIdRef": null,
      "type": "UNKNOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "UNKNOWN",
      "portId": null,
      "onuId": null,
      "onuMac": null,
      "serialNumber": null,
      "onuName": null,
      "rawLog": "<30>Jun 24 01:52:01 OLT_BIBITNET: User admin login from CLI 172.10.0.247\n",
      "payload": "{\"reason\":\"NO_MATCHING_PARSER\"}",
      "createdAt": "2026-06-24T22:14:36.161Z"
    },
    {
      "id": "cmqsmsarw0003g1hdk6kb5jln",
      "oltId": null,
      "onuIdRef": null,
      "type": "UNKNOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "UNKNOWN",
      "portId": null,
      "onuId": null,
      "onuMac": null,
      "serialNumber": null,
      "onuName": null,
      "rawLog": "<30>Jun 24 01:52:01 OLT_BIBITNET: User admin login from CLI 172.10.0.247\n",
      "payload": "{\"reason\":\"NO_MATCHING_PARSER\"}",
      "createdAt": "2026-06-24T22:14:35.660Z"
    },
    {
      "id": "cmqsmrpc20002g1hdbkuylte0",
      "oltId": null,
      "onuIdRef": null,
      "type": "UNKNOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "UNKNOWN",
      "portId": null,
      "onuId": null,
      "onuMac": null,
      "serialNumber": null,
      "onuName": null,
      "rawLog": "<30>Jun 24 01:51:33 OLT_BIBITNET: User admin login from Web 172.10.0.247\n",
      "payload": "{\"reason\":\"NO_MATCHING_PARSER\"}",
      "createdAt": "2026-06-24T22:14:07.874Z"
    },
    {
      "id": "cmqsmrpbb0001g1hdgs9lznw2",
      "oltId": null,
      "onuIdRef": null,
      "type": "UNKNOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "UNKNOWN",
      "portId": null,
      "onuId": null,
      "onuMac": null,
      "serialNumber": null,
      "onuName": null,
      "rawLog": "<30>Jun 24 01:51:33 OLT_BIBITNET: New web connection , current web client=6\n",
      "payload": "{\"reason\":\"NO_MATCHING_PARSER\"}",
      "createdAt": "2026-06-24T22:14:07.848Z"
    },
    {
      "id": "cmqsmrjdb0000g1hdcbdn4qrw",
      "oltId": null,
      "onuIdRef": null,
      "type": "UNKNOWN",
      "sourceIp": "192.168.77.254",
      "oltName": "UNKNOWN",
      "portId": null,
      "onuId": null,
      "onuMac": null,
      "serialNumber": null,
      "onuName": null,
      "rawLog": "<30>Jun 24 01:51:25 OLT_BIBITNET: Delete web connection 172.10.0.247, current web client=5\n",
      "payload": "{\"reason\":\"NO_MATCHING_PARSER\"}",
      "createdAt": "2026-06-24T22:14:00.142Z"
    }
  ],
  "meta": {
    "total": 7
  }
}
```
### respon not_found
```json
{
  "success": false,
  "message": "SYSLOG_EVENT_NOT_FOUND"
}
```

## GET BY ID SYSLOG EVENT
GET /api/syslog-event/:id

### respon success
```json
{
  "success": true,
  "message": "SYSLOG_FOUND",
  "data": {
    "id": "cmqsmtr2o000ag1hdgms3friv",
    "oltId": null,
    "onuIdRef": null,
    "type": "ONU_LINKUP",
    "sourceIp": "192.168.77.254",
    "oltName": "OLT_BIBITNET",
    "portId": "0/4",
    "onuId": "26",
    "onuMac": "1C:27:04:B0:B3:AF",
    "serialNumber": null,
    "onuName": "pak_mamay",
    "rawLog": "<30>Jun 24 01:53:09 OLT_BIBITNET: [2026-06-24 01:53:09] ONU 0/4:26     [ 1C:27:04:B0:B3:AF ] [pak_mamay] linkup\n",
    "payload": "{\"status\":\"linkup\"}",
    "createdAt": "2026-06-24T22:15:43.440Z"
  }
}
```

### respon not found
```json
{
  "success": false,
  "message": "SYSLOG_EVENT_NOT_FOUND"
}
```

## DELETE SYSLOG EVENT
DELETE /api/syslog-event/:id

### response success
```json
{
  "success": true,
  "message": "SYSLOG_EVENT_DELETED",
  "data": {
    "id": "cmqsmtr2o000ag1hdgms3friv",
    "oltId": null,
    "onuIdRef": null,
    "type": "ONU_LINKUP",
    "sourceIp": "192.168.77.254",
    "oltName": "OLT_BIBITNET",
    "portId": "0/4",
    "onuId": "26",
    "onuMac": "1C:27:04:B0:B3:AF",
    "serialNumber": null,
    "onuName": "pak_mamay",
    "rawLog": "<30>Jun 24 01:53:09 OLT_BIBITNET: [2026-06-24 01:53:09] ONU 0/4:26     [ 1C:27:04:B0:B3:AF ] [pak_mamay] linkup\n",
    "payload": "{\"status\":\"linkup\"}",
    "createdAt": "2026-06-24T22:15:43.440Z"
  }
}
```
### response not_found
```json
{
  "success": false,
  "message": "SYSLOG_EVENT_NOT_FOUND"
}
```