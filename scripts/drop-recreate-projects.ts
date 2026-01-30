import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function dropAndRecreateProjectTable() {
  try {
    // Drop the table
    console.log('Dropping project_content table...');
    const { error: dropError } = await supabase.rpc('exec_sql', { sql: 'DROP TABLE IF EXISTS project_content CASCADE;' });

    if (dropError) {
      console.error('Error dropping table:', dropError.message);
      // Try alternative drop method
      const { error: altDropError } = await supabase.from('project_content').delete().neq('id', 0); // This won't work for drop
      if (altDropError) {
        console.error('Alternative drop failed. Please manually drop the table in Supabase dashboard.');
        process.exit(1);
      }
    }

    // Recreate the table using the schema from migrations
    console.log('Recreating project_content table...');
    const createTableSQL = `
      CREATE TABLE project_content (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        organization TEXT NOT NULL,
        category TEXT,
        bg_image TEXT,
        icon TEXT,
        duration TEXT,
        location TEXT,
        image TEXT,
        status TEXT DEFAULT 'completed',
        order_index INTEGER DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_by INTEGER REFERENCES users(id)
      );
    `;

    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    if (createError) {
      console.error('Error creating table:', createError.message);
      console.log('Please manually create the table in Supabase dashboard using the SQL above.');
      process.exit(1);
    }

    console.log('Table dropped and recreated successfully.');
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

dropAndRecreateProjectTable();