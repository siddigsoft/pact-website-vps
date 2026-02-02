import { supabase } from './server/db.js';

async function addLocationColumns() {
  try {
    console.log('Adding latitude and longitude columns to locations table...');

    // Use Supabase's rpc function to execute raw SQL
    // First, try to add the columns if they don't exist
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE locations ADD COLUMN IF NOT EXISTS latitude TEXT;
        ALTER TABLE locations ADD COLUMN IF NOT EXISTS longitude TEXT;
      `
    });

    if (error) {
      console.error('Error adding columns via RPC:', error);

      // Try alternative approach - check if we can use the REST API to alter table
      console.log('Trying alternative approach...');

      // Check current table structure
      const { data: tableInfo, error: tableError } = await supabase
        .from('locations')
        .select('*')
        .limit(1);

      if (tableError) {
        console.error('Error checking table:', tableError);
        return;
      }

      console.log('Current table structure:', tableInfo ? Object.keys(tableInfo[0] || {}) : 'No data');

      // Since we can't alter tables via client, we'll need to do this manually in Supabase dashboard
      console.log('\n❌ Cannot add columns via client. Please add latitude and longitude columns manually in Supabase dashboard:');
      console.log('1. Go to your Supabase project dashboard');
      console.log('2. Navigate to Table Editor > locations table');
      console.log('3. Add two new columns:');
      console.log('   - latitude: TEXT (nullable)');
      console.log('   - longitude: TEXT (nullable)');
      console.log('4. Save the changes');

    } else {
      console.log('✅ Columns added successfully:', data);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

addLocationColumns();