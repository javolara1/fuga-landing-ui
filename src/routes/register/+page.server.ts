import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		// Get translation function from locals
		const { t } = locals.getTranslation();

		// Client-side validation
		if (!email || !password || !confirmPassword) {
			return fail(400, {
				error: t('auth.validation.allFieldsRequired'),
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

		if (password.length < 6) {
			return fail(400, {
				error: t('auth.validation.passwordMinLength'),
				email,
				password,
				confirmPassword
			});
		}

		try {
			// Call the existing API endpoint
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password, confirmPassword })
			});

			if (response.ok) {
				// Registration successful - redirect to login page
				throw redirect(303, '/login');
			} else {
				// Registration failed
				return fail(response.status, {
					error: t('auth.registrationError'),
					email,
					password,
					confirmPassword
				});
			}
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
