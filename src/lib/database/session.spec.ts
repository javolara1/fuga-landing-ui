import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateSession } from './session';
import type { User, Session } from '@supabase/supabase-js';
import { AuthError } from '@supabase/supabase-js';
import type { Tables } from '$lib/database.types';

// Mock the supabase client with factory function
vi.mock('$lib/supabaseClient', () => {
	const mockSetSession = vi.fn();
	const mockGetUser = vi.fn();
	const mockFrom = vi.fn();

	return {
		supabase: {
			auth: {
				setSession: mockSetSession,
				getUser: mockGetUser
			},
			from: mockFrom
		},
		// Export the mocks for use in tests
		__mocks: {
			mockSetSession,
			mockGetUser,
			mockFrom
		}
	};
});

// Import the mocked supabase client to access the mocks
import { supabase } from '$lib/supabaseClient';

describe('validateSession', () => {
	const mockAccessToken = 'test-access-token';
	const mockRefreshToken = 'test-refresh-token';
	const mockUser: User = {
		id: 'user-123',
		email: 'test@example.com',
		user_metadata: {},
		app_metadata: {},
		aud: 'authenticated',
		created_at: '2023-01-01T00:00:00Z'
	};
	const mockSession: Session = {
		access_token: mockAccessToken,
		refresh_token: mockRefreshToken,
		expires_in: 3600,
		token_type: 'bearer',
		user: mockUser
	};
	const mockProfile: Tables<'profiles'> = {
		id: 'user-123',
		role: 'user',
		created_at: '2023-01-01T00:00:00Z',
		updated_at: '2023-01-01T00:00:00Z',
		full_name: 'Test User',
		username: 'testuser'
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('successful session validation', () => {
		it('should return success with user and profile when session is valid', async () => {
			// Mock successful session setup
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: mockSession, user: mockUser },
				error: null
			});

			// Mock successful user retrieval
			vi.mocked(supabase.auth.getUser).mockResolvedValue({
				data: { user: mockUser },
				error: null
			});

			// Mock successful profile query
			const mockSingle = vi.fn().mockResolvedValue({
				data: mockProfile,
				error: null
			});
			const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
			const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
			vi.mocked(supabase.from).mockReturnValue({ select: mockSelect });

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(true);
			expect(result.user).toEqual(mockUser);
			expect(result.profile).toEqual(mockProfile);
			expect(result.error).toBeUndefined();

			// Verify supabase calls
			expect(supabase.auth.setSession).toHaveBeenCalledWith({
				access_token: mockAccessToken,
				refresh_token: mockRefreshToken
			});
			expect(supabase.auth.getUser).toHaveBeenCalled();
			expect(supabase.from).toHaveBeenCalledWith('profiles');
			expect(mockSelect).toHaveBeenCalledWith('*');
			expect(mockEq).toHaveBeenCalledWith('id', mockUser.id);
			expect(mockSingle).toHaveBeenCalled();
		});

		it('should return success with user only when fetchProfile is false', async () => {
			// Mock successful session setup
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: mockSession, user: mockUser },
				error: null
			});

			// Mock successful user retrieval
			vi.mocked(supabase.auth.getUser).mockResolvedValue({
				data: { user: mockUser },
				error: null
			});

			const result = await validateSession(mockAccessToken, mockRefreshToken, {
				fetchProfile: false
			});

			expect(result.success).toBe(true);
			expect(result.user).toEqual(mockUser);
			expect(result.profile).toBeNull(); // Should be null when profile is not fetched
			expect(result.error).toBeUndefined();

			// Verify profile was not fetched
			expect(supabase.from).not.toHaveBeenCalled();
		});
	});

	describe('session validation failures', () => {
		it('should return failure when session setup fails', async () => {
			const sessionError: AuthError = new AuthError('Invalid session');
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: null, user: null },
				error: sessionError
			});

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Invalid session');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});

		it('should return failure when session is null', async () => {
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: null, user: null },
				error: null
			});

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('No valid session found');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});

		it('should return failure when user retrieval fails', async () => {
			// Mock successful session setup
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: mockSession, user: mockUser },
				error: null
			});

			// Mock failed user retrieval
			vi.mocked(supabase.auth.getUser).mockResolvedValue({
				data: { user: null },
				error: new AuthError('User not found')
			});

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('User not found');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});

		it('should return failure when user is null', async () => {
			// Mock successful session setup
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: mockSession, user: mockUser },
				error: null
			});

			// Mock user retrieval with null user
			vi.mocked(supabase.auth.getUser).mockResolvedValue({
				data: { user: null },
				error: new AuthError('No user found for session')
			});

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('No user found for session');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});
	});

	describe('profile query failures', () => {
		it('should return success with user when profile query fails', async () => {
			// Mock successful session setup
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: mockSession, user: mockUser },
				error: null
			});

			// Mock successful user retrieval
			vi.mocked(supabase.auth.getUser).mockResolvedValue({
				data: { user: mockUser },
				error: null
			});

			// Mock failed profile query
			const profileError = {
				code: 'PGRST116',
				message: 'Profile not found',
				details: 'No rows returned',
				hint: null
			};
			const mockSingle = vi.fn().mockResolvedValue({
				data: null,
				error: profileError
			});
			const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
			const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
			vi.mocked(supabase.from).mockReturnValue({ select: mockSelect });

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(true);
			expect(result.user).toEqual(mockUser);
			expect(result.profile).toBeNull(); // Should be null when profile fetch fails
			expect(result.error).toBeUndefined();
		});

		it('should not log errors when logErrors is false', async () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			// Mock failed session setup
			const sessionError: AuthError = new AuthError('Invalid session');
			vi.mocked(supabase.auth.setSession).mockResolvedValue({
				data: { session: null, user: null },
				error: sessionError
			});

			await validateSession(mockAccessToken, mockRefreshToken, {
				logErrors: false
			});

			expect(consoleSpy).not.toHaveBeenCalled();
			consoleSpy.mockRestore();
		});
	});

	describe('error handling', () => {
		it('should handle unexpected errors gracefully', async () => {
			// Mock unexpected error
			vi.mocked(supabase.auth.setSession).mockRejectedValue(new Error('Network error'));

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Network error');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});

		it('should handle non-Error objects in catch block', async () => {
			// Mock unexpected error with non-Error object
			vi.mocked(supabase.auth.setSession).mockRejectedValue('String error');

			const result = await validateSession(mockAccessToken, mockRefreshToken);

			expect(result.success).toBe(false);
			expect(result.error).toBe('Unknown session validation error');
			expect(result.user).toBeUndefined();
			expect(result.profile).toBeUndefined();
		});
	});
});
