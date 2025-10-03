# Active Context

_This document tracks the current work focus, recent changes, next steps, active decisions, important patterns, and project insights._

## Current Work Focus

- Documenting data models for the scheduling/booking application.
- Defining entity-relationship diagrams in systemPatterns.md.
- Updating memory bank to reflect the new project scope.

## Recent Changes

- Updated memory bank files to reflect project pivot from UI component library to scheduling application.
- Revised `projectbrief.md` and `productContext.md` to focus on scheduling functionality.
- Identified core entities: Week, TimeSlot, Class, Room, Professional, Administrator.

## Next Steps

- Complete data model documentation in systemPatterns.md.
- Define entity relationships and business rules.
- Plan database schema and API endpoints.
- Design the weekly navigation interface.
- Implement administrator controls for week management.

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
