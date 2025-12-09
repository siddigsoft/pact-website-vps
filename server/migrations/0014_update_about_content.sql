-- Update about_content table to add new fields
ALTER TABLE about_content
  ADD COLUMN vision TEXT,
  ADD COLUMN mission TEXT,
  ADD COLUMN core_values JSONB,
  ALTER COLUMN features DROP NOT NULL,
  ALTER COLUMN client_retention_rate DROP NOT NULL;

-- Update existing record with vision, mission, and core values
UPDATE about_content
SET 
  vision = 'To leverage our global synergy and expertise to provide leading, innovative and distinctive development consulting and technical assistance.',
  mission = 'To empower communities socially and economically.',
  core_values = '[
    "Expertise",
    "Integrity",
    "Excellence",
    "Sustainable Transformation & Empowerment",
    "Respect"
  ]'
WHERE id = 1; 