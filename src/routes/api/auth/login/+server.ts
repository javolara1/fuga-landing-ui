import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';
import { getTranslatedErrorMessage } from '$lib/utils/errorTranslations';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	const { t } = locals.getTranslation();

	try {
		const { email, password } = await request.json();

		// Basic validation
		if (!email || !password) {
			return json({ error: t('auth.validation.emailPasswordRequired') }, { status: 400 });
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: t('auth.validation.emailPasswordRequired') }, { status: 400 });
		}

		// Password length validation
		if (password.length < 6) {
			return json({ error: t('auth.validation.passwordMinLength') }, { status: 400 });
		}

		// Attempt login with Supabase
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			const errorMessage = getTranslatedErrorMessage(error.code, t);
			return json({ error: errorMessage }, { status: 401 });
		}

		if (data.session) {
			// Set session cookie
			cookies.set('sb-access-token', data.session.access_token, {
				path: '/',
				maxAge: data.session.expires_in,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax'
			});

			cookies.set('sb-refresh-token', data.session.refresh_token, {
				path: '/',
				maxAge: data.session.expires_in * 2, // Longer expiry for refresh token
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax'
			});

			return json({
				success: true,
				user: {
					id: data.user.id,
					email: data.user.email
				}
			});
		}

		return json({ error: t('auth.loginError') }, { status: 401 });
	} catch (error) {
		console.error('Login error:', error);
		return json({ error: t('auth.errors.unexpectedError') }, { status: 500 });
	}
};
