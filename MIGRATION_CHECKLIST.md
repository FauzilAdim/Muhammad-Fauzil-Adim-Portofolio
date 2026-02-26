# ✅ Migration Checklist: Railway → Supabase

## 🎯 Status: READY TO TEST

---

## ✅ Supabase Setup (COMPLETED)

- [x] Create Supabase project: `personal-portfolio`
- [x] Database schema created:
  - [x] Table: `projects` (web & mobile)
  - [x] Table: `design_projects` (design grafis)
  - [x] Indexes created
  - [x] RLS policies enabled
- [x] Storage bucket created: `portfolio-images`
- [x] Storage policies configured
- [x] API keys obtained

---

## ✅ Frontend Setup (COMPLETED)

- [x] Install `@supabase/supabase-js`
- [x] Create `.env` with Supabase credentials
- [x] Create `src/lib/supabase.ts` (Supabase client)
- [x] Update `src/services/ProjectService.ts`:
  - [x] getAllProjects()
  - [x] getProjectsByCategory()
  - [x] createProject()
  - [x] updateProject()
  - [x] deleteProject()
  - [x] getAllDesignProjects()
  - [x] getDesignProjectById()
  - [x] createDesignProject()
  - [x] deleteDesignProject()
  - [x] uploadProjectCover()
  - [x] uploadDesignImages()
- [x] Update `src/components/Projects.tsx`:
  - [x] Fetch from Supabase
  - [x] Support web/mobile/design categories
  - [x] Click handler (redirect vs modal)
  - [x] Design modal with image slider
  - [x] Loading states
  - [x] Empty states

---

## 📋 API Endpoints Available

### Projects (Web & Mobile)
```
GET  /projects              ✅ getAllProjects()
GET  /projects?category=web ✅ getProjectsByCategory('web')
POST /projects              ✅ createProject()
PUT  /projects/:id          ✅ updateProject()
DELETE /projects/:id        ✅ deleteProject()
```

### Design Projects
```
GET  /design_projects       ✅ getAllDesignProjects()
GET  /design_projects/:id   ✅ getDesignProjectById()
POST /design_projects       ✅ createDesignProject()
DELETE /design_projects/:id ✅ deleteDesignProject()
```

### Storage
```
POST uploadProjectCover()   ✅ Upload single image for web/mobile
POST uploadDesignImages()   ✅ Upload multiple images for design
```

---

## 🧪 Testing Steps

### 1. Test Database Connection
```bash
cd Muhammad-Fauzil-Adim-Portofolio
npm run dev
```
- Open browser console
- Check for errors
- Verify "Loading projects..." appears

### 2. Test via Supabase Dashboard

#### Create Web Project:
```sql
INSERT INTO projects (name, cover_image, link_portfolio, description, stack, category)
VALUES (
  'Test Web Project',
  'https://via.placeholder.com/800x600',
  'https://example.com',
  'This is a test web project',
  ARRAY['React', 'TypeScript', 'Tailwind'],
  'web'
);
```

#### Create Mobile Project:
```sql
INSERT INTO projects (name, cover_image, link_portfolio, description, stack, category)
VALUES (
  'Test Mobile App',
  'https://via.placeholder.com/800x600',
  'https://example.com',
  'This is a test mobile app',
  ARRAY['React Native', 'TypeScript'],
  'mobile'
);
```

#### Create Design Project:
```sql
INSERT INTO design_projects (name, cover_image, images, description)
VALUES (
  'Test Design',
  'https://via.placeholder.com/800x600',
  ARRAY[
    'https://via.placeholder.com/800x600',
    'https://via.placeholder.com/800x601',
    'https://via.placeholder.com/800x602'
  ],
  'This is a test design project'
);
```

### 3. Test Frontend Display
- [ ] Refresh frontend
- [ ] Verify 3 projects appear
- [ ] Test filter buttons (All, Web, Mobile, Design)
- [ ] Click web project → should open link in new tab
- [ ] Click mobile project → should open link in new tab
- [ ] Click design project → should open modal with slider

### 4. Test Image Upload
Use Supabase Storage UI:
1. Go to Storage → portfolio-images
2. Create folder: `projects/`
3. Upload test image
4. Copy public URL
5. Use URL in INSERT query

---

## 🗑️ After Testing Success

### Delete Railway Backend:
1. [ ] Go to Railway dashboard
2. [ ] Select backend project
3. [ ] Settings → Delete Project
4. [ ] Confirm deletion

### Update Vercel Environment Variables:
1. [ ] Go to Vercel dashboard
2. [ ] Select frontend project
3. [ ] Settings → Environment Variables
4. [ ] Add:
   - `VITE_SUPABASE_URL` = `https://ixtrngpftjqhrvyhorwg.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `[your-anon-key]`
5. [ ] Redeploy

---

## 📊 Migration Benefits

| Feature | Railway (Old) | Supabase (New) |
|---------|---------------|----------------|
| Database | PostgreSQL ✅ | PostgreSQL ✅ |
| File Storage | ❌ Ephemeral | ✅ Persistent (1GB) |
| Cost | ~$10/month | ✅ FREE |
| Realtime | ❌ | ✅ Available |
| Admin UI | ❌ | ✅ Built-in |
| Auto-scaling | Manual | ✅ Automatic |

---

## 🚀 Next Steps After Migration

1. [ ] Create admin panel untuk upload projects
2. [ ] Implement authentication (optional)
3. [ ] Add image optimization
4. [ ] Setup Supabase Edge Functions (if needed)
5. [ ] Monitor usage di Supabase dashboard

---

## 📞 Support

**Supabase Docs:** https://supabase.com/docs
**Supabase Dashboard:** https://supabase.com/dashboard

---

**Migration Date:** 2025-01-XX
**Status:** ✅ READY TO TEST
