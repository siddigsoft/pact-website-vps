import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function backupProjects() {
  const { data, error } = await supabase
    .from('project_content')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching projects for backup:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('No projects to backup.');
    return;
  }

  const backupFile = 'projects_backup.json';
  fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
  console.log(`Projects backed up to ${backupFile}. Total projects: ${data.length}`);
}

backupProjects();