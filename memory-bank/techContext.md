# Tech Context

_This document describes the technologies used, development setup, technical constraints, dependencies, and tool usage patterns._

## Technologies Used

- **Framework:** SvelteKit
- **UI Framework:** Tailwind CSS
- **Language:** TypeScript
- **Bundler:** Vite
- **Testing:**
  - Unit Testing: Vitest
  - End-to-End (E2E) Testing: Playwright
- **Linting & Formatting:** ESLint and Prettier

## Development Setup

The project is set up as a standard SvelteKit project. To run the project in a development environment, use the following command:

```bash
npm run dev
```

To build the project for production, use:

```bash
npm run build
```

## Dependencies

The project's dependencies are managed through `package.json`. Key dependencies include:

- `@sveltejs/kit`: The SvelteKit framework.
- `tailwindcss`: For styling the application.
- `typescript`: For static typing.
- `vite`: The build tool.
- `vitest`: For unit testing.
- `playwright`: For E2E testing.
- `eslint` and `prettier`: For code quality and formatting.

## Tool Usage Patterns

- **Development:** The `npm run dev` script starts a Vite development server with hot module replacement.
- **Testing:** Unit tests are run with `npm run test:unit`, and E2E tests are run with `npm run test:e2e`. The `npm test` script runs both.
- **Linting and Formatting:** Code is linted with `npm run lint` and formatted with `npm run format`.
