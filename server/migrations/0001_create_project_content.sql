-- Create project_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organization TEXT NOT NULL,
  category TEXT NOT NULL,
  bg_image TEXT,
  icon TEXT,
  duration TEXT,
  location TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_by INTEGER REFERENCES users(id),
  image TEXT,
  status TEXT
); 