import { supabase } from '$lib/supabaseClient';
import type { SessionValidationResult, SessionValidationOptions } from './types';

/**
 * Validates user session using access and refresh tokens
 * @param accessToken - Supabase access token
 * @param refreshToken - Supabase refresh token
 * @param options - Validation options
 * @returns Session validation result with user and profile data
 */
export async function validateSession(
	accessToken: string,
	refreshToken: string,
	options: SessionValidationOptions = {}
): Promise<SessionValidationResult> {
	const { fetchProfile = true, logErrors = true } = options;

	try {
		// Set the session for server-side operations
		const {
			data: { session },
			error: sessionError
		} = await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken
		});

		if (sessionError || !session) {
			if (logErrors) {
				console.error('Session validation failed:', {
					error: sessionError,
					hasSession: !!session
				});
			}

			return {
				success: false,
				error: sessionError?.message || 'No valid session found'
			};
		}

		// Get user data
		const {
			data: { user },
			error: userError
		} = await supabase.auth.getUser();

		if (userError || !user) {
			if (logErrors) {
				console.error('User retrieval failed:', {
					error: userError,
					hasUser: !!user
				});
			}

			return {
				success: false,
				error: userError?.message || 'No user found for session'
			};
		}

		let profile = null;

		// Get user profile data if requested
		if (fetchProfile) {
			const { data: profileData, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single();

			if (profileError) {
				if (logErrors) {
					console.error('Profile query failed with error:', {
						code: profileError.code,
						message: profileError.message,
						details: profileError.details,
						hint: profileError.hint
					});
				}
				// Continue with user data even if profile fetch fails
			} else {
				profile = profileData;
			}
		}

		return {
			success: true,
			user,
			profile
		};
	} catch (error) {
		if (logErrors) {
			console.error('Session validation error:', error);
		}

		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown session validation error'
		};
	}
}
