import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient';

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
	logout: async ({ cookies }) => {
		try {
			// Clear session cookies
			cookies.delete('sb-access-token', { path: '/' });
			cookies.delete('sb-refresh-token', { path: '/' });

			// Sign out from Supabase
			const { error } = await supabase.auth.signOut();

			if (error) {
				console.error('Logout error:', error);
				// Still redirect since we cleared cookies
			}

			// Redirect to home page after successful logout
			throw redirect(303, '/');
		} catch (error) {
			console.error('Logout error:', error);
			// Clear cookies even if there's an error
			cookies.delete('sb-access-token', { path: '/' });
			cookies.delete('sb-refresh-token', { path: '/' });

			// Redirect to home page regardless of errors
			throw redirect(303, '/');
		}
	}
};
