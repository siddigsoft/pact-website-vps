-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  bio TEXT NOT NULL,
  expertise TEXT[] NOT NULL,
  education TEXT NOT NULL,
  achievements TEXT[] NOT NULL,
  quote TEXT NOT NULL,
  image TEXT,
  slug TEXT NOT NULL UNIQUE,
  meta_description TEXT,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS team_members_slug_idx ON team_members(slug);

-- Create index on department for filtering
CREATE INDEX IF NOT EXISTS team_members_department_idx ON team_members(department); 