import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, password, confirmPassword } = await request.json();

		// Basic validation
		if (!email || !password || !confirmPassword) {
			return json({ error: 'Email, password, and confirm password are required' }, { status: 400 });
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Please provide a valid email address' }, { status: 400 });
		}

		// Password validation
		if (password.length < 6) {
			return json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
		}

		if (password !== confirmPassword) {
			return json({ error: 'Passwords do not match' }, { status: 400 });
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
			return json({ error: error.message }, { status: 400 });
		}

		if (data.user) {
			return json({
				success: true,
				message: 'Registration successful! Please check your email for verification.',
				user: {
					id: data.user.id,
					email: data.user.email
				}
			});
		}

		return json({ error: 'Registration failed' }, { status: 400 });
	} catch (error) {
		console.error('Registration error:', error);
		return json({ error: 'An unexpected error occurred' }, { status: 500 });
	}
};
