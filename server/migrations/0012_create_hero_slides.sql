-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  action_text TEXT NOT NULL,
  action_link TEXT NOT NULL,
  background_image TEXT NOT NULL,
  category TEXT,
  video_background TEXT,
  accent_color TEXT,
  order_index INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_by INTEGER REFERENCES users(id)
);

-- Insert initial data from the existing hardcoded slides
INSERT INTO hero_slides (title, description, action_text, action_link, background_image, category, accent_color, order_index)
VALUES 
  ('EMPOWERING BUSINESSES TO TRANSFORM AND SUCCEED', 'We partner with organizations to design strategies, build capabilities, and deliver sustainable change.', 'Explore Our Services', '/services', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'DIGITAL TRANSFORMATION', '#FF8200', 0),
  ('SUSTAINABILITY SOLUTIONS FOR A BETTER TOMORROW', 'Supporting sustainable solutions and circular economy principles for a better future.', 'Our Expertise', '/expertise', 'https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'ENVIRONMENT & SUSTAINABILITY', '#00B2A9', 1),
  ('DRIVING INNOVATION THROUGH TECHNOLOGY', 'Navigate the complexities of digital transformation with confidence and expert guidance.', 'Success Stories', '/clients', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'TECHNOLOGY & INNOVATION', '#9063CD', 2); 