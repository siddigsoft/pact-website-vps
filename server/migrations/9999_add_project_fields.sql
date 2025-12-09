-- Add duration and location fields to project_content table
ALTER TABLE project_content ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE project_content ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE project_content ADD COLUMN IF NOT EXISTS services json DEFAULT '[]'::json; 