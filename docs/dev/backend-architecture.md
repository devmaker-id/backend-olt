# BACKEND ARCHITECTURE

## Stack

* Node.js
* TypeScript
* Fastify
* Prisma
* PostgreSQL

---

# Architecture Style

Feature Based Architecture

Structure:

src/

├── config/
├── middleware/
├── modules/
├── services/
├── utils/

---

# Module Structure

modules/

example:

endpoint/

├── endpoint.controller.ts
├── endpoint.routes.ts
├── endpoint.service.ts
├── endpoint.types.ts
└── endpoint.validation.ts

---

# Layer Responsibility

## Routes

Register endpoint route.

## Controller

Receive request.

Validate request.

Call service.

Return response.

No business logic.

## Service

Contains business logic.

Database access.

External integrations.

## Validation

Reusable validation.

## Types

DTO.

Interfaces.

Request and response definitions.

---

# Database

ORM:
Prisma

Database:
PostgreSQL

Migration Strategy:

* Prisma Migrate
* Incremental Migration
* Version Controlled Schema

---

# External Integration

## OLT

Protocol:

* Telnet

Vendor:

* Hisfocus

Adapters:

services/network/

---

## Telegram

Structure:

services/telegram/

* commands
* session
* messages
* router
* service
* webhook

Webhook only delegates to service.

Business logic belongs in service.
