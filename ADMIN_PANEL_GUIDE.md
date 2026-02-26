# 🎨 Admin Panel - User Guide

## 📍 Cara Akses Admin Panel

### Local Development:
```
http://localhost:3001/#admin
```

### Production (Vercel):
```
https://muhammad-fauzil-adim.vercel.app/#admin
```

**Cara kembali ke homepage:**
```
http://localhost:3001/
atau
https://muhammad-fauzil-adim.vercel.app/
```

---

## 🚀 Cara Menggunakan Admin Panel

### 1️⃣ Upload Web/Mobile Project

**Steps:**
1. Buka Admin Panel (`/#admin`)
2. Pastikan tab **"Web/Mobile Projects"** aktif
3. Fill form:
   - **Project Name:** Nama project (e.g., "Portfolio Website")
   - **Description:** Deskripsi project
   - **Portfolio Link:** URL demo/live site (e.g., "https://example.com")
   - **Tech Stack:** Teknologi yang digunakan, pisahkan dengan koma (e.g., "React, TypeScript, Tailwind CSS")
   - **Category:** Pilih "Web Development" atau "Mobile Development"
   - **Cover Image:** Klik "Choose File" dan pilih 1 gambar
4. Klik **"Create Project"**
5. Tunggu proses upload (biasanya 5-10 detik)
6. Setelah muncul "✅ Project created successfully!", project akan muncul di list bawah
7. Refresh homepage untuk lihat project baru

---

### 2️⃣ Upload Design Project

**Steps:**
1. Buka Admin Panel (`/#admin`)
2. Klik tab **"Design Projects"**
3. Fill form:
   - **Design Name:** Nama design (e.g., "Brand Identity Design")
   - **Description:** Deskripsi design
   - **Images (multiple):** Klik "Choose File" dan pilih **MULTIPLE** gambar (Ctrl+Click atau Shift+Click)
     - Gambar pertama akan jadi cover/thumbnail
     - Semua gambar akan muncul di modal slider
4. Klik **"Create Design Project"**
5. Tunggu proses upload (tergantung jumlah gambar, bisa 10-30 detik)
6. Setelah muncul "✅ Design project created successfully!", design akan muncul di list bawah
7. Refresh homepage untuk lihat design baru

---

### 3️⃣ Delete Project

**Steps:**
1. Scroll ke bawah ke section **"Existing Projects"**
2. Cari project yang mau dihapus
3. Klik tombol **"Delete"** (merah)
4. Confirm deletion
5. Project akan terhapus dari database
6. Refresh homepage untuk verify

---

## 💡 Tips & Best Practices

### Image Guidelines:

**Web/Mobile Projects:**
- Format: JPG, PNG, WebP
- Recommended size: 800x600px atau 1200x800px
- Max file size: 5MB
- Aspect ratio: 4:3 atau 16:9

**Design Projects:**
- Format: JPG, PNG, WebP
- Recommended size: 1200x800px atau lebih besar
- Max file size per image: 5MB
- Jumlah images: 2-10 images per project
- First image = Cover/Thumbnail

### Tech Stack Format:
```
✅ Good: React, TypeScript, Tailwind CSS
✅ Good: Node.js, Express, PostgreSQL
❌ Bad: React,TypeScript,TailwindCSS (no spaces)
❌ Bad: React; TypeScript; Tailwind (wrong separator)
```

### Portfolio Link:
```
✅ Good: https://example.com
✅ Good: https://myproject.vercel.app
❌ Bad: example.com (missing https://)
❌ Bad: www.example.com (missing https://)
```

---

## 🔒 Security Notes

**IMPORTANT:**
- Admin panel **TIDAK ADA AUTHENTICATION** saat ini
- Siapa saja yang tahu URL `/#admin` bisa akses
- **Setelah selesai upload, HIDE admin panel dengan cara:**

### Option 1: Comment Out Route (Recommended)
Edit `src/App.tsx`:
```typescript
// Comment this line:
// import Admin from './pages/Admin';

// And comment the routing logic
```

### Option 2: Delete Admin Files
```bash
# Delete admin page
rm src/pages/Admin.tsx

# Delete guide
rm ADMIN_PANEL_GUIDE.md
```

### Option 3: Add Simple Password Protection
Saya bisa tambahkan password protection sederhana jika Anda mau.

---

## 🐛 Troubleshooting

### Error: "Failed to upload image"
- **Cause:** File terlalu besar atau format tidak supported
- **Solution:** Compress image atau gunakan format JPG/PNG

### Error: "Failed to create project"
- **Cause:** Missing required fields atau network error
- **Solution:** Check semua field terisi dan internet connection stable

### Project tidak muncul di homepage
- **Cause:** Cache browser
- **Solution:** Hard refresh (Ctrl+Shift+R) atau clear cache

### Upload sangat lambat
- **Cause:** File size terlalu besar atau internet lambat
- **Solution:** Compress images sebelum upload

---

## 📊 Workflow Example

### Scenario: Upload 1 Web Project + 1 Design Project

**Step 1: Upload Web Project**
1. Go to `/#admin`
2. Tab: "Web/Mobile Projects"
3. Fill:
   - Name: "E-Commerce Website"
   - Description: "Modern e-commerce platform"
   - Link: "https://myshop.com"
   - Stack: "Next.js, TypeScript, Stripe"
   - Category: "Web Development"
   - Image: Select `ecommerce-cover.jpg`
4. Click "Create Project"
5. Wait for success message

**Step 2: Upload Design Project**
1. Click tab: "Design Projects"
2. Fill:
   - Name: "Logo Design Collection"
   - Description: "Collection of logo designs for various clients"
   - Images: Select `logo1.jpg`, `logo2.jpg`, `logo3.jpg` (Ctrl+Click)
3. Click "Create Design Project"
4. Wait for success message

**Step 3: Verify**
1. Go back to homepage (`/`)
2. Scroll to Projects section
3. Verify 2 new projects appear
4. Click design project → Modal with 3 images opens

**Step 4: Hide Admin Panel**
1. Comment out admin route in `App.tsx`
2. Commit & push to GitHub
3. Vercel auto-deploy
4. Admin panel tidak bisa diakses lagi

---

## 🎉 Done!

Setelah selesai upload semua projects:
1. ✅ Hide/delete admin panel
2. ✅ Commit & push ke GitHub
3. ✅ Vercel auto-deploy
4. ✅ Portfolio website ready dengan real projects!

---

**Need help?** Check console browser untuk error messages atau contact developer.
