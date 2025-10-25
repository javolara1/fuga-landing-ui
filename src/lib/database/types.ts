import type { User } from '@supabase/supabase-js';
import type { Profile } from '$lib/types';

/**
 * Result of session validation operation
 */
export interface SessionValidationResult {
	success: boolean;
	user?: User;
	profile?: Profile | null;
	error?: string;
}

/**
 * Options for session validation
 */
export interface SessionValidationOptions {
	/**
	 * Whether to fetch user profile data
	 * @default true
	 */
	fetchProfile?: boolean;

	/**
	 * Whether to log errors to console
	 * @default true
	 */
	logErrors?: boolean;
}
