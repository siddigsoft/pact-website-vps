-- Make excerpt optional in blog_articles table
ALTER TABLE blog_articles ALTER COLUMN excerpt DROP NOT NULL;

-- Create blog_article_services table for many-to-many relationship
CREATE TABLE IF NOT EXISTS blog_article_services (
  id SERIAL PRIMARY KEY,
  blog_article_id INTEGER NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  service_id INTEGER NOT NULL REFERENCES service_content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(blog_article_id, service_id)
);

-- Create blog_article_projects table for many-to-many relationship
CREATE TABLE IF NOT EXISTS blog_article_projects (
  id SERIAL PRIMARY KEY,
  blog_article_id INTEGER NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  project_id INTEGER NOT NULL REFERENCES project_content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(blog_article_id, project_id)
);

-- Add index for better query performance
CREATE INDEX idx_blog_article_services_blog_article_id ON blog_article_services(blog_article_id);
CREATE INDEX idx_blog_article_services_service_id ON blog_article_services(service_id);
CREATE INDEX idx_blog_article_projects_blog_article_id ON blog_article_projects(blog_article_id);
CREATE INDEX idx_blog_article_projects_project_id ON blog_article_projects(project_id); 