// Import component translation files
import headerEn from './components/header/en.json';
import headerEs from './components/header/es.json';
import heroEn from './components/hero/en.json';
import heroEs from './components/hero/es.json';
import servicesEn from './components/services/en.json';
import servicesEs from './components/services/es.json';
import pricingEn from './components/pricing/en.json';
import pricingEs from './components/pricing/es.json';
import aboutEn from './components/about/en.json';
import aboutEs from './components/about/es.json';
import contactEn from './components/contact/en.json';
import contactEs from './components/contact/es.json';
import footerEn from './components/footer/en.json';
import footerEs from './components/footer/es.json';
import adminEn from './components/admin/en.json';
import adminEs from './components/admin/es.json';
import commonEn from './common/en.json';
import commonEs from './common/es.json';
import authEn from './auth/en.json';
import authEs from './auth/es.json';
import userEn from './user/en.json';
import userEs from './user/es.json';
import blogEn from './blog/en.json';
import blogEs from './blog/es.json';

// Combine all translations into single objects per locale
const enTranslations = {
	header: headerEn,
	hero: heroEn,
	services: servicesEn,
	common: commonEn,
	auth: authEn,
	pricing: pricingEn,
	about: aboutEn,
	contact: contactEn,
	footer: footerEn,
	user: userEn,
	blog: blogEn,
	admin: adminEn
};

const esTranslations = {
	header: headerEs,
	hero: heroEs,
	services: servicesEs,
	common: commonEs,
	auth: authEs,
	pricing: pricingEs,
	about: aboutEs,
	contact: contactEs,
	footer: footerEs,
	user: userEs,
	blog: blogEs,
	admin: adminEs
};

const translations = {
	en: enTranslations,
	es: esTranslations
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
