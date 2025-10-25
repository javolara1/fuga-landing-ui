import type { Handle } from '@sveltejs/kit';
import { getServerTranslation } from '$lib/i18n/server-i18n';
import { validateSession } from '$lib/database';

export const handle: Handle = async ({ event, resolve }) => {
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

	// Check for active session
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

	return resolve(event);
};
