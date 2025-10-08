import { supabase } from './supabaseClient';

// Simple test to verify Supabase connection
export async function testSupabaseConnection() {
	try {
		const { error } = await supabase.from('_test').select('*').limit(1);

		if (error) {
			console.error('Supabase connection test failed:', error.message);
			return false;
		}

		console.log('Supabase connection successful');
		return true;
	} catch (error) {
		console.error('Supabase connection test failed:', error);
		return false;
	}
}
