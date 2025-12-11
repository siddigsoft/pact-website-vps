import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  console.log('SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'Found' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('Running about_content migration...');
    
    // Read migration file
    const migrationPath = join(__dirname, 'server/migrations/0014_update_about_content.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    // Execute migration
    const { data, error } = await supabase.rpc('exec_sql', { 
      query: migrationSQL 
    });
    
    if (error) {
      // Try direct execution if exec_sql doesn't exist
      console.log('Attempting direct column addition...');
      
      // Check if columns exist
      const { data: columns } = await supabase
        .from('about_content')
        .select('*')
        .limit(1);
      
      if (columns && columns.length > 0) {
        const firstRow = columns[0];
        if (!('vision' in firstRow)) {
          console.log('✗ Migration needs to be run via Supabase Dashboard');
          console.log('\nPlease run this SQL in Supabase SQL Editor:');
          console.log('\n' + migrationSQL);
          console.log('\nOr use Supabase Dashboard > SQL Editor > New Query');
        } else {
          console.log('✓ Migration already applied - vision, mission, core_values columns exist');
        }
      }
    } else {
      console.log('✓ Migration completed successfully');
    }
  } catch (error) {
    console.error('Migration error:', error);
    console.log('\n⚠️  Please run the migration manually in Supabase Dashboard');
    console.log('Go to: Supabase Dashboard > SQL Editor > New Query');
    console.log('Paste the contents of: server/migrations/0014_update_about_content.sql');
  }
}

runMigration();
