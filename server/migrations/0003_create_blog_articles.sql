-- Create blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  slug TEXT NOT NULL UNIQUE,
  meta_description TEXT,
  keywords JSONB DEFAULT '[]'::jsonb,
  author_name TEXT,
  author_position TEXT,
  author_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  updated_by INTEGER REFERENCES users(id)
); 