# documentation_ssh_intro.md

# SSH Introduction & GPON CLI Exploration Guide

## GLOBAL GPON OLT Platform V1.1.9

---

# 1. Pendahuluan

Dokumen ini menjelaskan penggunaan SSH pada perangkat GLOBAL GPON OLT Platform, struktur CLI, navigasi command, eksplorasi ONU, alarm, event, serta dasar integrasi automation menggunakan SSH.

Dokumen dibuat berdasarkan observasi langsung pada firmware:

```text
Hello, this is gpon olt platform (version V1.1.9)
```

Daemons yang teridentifikasi:

```text
zebra
gpond
```

Komponen:

| Daemon | Fungsi                     |
| ------ | -------------------------- |
| zebra  | Routing Engine (FRRouting) |
| gpond  | GPON Management Daemon     |
| sshd   | SSH Access                 |
| web    | Web Management             |
| snmp   | SNMP Service               |

---

# 2. Koneksi SSH

## Linux

```bash
ssh username@IP_OLT
```

Contoh:

```bash
ssh bibit@192.168.99.254
```

---

## Windows PowerShell

```powershell
ssh username@IP_OLT
```

---

## Termux Android

```bash
pkg install openssh

ssh bibit@192.168.99.254
```

---

# 3. Login Flow

Saat berhasil login:

```text
User Access Verification

############################################################
#                                                          #
#               Welcome to GPON Olt Platform.              #
#                                                          #
############################################################
```

Prompt awal:

```text
OLT-MUNCANG>
```

Mode ini disebut:

```text
User Mode
```

---

# 4. Privilege Mode

Masuk ke mode administrator:

```text
enable
```

Masukkan password enable.

Prompt berubah:

```text
OLT-MUNCANG#
```

---

# 5. Configuration Mode

Masuk ke konfigurasi:

```text
configure terminal
```

Prompt:

```text
OLT-MUNCANG(config)#
```

Keluar:

```text
exit
```

atau:

```text
end
```

---

# 6. Struktur CLI

Firmware ini menggabungkan:

## FRRouting (Routing)

Command:

```text
show ip route
show zebra
show vrf
show logging
```

---

## GPON Management

Command:

```text
show onu
show pon
show profile
show pre-config-onu
show alarm
show event
```

---

# 7. Menampilkan Informasi Routing

## Routing Table

```text
show ip route
```

JSON format:

```text
show ip route json
```

Contoh output:

```json
{
  "0.0.0.0/0": {
    "gateway":"192.168.99.1"
  }
}
```

---

# 8. ONU Management

## Menampilkan ONU

Masuk port GPON:

```text
interface gpon 1/1
```

Lihat ONU:

```text
show onu state
```

---

## Informasi ONU

```text
show onu info
```

---

## Detail ONU

```text
show onu detail-info
```

---

## Versi Firmware ONU

```text
show onu version
```

---

## Jarak ONU

```text
show onu distance
```

---

# 9. Monitoring Optical

## RX Power

```text
show onu rx-power
```

---

## TX Power

```text
show onu tx-power
```

---

## Informasi Optical Lengkap

```text
show onu optical-info
```

---

## RX Power GPON

```text
show pon rx_power onu
```

---

# 10. Auto Discovery ONU

## ONU Auto Find

```text
show onu auto-find
```

Detail:

```text
show onu auto-find detail-info
```

---

# 11. Menambah ONU

Sintaks:

```text
onu add <onu-id> profile <profile-name> sn <serial-number>
```

Contoh:

```text
onu add 1 profile DEFAULT sn VSOL12345678
```

---

# 12. Menghapus ONU

```text
no onu 1
```

atau

```text
no onu ONU_NAME
```

---

# 13. Reboot ONU

```text
onu 1 reboot
```

---

# 14. ONU Profiles

## Menampilkan Profile

```text
show profile onu
```

---

## Profile Berdasarkan ID

```text
show profile onu id 1
```

---

## Running Configuration Profile

```text
show profile onu running-config
```

---

# 15. Event System

## Event ONU

Event yang tersedia:

```text
onu-register
onu-auth-success
onu-finish
onu-link-discover
```

---

## Konfigurasi Event

```text
show event configuration
```

---

## Enable Recording

```text
event onu-register record enable
```

---

# 16. Alarm System

Alarm yang tersedia:

```text
onu-deregister
onu-link-lost
onu-dying-gasp
onu-auth-failed
onu-illegal-register
onu-port-los
```

---

# 17. OAM Log

## Menampilkan Log

```text
show alarm oamlog
```

---

## Log ONU Tertentu

```text
show alarm oamlog onu 1
```

---

## Menyimpan OAM Log

```text
save alarm oamlog flash
```

---

## Menghapus OAM Log

```text
clear alarm oamlog
```

---

# 18. Alarm Event Information

Menampilkan histori alarm dan event:

```text
show alarm-event information
```

Data ini sangat penting untuk:

* Monitoring ONU UP
* Monitoring ONU DOWN
* Dying Gasp Detection
* Fiber LOS Detection
* Telegram Notification
* NOC Dashboard

---

# 19. SNMP

Konfigurasi:

```text
show snmp
```

```text
show snmp-server
```

---

# 20. Automation via SSH

## Python Paramiko

```python
import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(
    paramiko.AutoAddPolicy()
)

ssh.connect(
    host,
    username=user,
    password=password
)

shell = ssh.invoke_shell()

shell.send("show alarm oamlog\n")
```

---

# 21. Integrasi Monitoring

Data yang direkomendasikan untuk dikumpulkan:

* ONU State
* ONU Optical Power
* ONU Distance
* ONU Firmware
* ONU Register Event
* ONU Dying Gasp
* ONU Deregister
* ONU Link Lost

---

# 22. Keluar dari SSH

Logout:

```text
exit
```

atau:

```text
quit
```

---

## OpenSSH Escape

Jika sesi macet:

```text
~.
```

Contoh:

```text
Connection to 192.168.99.254 closed.
```

---

# 23. Best Practice

1. Gunakan akun readonly untuk monitoring.
2. Simpan alarm/event ke database eksternal.
3. Polling ONU setiap 60 detik.
4. Gunakan OAM Log untuk histori.
5. Backup konfigurasi sebelum perubahan.
6. Jangan menggunakan debug pada jam produksi.

---

# 24. Target Integrasi Lanjutan

* Telegram Bot Notification
* Laravel API Wrapper
* NodeJS Monitoring Service
* Grafana Dashboard
* Zabbix Integration
* LibreNMS Integration
* WhatsApp Alert Gateway

---

End of Document
