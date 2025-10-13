import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { logoutUser } from '$lib/utils/authUtils';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to login if user is not authenticated
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	// Return user data to the page
	return {
		user: locals.user,
		profile: locals.profile
	};
};

export const actions: Actions = {
	logout: async (event) => {
		await logoutUser(event);
	}
};
