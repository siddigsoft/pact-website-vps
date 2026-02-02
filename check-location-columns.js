import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAndAddColumns() {
  try {
    console.log('Checking current locations table structure...');

    // Get a sample record to see current columns
    const { data: sampleData, error: sampleError } = await supabase
      .from('locations')
      .select('*')
      .limit(1);

    if (sampleError) {
      console.error('Error fetching sample data:', sampleError);
      return;
    }

    const currentColumns = sampleData && sampleData.length > 0 ? Object.keys(sampleData[0]) : [];
    console.log('Current columns:', currentColumns);

    const hasLatitude = currentColumns.includes('latitude');
    const hasLongitude = currentColumns.includes('longitude');

    if (hasLatitude && hasLongitude) {
      console.log('✅ Latitude and longitude columns already exist!');
      return;
    }

    console.log('❌ Missing columns detected. Please add them manually in Supabase dashboard:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to Table Editor > locations table');
    console.log('3. Add the following columns:');

    if (!hasLatitude) {
      console.log('   - latitude: TEXT (nullable)');
    }
    if (!hasLongitude) {
      console.log('   - longitude: TEXT (nullable)');
    }

    console.log('4. Save the changes');
    console.log('5. Restart your application');

  } catch (err) {
    console.error('Error:', err);
  }
}

checkAndAddColumns();