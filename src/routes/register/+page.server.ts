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
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		// Get translation function from locals
		const { t } = locals.getTranslation();

		try {
			// Basic validation
			if (!email || !password || !confirmPassword) {
				return fail(400, {
					error: t('auth.validation.allFieldsRequired'),
					email,
					password,
					confirmPassword
				});
			}

			// Email format validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return fail(400, {
					error: t('auth.validation.emailPasswordRequired'),
					email,
					password,
					confirmPassword
				});
			}

			// Password validation
			if (password.length < 6) {
				return fail(400, {
					error: t('auth.validation.passwordMinLength'),
					email,
					password,
					confirmPassword
				});
			}

			if (password !== confirmPassword) {
				return fail(400, {
					error: t('auth.validation.passwordsDoNotMatch'),
					email,
					password,
					confirmPassword
				});
			}

			// Attempt registration with Supabase
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						full_name: email.split('@')[0] // Use email username as default full name
					}
				}
			});

			if (error) {
				const errorMessage = getTranslatedErrorMessage(error.code, t);
				return fail(400, {
					error: errorMessage,
					email,
					password,
					confirmPassword
				});
			}

			if (data.user) {
				// Registration successful - redirect to login page
				throw redirect(303, '/login');
			}

			return fail(400, {
				error: t('auth.registrationError'),
				email,
				password,
				confirmPassword
			});
		} catch (error) {
			// If it's a redirect, re-throw it
			if (error && typeof error === 'object' && 'status' in error && 'location' in error) {
				const redirectError = error as { status: number; location: string };
				if (redirectError.status >= 300 && redirectError.status < 400) {
					throw error;
				}
			}

			console.error('Registration error:', error);
			return fail(500, {
				error: t('auth.errors.unexpectedError'),
				email,
				password,
				confirmPassword
			});
		}
	}
};
