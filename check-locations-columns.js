import { supabase } from './server/db.js';

async function checkColumns() {
  try {
    const { data, error } = await supabase.from('locations').select('*').limit(1);
    if (error) {
      console.error('Error:', error);
      return;
    }
    if (data && data.length > 0) {
      console.log('Columns in locations table:', Object.keys(data[0]));
      console.log('Sample data:', data[0]);
    } else {
      console.log('No data in locations table');
      // Try to get column info differently
      const { data: info, error: infoError } = await supabase.rpc('get_table_columns', { table_name: 'locations' });
      if (!infoError && info) {
        console.log('Table info:', info);
      }
    }
  } catch (err) {
    console.error('Error checking columns:', err);
  }
}

checkColumns();