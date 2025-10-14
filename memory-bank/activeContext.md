# Active Context

_This document tracks the current work focus, recent changes, next steps, active decisions, important patterns, and project insights._

## Current Work Focus

- **Button Component System**: Created reusable Button component with variants, sizes, and props
- Implemented Button.svelte component with TypeScript types for all props
- Added variants: primary, secondary, text, and ghost
- Added sizes: sm, md, lg, and xl
- Added props: href, loading, disabled, type, fullWidth
- **Button Replacement**: Replaced ALL existing button and anchor elements throughout the codebase
- Updated Hero component with Button components for CTAs
- Updated Pricing component with Button components for plan selection
- Updated Header component with Button components for navigation and auth
- Updated Contact component with Button component for form submission
- Updated Login page with Button components for form and navigation
- Updated Register page with Button components for form and navigation
- Updated User page with Button components for logo and logout
- Updated AdminHeader component with Button components for navigation and logout
- Updated ReducedHeader component with Button component for logo
- Updated Admin Blog Create page with Button components for form actions
- **Consistent Design System**: All buttons now follow the same design patterns
- Primary variant: White background, black text (for main CTAs)
- Secondary variant: Outline style (for secondary actions)
- Text variant: Minimal styling (for navigation, links)
- Ghost variant: Transparent background (for subtle actions)
- **Complete Replacement**: No remaining regular button or anchor elements in the entire codebase
- **Carta MD Editor Styling**: Implemented custom dark theme for the markdown editor in blog creation
- Fixed TypeScript error by adding missing `carta` prop to `MarkdownEditor` component
- Created comprehensive custom CSS theme that replaces all default Carta MD styles
- Applied project's dark theme colors and design system to all editor components
- **Admin Navigation and Blog Management**: Implemented admin navigation links and blog management page
- Added navigation links "Profile" and "Blog" to admin header
- Created reusable `AdminHeader.svelte` component to avoid code duplication
- Implemented `/admin/blog` route with server-side data loading
- Added blog management page showing all articles (published and draft) with pagination
- Enhanced i18n support with comprehensive translations for admin features

## Recent Changes

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

- Test landing page functionality across different devices and browsers
- Monitor user engagement and conversion metrics
- Plan future enhancements for member dashboard and scheduling features
- Consider adding analytics and tracking for performance monitoring

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
- **Design System**: Black backgrounds (#000000 or #111111) with white text (#FFFFFF).
- **Typography**: Bold, athletic typography for headings.
- **Layout**: Clean, modern layout with strong visual hierarchy.
- **Responsiveness**: Mobile-responsive design patterns.
- **User Experience**: Conversion-focused user experience.

## Learnings and Project Insights

- The project has pivoted from scheduling management to client acquisition focus.
- Strong authentication foundation provides good base for future member features.
- Black and white color scheme creates strong brand identity and modern aesthetic.
- Landing page structure should prioritize clarity and conversion over complex features.
