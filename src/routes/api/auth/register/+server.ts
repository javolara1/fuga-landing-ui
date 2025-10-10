import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabaseClient';
import { getTranslatedErrorMessage } from '$lib/utils/errorTranslations';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { t } = locals.getTranslation();

	try {
		const { email, password, confirmPassword } = await request.json();

		// Basic validation
		if (!email || !password || !confirmPassword) {
			return json({ error: t('auth.validation.allFieldsRequired') }, { status: 400 });
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: t('auth.validation.emailPasswordRequired') }, { status: 400 });
		}

		// Password validation
		if (password.length < 6) {
			return json({ error: t('auth.validation.passwordMinLength') }, { status: 400 });
		}

		if (password !== confirmPassword) {
			return json({ error: t('auth.validation.passwordsDoNotMatch') }, { status: 400 });
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
			return json({ error: errorMessage }, { status: 400 });
		}

		if (data.user) {
			return json({
				success: true,
				message: t('auth.registrationSuccess'),
				user: {
					id: data.user.id,
					email: data.user.email
				}
			});
		}

		return json({ error: t('auth.registrationError') }, { status: 400 });
	} catch (error) {
		console.error('Registration error:', error);
		return json({ error: t('auth.errors.unexpectedError') }, { status: 500 });
	}
};
