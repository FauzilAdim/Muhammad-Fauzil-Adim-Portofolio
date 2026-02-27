# Setup Views & Likes Feature

## Database Setup (Supabase)

Jalankan SQL scripts berikut di Supabase SQL Editor secara berurutan:

### 1. Setup Tables & Columns
Jalankan file: `setup_views_likes.sql`

Script ini akan:
- Menambahkan kolom `views` dan `likes` ke tabel `design_projects`
- Membuat tabel `design_likes` untuk tracking likes berdasarkan IP
- Membuat indexes untuk performa
- Setup RLS policies untuk akses public

### 2. Setup RPC Functions
Jalankan file: `setup_rpc_functions.sql`

Script ini akan membuat 2 functions:
- `increment_likes(design_id)` - Untuk increment like count
- `decrement_likes(design_id)` - Untuk decrement like count

## API Routes

3 API routes sudah dibuat di folder `api/`:

1. **POST /api/view** - Increment view count
   - Body: `{ designId: string }`
   - Response: `{ success: boolean, views: number }`

2. **POST /api/like** - Toggle like (add/remove)
   - Body: `{ designId: string }`
   - Response: `{ success: boolean, liked: boolean, message: string }`
   - Menggunakan IP address untuk tracking

3. **GET /api/like-status** - Check like status
   - Query: `?designId=xxx`
   - Response: `{ success: boolean, liked: boolean }`

## How It Works

### View Count
- Setiap kali user membuka modal design, otomatis increment view count
- Tidak ada tracking user, langsung +1 setiap modal dibuka
- View count ditampilkan di sidebar modal

### Like System
- User bisa like/unlike design
- Tracking berdasarkan IP address (prevent spam dari IP yang sama)
- Like status tersimpan di tabel `design_likes`
- Like count ditampilkan di sidebar modal
- Heart icon berubah warna merah ketika sudah liked

## Environment Variables

Pastikan environment variables sudah di-set di Vercel:
- `SUPABASE_URL` (tanpa prefix VITE_)
- `SUPABASE_ANON_KEY` (tanpa prefix VITE_)

## Testing

1. Deploy ke Vercel
2. Buka design modal
3. View count akan otomatis +1
4. Klik heart icon untuk like
5. Refresh page, like status tetap tersimpan (berdasarkan IP)
6. Klik lagi untuk unlike

## Notes

- View count tidak bisa di-reset oleh user (hanya increment)
- Like bisa di-toggle (like/unlike)
- IP tracking mencegah spam dari IP yang sama
- Jika user ganti IP/network, bisa like lagi (ini normal behavior)
