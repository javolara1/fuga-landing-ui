# Copilot Instructions for fuga-ui

This document helps AI coding agents understand key aspects of the fuga-ui project to be immediately productive.

## Project Overview

### Purpose

- Landing page for FUGA, a multidisciplinary sports team
- Showcase strength room training and sport-specific programs (cycling, running, swimming)
- Drive new client registrations and inquiries
- Maintain authentication for registered users
- Strong brand identity with black/white color scheme

### Technical Stack

- SvelteKit-based web application using TypeScript
- Deployed on Vercel (using @sveltejs/adapter-vercel)
- Uses Supabase for backend/database
- Internationalization (i18n) support for English and Spanish
- Tailwind CSS for styling with black/white theme focus

## Core Data Models

### Week & TimeSlot System

- Weeks (`Week` entity)
  - Status: PAST, CURRENT, FUTURE_DISABLED, FUTURE_ENABLED
  - Admin-controlled future week enabling
  - Automatic read-only past weeks
  - Sunday to Saturday boundaries

- Time Slots (`TimeSlot` entity)
  - Linked to specific weeks
  - Resource types: CLASS, ROOM, PROFESSIONAL
  - Capacity management
  - Availability tracking

## Key Architecture Patterns

### Routing & Layout

- SvelteKit file-based routing under `src/routes/`
  - Public landing pages: `/`, `/services`, `/pricing`, `/about`, `/contact`
  - Protected routes: `/admin/*`, `/user/*`
- Shared layout components in `+layout.svelte` files
- Server-side logic in `+page.server.ts` files
- Client-side logic in `+page.svelte` files

### Data Layer

- Supabase client initialization in `src/lib/supabaseClient.ts`
- Type definitions in `src/lib/database.types.ts`
- Environment variables required:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY

### Internationalization

- Language files in `src/lib/i18n/{en,es}.json`
- Auto-detection based on browser language (fallback: 'en')
- Server-side loading in `+layout.server.ts`

## Development Workflow

### Setup

```sh
npm install
```

### Common Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run test` - Run all tests (unit + e2e)
- `npm run test:unit` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run lint` - Run ESLint + Prettier checks
- `npm run format` - Auto-format code with Prettier

### Testing Patterns

- Unit tests use Vitest - place next to source files with `.spec.ts` extension
- E2E tests use Playwright - place in `e2e/` directory
- Setup files:
  - `vitest-setup-client.ts` for unit test configuration
  - `playwright.config.ts` for e2e test configuration

## Key Integration Points

1. Authentication/Authorization
   - User auth handled through Supabase
   - Auth state exposed through `locals.user` in server load functions
   - Profile data in `locals.profile`

2. Blog System
   - Blog routes under `/blog` and `/admin/blog`
   - Post creation/editing restricted to admin users
   - Article data stored in Supabase (see migrations)

## Project-Specific Conventions

1. File Organization
   - Reusable components in `src/lib/components/`
   - Utils and helpers in `src/lib/utils/`
   - Database types and client in `src/lib/`
   - Static assets in `static/`

2. Component Structure
   - Use TypeScript for type safety
   - Prefer server-side rendering where possible
   - Admin components prefixed with "Admin" (e.g., `AdminHeader.svelte`)

## Common Gotchas

1. Environment Setup
   - Supabase credentials required for local development
   - Missing env vars will throw explicit errors

2. Database Migrations
   - Located in `supabase/migrations/`
   - Run automatically during Supabase deployments
   - Local development requires manual application

## Instruction Files

This project uses instruction files to define specific coding standards and best practices. Make sure to consult these files when working on the codebase.

| File                                               | Applies To                                                                | Description                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `.github/instructions/memory-bank.instructions.md` | `**`                                                                      | Standards for maintaining the project's Memory Bank documentation. |
| `.github/instructions/svelte.instructions.md`      | `**/*.svelte`, `**/*.ts`, `**/*.js`, `**/*.css`, `**/*.scss`, `**/*.json` | Svelte 5 and SvelteKit development standards and best practices.   |

## Project Documentation Structure

This project uses a Memory Bank system for comprehensive documentation:

### Memory Bank (`/memory-bank/`)

1. `projectbrief.md` - Core requirements and project scope
2. `productContext.md` - Problem definition and user experience goals
3. `systemPatterns.md` - Detailed architecture and design patterns
4. `techContext.md` - Technical setup and constraints
5. `activeContext.md` - Current work focus and decisions
6. `progress.md` - Project status and known issues

### Task Management (`/memory-bank/tasks/`)

- Individual task files with format: `TASKID-taskname.md`
- Task index at `_index.md` tracking all task statuses
- Each task includes thought process, implementation plan, and progress log

When working on this project:

1. Check `activeContext.md` for current focus and recent decisions
2. Review relevant task files for context on ongoing work
3. Update task files with progress and decisions made
4. Keep Memory Bank documentation in sync with code changes

See `/memory-bank/memory-bank.instructions.md` for detailed guidance on maintaining project documentation.
