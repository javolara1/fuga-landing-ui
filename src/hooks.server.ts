import type { Handle } from '@sveltejs/kit';
import { getServerTranslation } from '$lib/i18n/server-i18n';

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

	return resolve(event);
};
