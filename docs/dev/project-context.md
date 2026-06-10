# PROJECT CONTEXT

## Project Information

Project Name:
Network Management System (NMS)

Version:
v0.6.0

Status:
Active Development

Author:
Devmaker

---

# Project Goal

NMS adalah aplikasi internal ISP yang digunakan untuk:

* Monitoring OLT
* Monitoring ONU
* Inventory ONU
* Endpoint Management
* ONU Replacement
* Telegram Bot Management
* Telegram User Management
* Alarm Monitoring
* Telegram Notification
* Network Troubleshooting

Project berfokus pada operasional FTTH berbasis EPON.

---

# Backend Stack

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL
* JWT Authentication

Architecture:

* Feature Based Architecture
* Service Layer Pattern
* DTO Pattern
* Repository via Prisma
* Middleware Based Authentication

Folder Structure:

src/modules/

Setiap module berisi:

* controller
* routes
* service
* types
* validation

Contoh:

modules/
├── endpoint
├── olt
├── onu
├── telegram
├── telegram-bot
├── users

Business logic ditempatkan pada service.

Controller hanya menerima request dan mengembalikan response.

---

# Frontend Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* shadcn/ui
* Radix UI
* Lucide React
* TanStack Query
* React Router

Architecture:

* Feature Based Architecture
* DTO First
* Reusable Component Pattern
* Custom Hooks Pattern

Folder Structure:

modules/

Setiap module memiliki:

* api
* hooks
* components
* pages
* routes.tsx
* navigation.ts
* types

Contoh:

modules/
├── endpoint
├── olt
├── telegram
├── telegram-bot
├── onu
├── onu-replacement

---

# Coding Guidelines

## General

* Hindari penggunaan any
* Gunakan interface atau type
* Gunakan DTO untuk request dan response
* Gunakan TypeScript strict mode
* Gunakan import alias (@/)

---

## Backend Rules

Controller:

* Tidak boleh berisi business logic
* Hanya menerima request
* Memanggil service
* Mengembalikan response

Service:

* Seluruh business logic berada di sini
* Akses database menggunakan Prisma

Validation:

* Dipisah ke file validation

Types:

* Dipisah ke file *.types.ts

---

## Frontend Rules

Pages:

* Hanya orchestration
* Tidak boleh terlalu besar
* Gunakan reusable component

Hooks:

* Berisi TanStack Query
* Berisi mutation
* Berisi data fetching

Components:

* Fokus pada UI
* Tidak melakukan fetch data

API:

* Seluruh request API dipusatkan di folder api

---

# Shared Components

Gunakan komponen berikut jika memungkinkan:

* PageContainer
* PageHeader
* LoadingState
* ErrorState
* EmptyState
* SummaryCard
* ConfirmDelete
* DataTableToolbar
* SearchInput
* DataTablePagination

Jangan membuat komponen baru jika komponen shared sudah tersedia.

---

# UI Guidelines

Gunakan:

* shadcn/ui
* Tailwind CSS
* Lucide React

Hindari:

* Inline style
* HTML native jika sudah tersedia versi shadcn

Contoh:

Gunakan:

* Button
* Card
* Badge
* Select
* Sheet
* Dialog

Daripada:

* button
* select
* dialog native

---

# Current Backend Features

Completed:

* Authentication
* OLT CRUD
* Endpoint CRUD
* ONU Inventory
* ONU Reconciliation
* ONU Replacement
* Telegram User Management
* Telegram Bot Management
* Telegram Access Log
* Syslog Receiver
* ONU Event Tracking

---

# Current Frontend Features

Completed:

* Dashboard
* OLT Management
* Endpoint Management
* Telegram Users
* Telegram Bots
* ONU Replacement
* Unauthorized ONU
* Telegram Access Logs

---

# Telegram Architecture

Telegram menggunakan:

services/telegram/

Struktur:

* commands/
* session/
* messages/
* telegram.router.ts
* telegram.service.ts
* telegram.webhook.ts

Business logic Telegram harus berada di service.

Webhook hanya menerima update dan meneruskannya ke service.

---

# Current Database Main Models

* User
* Olt
* Onu
* Endpoint
* Package
* AlarmLog
* UnauthorizedOnu
* TelegramUser
* TelegramBot
* TelegramAccessLog
* OnuReplacement
* OnuEvent

ORM:
Prisma

Database:
PostgreSQL

---

# Current Navigation Modules

Frontend Modules:

* Dashboard
* OLT
* Endpoint
* ONU
* ONU Replacement
* Telegram
* Telegram Bot
* System Logs

Setiap module memiliki:

* routes.tsx
* navigation.ts

---

# Development Philosophy

Prioritas:

1. Readability
2. Maintainability
3. Type Safety
4. Reusability
5. Scalability

Lebih baik:

* Membuat reusable component
* Memecah page besar menjadi component kecil
* Memisahkan business logic dari UI

Daripada membuat file besar yang sulit dirawat.

---

# How ChatGPT Should Assist

Saat memberikan rekomendasi:

* Ikuti Feature Based Architecture
* Gunakan DTO
* Hindari any
* Gunakan TypeScript
* Gunakan shadcn/ui
* Gunakan komponen shared jika tersedia
* Gunakan custom hooks untuk TanStack Query
* Pisahkan page, hooks, api, components, dan types
* Pertahankan struktur project yang sudah ada

Jangan memberikan contoh yang bertentangan dengan arsitektur project ini.
