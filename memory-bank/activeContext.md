# Active Context

_This document tracks the current work focus, recent changes, next steps, active decisions, important patterns, and project insights._

## Current Work Focus

- Setting up Supabase integration for backend and authentication.
- Configuring environment variables and Supabase client.
- Creating initial database schema migrations.
- Building authentication UI components (login/register pages).

## Recent Changes

- Added Supabase JavaScript client dependency (@supabase/supabase-js).
- Created environment configuration (.env) for Supabase connection.
- Set up Supabase client initialization (src/lib/supabaseClient.ts).
- Created placeholder database types (src/lib/database.types.ts).
- Added connection test utility (src/lib/supabase.test.ts).
- Built login and registration pages with dark theme UI.
- Created initial database migration for week table.
- Updated tech context to reflect Supabase backend.

## Next Steps

- Generate proper database types from Supabase schema.
- Complete database schema with all entities (TimeSlot, Class, Professional, Administrator).
- Implement Supabase authentication in login/register pages.
- Add Row Level Security (RLS) policies for data protection.
- Create admin dashboard for week management.

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
