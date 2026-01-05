import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function deleteUser(username: string) {
  try {
    console.log(`Attempting to delete user: ${username}`);

    // First, get the user to confirm they exist
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, username')
      .eq('username', username)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        console.log(`User '${username}' not found`);
        return;
      }
      throw fetchError;
    }

    console.log(`Found user: ${user.username} (ID: ${user.id})`);

    // List of tables that reference users via updated_by
    const tablesToUpdate = [
      'expertise_content',
      'service_content',
      'client_content',
      'project_content',
      'blog_articles',
      'hero_slides',
      'about_content',
      'team_members',
      'impact_stats',
      'footer_content',
      'locations'
    ];

    // Set updated_by to null for all records referencing this user
    console.log('Removing user references from related tables...');
    for (const table of tablesToUpdate) {
      const { error: updateError } = await supabase
        .from(table)
        .update({ updated_by: null })
        .eq('updated_by', user.id);

      if (updateError) {
        console.warn(`Warning: Could not update ${table}:`, updateError.message);
        // Continue with other tables
      } else {
        console.log(`✓ Cleared references in ${table}`);
      }
    }

    // Now delete the user
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('username', username);

    if (deleteError) {
      throw deleteError;
    }

    console.log(`✅ Successfully deleted user '${username}'`);

  } catch (error) {
    console.error('❌ Error deleting user:', error);
    process.exit(1);
  }
}

// Get username from command line arguments
const username = process.argv[2];
if (!username) {
  console.error('Usage: npx tsx delete-user.ts <username>');
  console.error('Example: npx tsx delete-user.ts pact');
  process.exit(1);
}

deleteUser(username);