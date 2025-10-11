import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { getTranslatedErrorMessage } from '$lib/utils/errorTranslations';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to user profile if already authenticated
	if (locals.user) {
		throw redirect(303, '/user');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Get translation function from locals
		const { t } = locals.getTranslation();

		try {
			// Basic validation
			if (!email || !password) {
				return fail(400, {
					error: t('auth.validation.emailPasswordRequired'),
					email,
					password
				});
			}

			// Email format validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return fail(400, {
					error: t('auth.validation.emailPasswordRequired'),
					email,
					password
				});
			}

			// Password length validation
			if (password.length < 6) {
				return fail(400, {
					error: t('auth.validation.passwordMinLength'),
					email,
					password
				});
			}

			// Attempt login with Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				const errorMessage = getTranslatedErrorMessage(error.code, t);
				return fail(401, {
					error: errorMessage,
					email,
					password
				});
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

				// Login successful - redirect based on user role
				// Profile data is already available in locals from hooks.server.ts
				const redirectPath = locals.profile?.role === 'admin' ? '/admin' : '/user';
				throw redirect(303, redirectPath);
			}

			return fail(401, {
				error: t('auth.loginError'),
				email,
				password
			});
		} catch (error) {
			// If it's a redirect, re-throw it
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				const redirectError = error as { status: number; location: string };
				if (redirectError.status >= 300 && redirectError.status < 400) {
					throw error;
				}
			}

			console.error('Login error:', error);
			return fail(500, {
				error: t('auth.errors.unexpectedError'),
				email,
				password
			});
		}
	}
};
