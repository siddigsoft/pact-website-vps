import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { serviceContent, type InsertServiceContent } from '../shared/schema';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env file
config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run the services import script');
}

// Use the provided database URL directly (supports hosted Neon)
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
});

const db = drizzle(pool, { schema });

// Load services data from JSON file
const servicesDataPath = join(process.cwd(), 'services-data.json');
const servicesToImport = JSON.parse(readFileSync(servicesDataPath, 'utf-8'));

async function importServices() {
    try {
        console.log('Starting services import...');

        // Test connection
        try {
            await pool.query('SELECT NOW()');
            console.log('Database connection successful');
        } catch (err) {
            console.error('Failed to connect to database. Ensure DATABASE_URL is correct and reachable.');
            throw err;
        }

        for (const service of servicesToImport) {
            // Check if service already exists (by title)
            const existing = await db.query.serviceContent.findFirst({
                where: (table, { eq }) => eq(table.title, service.title)
            });

            if (existing) {
                console.log(`Service "${service.title}" already exists, updating`);
                await db
                    .update(serviceContent)
                    .set({
                        description: service.description,
                        details: service.details,
                        image: service.image,
                        updated_at: new Date()
                    })
                    .where(eq(serviceContent.id, existing.id));
            } else {
                console.log(`Creating new service: "${service.title}"`);
                await db.insert(serviceContent).values({
                    title: service.title,
                    description: service.description,
                    details: service.details,
                    image: service.image,
                    order_index: 0
                });
            }
        }

        console.log('Services import completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error during services import:', error);
        await pool.end();
        process.exit(1);
    }
}

importServices();
