import type { LayoutServerLoad } from './$types';
import { fetchLandingPage } from '$lib/strapi.server';

export const load: LayoutServerLoad = async () => {
	const landingPage = await fetchLandingPage();

	return {
		landingPage
	};
};
