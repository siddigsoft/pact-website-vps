-- Create footer_content table
CREATE TABLE IF NOT EXISTS "footer_content" (
  "id" SERIAL PRIMARY KEY,
  "company_description" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "social_links" JSONB DEFAULT '[]',
  "copyright_text" TEXT NOT NULL,
  "privacy_link" TEXT DEFAULT '#',
  "terms_link" TEXT DEFAULT '#',
  "sitemap_link" TEXT DEFAULT '#',
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_by" INTEGER REFERENCES "users"("id")
);

-- Insert initial footer content
INSERT INTO "footer_content" (
  "company_description", 
  "address", 
  "phone", 
  "email", 
  "social_links", 
  "copyright_text"
) VALUES (
  'Leading consulting firm providing strategic solutions for business transformation and growth.',
  '123 Business Avenue, New York, NY 10001, United States',
  '+1 (555) 123-4567',
  'info@pactconsultancy.com',
  '[
    {"name": "LinkedIn", "url": "#", "icon": "fab fa-linkedin"},
    {"name": "Twitter", "url": "#", "icon": "fab fa-twitter"},
    {"name": "Facebook", "url": "#", "icon": "fab fa-facebook"},
    {"name": "Instagram", "url": "#", "icon": "fab fa-instagram"}
  ]',
  'PACT Consultancy. All rights reserved.'
); 