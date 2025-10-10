// Helper function to map Supabase error codes to translated messages
export function getTranslatedErrorMessage(
	errorCode: string | null | undefined,
	t: (key: string) => string
): string {
	if (!errorCode) {
		return t('auth.errors.unexpectedError');
	}

	// Map common Supabase auth error codes to translation keys
	const errorMappings: Record<string, string> = {
		invalid_credentials: 'auth.errors.invalid_credentials',
		email_not_confirmed: 'auth.errors.email_not_confirmed',
		user_not_found: 'auth.errors.user_not_found',
		weak_password: 'auth.errors.weak_password',
		email_exists: 'auth.errors.email_exists',
		invalid_email: 'auth.errors.invalid_email'
	};

	const translationKey = errorMappings[errorCode] || 'auth.errors.auth_failed';
	return t(translationKey);
}
