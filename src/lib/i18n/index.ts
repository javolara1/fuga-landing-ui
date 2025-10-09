import type { Config } from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';

// Import translation files
import en from './en.json';
import es from './es.json';

const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: '',
			loader: async () => en
		},
		{
			locale: 'es',
			key: '',
			loader: async () => es
		}
	],
	fallbackLocale: 'en'
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);

// Export for use in components
export { default as i18n } from 'sveltekit-i18n';
