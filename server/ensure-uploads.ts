import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function ensureUploadDirectories() {
  // Define upload directory paths
  const uploadsDir = join(__dirname, '../uploads');
  const teamUploadsDir = join(uploadsDir, 'team');
  const blogUploadsDir = join(uploadsDir, 'blog');
  const serviceUploadsDir = join(uploadsDir, 'services');
  const locationsUploadsDir = join(uploadsDir, 'locations');

  // Create directories if they don't exist
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Created uploads directory');
    }
    if (!fs.existsSync(teamUploadsDir)) {
      fs.mkdirSync(teamUploadsDir, { recursive: true });
      console.log('Created team uploads directory');
    }
    if (!fs.existsSync(blogUploadsDir)) {
      fs.mkdirSync(blogUploadsDir, { recursive: true });
      console.log('Created blog uploads directory');
    }
    if (!fs.existsSync(serviceUploadsDir)) {
      fs.mkdirSync(serviceUploadsDir, { recursive: true });
      console.log('Created services uploads directory');
    }
    if (!fs.existsSync(locationsUploadsDir)) {
      fs.mkdirSync(locationsUploadsDir, { recursive: true });
      console.log('Created locations uploads directory');
    }
  } catch (error) {
    console.error('Error creating upload directories:', error);
  }
} 