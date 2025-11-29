// Unified script to manage test users and check profiles
// Run with: node scripts/manage-test-users.js [create|check]
// Default: create test users

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUsers() {
  console.log('Creating test users...');

  try {
    // Create admin user
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@fuga.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User'
      }
    });

    if (adminError) {
      console.error('Error creating admin user:', adminError);
    } else {
      console.log('Admin user created:', adminData.user.email);
      
      // Update admin profile with admin role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', adminData.user.id);

      if (profileError) {
        console.error('Error updating admin profile:', profileError);
      } else {
        console.log('Admin profile updated with admin role');
      }
    }

    // Create regular user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: 'user@fuga.com',
      password: 'user123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Regular User'
      }
    });

    if (userError) {
      console.error('Error creating regular user:', userError);
    } else {
      console.log('Regular user created:', userData.user.email);
      
      // User profile already created with default 'user' role by trigger
      // No need to update since role defaults to 'user'
      console.log('User profile created with default user role');
    }

    console.log('Test users creation completed!');
    console.log('Admin: admin@fuga.com / admin123');
    console.log('User: user@fuga.com / user123');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

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
      console.log(`- ID: ${profile.id}, Role: ${profile.role}, Created: ${profile.created_at}`);
    });

    // Get user emails for better identification
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();

    if (!usersError && users) {
      console.log('\nUser details:');
      profiles.forEach(profile => {
        const user = users.users.find(u => u.id === profile.id);
        const email = user ? user.email : 'Unknown';
        console.log(`- ID: ${profile.id}, Email: ${email}, Role: ${profile.role}`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Main function
async function main() {
  const command = process.argv[2] || 'create';
  
  switch (command) {
    case 'create':
      await createTestUsers();
      break;
    case 'check':
      await checkProfiles();
      break;
    case 'help':
      console.log(`
Usage: node scripts/manage-test-users.js [command]

Commands:
  create  - Create test users (default)
  check   - Check existing profiles
  help    - Show this help message

Examples:
  node scripts/manage-test-users.js          # Create test users
  node scripts/manage-test-users.js create   # Create test users
  node scripts/manage-test-users.js check    # Check existing profiles
      `);
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Use "node scripts/manage-test-users.js help" for usage information.');
  }
}

main();
