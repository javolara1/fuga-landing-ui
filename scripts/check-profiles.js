// Script to check if profiles were created for test users
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProfiles() {
  console.log('Checking profiles in database...');

  try {
    // Get all profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.error('Error fetching profiles:', error);
      return;
    }

    console.log(`Found ${profiles.length} profiles:`);
    profiles.forEach(profile => {
      console.log(`- ID: ${profile.id}, Username: ${profile.username}, Role: ${profile.role}, Full Name: ${profile.full_name}`);
    });

    // Check if our test users have profiles
    const adminProfile = profiles.find(p => p.username === 'admin');
    const userProfile = profiles.find(p => p.username === 'user');

    console.log('\nTest user profile status:');
    console.log(`Admin profile exists: ${!!adminProfile}`);
    console.log(`User profile exists: ${!!userProfile}`);

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkProfiles();
