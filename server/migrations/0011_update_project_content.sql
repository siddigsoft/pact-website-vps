-- Rename client column to organization and make it not null
ALTER TABLE project_content 
  DROP COLUMN IF EXISTS client,
  ADD COLUMN organization TEXT NOT NULL DEFAULT '',
  ADD COLUMN category TEXT NOT NULL DEFAULT '',
  ADD COLUMN bg_image TEXT;

-- Remove the default values after adding the columns
ALTER TABLE project_content 
  ALTER COLUMN organization DROP DEFAULT,
  ALTER COLUMN category DROP DEFAULT; 