-- Ensure accent_color column exists in hero_slides table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'hero_slides' AND column_name = 'accent_color') THEN
        ALTER TABLE hero_slides ADD COLUMN accent_color TEXT;
    END IF;
END $$;
