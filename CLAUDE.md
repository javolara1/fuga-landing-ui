# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start Vite dev server

# Build & Preview
npm run build            # Production build
npm run preview          # Preview production build

# Type Checking
npm run check            # Run svelte-check with TypeScript

# Testing
npm run test:unit        # Run Vitest in watch mode
npm run test:unit -- --run  # Run unit tests once
npm run test:e2e         # Run Playwright E2E tests (builds first)
npm run test             # Run both unit and E2E tests

# Run a single test file
npx vitest src/lib/components/Button.svelte.spec.ts --run

# Linting & Formatting
npm run lint             # Check with Prettier and ESLint
npm run format           # Format with Prettier
```

## Architecture

### Stack

- **Framework**: SvelteKit 2.x with Svelte 5 and TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Auth, RLS policies)
- **Deployment**: Vercel (adapter-vercel)
- **Testing**: Vitest (unit), Playwright (E2E)

### Key Directories

- `src/routes/` - SvelteKit file-based routing with server-side data loading
- `src/lib/components/` - Reusable Svelte components (Button, Breadcrumb, Header variants, etc.)
- `src/lib/i18n/` - Internationalization (en/es) with sveltekit-i18n
- `src/lib/database/` - Database utilities including session validation
- `src/lib/utils/` - Utilities for auth, error translations, dates

### Session Management

The `src/hooks.server.ts` hook handles all server-side session management:

1. Detects user locale from cookies/headers
2. Validates session tokens with Supabase
3. Populates `event.locals` with `user`, `profile`, `locale`, and `t` (translation function)

### Data Flow Pattern

- Data loading happens in `+page.server.ts` / `+layout.server.ts` files
- Form submissions use SvelteKit form actions
- Session state accessed via `event.locals` on server, passed to client via layout

### Role-Based Access

- Two roles: `admin` and `user`
- Server-side checks in load functions redirect unauthorized users
- Supabase RLS policies enforce database-level access control

### Header Variants

- `Header.svelte` - Full landing page navigation
- `AdminHeader.svelte` - Admin dashboard navigation
- `UserHeader.svelte` - User dashboard navigation
- `ReducedHeader.svelte` - Minimal header for auth pages

### i18n Structure

Translations organized by feature in `src/lib/i18n/`:

- `components/{component}/en.json` and `es.json`
- `auth/`, `common/`, `user/`, `blog/` directories

### Testing Setup

- Unit tests: `*.spec.ts` files alongside components
- Vitest configured with jsdom environment and @testing-library/svelte
- Test setup loads English translations before tests (`vitest-setup-client.ts`)
- E2E tests in `e2e/` directory with Playwright

## Environment Variables

Required in `.env`:

```
SUPABASE_URL=<supabase-url>
SUPABASE_ANON_KEY=<anon-key>
```

For local Supabase development: `http://127.0.0.1:54321`

## Database

- Migrations in `supabase/migrations/`
- Seed data in `supabase/seed.sql`
- Test users can be created with `node scripts/manage-test-users.js`

## Memory Bank

This project uses a Memory Bank documentation system in `memory-bank/` for AI context preservation. Key files:

- `projectbrief.md` - Core requirements
- `systemPatterns.md` - Architecture patterns
- `techContext.md` - Technical details
- `activeContext.md` - Current work focus
- `tasks/` - Task tracking with `_index.md`
