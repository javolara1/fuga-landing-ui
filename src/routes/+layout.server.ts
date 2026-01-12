import type { LayoutServerLoad } from './$types';
import { fetchLandingPage } from '$lib/strapi.server';
import { env } from '$env/dynamic/public';

export const load: LayoutServerLoad = async () => {
	const landingPage = await fetchLandingPage();

	return {
		landingPage,
		blogUrl: env.PUBLIC_BLOG_URL
	};
};
