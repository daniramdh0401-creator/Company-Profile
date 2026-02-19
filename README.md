# Dany Ramadhan — Personal Branding Website

Company profile & personal branding untuk **Dany Ramadhan** sebagai **Junior Full Stack Developer**. Desain modern, futuristik, clean, dan premium (2026).

## 🎯 Tujuan

- Membangun personal branding profesional  
- Menampilkan portfolio project skala enterprise  
- Menarik klien corporate & startup  
- Menampilkan skill full-stack & system architecture  

## 🛠 Tech Stack

- **HTML5** — semantic markup  
- **Tailwind CSS** — via CDN (custom theme: primary `#00F5FF`, secondary `#6366F1`, background `#0B0F19`)  
- **AOS** — scroll animations  
- **Vanilla JS** — typing effect, scroll progress bar, mobile menu  

## 📁 Struktur Project

```
dany/
├── index.html          # Halaman utama (semua section)
├── css/
│   └── style.css       # Glassmorphism, particle bg, custom animations
├── js/
│   └── main.js         # Typing, scroll progress, navbar, mobile menu, AOS
└── README.md           # Dokumentasi & deploy
```

## ⚙️ Sebelum Deploy

1. **WhatsApp**  
   Ganti `628xxxxxxxxxx` di `index.html` dengan nomor Anda (format: 62xxx tanpa +).  
   Cari: `wa.me/628xxxxxxxxxx` dan `href="https://wa.me/628xxxxxxxxxx"`.

2. **Email**  
   Ganti `dany@example.com` di section Contact dengan email Anda.

3. **LinkedIn & GitHub**  
   Sesuaikan URL:
   - `https://linkedin.com/in/danyramadhan`
   - `https://github.com/danyramadhan`

## 🚀 Deploy ke Vercel

1. Push project ke GitHub (atau GitLab/Bitbucket).
2. Buka [vercel.com](https://vercel.com) → Login → **Add New Project**.
3. Import repository yang berisi folder ini (atau repo dengan `index.html` di root).
4. **Root Directory**: kosongkan atau set ke folder yang berisi `index.html`.
5. **Build Command**: kosongkan (static site).
6. **Output Directory**: kosongkan atau `.`
7. Klik **Deploy**.  
   Vercel akan serve `index.html` sebagai static site.

**Via Vercel CLI:**

```bash
npm i -g vercel
cd dany
vercel
```

Ikuti prompt; production URL akan diberikan setelah deploy.

## 🌐 Deploy ke Netlify

1. Push project ke GitHub.
2. Buka [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
3. Pilih Git provider & repository.
4. **Build settings**:
   - Build command: *(kosongkan)*
   - Publish directory: `/` atau folder yang berisi `index.html`
5. Klik **Deploy site**.

**Drag & drop:**  
Buka [app.netlify.com/drop](https://app.netlify.com/drop), drag folder yang berisi `index.html`, `css/`, `js/`.

## 📈 SEO Dasar

Sudah diset di `index.html`:

- `<title>` dan meta **description** dengan keyword relevan  
- Meta **keywords**, **author**, **robots**  
- **Open Graph** (og:title, og:description, og:type) untuk share sosial  
- **theme-color** untuk browser UI  
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)  
- Heading hierarchy (satu `h1` di hero, lalu `h2` per section)  

Setelah online, disarankan:

- Daftar di **Google Search Console** dan **Bing Webmaster**.  
- Tambah **sitemap.xml** jika nanti ada banyak halaman.  
- Gunakan **canonical URL** di `<head>` jika ada duplikat URL.

## 🎨 Fitur Bonus yang Tersedia

- Typing effect di hero (rotating phrases)  
- Background particle-style (CSS gradient + orbs)  
- Scroll progress bar di atas halaman  
- Floating WhatsApp button  
- Meta tag SEO lengkap  
- Responsive & mobile-first  

## 📱 Responsive

Layout mengikuti mobile-first; breakpoints mengandalkan Tailwind (`sm`, `md`, `lg`).  
Diuji untuk desktop, tablet, dan mobile.

## 📄 Lisensi

© 2026 Dany Ramadhan. Untuk penggunaan pribadi dan portfolio.
