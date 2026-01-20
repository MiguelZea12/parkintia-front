# Parkintia Frontend Context (GEMINI.md)

This file provides a comprehensive context for the **Parkintia Frontend** project, a smart parking management dashboard and authentication system.

## 📂 Project Overview

**Name:** Parkintia Frontend (`parkintia-front`)
**Purpose:** A modern, responsive web application for managing smart parking systems. It includes professional authentication, a comprehensive administrative dashboard, real-time camera management, and an intelligent chatbot assistant.
**Status:** Active development. Features simulated backend integration with clear paths for real API connections.

## 🛠️ Tech Stack

*   **Framework:** Next.js 15.4.1 (App Router)
*   **Language:** TypeScript 5+
*   **Styling:** Tailwind CSS v4 (PostCSS)
*   **Icons:** Lucide React
*   **Charts/Visualization:** Recharts
*   **State Management:** React Context API (`AuthContext`, `LanguageContext`)
*   **Linting:** ESLint

## 🏗️ Architecture & Structure

The project follows a modular, feature-based architecture within the Next.js App Router structure.

```text
src/
├── app/                    # Next.js App Router Pages
│   ├── auth/               # Combined Auth Page
│   ├── dashboard/          # Protected Dashboard Routes
│   │   ├── cameras/        # Camera Management
│   │   ├── live-detection/ # Real-time Detection View
│   │   └── page.tsx        # Dashboard Overview
│   ├── login/              # Standalone Login
│   ├── register/           # Standalone Register
│   └── layout.tsx          # Root Layout (Providers)
├── components/             # Reusable UI Components
│   ├── auth/               # Auth Forms (Login/Register)
│   ├── chatbot/            # Chatbot Widget & Window
│   ├── dashboard/          # Dashboard Modules (Overview, Cameras, Users, Reports)
│   ├── ui/                 # Base UI Elements (Button, Card, Input, Modal)
│   └── ClientOnlyAuthProvider.tsx
├── config/                 # Global Configuration
│   ├── i18n.ts             # Internationalization (EN/ES)
│   ├── routes.ts           # Centralized Route Constants
│   └── colors.ts           # Theme Colors
├── context/                # Global State Providers
│   ├── AuthContext.tsx     # Authentication State & Logic
│   └── LanguageContext.tsx # Language State
├── hooks/                  # Custom React Hooks
│   ├── useAuthForm.ts      # Auth Form Logic
│   ├── useAuthRedirect.ts  # Route Protection Logic
│   └── useNavigation.ts    # Typed Navigation Wrapper
├── services/               # API Integration Layer
│   ├── auth.service.ts     # Auth API (Mock/Real)
│   ├── camera.service.ts   # Camera Management API
│   ├── chatbot.service.ts  # Chatbot Backend API
│   └── parking.service.ts  # Parking Data API
└── types/                  # TypeScript Definitions
    ├── auth.ts             # User & Auth Types
    ├── chatbot.ts          # Chatbot Interfaces
    └── ui.ts               # Component Prop Types
```

## ✨ Key Features

### 1. Authentication System
*   **Flows:** Login, Register, Logout.
*   **Protection:** Auto-redirects for unauthenticated users on protected routes.
*   **State:** Persisted via `AuthContext`.

### 2. Dashboard
*   **Overview:** Key metrics (Total Spaces, Revenue, Active Sessions) visualized with charts.
*   **Cameras:** Manage camera feeds, status (Active/Inactive), and locations.
*   **Users:** Admin panel for managing user roles (Admin, Operator, Viewer).
*   **Reports:** Generate and view Daily/Weekly/Monthly reports.
*   **Live Detection:** Real-time view interface for parking zones.

### 3. Intelligent Chatbot
*   **UI:** Floating action button with a modern chat window.
*   **Features:** Real-time status (Online/Offline), backend integration for messages.
*   **Docs:** See `docs/CHATBOT.md` for API contract details.

### 4. Internationalization (i18n)
*   **Languages:** English (`en`) and Spanish (`es`).
*   **Implementation:** `LanguageContext` provides global state; `src/config/i18n.ts` holds translation dictionaries.

## 🚀 Development Guide

### Setup
1.  **Install:** `npm install`
2.  **Environment:** Copy `.env.example` to `.env.local` (ensure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_CHATBOT_API_URL` are set).
3.  **Run:** `npm run dev` (Starts on port 3000).

### Key Commands
*   `npm run dev`: Start development server.
*   `npm run build`: Build for production.
*   `npm run lint`: Run ESLint.
*   `npm run type-check`: Run TypeScript compiler check.

### Coding Conventions

*   **Routing:** ALWAYS use constants from `src/config/routes.ts` instead of hardcoded strings.
    ```typescript
    import { PROTECTED_ROUTES } from '@/config/routes';
    router.push(PROTECTED_ROUTES.DASHBOARD);
    ```
*   **Navigation:** Prefer `useNavigation` hook over raw `useRouter`.
*   **Backend Calls:** Encapsulate all API calls in `src/services/`.
*   **Styling:** Use standard Tailwind CSS utility classes.
*   **Components:** Create small, single-responsibility components in `src/components`.

## ⚠️ Integration Notes

*   **Backend Connection:** The project is currently set up to support both mock data and real API calls. Check `src/services/*.service.ts` to switch between mock/real implementations or configure endpoints.
*   **Route Protection:** Pages under `src/app/dashboard` are automatically protected. Public pages are `login`, `register`, and the root landing page.
