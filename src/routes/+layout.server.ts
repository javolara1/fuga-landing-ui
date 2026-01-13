import type { LayoutServerLoad } from './$types';
import { fetchLandingPage } from '$lib/strapi.server';
import { env } from '$env/dynamic/public';
import { createHomepageSEO, createLocalBusinessJsonLd } from '$lib/seo';

export const load: LayoutServerLoad = async ({ url }) => {
	const landingPage = await fetchLandingPage();

	// Get site URL from env or construct from request
	const siteUrl = env.PUBLIC_SITE_URL || url.origin;

	// Extract social links from footer for JSON-LD
	const socialLinks =
		landingPage?.footerSection?.footerSectionSocialNetworks
			?.map((link) => link.LinkUrl)
			.filter(Boolean) || [];

	// Create default SEO for homepage
	const defaultSeo = createHomepageSEO({
		mainTitle: landingPage?.mainTitle,
		mainDescription: landingPage?.mainDescription,
		heroImageUrl: landingPage?.heroImage?.url || undefined
	});

	// Create JSON-LD structured data
	const jsonLd = createLocalBusinessJsonLd({
		siteUrl,
		imageUrl: landingPage?.heroImage?.url || undefined,
		socialLinks
	});

	return {
		landingPage,
		blogUrl: env.PUBLIC_BLOG_URL,
		siteUrl,
		defaultSeo,
		jsonLd
	};
};
