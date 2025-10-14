# Copilot Instructions for fuga-ui

This document helps AI coding agents understand key aspects of the fuga-ui project to be immediately productive.

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
