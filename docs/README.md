# Backend OLT / ISP NMS

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

Endpoint
├── Old ONU
└── New ONU

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

---

# Frontend Architecture

Menggunakan pendekatan feature-based modules.

Struktur:

modules/
├── auth
├── dashboard
├── endpoint
├── olt
├── onu
├── onu-replacement
├── telegram
├── telegram-bot
└── system-logs

Setiap module umumnya terdiri dari:

pages/
components/
hooks/
api/
types/
routes.tsx

---

# Shared Components

Saat ini sedang dilakukan refactor menuju reusable design system.

## Layout

shared/components/

* page-container
* page-header

## States

* loading-state
* empty-state
* error-state

## Data Table

shared/components/data-table/

* search-input
* action-buttons
* status-badge
* data-table-pagination
* page-size-select

## Dialog

* confirm-delete

---

# Current Progress

## Backend

Status: Stabil

Sudah tersedia:

* Authentication
* OLT CRUD
* Endpoint CRUD
* ONU Authorization
* ONU Monitoring
* ONU Replacement
* Telegram Bot
* Telegram User
* Logging

## Frontend

Status: Refactor Ongoing

Sudah dimigrasikan sebagian ke:

* PageContainer
* PageHeader
* Shared DataTable Components
* Dialog Pattern
* Sheet Pattern

---

# Current Refactor Goal

Menyatukan seluruh halaman ke pola:

PageContainer
├── PageHeader
├── Toolbar
├── Table / Card
├── Pagination
└── Dialog / Sheet

Target:

* Konsisten Desktop & Mobile
* Mengurangi duplikasi komponen
* Memperkuat shared design system

---

# Next Priority

1. Selesaikan shared components
2. Refactor ONU Replacement
3. Refactor Endpoint Module
4. Integrasi Package Module
5. Mobile Responsive Pattern
6. Detail Sheet Standardization

---

# Notes For Future ChatGPT Sessions

Saat melanjutkan proyek:

* Perlakukan Endpoint sebagai entity utama bisnis.
* ONU adalah perangkat yang menempel ke Endpoint.
* Frontend sedang migrasi ke reusable component architecture.
* Gunakan TypeScript strict mode.
* Prioritaskan shared components daripada membuat komponen baru per module.
* Hindari duplikasi Search, Pagination, Loading, Empty State, dan Detail View.
