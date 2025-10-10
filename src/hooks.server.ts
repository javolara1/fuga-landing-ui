import type { Handle } from '@sveltejs/kit';
import { getServerTranslation } from '$lib/i18n/server-i18n';
import { supabase } from '$lib/supabaseClient';

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
		try {
			// Set the session for server-side operations
			const {
				data: { session },
				error
			} = await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken
			});

			if (error || !session) {
				// Clear invalid session cookies
				event.cookies.delete('sb-access-token', { path: '/' });
				event.cookies.delete('sb-refresh-token', { path: '/' });
			} else {
				// Get user data
				const {
					data: { user }
				} = await supabase.auth.getUser();

				if (user) {
					event.locals.user = user;

					// Get user profile data
					const { data: profile } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', user.id)
						.single();

					event.locals.profile = profile;
				}
			}
		} catch (error) {
			console.error('Session validation error:', error);
			// Clear potentially corrupted session cookies
			event.cookies.delete('sb-access-token', { path: '/' });
			event.cookies.delete('sb-refresh-token', { path: '/' });
		}
	}

	return resolve(event);
};
