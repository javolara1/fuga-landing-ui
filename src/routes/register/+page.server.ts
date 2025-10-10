import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		// Client-side validation
		if (!email || !password || !confirmPassword) {
			return fail(400, {
				error: 'All fields are required',
				email,
				password,
				confirmPassword
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match',
				email,
				password,
				confirmPassword
			});
		}

		if (password.length < 6) {
			return fail(400, {
				error: 'Password must be at least 6 characters long',
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

			const result = await response.json();

			if (response.ok) {
				// Login successful - redirect to home page
				throw redirect(303, '/login');
			} else {
				// Registration failed
				return fail(response.status, {
					error: result.error || 'An error occurred during registration',
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
				error: 'An unexpected error occurred. Please try again.',
				email,
				password,
				confirmPassword
			});
		}
	}
};
