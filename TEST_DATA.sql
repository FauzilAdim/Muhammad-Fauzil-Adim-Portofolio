-- Test Data untuk Supabase
-- Copy-paste ke Supabase SQL Editor untuk testing

-- ==================== TEST WEB PROJECT ====================
INSERT INTO projects (name, cover_image, link_portfolio, description, stack, category)
VALUES (
  'Portfolio Website',
  'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Web+Project',
  'https://example.com',
  'A modern portfolio website built with React and TypeScript',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  'web'
);

-- ==================== TEST MOBILE PROJECT ====================
INSERT INTO projects (name, cover_image, link_portfolio, description, stack, category)
VALUES (
  'E-Commerce Mobile App',
  'https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Mobile+App',
  'https://example.com/mobile',
  'Cross-platform mobile app for online shopping',
  ARRAY['React Native', 'TypeScript', 'Redux'],
  'mobile'
);

-- ==================== TEST DESIGN PROJECT ====================
INSERT INTO design_projects (name, cover_image, images, description)
VALUES (
  'Brand Identity Design',
  'https://via.placeholder.com/800x600/EC4899/FFFFFF?text=Design+Cover',
  ARRAY[
    'https://via.placeholder.com/1200x800/EC4899/FFFFFF?text=Image+1',
    'https://via.placeholder.com/1200x800/F43F5E/FFFFFF?text=Image+2',
    'https://via.placeholder.com/1200x800/FB923C/FFFFFF?text=Image+3',
    'https://via.placeholder.com/1200x800/FBBF24/FFFFFF?text=Image+4'
  ],
  'Complete brand identity design including logo, color palette, and typography'
);

-- ==================== VERIFY DATA ====================
-- Check projects
SELECT * FROM projects ORDER BY created_at DESC;

-- Check design projects
SELECT * FROM design_projects ORDER BY created_at DESC;

-- Count total
SELECT 
  (SELECT COUNT(*) FROM projects) as total_projects,
  (SELECT COUNT(*) FROM design_projects) as total_designs;
