// Script to create test users for development
// Run with: node scripts/create-test-users.js

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
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
        .update({ role: 'admin', full_name: 'Admin User', username: 'admin' })
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
      
      // Update user profile (role defaults to 'user')
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: 'Regular User', username: 'user' })
        .eq('id', userData.user.id);

      if (profileError) {
        console.error('Error updating user profile:', profileError);
      } else {
        console.log('User profile updated');
      }
    }

    console.log('Test users creation completed!');
    console.log('Admin: admin@fuga.com / admin123');
    console.log('User: user@fuga.com / user123');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUsers();
