-- Update team_members table structure
ALTER TABLE team_members 
  ALTER COLUMN bio TYPE TEXT; -- Keep as TEXT but we'll use rich text in the frontend
  
-- Remove unnecessary fields
ALTER TABLE team_members 
  DROP COLUMN education,
  DROP COLUMN achievements,
  DROP COLUMN quote;

-- Create team_member_services junction table
CREATE TABLE IF NOT EXISTS team_member_services (
  id SERIAL PRIMARY KEY,
  team_member_id INTEGER NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL REFERENCES service_content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(team_member_id, service_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS team_member_services_team_member_id_idx ON team_member_services(team_member_id);
CREATE INDEX IF NOT EXISTS team_member_services_service_id_idx ON team_member_services(service_id); 