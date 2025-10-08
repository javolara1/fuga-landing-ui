# Tech Context

_This document describes the technologies used, development setup, technical constraints, dependencies, and tool usage patterns._

## Technologies Used

### Frontend

- **Framework:** SvelteKit
- **UI Framework:** Tailwind CSS
- **Language:** TypeScript
- **Bundler:** Vite
- **Testing:**
  - Unit Testing: Vitest
  - End-to-End (E2E) Testing: Playwright
- **Linting & Formatting:** ESLint and Prettier

### Backend (Supabase)

- **Database:** PostgreSQL via Supabase
- **API:** Supabase RESTful API and real-time subscriptions
- **Authentication:** Supabase Auth with email/password
- **Location:** Local development at http://127.0.0.1:54321
- **Client:** @supabase/supabase-js for frontend integration
- **Migrations:** Supabase CLI for database schema management

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
- `@supabase/supabase-js`: Supabase client for backend integration.

### Additional Dependencies Needed

- Date/time handling library (date-fns or dayjs)
- Form validation library

## Technical Constraints

- **Time Zone Handling:** Must properly handle different time zones for scheduling
- **Data Integrity:** Past weeks must remain read-only, future weeks require admin enablement
- **Performance:** Efficient querying for weekly data and resource availability
- **Scalability:** Design should support multiple organizations or facilities

## Tool Usage Patterns

- **Development:** The `npm run dev` script starts a Vite development server with hot module replacement.
- **Testing:** Unit tests are run with `npm run test:unit`, and E2E tests are run with `npm run test:e2e`. The `npm test` script runs both.
- **Linting and Formatting:** Code is linted with `npm run lint` and formatted with `npm run format`.
- **Database:** Will need migration and seeding scripts for development and deployment.
