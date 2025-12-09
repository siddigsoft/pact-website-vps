-- Create about_content table
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  image TEXT,
  features JSONB NOT NULL,
  client_retention_rate INTEGER DEFAULT 97,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_by INTEGER REFERENCES users(id)
);

-- Insert initial data from the existing hardcoded content
INSERT INTO about_content (title, subtitle, description, image, features)
VALUES (
  'About PACT Consultancy',
  'Who We Are',
  'At PACT Consultancy, we partner with organizations to design strategies, build capabilities, and deliver sustainable change. Our tailored approach drives growth, resilience, and impact in an ever-evolving world.\n\nWe bring over 15+ years of consulting excellence, with multisector expertise across Finance, Governance, Health, and beyond, supported by global and regional partnerships.',
  'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  '[
    {"title": "Custom Strategies", "description": "Tailored to your specific needs", "icon": "CheckCircle"},
    {"title": "Expert Team", "description": "Highly skilled professionals", "icon": "CheckCircle"},
    {"title": "Proven Results", "description": "Measurable outcomes", "icon": "CheckCircle"},
    {"title": "Global Network", "description": "Worldwide partnerships", "icon": "CheckCircle"}
  ]'
); 