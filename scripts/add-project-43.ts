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

async function addProject() {
  const { data, error } = await supabase
    .from('project_content')
    .insert({
      id: 43,
      title: 'Test Project 43',
      description: 'This is a test project added for PATCH testing.',
      organization: 'PACT Consultancy',
      category: 'Testing',
      bg_image: null,
      icon: null,
      duration: null,
      location: null,
      image: null,
      status: 'draft',
      order_index: 43,
      updated_by: null
    });

  if (error) {
    console.error('Error adding project:', error.message);
    process.exit(1);
  }

  console.log('Project added:', data);
}

addProject();
