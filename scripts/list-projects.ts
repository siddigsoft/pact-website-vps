import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listProjects() {
  const { data, error } = await supabase
    .from('project_content')
    .select('id, title')
    .order('id');

  if (error) {
    console.error('Error fetching projects:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('No projects found.');
    return;
  }

  console.log('Project IDs and Titles:');
  data.forEach((project: any) => {
    console.log(`ID: ${project.id} | Title: ${project.title}`);
  });
}

listProjects();
