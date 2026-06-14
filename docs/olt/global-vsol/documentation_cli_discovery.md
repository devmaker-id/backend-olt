# documentation_cli_discovery.md

# GLOBAL GPON OLT Platform V1.1.9

## CLI Discovery & Reverse Engineering Notes

Dokumen ini berisi hasil eksplorasi command line interface (CLI) dari GLOBAL GPON OLT Platform V1.1.9 melalui SSH.

Tujuan dokumen:

* Membantu memahami struktur firmware.
* Menjadi referensi untuk automation SSH.
* Menjadi konteks bagi ChatGPT pada sesi baru.
* Menemukan command ONU, Alarm, Event, GPON, dan Monitoring.

---

# Device Identification

Banner:

```text
Hello, this is gpon olt platform (version V1.1.9)
```

Hostname:

```text
OLT-MUNCANG
```

SSH Access:

```bash
ssh bibit@192.168.99.254
```

---

# Architecture Discovery

Ditemukan daemon:

```text
show modules
```

Output:

```text
Module information for zebra:

libfrr
zebra

Module information for gpond:

libfrr
gpond
```

Kesimpulan:

| Daemon | Fungsi                     |
| ------ | -------------------------- |
| zebra  | Routing Engine (FRRouting) |
| gpond  | GPON Management            |
| sshd   | SSH Server                 |
| web    | Web Interface              |
| snmp   | Monitoring                 |

---

# CLI Levels

## User Mode

Prompt:

```text
OLT-MUNCANG>
```

Command:

```text
show
ping
ssh
telnet
traceroute
enable
```

---

## Enable Mode

Prompt:

```text
OLT-MUNCANG#
```

Tambahan command:

```text
configure
copy
write
debug
show
start-shell
```

---

## Config Mode

Prompt:

```text
OLT-MUNCANG(config)#
```

GPON command muncul di mode ini.

---

# SHOW MENU DISCOVERY

Command:

```text
show
```

Output penting:

```text
show onu
show pon
show profile
show alarm
show event
show running-config
show startup-config
show snmp
show sys
show version
```

---

# FIND GPON

Command:

```text
find gpon
```

Temuan penting:

```text
interface gpon <S/P>
```

```text
gpon debug
```

```text
system pon mode <gpon|xgpon|xgspon>
```

Debug mode:

```text
gponapp show all
gponapp show pon
gponapp show onu
gponapp show profile
gponapp show memory
```

Kesimpulan:

Semua fungsi GPON berada di daemon:

```text
gpond
```

---

# FIND ONU

Command:

```text
find onu
```

---

## Monitoring ONU

```text
show onu state
```

```text
show onu info
```

```text
show onu detail-info
```

```text
show onu distance
```

```text
show onu optical-info
```

```text
show onu rx-power
```

```text
show onu tx-power
```

```text
show onu statistics
```

```text
show onu all-statistics
```

```text
show onu capability
```

```text
show onu version
```

---

## ONU Discovery

```text
show onu auto-find
```

```text
show onu auto-find detail-info
```

---

## ONU Profile

```text
show onu profile
```

```text
show profile onu
```

---

## ONU Configuration

Create ONU:

```text
onu add <id> profile <profile> sn <serial>
```

Delete ONU:

```text
no onu <id>
```

Reboot ONU:

```text
onu <id> reboot
```

Enable ONU:

```text
onu <id> enable
```

Disable ONU:

```text
onu <id> disable
```

---

# FIND ALARM

Command:

```text
find alarm
```

---

## ONU Related Alarms

```text
onu-deregister
```

```text
onu-link-lost
```

```text
onu-dying-gasp
```

```text
onu-auth-failed
```

```text
onu-illegal-register
```

```text
onu-port-los
```

```text
onu-port-failure
```

```text
onu-port-loopback
```

```text
onu-mac-conflict
```

```text
onu-loid-conflict
```

---

## Alarm Logs

```text
show alarm oamlog
```

Per ONU:

```text
show alarm oamlog onu 1
```

---

## Alarm Event Information

```text
show alarm-event information
```

---

## Alarm Configuration

```text
show alarm configuration
```

---

# FIND EVENT

Command:

```text
find event
```

---

## ONU UP Events

```text
onu-register
```

```text
onu-auth-success
```

```text
onu-finish
```

```text
onu-link-discover
```

---

## ONU DOWN Events

Melalui alarm:

```text
onu-deregister
```

```text
onu-link-lost
```

```text
onu-dying-gasp
```

---

## Event Configuration

```text
show event configuration
```

---

# FIND PON

Command yang perlu dieksplor:

```text
show pon
```

Kemungkinan output:

```text
show pon state
show pon statistics
show pon optical
show pon rx_power onu
```

Ditemukan:

```text
show pon rx_power onu
```

---

# FIND PROFILE

Profile tersedia:

```text
onu
dba
line
srv
alarm
pri
format
igmp
```

Monitoring:

```text
show profile onu
```

```text
show profile line
```

```text
show profile srv
```

---

# SSH Automation Targets

Command paling berguna untuk automation:

## Status ONU

```text
show onu state
```

## Informasi ONU

```text
show onu info
```

## Optical ONU

```text
show onu optical-info
```

## Alarm History

```text
show alarm oamlog
```

## Event History

```text
show alarm-event information
```

## ONU Discovery

```text
show onu auto-find
```

---

# Recommended Data Collection

Kumpulkan secara periodik:

* ONU ID
* ONU Serial Number
* ONU State
* ONU Distance
* ONU RX Power
* ONU TX Power
* ONU Firmware Version
* ONU Dying Gasp
* ONU Deregister
* ONU Link Lost
* ONU Register

---

# Integration Notes

Platform cocok untuk:

* Python Paramiko
* PHP SSH2
* Laravel Scheduler
* NodeJS SSH2
* Telegram Bot
* Zabbix
* Grafana
* LibreNMS

Karena sebagian besar data dapat diambil langsung melalui SSH tanpa SNMP.

End of Document
