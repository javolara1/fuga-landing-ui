// Import JSON files
import translationsEn from './en.json';
import translationsEs from './es.json';

const translations = {
	en: translationsEn,
	es: translationsEs
};

type TranslationKey = string;
type TranslationValue = string | Record<string, unknown>;

export function getServerTranslation(locale: string = 'en') {
	const t = (key: TranslationKey): string => {
		const keys = key.split('.');
		let value: TranslationValue =
			translations[locale as keyof typeof translations] || translations.en;

		for (const k of keys) {
			if (value && typeof value === 'object' && k in value) {
				value = value[k] as TranslationValue;
			} else {
				// Key not found, return the original key
				return key;
			}
		}

		// If we found a string, return it
		if (typeof value === 'string') {
			return value;
		}

		// If it's not a string, return the key
		return key;
	};

	return { t, locale };
}
