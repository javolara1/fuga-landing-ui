import { describe, expect, it } from 'vitest';
import { supabase } from './supabaseClient';

describe('supabase client', () => {
	it('should expose the from helper', () => {
		expect(typeof supabase.from).toBe('function');
	});

	it('should expose the auth namespace', () => {
		expect(typeof supabase.auth).toBe('object');
	});
});
