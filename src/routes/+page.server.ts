import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		// Get access token from cookies
		const accessToken = cookies.get('sb-access-token');

		if (!accessToken) {
			return { user: null };
		}

		// Set the session for server-side operations
		const {
			data: { session },
			error
		} = await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: cookies.get('sb-refresh-token') || ''
		});

		if (error || !session) {
			// Clear invalid session cookies
			cookies.delete('sb-access-token', { path: '/' });
			cookies.delete('sb-refresh-token', { path: '/' });
			return { user: null };
		}

		// Get user data
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (!user) {
			return { user: null };
		}

		return {
			user: {
				id: user.id,
				email: user.email
				// Add any other user properties you need
			}
		};
	} catch (error) {
		console.error('Error loading user session:', error);
		// Clear potentially corrupted session cookies
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });
		return { user: null };
	}
};
