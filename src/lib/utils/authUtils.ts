import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Handles user logout process including:
 * - Supabase sign out
 * - Cookie cleanup
 * - Locals object cleanup
 * - Error handling
 */
export async function logoutUser(event: RequestEvent) {
	const { cookies, locals } = event;

	try {
		// Clear session cookies
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });

		// Sign out from Supabase
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Logout error from Supabase:', error);
			// Continue with cleanup even if Supabase sign out fails
		}

		// Clean up locals object
		locals.user = undefined;
		locals.profile = undefined;

		// Redirect to home page after successful logout
		throw redirect(303, '/');
	} catch (error) {
		console.error('Logout error:', error);

		// Ensure cookies are cleared even if there's an error
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });

		// Clean up locals object on error as well
		locals.user = undefined;
		locals.profile = undefined;

		// Redirect to home page regardless of errors
		throw redirect(303, '/');
	}
}
