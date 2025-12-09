-- Update project_content table structure to match schema.ts

-- First, drop the slug column as it's not needed
ALTER TABLE project_content DROP COLUMN IF EXISTS slug;

-- Change description from jsonb to text
ALTER TABLE project_content ALTER COLUMN description TYPE text USING description::text;

-- Rename client to organization
ALTER TABLE project_content RENAME COLUMN client TO organization;

-- Add missing columns
ALTER TABLE project_content ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'default';
ALTER TABLE project_content ADD COLUMN IF NOT EXISTS bg_image text;

-- Make organization not null
ALTER TABLE project_content ALTER COLUMN organization SET NOT NULL; 