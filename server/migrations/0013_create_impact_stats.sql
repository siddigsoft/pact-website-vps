-- Create impact_stats table
CREATE TABLE IF NOT EXISTS impact_stats (
  id SERIAL PRIMARY KEY,
  value INTEGER NOT NULL,
  suffix TEXT,
  label TEXT NOT NULL,
  color TEXT DEFAULT '#E96D1F',
  order_index INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_by INTEGER REFERENCES users(id)
);

-- Insert default values (only if table is empty)
INSERT INTO impact_stats (value, suffix, label, color, order_index)
SELECT 17, '+', 'Years of Experience in Development Consulting & Technical Assistance.', '#E96D1F', 0
WHERE NOT EXISTS (SELECT 1 FROM impact_stats WHERE order_index = 0);

INSERT INTO impact_stats (value, suffix, label, color, order_index)
SELECT 40, '+', 'Macro-economic & Social Studies with impact on national policy & development', '#1A3A5F', 1
WHERE NOT EXISTS (SELECT 1 FROM impact_stats WHERE order_index = 1);

INSERT INTO impact_stats (value, suffix, label, color, order_index)
SELECT 50, '+', 'Medium & High-Value Projects with Reputable International Organizations.', '#E96D1F', 2
WHERE NOT EXISTS (SELECT 1 FROM impact_stats WHERE order_index = 2);

INSERT INTO impact_stats (value, suffix, label, color, order_index)
SELECT 10, '+', 'Thematic Areas of Consulting & SDG-aligned Technical Assistance.', '#1A3A5F', 3
WHERE NOT EXISTS (SELECT 1 FROM impact_stats WHERE order_index = 3);

INSERT INTO impact_stats (value, suffix, label, color, order_index)
SELECT 20, '+', 'Strategic Global Partnerships on Projects.', '#E96D1F', 4
WHERE NOT EXISTS (SELECT 1 FROM impact_stats WHERE order_index = 4); 