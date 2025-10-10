import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async ({ cookies, locals }) => {
	const { t } = locals.getTranslation();
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
			message: t('auth.success')
		});
	} catch (error) {
		console.error('Logout error:', error);
		// Clear cookies even if there's an error
		cookies.delete('sb-access-token', { path: '/' });
		cookies.delete('sb-refresh-token', { path: '/' });

		return json({ error: t('auth.errors.unexpectedError') }, { status: 500 });
	}
};
