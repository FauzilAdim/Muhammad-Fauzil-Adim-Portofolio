-- Add views and likes columns to design_projects table
ALTER TABLE design_projects 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- Create table to track likes by IP address
CREATE TABLE IF NOT EXISTS design_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  design_id UUID REFERENCES design_projects(id) ON DELETE CASCADE,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(design_id, ip_address)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_design_likes_design_id ON design_likes(design_id);
CREATE INDEX IF NOT EXISTS idx_design_likes_ip ON design_likes(ip_address);

-- Enable RLS (Row Level Security)
ALTER TABLE design_likes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON design_likes
  FOR SELECT USING (true);

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON design_likes
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public delete
CREATE POLICY "Allow public delete" ON design_likes
  FOR DELETE USING (true);
