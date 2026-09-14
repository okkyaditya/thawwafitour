# Thawwafi Tour — Website & CMS

Website resmi [Thawwafi Tour](https://thawwafi.com) — penyedia paket perjalanan Umroh & Haji. Dibangun dengan **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS 4**, dan **Payload CMS 3** dengan database **SQLite**.

## Fitur

- 🕋 Landing page dengan hero, carousel paket, fasilitas, partner, dan testimoni
- 📦 Halaman daftar & detail paket perjalanan (`/paket`)
- ✍️ Blog dengan artikel dinamis (`/blog`)
- 📞 Halaman kontak & tentang kami
- ⚙️ Admin panel Payload CMS di `/admin` untuk mengelola semua konten
- 🔍 SEO siap pakai: `robots.txt` & `sitemap.xml` dinamis, plus `llms.txt`

## Teknologi

| Teknologi | Keterangan |
| --- | --- |
| [Next.js 15](https://nextjs.org) | Framework React dengan App Router |
| [Payload CMS 3](https://payloadcms.com) | Headless CMS terintegrasi (admin panel + API) |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [SQLite](https://sqlite.org) | Database (via `@payloadcms/db-sqlite`) |
| [Motion](https://motion.dev) & [Lucide](https://lucide.dev) | Animasi & ikon |

## Struktur Konten (Collections Payload)

- **Packages** — paket perjalanan (umroh/haji)
- **Posts** — artikel blog
- **Ustadz** — data pembimbing
- **Testimonials** — testimoni jamaah
- **Gallery** — galeri foto
- **SiteSettings** — pengaturan global situs
- **Users** — akun admin
- **Media** — manajemen gambar/file

## Mulai Cepat

**Prasyarat:** Node.js 20+, npm

```bash
# 1. Install dependencies
npm install

# 2. Siapkan environment variables
cp .env.example .env.local
#    → isi PAYLOAD_SECRET dengan string acak yang panjang

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk website, dan [http://localhost:3000/admin](http://localhost:3000/admin) untuk admin panel (buat user admin saat pertama kali akses).

## Environment Variables

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `PAYLOAD_SECRET` | ✅ | Secret untuk enkripsi sesi Payload. Wajib diisi. |
| `DATABASE_URI` | — | Koneksi database. Default: `file:./thawwafi.db` |
| `NEXT_PUBLIC_SERVER_URL` | — | URL server Payload. Default: `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL` / `BASE_URL` | — | URL publik situs (untuk metadata & sitemap) |

> ⚠️ Jangan pernah commit `.env*` atau file database (`.db`) — semuanya sudah di-ignore oleh `.gitignore`.

## Scripts

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Build produksi |
| `npm run start` | Jalankan server produksi |
| `npm run lint` | ESLint |
| `npm run seed` | Seed data awal (lokal) |

## Deployment

Saat deploy (mis. Vercel), pastikan:

1. Set `PAYLOAD_SECRET` di environment variables hosting.
2. SQLite lokal bersifat ephemeral di serverless — untuk produksi gunakan database persisten (mis. Postgres via `@payloadcms/db-postgres`) atau storage persisten untuk database & media.
3. Set `NEXT_PUBLIC_SITE_URL` / `BASE_URL` ke domain produksi.

## Keamanan

Jika ada secret terekspos, segera rotasi. Jangan pernah menyertakan kredensial, database produksi, atau media berisi informasi pribadi dalam commit.

## License

Private project. All rights reserved unless otherwise specified.
