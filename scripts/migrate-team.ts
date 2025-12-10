import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { teamMembersTable, type InsertTeamMember } from '../shared/schema';
import { teamMembers } from '../client/src/data/team';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run the team migration script');
}

// Use the provided database URL directly (supports hosted Neon)
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
});

const db = drizzle(pool, { schema });

async function migrateTeam() {
    try {
        console.log('Starting team migration...');

        // Test connection
        try {
            await pool.query('SELECT NOW()');
            console.log('Database connection successful');
        } catch (err) {
            console.error('Failed to connect to database. Ensure DATABASE_URL is correct and reachable.');
            throw err;
        }

        // Transform and insert each team member
        for (const member of teamMembers) {
            const memberData: InsertTeamMember = {
                name: member.name,
                position: member.position,
                department: member.department,
                location: member.location,
                bio: member.bio,
                expertise: member.expertise,
                image: member.image || null,
                slug: member.slug,
                metaDescription: member.metaDescription || null,
                email: member.contact.email,
                linkedin: member.contact.linkedin,
            };

            // Check if member already exists (by slug)
            const existing = await db.query.teamMembersTable.findFirst({
                where: (table, { eq }) => eq(table.slug, member.slug)
            });

            if (existing) {
                console.log(`Team member ${member.name} already exists, updating...`);
                await db.update(teamMembersTable)
                    .set(memberData)
                    .where(eq(teamMembersTable.slug, member.slug));
                console.log(`Updated team member: ${member.name}`);
            } else {
                await db.insert(teamMembersTable).values(memberData);
                console.log(`Migrated team member: ${member.name}`);
            }
        }

        console.log('Team migration completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('Error during team migration:', error);
        await pool.end();
        process.exit(1);
    }
}

migrateTeam();
