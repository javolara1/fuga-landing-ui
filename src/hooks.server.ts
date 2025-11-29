import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getServerTranslation } from '$lib/i18n/server-i18n';
import { validateSession } from '$lib/database';
import { env } from '$env/dynamic/private';

// Routes that are blocked in landing-only mode (all except root)
const PROTECTED_IN_LANDING_MODE = ['/login', '/register', '/user', '/admin', '/blog'];

export const handle: Handle = async ({ event, resolve }) => {
	// Check if landing-only mode is enabled
	const landingOnly = env.LANDING_ONLY === 'true';
	event.locals.landingOnly = landingOnly;

	// In landing-only mode, redirect all non-root routes to root
	if (landingOnly) {
		const pathname = event.url.pathname;
		if (PROTECTED_IN_LANDING_MODE.some((route) => pathname.startsWith(route))) {
			throw redirect(303, '/');
		}
	}

	// Detect preferred locale
	const lang =
		event.cookies.get('lang') ||
		event.request.headers.get('accept-language')?.split('-')[0] ||
		'en';

	const preferredLocale = ['en', 'es'].includes(lang) ? lang : 'en';

	// Get server-side translation function
	const { t } = getServerTranslation(preferredLocale);

	// Make available in server-side code
	event.locals.locale = preferredLocale;
	event.locals.t = t;
	event.locals.getTranslation = () => getServerTranslation(preferredLocale);

	// Check for active session (skip in landing-only mode)
	if (!landingOnly) {
		const accessToken = event.cookies.get('sb-access-token');
		const refreshToken = event.cookies.get('sb-refresh-token');

		if (accessToken && refreshToken) {
			const result = await validateSession(accessToken, refreshToken);

			if (result.success && result.user) {
				event.locals.user = result.user;
				event.locals.profile = result.profile;
			} else {
				// Clear invalid session cookies
				event.cookies.delete('sb-access-token', { path: '/' });
				event.cookies.delete('sb-refresh-token', { path: '/' });
			}
		}
	}

	return resolve(event);
};
