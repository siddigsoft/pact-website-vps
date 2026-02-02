-- Add latitude and longitude columns to locations table
ALTER TABLE locations ADD COLUMN IF NOT EXISTS latitude TEXT;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS longitude TEXT;