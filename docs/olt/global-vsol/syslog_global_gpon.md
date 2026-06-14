# syslog_global_gpon.md

# GLOBAL GPON OLT

## Syslog Configuration & Monitoring Guide

Version: GPON OLT Platform V1.1.9

---

# Overview

Dokumen ini menjelaskan mekanisme logging dan syslog pada GLOBAL GPON OLT Platform.

Berdasarkan hasil eksplorasi CLI ditemukan bahwa perangkat menggunakan daemon:

```text
zebra
gpond
```

dengan konfigurasi logging terpisah antara routing daemon (zebra) dan GPON daemon (gpond).

---

# Current Logging Status

Command:

```text
show logging
```

Output yang ditemukan:

```text
Logging configuration for zebra:
Syslog logging: disabled
Stdout logging: disabled
File logging: disabled

Logging configuration for gpond:
Syslog logging: disabled
Stdout logging: disabled
File logging: disabled
```

Interpretasi:

| Feature           | Status    |
| ----------------- | --------- |
| Local Syslog      | Disabled  |
| File Logging      | Disabled  |
| Console Logging   | Disabled  |
| GPON Event Engine | Available |
| Alarm Engine      | Available |

Walaupun logging daemon dinonaktifkan, alarm dan event GPON tetap tersedia melalui subsystem alarm-event.

---

# CLI Discovery

Menu ditemukan:

```text
show syslog
show logging
syslog
```

Konfigurasi syslog dilakukan dari mode:

```text
configure terminal
```

Prompt:

```text
OLT-MUNCANG(config)#
```

---

# Event Sources

## ONU Registration

Ditemukan event:

```text
onu-register
onu-auth-success
onu-finish
onu-link-discover
```

Digunakan untuk mendeteksi ONU berhasil online.

---

## ONU Offline

Ditemukan alarm:

```text
onu-deregister
onu-link-lost
onu-dying-gasp
onu-auth-failed
```

Digunakan untuk mendeteksi ONU offline.

---

# ONU Event Classification

## ONU UP

Contoh event:

```text
ONU_REGISTER
ONU_AUTH_SUCCESS
ONU_FINISH
```

Makna:

* ONU berhasil registrasi
* ONU berhasil autentikasi
* ONU aktif

---

## ONU DOWN

Contoh alarm:

```text
ONU_DEREGISTER
ONU_LINK_LOST
ONU_DYING_GASP
```

Makna:

* ONU keluar dari OLT
* Fiber putus
* Listrik ONU mati

---

# Alarm OAM Log

Subsystem alarm yang ditemukan:

```text
show alarm oamlog
```

Per ONU:

```text
show alarm oamlog onu 1
```

Fungsi:

* Histori ONU Down
* Histori ONU Dying Gasp
* Histori ONU Link Fault
* Histori ONU Critical Event

---

# Alarm Event Database

Command:

```text
show alarm-event information
```

Digunakan untuk:

* Melihat histori event
* Melihat histori alarm
* Monitoring ONU

---

# Syslog Architecture

Target implementasi:

```text
GLOBAL OLT
     │
     │ UDP/514
     ▼
172.10.0.2
Syslog Server
```

Contoh event:

```text
ONU_REGISTER
ONU_AUTH_SUCCESS
ONU_DEREGISTER
ONU_LINK_LOST
ONU_DYING_GASP
```

---

# Recommended Syslog Events

## Event

```text
onu-register
onu-auth-success
onu-finish
```

## Alarm

```text
onu-deregister
onu-link-lost
onu-dying-gasp
onu-auth-failed
```

---

# Remote Notification

Mode yang tersedia:

```text
print
record
trap
remote
all
```

Keterangan:

| Mode   | Fungsi                 |
| ------ | ---------------------- |
| print  | tampil di console      |
| record | simpan ke database     |
| trap   | kirim SNMP Trap        |
| remote | kirim ke remote syslog |
| all    | aktifkan semuanya      |

---

# Enable Remote Event Example

Contoh konseptual:

```text
event onu-register remote enable
```

```text
event onu-auth-success remote enable
```

---

# Enable Remote Alarm Example

```text
alarm onu-deregister remote enable
```

```text
alarm onu-link-lost remote enable
```

```text
alarm onu-dying-gasp remote enable
```

```text
alarm onu-auth-failed remote enable
```

Catatan:

Sintaks aktual harus diverifikasi menggunakan:

```text
syslog ?
```

dan

```text
show syslog
```

karena firmware dapat berbeda antar versi.

---

# Disable Syslog

Sebelum melakukan perubahan:

```text
show syslog
```

Kemungkinan pola disable:

```text
no syslog enable
```

atau

```text
syslog disable
```

atau

```text
no syslog host 172.10.0.2
```

Verifikasi menggunakan:

```text
syslog ?
```

---

# Syslog Server Validation

Pada server Linux:

Cek listener:

```bash
ss -lunp | grep 514
```

Monitoring realtime:

```bash
tcpdump -ni any udp port 514
```

---

# Integration With Monitoring System

Syslog dapat diintegrasikan dengan:

* rsyslog
* syslog-ng
* Graylog
* ELK Stack
* OpenSearch
* Grafana Loki
* Zabbix
* LibreNMS
* Telegram Bot
* Laravel Queue Worker

---

# SSH Alternative

Jika syslog belum tersedia atau belum aktif:

Monitoring dapat dilakukan melalui SSH.

Command utama:

```text
show onu state
```

```text
show onu optical-info
```

```text
show alarm oamlog
```

```text
show alarm-event information
```

---

# Recommended Production Design

```text
GLOBAL OLT
     │
     ├── SSH Monitoring
     │
     ├── Alarm Event Database
     │
     └── Syslog UDP/514
              │
              ▼
         172.10.0.2
              │
              ▼
      Telegram / Dashboard
```

---

# Useful Commands Summary

```text
show logging
```

```text
show syslog
```

```text
show alarm oamlog
```

```text
show alarm oamlog onu 1
```

```text
show alarm-event information
```

```text
find alarm
```

```text
find event
```

```text
syslog ?
```

---

End of Document
