# Active Context

_This document tracks the current work focus, recent changes, next steps, active decisions, important patterns, and project insights._

## Current Work Focus

- Successfully migrated authentication logic from client-side to server-side rendering.
- Implemented server-side API routes for login, registration, and logout.
- Updated root page to use server-side data loading for authentication state.
- Testing the complete server-side authentication flow.

## Recent Changes

- **Migrated authentication to server-side**: Moved all authentication logic from client to server:
  - Created `/api/auth/login/+server.ts` for server-side login
  - Created `/api/auth/register/+server.ts` for server-side registration
  - Created `/api/auth/logout/+server.ts` for server-side logout
  - Created `/+page.server.ts` for server-side session management
- **Updated client components**: Modified all authentication pages to use server-side APIs:
  - `/login/+page.svelte` now uses server-side login API
  - `/register/+page.svelte` now uses server-side registration API
  - `/+page.svelte` now uses server-side session data
- **Enhanced security**: Implemented server-side validation, secure cookie handling, and proper session management.
- **Maintained Svelte 5 runes syntax**: All components continue to use modern Svelte 5 features.

## Next Steps

- Create admin dashboard for week management.
- Implement protected routes and role-based access control.
- Build weekly schedule management interface.
- Add time slot configuration functionality.
- Implement resource management (classes, rooms, professionals).

## Active Decisions and Considerations

- **Technology Stack:** Continuing with SvelteKit, TypeScript, and Tailwind CSS for frontend.
- **Data Architecture:** Need to decide on backend technology (Node.js, database choice).
- **Access Control:** Implement role-based permissions for administrators.
- **Time Management:** Handle timezone considerations and week boundaries.
- **Resource Management:** Design flexible system for different resource types.

## Important Patterns and Preferences

- Week-centric data organization with clear status states.
- Time-based access controls (past = read-only, future = admin-configurable).
- Resource-agnostic design to handle classes, rooms, and professionals uniformly.
- Capacity management at the time slot level.

## Learnings and Project Insights

- The project has pivoted from a component library to a domain-specific scheduling application.
- Strong foundation with SvelteKit provides good base for building the scheduling interface.
- Need to consider backend architecture for data persistence and business logic.
- Time-based permissions and state management will be critical for user experience.
