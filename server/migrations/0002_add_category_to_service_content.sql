-- Add category column and remove icon column from service_content table
ALTER TABLE service_content 
  ADD COLUMN category text NOT NULL DEFAULT 'core',
  DROP COLUMN IF EXISTS icon;

-- Remove the default after adding the column
ALTER TABLE service_content 
  ALTER COLUMN category DROP DEFAULT; 