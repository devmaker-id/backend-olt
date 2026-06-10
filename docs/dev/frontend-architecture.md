# FRONTEND ARCHITECTURE

## Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS v4
* shadcn/ui
* Radix UI
* TanStack Query
* React Router

---

# Architecture Style

Feature Based Architecture

---

# Module Structure

modules/

example:

endpoint/

├── api/
├── hooks/
├── components/
├── pages/
├── routes.tsx
├── navigation.ts
└── types/

---

# Responsibility

## Pages

Orchestration only.

Use hooks.

Use reusable components.

Avoid large files.

---

## Components

UI only.

Reusable.

No API requests.

---

## Hooks

TanStack Query.

Mutations.

Data fetching.

Business UI logic.

---

## API

Axios requests.

No UI logic.

---

## Types

DTO.

Response interfaces.

Request interfaces.

---

# Shared Layer

shared/

├── components/
├── layouts/
├── navigation/
├── pages/

Reusable across modules.

---

# UI Guidelines

Preferred:

* Card
* Button
* Badge
* Dialog
* Sheet
* Select

Use shadcn/ui whenever available.

Avoid native HTML controls when a shared component exists.

---

# Development Principles

* Reusable Components
* Type Safety
* Small Components
* Separation of Concerns
* Maintainability
