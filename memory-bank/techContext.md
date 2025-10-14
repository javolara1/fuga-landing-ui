# Tech Context

_This document describes the technologies used, development setup, technical constraints, dependencies, and tool usage patterns._

## Technologies Used

### Frontend

- **Framework:** SvelteKit 2.x
- **UI Framework:** Tailwind CSS
- **Language:** TypeScript
- **Runtime:** Svelte 5
- **Bundler:** Vite
- **Testing:**
  - Unit Testing: Vitest
  - End-to-End (E2E) Testing: Playwright
- **Linting & Formatting:** ESLint and Prettier

### Backend (Supabase)

- **Database:** PostgreSQL via Supabase. The current schema includes `profiles` and `articles` tables. A legacy `week` table exists but is not in use.
- **API:** Supabase RESTful API and real-time subscriptions.
- **Authentication:** Supabase Auth with email/password and user roles.
- **Location:** Local development at http://127.0.0.1:54321
- **Client:** `@supabase/supabase-js` for frontend and server-side integration.
- **Migrations:** Supabase CLI for database schema management.

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
- `sveltekit-i18n`: For internationalization.
- `carta-md`: For the Markdown editor in the admin blog section.

## Technical Constraints

- **Data Integrity:** Row Level Security policies in Supabase are critical for ensuring users can only access and modify data they are permitted to.
- **Performance:** Efficient server-side data loading is key to a good user experience. Pagination is used for lists (e.g., blog posts).
- **Security:** All authentication and session management logic is handled on the server-side to prevent exposing sensitive information to the client.

## Tool Usage Patterns

- **Development:** The `npm run dev` script starts a Vite development server with hot module replacement.
- **Testing:** Unit tests are run with `npm run test:unit`, and E2E tests are run with `npm run test:e2e`. The `npm test` script runs both.
- **Linting and Formatting:** Code is linted with `npm run lint` and formatted with `npm run format`.
- **Database:** Database changes are managed via migration files in the `supabase/migrations` directory. The Supabase CLI is used to apply them. Seeding is done via `supabase/seed.sql`.
