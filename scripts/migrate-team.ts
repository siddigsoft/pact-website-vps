import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../shared/schema';
import { teamMembersTable, type InsertTeamMember } from '../shared/schema';
import { teamMembers } from '../client/src/data/team';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Create a database connection specifically for this migration script
// We use localhost because we are running this script from the host machine, not inside Docker
// We try to use the DATABASE_URL from env, replacing the host if needed, or fall back to default
const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace('@postgres:', '@localhost:')
    : 'postgres://postgres:postgres@localhost:5432/pactconsultancy';

const pool = new Pool({
    connectionString
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
            console.error('Failed to connect to database. Make sure your database is running and accessible at localhost:5432');
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
