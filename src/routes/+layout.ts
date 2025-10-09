import { loadTranslations, locale } from '$lib/i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	console.log('Client - load');

	// Client-side: use server-provided locale or detect from browser
	let detectedLocale = data.locale;

	if (!detectedLocale) {
		// Get browser language preference if no server locale provided
		const browserLang = navigator.language.split('-')[0];
		const supportedLocales = ['en', 'es'];
		detectedLocale = supportedLocales.includes(browserLang) ? browserLang : 'en';
	}

	// Set the locale
	await loadTranslations(detectedLocale);
	locale.set(detectedLocale);
	return {};
};
