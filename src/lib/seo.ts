import type { SEOData, LocalBusinessJsonLd } from './types';

// Business information constants
export const BUSINESS_INFO = {
	name: 'FUGA',
	description:
		'FUGA es una comunidad para los amantes y apasionados del deporte, combinamos ciencia, experiencia y herramientas de desarrollo humano para crear tu mejor versión.',
	address: {
		streetAddress: 'Luz Saviñon 603bis',
		addressLocality: 'Del Valle, Benito Juarez',
		addressRegion: 'CDMX',
		addressCountry: 'MX'
	},
	url: 'https://fuga.mx'
} as const;

/**
 * Create default SEO data for the homepage
 */
export function createHomepageSEO(params: {
	mainTitle?: string;
	mainDescription?: string;
	heroImageUrl?: string;
}): SEOData {
	return {
		title: params.mainTitle || BUSINESS_INFO.name,
		description: params.mainDescription || BUSINESS_INFO.description,
		ogImage: params.heroImageUrl || undefined,
		ogImageAlt: params.mainTitle || BUSINESS_INFO.name,
		ogType: 'website'
	};
}

/**
 * Generate LocalBusiness JSON-LD structured data
 */
export function createLocalBusinessJsonLd(params: {
	siteUrl: string;
	imageUrl?: string;
	socialLinks?: string[];
}): LocalBusinessJsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: BUSINESS_INFO.name,
		description: BUSINESS_INFO.description,
		url: params.siteUrl,
		address: {
			'@type': 'PostalAddress',
			...BUSINESS_INFO.address
		},
		image: params.imageUrl,
		sameAs: params.socialLinks
	};
}

/**
 * Generate alternate language links for hreflang
 */
export function createAlternateLocales(
	siteUrl: string,
	path: string
): Array<{ lang: string; href: string }> {
	return [
		{ lang: 'es', href: `${siteUrl}${path}` },
		{ lang: 'en', href: `${siteUrl}/en${path}` }
	];
}
