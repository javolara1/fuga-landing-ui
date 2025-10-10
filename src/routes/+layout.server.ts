import { loadTranslations, locale } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, locals }) => {
	const acceptLanguage = request.headers.get('accept-language');
	let detectedLocale = 'en';

	if (acceptLanguage) {
		// Parse the first language preference from the header
		const browserLang = acceptLanguage.split(',')[0].split('-')[0];
		const supportedLocales = ['en', 'es'];
		detectedLocale = supportedLocales.includes(browserLang) ? browserLang : 'en';
	}

	await loadTranslations(detectedLocale);
	locale.set(detectedLocale);

	return {
		locale: detectedLocale,
		user: locals.user,
		profile: locals.profile
	};
};
