-- Create project_services table
CREATE TABLE IF NOT EXISTS project_services (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES project_content(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES service_content(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(project_id, service_id)
);

-- Update status field in project_content
ALTER TABLE project_content 
    ALTER COLUMN status TYPE TEXT,
    ALTER COLUMN status SET DEFAULT 'completed',
    ADD CONSTRAINT project_status_check 
    CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')); 