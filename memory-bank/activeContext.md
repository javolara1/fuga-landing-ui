# Active Context

_This document tracks the current work focus, recent changes, next steps, active decisions, important patterns, and project insights._

## Current Work Focus

- **Project Status**: Stable and fully functional
- **Current Phase**: Ready for user engagement and monitoring
- All major features implemented and working correctly
- Recently completed: Breadcrumb component system
- Focus on maintenance and future enhancement planning

## Recent Changes

- **Header Mobile Navigation Refactor** (Completed - 2025-10-14):
  - Rebuilt `Header.svelte` with rune-based mobile state and accessible toggle button
  - Hid desktop login button on small screens while surfacing login/profile actions inside the mobile drawer
  - Collapse mobile navigation by default and animate open/close with `slide` transition

- **Test Suite Stabilization** (Completed - 2025-10-14):
  - Replaced placeholder `supabase.test.ts` helper with real Vitest assertions to keep the Supabase client covered without runtime calls
  - Scoped home page heading lookups in both Vitest and Playwright specs to the `<main>` landmark to satisfy strict querying
  - Initialized English translations during browser-based Vitest runs to eliminate noisy i18n warnings
  - Converted the admin blog status selector to use a semantic `<fieldset>` for accessibility compliance flagged by Playwright
  - Playwright E2E suite now green; Vitest passes in `--run` mode (intermittent SSR transport warnings observed but exit code remains 0)

- **Breadcrumb Component System** (Completed - 2025-10-14):
  - Created reusable Breadcrumb.svelte component with TypeScript types
  - Added BreadcrumbItem interface to $lib/types.ts
  - Component accepts array of items with `{ label: string, href?: string }` structure
  - Last item is automatically non-clickable (styled in white for current page)
  - Clickable items styled in gray-400 with hover:text-white transition
  - Uses "→" as separator between items
  - Replaced breadcrumbs in three files:
    - `/blog/[slug]` - Simple back navigation to blog listing
    - `/admin/blog/create` - Multi-level breadcrumb (Dashboard → Blog Management → Create)
    - `/admin/blog` - Back navigation with arrow to admin dashboard
  - Maintains consistent styling and user experience across application

- **Button Component System** (Completed):
  - Created reusable Button.svelte component with TypeScript types for all props
  - Implemented four variants: primary, secondary, text, and ghost
  - Added four sizes: sm, md, lg, and xl
  - Added props: href, loading, disabled, type, fullWidth
  - Replaced ALL existing button and anchor elements throughout the entire codebase
  - Applied consistent design system across all UI interactions
  - Primary variant: White background, black text (for main CTAs)
  - Secondary variant: Outline style (for secondary actions)
  - Text variant: Minimal styling (for navigation, links)
  - Ghost variant: Transparent background (for subtle actions)

- **Blog Management System** (Completed):
  - Implemented `/admin/blog` route with server-side data loading
  - Created blog management page showing all articles (published and draft) with pagination
  - Implemented `/admin/blog/create` route for article creation
  - Integrated Carta MD editor with custom dark theme styling
  - Fixed TypeScript error by adding missing `carta` prop to MarkdownEditor component
  - Created comprehensive custom CSS theme matching project's dark design system
  - Enhanced i18n support with comprehensive translations for admin features
  - Added navigation links "Profile" and "Blog" to admin header
  - Created reusable `AdminHeader.svelte` component to avoid code duplication

- **Date Utility Centralization**: Moved date formatting function to common utility location:
  - Created `src/lib/utils/dateUtils.ts` with `formatDate` function
  - Updated blog page to import and use the utility function
  - Updated user profile page to use consistent date formatting
  - Added JSDoc documentation for better code maintainability
  - Ensures consistent date formatting across the application

- **Registration Logic Consolidation**: Consolidated registration functionality into single implementation:
  - Removed `src/routes/api/auth/register/+server.ts` API endpoint
  - Enhanced `src/routes/register/+page.server.ts` with all validation and registration logic
  - Eliminated unnecessary HTTP call between page server action and API endpoint
  - Maintained all validation rules, i18n support, and security features
  - Simplified architecture while preserving all functionality

- **Login Logic Consolidation**: Consolidated login functionality into single implementation:
  - Removed `src/routes/api/auth/login/+server.ts` API endpoint
  - Enhanced `src/routes/login/+page.server.ts` with all validation and authentication logic
  - Eliminated unnecessary HTTP call between page server action and API endpoint
  - Maintained all validation rules, i18n support, and security features
  - Simplified architecture while preserving all functionality

- **Architecture Consolidation**: Removed duplicate session management logic:
  - Eliminated `src/routes/+page.server.ts` with redundant session validation
  - Enhanced `hooks.server.ts` with robust `setSession` approach
  - Centralized session management in hooks for all requests
  - Improved session validation with proper error handling

- **User Profile Page Implementation**: Created comprehensive user profile system:
  - Added session management in `hooks.server.ts` to detect active sessions
  - Created user profile page at `/user` with user information display
  - Added logout functionality with API integration
  - Implemented conditional header navigation (shows "Profile" when logged in, "Login" when logged out)
  - Added redirect protection for authenticated users on login/register pages
  - Updated login flow to redirect to user profile page after successful login
  - Added comprehensive i18n translations for user profile features in both English and Spanish
  - Created TypeScript interfaces for proper type safety

- **Reduced Header for Auth Pages**: Added simplified header to login and register pages:
  - Created `ReducedHeader.svelte` component with only the main title
  - Updated login page to include the reduced header with navigation to root
  - Updated register page to include the reduced header with navigation to root
  - Added proper spacing (`pt-16`) to account for the sticky header

- **Login Redirect Fix**: Fixed redirect detection issue in login page server code:
  - Updated error handling to properly detect SvelteKit redirects
  - Replaced `error instanceof Response` check with property-based detection
  - Now checks for `status` and `location` properties to identify redirects
  - Resolved issue where redirects were not being properly re-thrown

- **i18n Console Warnings Fix**: Eliminated "[i18n]: No locale provided" console warnings:
  - Updated layout to use sveltekit-i18n's `loading` store for conditional rendering
  - Added loading state that shows while translations are being loaded
  - Components now only render after translations are fully loaded
  - Eliminated timing issues between async i18n initialization and component rendering

- **Server-Side Language Detection**: Fixed language blink issue by implementing server-side language detection:
  - Created `+layout.server.ts` to detect user's preferred language from `Accept-Language` header
  - Updated i18n configuration to accept server-provided locale parameter
  - Modified layout to use server-provided locale for consistent server-client rendering
  - Eliminated visual blink caused by server rendering in English and client switching to Spanish

- **i18n Array Refactor**: Fixed translation array handling for sveltekit-i18n:
  - Refactored all translation structures to use individual feature properties instead of arrays
  - Updated Services component to manually create arrays from individual translations
  - Changed `services.primary.features` from array to object structure in both English and Spanish
  - Changed `services.secondary.cycling.features`, `services.secondary.running.features`, and `services.secondary.swimming.features` from arrays to object structures
  - Resolved issue where arrays were being split character by character

- **i18n Fixes**: Resolved svelte-i18n hydration and translation errors:
  - Fixed "Cannot format a message without first setting the initial locale" error
  - Updated i18n configuration for proper SSR handling
  - Fixed array translation handling using `json` method instead of `$_` store
  - Used Svelte 5 `$derived` syntax for translation arrays
  - Updated Services component to properly handle array translations
- **i18n Implementation**: Added internationalization support for English and Spanish:
  - Installed and configured svelte-i18n library
  - Created translation files for both languages
  - Updated Header, Hero, and Services components to use i18n
  - Automatic language detection from browser preferences
- **Complete landing page implementation**: Created all necessary components:
  - Header with navigation and login access
  - Hero section with primary CTAs
  - Services section highlighting strength training and customized programs
  - Pricing section with clear tiers and packages
  - About section with team information and philosophy
  - Contact section with form and information
  - Footer with additional links and contact details
- **Updated root page**: Replaced authentication-focused page with public landing page
- **Brand identity implemented**: Consistent black and white color scheme throughout
- **Responsive design**: Mobile-first approach implemented across all components
- **Updated authentication pages**: Applied consistent black and white color scheme to login and register pages to match landing page design

## Next Steps

- Monitor user engagement and conversion metrics from landing page
- Gather feedback from early users and potential clients
- Test landing page functionality across different devices and browsers
- Plan future enhancements based on user needs:
  - Enhanced contact form backend integration
  - Member dashboard and scheduling features (protected routes)
  - Analytics and performance tracking
  - Advanced member management features
- Maintain and update blog content regularly
- Consider additional admin features as needed

## Active Decisions and Considerations

- **Technology Stack:** Continuing with SvelteKit, TypeScript, and Tailwind CSS.
- **Design System:** Black and white color scheme with athletic aesthetic.
- **Navigation Structure:** Header with main sections and login access.
- **Content Strategy:** Focus on strength training as primary service, customized programs as secondary.
- **Conversion Optimization:** Clear CTAs for registration and information requests.

## Important Patterns and Preferences

- **Svelte 5 Syntax**: Always use modern Svelte 5 syntax:
  - Use `$props()` instead of `export let` for component props
  - Use `let { data } = $props()` instead of `export let data: PageData`
  - Avoid deprecated patterns like `$page` from `$app/stores`
- **Component System**: Use centralized reusable components for consistency:
  - **Button Component** for all interactive elements:
    - Import from `$lib/components/Button.svelte`
    - Choose appropriate variant (primary, secondary, text, ghost)
    - Use size prop for consistent sizing (sm, md, lg, xl)
    - Use href prop for navigation, onclick for actions
    - Use loading and disabled states for better UX
  - **Breadcrumb Component** for navigation paths:
    - Import from `$lib/components/Breadcrumb.svelte`
    - Import BreadcrumbItem type from `$lib/types`
    - Pass array of items with label and optional href
    - Last item automatically styled as current page (no href needed)
- **Design System**: Black backgrounds (#000000 or #111111) with white text (#FFFFFF).
- **Typography**: Bold, athletic typography for headings.
- **Layout**: Clean, modern layout with strong visual hierarchy.
- **Responsiveness**: Mobile-responsive design patterns with mobile-first approach.
- **User Experience**: Conversion-focused user experience with clear CTAs.

## Learnings and Project Insights

- The project has successfully pivoted from scheduling management to client acquisition focus.
- Strong authentication foundation provides good base for future member features.
- Black and white color scheme creates strong brand identity and modern aesthetic.
- Landing page structure prioritizes clarity and conversion over complex features.
- **Reusable Component System**: Creating centralized components significantly improved:
  - Design consistency across the entire application (Button, Breadcrumb)
  - Maintenance efficiency (single source of truth for component styling)
  - Development speed (quick to implement new features with existing components)
  - Type safety and code quality (TypeScript interfaces for all component props)
  - Developer experience with type-safe props
  - Code reusability and reduced duplication
- **Admin Workflow**: Blog management system provides complete CRUD functionality:
  - Carta MD editor provides excellent Markdown editing experience
  - Custom theming ensures design consistency in admin areas
  - Pagination improves performance for large article lists
  - Draft/published status provides flexible content workflow
- **Architecture Evolution**: Consolidating logic into single implementations:
  - Removing redundant API endpoints reduced complexity
  - Server-side actions in page servers improved code organization
  - Centralized session management in hooks improved security
  - Date utilities and error translations improved maintainability
