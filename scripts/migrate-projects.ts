import { db } from '../server/db';
import { projectContent, type InsertProjectContent } from '../shared/schema';
import { initialProjects } from '../client/src/context/ProjectsContext';

async function migrateProjects() {
  try {
    console.log('Starting project migration...');

    // Transform and insert each project
    for (const project of initialProjects) {
      const projectData: InsertProjectContent = {
        title: project.title,
        description: project.description,
        organization: project.client,
        category: project.services[0]?.title || 'General',
        bg_image: project.image,
        icon: null,
        order_index: parseInt(project.id),
        updated_by: 1 // Assuming admin user has ID 1
      };

      const [newProject] = await db
        .insert(projectContent)
        .values(projectData)
        .returning();

      console.log(`Migrated project: ${project.title}`);
    }

    console.log('Project migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during project migration:', error);
    process.exit(1);
  }
}

migrateProjects(); 