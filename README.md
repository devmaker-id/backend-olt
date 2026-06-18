# Backend OLT / ISP NMS

### MODULE PROJEK DOCS
1. [⬆⬆ LIHAT INSTALLASI PROJEK](./docs/INSTALLATION.md)
2. [⬆⬆ .ENV PROJEK](./docs/ENV.md)
3. [⬆⬆ LIHAT API PROJEK](./docs/api/index.md)

## Project Overview

Backend OLT adalah Network Management System (NMS) untuk ISP berbasis EPON.

Project ini digunakan untuk:

* Manajemen OLT
* Monitoring ONU
* Registrasi ONU baru
* Replacement ONU
* Manajemen Endpoint Pelanggan
* Integrasi Telegram Bot
* Logging dan Audit Aktivitas
* Dashboard Monitoring

Arsitektur menggunakan:

### Backend

* Fastify
* Prisma ORM
* PostgreSQL
* Telnet Session
* Adapter Pattern (OLT Vendor)

### Frontend

* React 19
* Vite
* React Router
* React Query
* Tailwind CSS v4
* shadcn/ui
* Sonner
* TypeScript Strict Mode

---

# Domain Model

## OLT

Optical Line Terminal.

Menyimpan:

* IP Address
* Vendor
* Username
* Password
* Lokasi

Relasi:

OLT → ONU

---

## ONU

Perangkat pelanggan yang terhubung ke OLT.

Menyimpan:

* ONU ID
* EPON Port
* MAC Address
* Model
* Firmware
* Status
* Optical Information

Relasi:

ONU → Endpoint

---

## Endpoint

Entity utama bisnis ISP.

Bukan ONU.

Endpoint mewakili:

* Customer
* Reseller
* POP
* Backhaul

Memiliki:

* Internet Number
* Nama
* Alamat
* Lokasi

ONU hanya perangkat yang menempel pada Endpoint.

---

## Package

Paket internet pelanggan.

Saat ini sudah tersedia di schema Prisma tetapi frontend belum sepenuhnya menggunakan modul ini.

---

## ONU Replacement

Mencatat histori penggantian ONU.

Relasi:
```tree
Endpoint
├── Old ONU
└── New ONU
```
Digunakan untuk audit perangkat pelanggan.

---

## Telegram Bot

Integrasi Telegram untuk:

* Monitoring
* Notifikasi Alarm
* Command Bot

---

## Telegram User

Whitelist pengguna Telegram yang diperbolehkan menggunakan bot.

Role:

* ADMIN
* TEKNISI

---

## Alarm Log

Mencatat alarm dari OLT.

Contoh:

* ONU Link Down
* ONU Link Up
* LOS
* Dying Gasp
* Unauthorized ONU
