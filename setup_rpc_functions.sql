-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes(design_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE design_projects
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = design_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes(design_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE design_projects
  SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
  WHERE id = design_id;
END;
$$ LANGUAGE plpgsql;
