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

async function restoreProjects() {
  const backupFile = 'projects_backup.json';

  if (!fs.existsSync(backupFile)) {
    console.error(`Backup file ${backupFile} not found.`);
    process.exit(1);
  }

  const projects = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));

  console.log(`Restoring ${projects.length} projects...`);

  for (const project of projects) {
    // Keep the original ID to preserve references
    const { error } = await supabase
      .from('project_content')
      .insert(project);

    if (error) {
      console.error(`Error restoring project "${project.title}":`, error.message);
    } else {
      console.log(`Restored project: ${project.title} (ID: ${project.id})`);
    }
  }

  console.log('Project restoration completed.');
}

restoreProjects();