import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to user profile if already authenticated
	if (locals.user) {
		throw redirect(303, '/user');
	}
};

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Get translation function from locals
		const { t } = locals.getTranslation();

		// Client-side validation
		if (!email || !password) {
			return fail(400, {
				error: t('auth.validation.emailPasswordRequired'),
				email,
				password
			});
		}

		try {
			// Call the existing API endpoint
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			const result = await response.json();

			if (response.ok) {
				// Login successful - redirect to user profile page
				throw redirect(303, result.redirectTo || '/user');
			} else {
				// Login failed
				return fail(response.status, {
					error: result.error || t('auth.loginError'),
					email,
					password
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

			console.error('Login error:', error);
			return fail(500, {
				error: t('auth.errors.unexpectedError'),
				email,
				password
			});
		}
	}
};
