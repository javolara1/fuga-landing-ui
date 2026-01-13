// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { LandingPageData, SEOData, LocalBusinessJsonLd } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			landingPage: LandingPageData | null;
			siteUrl: string;
			defaultSeo: SEOData;
			jsonLd: LocalBusinessJsonLd;
			seo?: SEOData; // Page-specific SEO override
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
