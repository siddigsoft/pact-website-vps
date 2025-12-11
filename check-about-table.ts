import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAboutContent() {
  console.log('\n🔍 Detailed check of about_content table...\n');
  
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .limit(1);

  if (error) {
    console.log('❌ Error:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No data in about_content table');
    return;
  }

  const row = data[0];
  console.log('📋 Columns present in about_content:');
  console.log('='.repeat(60));
  
  const requiredFields = {
    'id': 'number',
    'title': 'string',
    'subtitle': 'string',
    'description': 'string',
    'image': 'string',
    'features': 'array',
    'vision': 'string',
    'mission': 'string',
    'core_values': 'array',
    'client_retention_rate': 'number',
    'updated_at': 'string',
    'updated_by': 'number'
  };

  let allGood = true;
  
  for (const [field, expectedType] of Object.entries(requiredFields)) {
    const exists = field in row;
    const value = row[field];
    const hasValue = value !== null && value !== undefined;
    
    let actualType = 'null';
    if (hasValue) {
      if (Array.isArray(value)) actualType = 'array';
      else actualType = typeof value;
    }
    
    const typeMatch = !hasValue || actualType === expectedType || (expectedType === 'string' && actualType === 'object');
    
    if (exists) {
      if (hasValue) {
        const icon = typeMatch ? '✅' : '⚠️';
        console.log(`${icon} ${field.padEnd(25)} : ${actualType} (${typeMatch ? 'OK' : 'type mismatch'})`);
      } else {
        console.log(`⚪ ${field.padEnd(25)} : null/empty`);
      }
    } else {
      console.log(`❌ ${field.padEnd(25)} : MISSING!`);
      allGood = false;
    }
  }
  
  console.log('='.repeat(60));
  
  if (allGood) {
    console.log('\n✅ All required columns exist!');
    
    // Show sample data
    console.log('\n📄 Sample data:');
    console.log('   Title:', row.title);
    console.log('   Subtitle:', row.subtitle || '(empty)');
    console.log('   Description:', row.description?.substring(0, 60) + '...');
    console.log('   Vision:', row.vision?.substring(0, 60) + '...' || '(empty)');
    console.log('   Mission:', row.mission?.substring(0, 60) + '...' || '(empty)');
    console.log('   Core Values:', Array.isArray(row.core_values) ? row.core_values.join(', ') : '(empty)');
    console.log('   Features:', Array.isArray(row.features) ? `${row.features.length} features` : '(empty)');
    
    console.log('\n🎉 About section is ready to use!');
  } else {
    console.log('\n❌ Some columns are missing - migration needed!');
  }
}

checkAboutContent().catch(console.error);
