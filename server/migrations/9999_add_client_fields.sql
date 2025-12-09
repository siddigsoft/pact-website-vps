-- Add URL and description fields to client_content table

ALTER TABLE client_content 
ADD COLUMN description TEXT,
ADD COLUMN url TEXT;
 
-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS client_content_url_idx ON client_content(url);
CREATE INDEX IF NOT EXISTS client_content_description_idx ON client_content(description); 