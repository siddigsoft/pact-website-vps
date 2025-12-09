import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the services data
const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'services-data.json'), 'utf8'));

// Database connection for Docker environment
const { Pool } = pg;
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: 'pactconsultancy',
  user: 'postgres',
  password: 'postgres'  // Default password from docker-compose.yml
});

async function importServices() {
  try {
    // Connect to the database
    const client = await pool.connect();
    
    console.log(`Starting import of ${services.length} services...`);
    
    // Import each service
    for (const service of services) {
      const { title, description, details, icon, image, category } = service;
      
      // Check if service already exists with same title
      const checkResult = await client.query(
        'SELECT id FROM service_content WHERE title = $1',
        [title]
      );
      
      if (checkResult.rowCount > 0) {
        console.log(`Service "${title}" already exists, skipping...`);
        continue;
      }
      
      // Insert into database
      const result = await client.query(
        `INSERT INTO service_content 
        (title, description, details, icon, image, category, order_index)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
        [title, description, details, icon, image, category, 0]
      );
      
      console.log(`Imported service "${title}" with ID ${result.rows[0].id}`);
    }
    
    client.release();
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing services:', error);
  } finally {
    await pool.end();
  }
}

importServices(); 