// Server-side Strapi API (used at build time for SSG)
import { env } from '$env/dynamic/private';
import qs from 'qs';
import type { LandingPageResponse, LandingPageData, StrapiMedia } from './types';

function getStrapiUrl(): string {
	return env.STRAPI_URL || 'http://localhost:1337';
}

/**
 * Convert relative Strapi media URL to absolute URL
 */
function toAbsoluteUrl(url: string | null | undefined, baseUrl: string): string | null {
	if (!url) return null;
	if (url.startsWith('http://') || url.startsWith('https://')) {
		return url;
	}
	return `${baseUrl}${url}`;
}

/**
 * Transform media object to have absolute URL
 */
function transformMedia(media: StrapiMedia | null, baseUrl: string): StrapiMedia | null {
	if (!media) return null;
	return {
		...media,
		url: toAbsoluteUrl(media.url, baseUrl) || media.url
	};
}

/**
 * Build the populate query for landing page sections
 */
function buildLandingPagePopulate(): string {
	return qs.stringify({
		populate: {
			heroImage: true,
			serviceSection: {
				populate: {
					serviceitems: {
						populate: 'cards'
					}
				}
			},
			aboutSection: true,
			contactSection: true,
			footerSection: {
				populate: {
					footerSectionSocialNetworks: {
						populate: 'Linkicon'
					},
					footerSectionLinks: true
				}
			}
		}
	});
}

/**
 * Fetch landing page content from Strapi (build-time only)
 */
export async function fetchLandingPage(): Promise<LandingPageData | null> {
	const strapiUrl = getStrapiUrl();
	const populate = buildLandingPagePopulate();

	try {
		const response = await fetch(`${strapiUrl}/api/landing-page?${populate}`);

		if (!response.ok) {
			console.error('[Strapi] Failed to fetch landing page:', response.status, response.statusText);
			return null;
		}

		const data: LandingPageResponse = await response.json();
		const landingPage = data.data;

		// Transform relative media URLs to absolute URLs
		if (landingPage) {
			landingPage.heroImage = transformMedia(landingPage.heroImage, strapiUrl);
		}

		return landingPage;
	} catch (error) {
		console.error('[Strapi] Error fetching landing page:', error);
		return null;
	}
}
