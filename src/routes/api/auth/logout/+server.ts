import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		// Clear session cookies
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });

		// Sign out from Supabase
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Logout error:', error);
			// Still return success since we cleared cookies
		}

		return json({
			success: true,
			message: 'Logged out successfully'
		});
	} catch (error) {
		console.error('Logout error:', error);
		// Clear cookies even if there's an error
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });

		return json({ error: 'An unexpected error occurred during logout' }, { status: 500 });
	}
};
