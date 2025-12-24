# AGENTS.md

## Commands

```bash
npm run dev                                    # Dev server
npm run build                                  # Production build
npm run check                                  # TypeScript/Svelte type checking
npm run lint                                   # Prettier + ESLint check
npm run format                                 # Auto-format with Prettier
npm run test:unit -- --run                     # Run all unit tests once
npx vitest path/to/file.spec.ts --run          # Run single test file
npm run test:e2e                               # Playwright E2E tests
```

## Code Style

- **Formatting**: Tabs, single quotes, no trailing commas, 100 char line width
- **Types**: Strict TypeScript (`strict: true`), use explicit types for props/functions
- **Svelte**: Use Svelte 5 runes (`$props()`, `$derived`, `$state`), `lang="ts"` in script tags
- **Imports**: Use `$lib/` alias for src/lib imports, `$app/` for SvelteKit modules
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Tests**: Place `*.spec.ts` files alongside components, use @testing-library/svelte
- **i18n**: Translations in `src/lib/i18n/{feature}/{en,es}.json`
- **Error handling**: Server errors via SvelteKit's `error()`, form validation in actions
