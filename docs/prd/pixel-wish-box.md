# PRD: Pixel Wish Box

## Status Dokumen

- **Status:** Disetujui
- **Tanggal:** 3 Agustus 2026
- **Tanggal persetujuan:** 3 Agustus 2026
- **Pemilik produk:** Giftkuy.id
- **Sumber intent:** [`../intent/pixel-wish-box.md`](../intent/pixel-wish-box.md)

## 1. Ringkasan

Pixel Wish Box adalah produk hadiah digital pertama Giftkuy.id. Pelanggan memesan melalui WhatsApp dan memberikan materi personal kepada tim Giftkuy.id. Tim kemudian mengganti konfigurasi konten dan aset gambar pada satu template web, melakukan build, serta men-deploy halaman dengan URL unik untuk penerima.

Pengalaman dimulai dengan karakter pixel yang menyerupai pengirim sambil membawa kotak tertutup. Ketika kotak dibuka, penerima menemukan pesan personal dan empat foto kenangan yang dapat dijelajahi dengan santai.

Versi pertama berfokus pada validasi pengalaman emosional dan permintaan berbayar, bukan otomatisasi operasional.

## 2. Latar Belakang dan Masalah

Orang yang ingin memberikan hadiah digital sering mendapatkan produk yang terasa generik. Personalisasi yang lebih mendalam biasanya membutuhkan proses kreatif atau teknis yang rumit, sedangkan Giftkuy.id perlu membuktikan minat pasar sebelum membangun sistem pemesanan dan produksi otomatis.

Pixel Wish Box menjawab kebutuhan tersebut melalui satu template yang:

- terasa dibuat khusus untuk penerima;
- menampilkan representasi visual pengirim;
- menggabungkan pesan dan foto dalam pengalaman membuka hadiah;
- dapat diproduksi berulang kali oleh tim tanpa mengubah komponen atau layout.

## 3. Objective

### Tujuan Produk

Menghadirkan hadiah digital yang personal dan emosional sekaligus memungkinkan tim Giftkuy.id memproses pesanan awal secara manual dengan cepat dan konsisten.

### Pengguna

1. **Pelanggan/pengirim:** seseorang yang ingin memberikan kejutan digital kepada orang tersayang atau terdekatnya.
2. **Penerima:** seseorang yang membuka tautan hadiah dan menikmati pesan serta kenangan yang dikirimkan khusus untuknya.
3. **Operator Giftkuy.id:** anggota tim yang menerima materi, mengganti konfigurasi dan gambar, memeriksa hasil, lalu melakukan deployment.

### Tujuan Bisnis

- Mendapatkan beberapa pesanan berbayar pertama untuk memvalidasi konsep.
- Mengumpulkan bukti kualitatif bahwa penerima mengalami reaksi emosional positif.
- Membuktikan bahwa pelanggan menganggap hasilnya cukup personal untuk direkomendasikan atau dipesan kembali.
- Mengetahui apakah workflow manual cukup efisien sebelum membangun otomatisasi.

## 4. Prinsip Produk

Keputusan desain dan implementasi harus mengikuti urutan prioritas berikut:

1. **Terasa personal:** penerima harus mengenali bahwa karakter, pesan, dan foto berasal dari seseorang yang dekat dengannya.
2. **Membangun kejutan:** isi hadiah tidak langsung terlihat sebelum penerima membuka kotak.
3. **Mudah dinikmati:** alur singkat, jelas, santai, dan tidak membutuhkan instruksi panjang.
4. **Mudah diproduksi ulang:** satu pesanan baru tidak boleh mengharuskan perubahan komponen atau layout.
5. **Scope tetap kecil:** fitur otomatisasi ditunda sampai konsep tervalidasi.

## 5. User Journey

### Pelanggan dan Operator

1. Pelanggan menghubungi Giftkuy.id melalui WhatsApp.
2. Tim meminta dan menerima seluruh data serta aset yang dibutuhkan.
3. Tim menyiapkan dua gambar karakter pixel dan empat foto kenangan.
4. Tim mengganti seluruh teks melalui file di `constants` dan seluruh gambar melalui folder `public`.
5. Tim menjalankan aplikasi secara lokal dan memeriksa hasilnya pada viewport mobile dan desktop.
6. Tim menjalankan pemeriksaan kualitas serta production build.
7. Tim melakukan deployment manual ke URL unik.
8. Tim mengirimkan URL tersebut kepada pelanggan untuk diteruskan kepada penerima.

### Penerima

1. Penerima membuka tautan melalui browser, terutama dari perangkat mobile.
2. Penerima melihat karakter pixel yang menyerupai pengirim sedang membawa kotak tertutup.
3. Penerima memahami bahwa karakter atau kotak dapat ditekan tanpa memerlukan instruksi panjang.
4. Penerima menekan karakter atau kotak untuk membukanya.
5. Tampilan berubah ke karakter dengan kotak terbuka dan memperlihatkan panel hadiah.
6. Penerima membaca pesan personal dan menjelajahi empat foto kenangan dengan santai.

## 6. Ruang Lingkup Versi Pertama

### Termasuk

- Satu template visual Pixel Wish Box.
- Pengalaman web statis dan mobile-first.
- Dua keadaan karakter: membawa kotak tertutup dan kotak terbuka.
- Satu interaksi utama untuk membuka atau menutup kotak.
- Pesan personal yang berasal sepenuhnya dari konfigurasi.
- Galeri dengan tepat empat foto kenangan.
- Metadata halaman yang dapat dipersonalisasi melalui konfigurasi.
- Satu deployment dan URL unik untuk setiap pesanan.
- Workflow manual untuk penggantian konten, pemeriksaan, build, dan deployment.
- Tampilan responsif untuk mobile dan desktop modern.
- Akses tanpa akun atau autentikasi.

### Di Luar Scope

- Akun pelanggan atau penerima.
- Editor mandiri untuk pelanggan.
- Dashboard admin.
- Pembayaran otomatis.
- Form pemesanan di dalam aplikasi.
- Integrasi WhatsApp.
- Database, API, atau penyimpanan konten dari server.
- Deployment otomatis.
- Beberapa variasi template produk.
- Audio, video, atau animasi kompleks.
- Analytics dan pelacakan perilaku pengguna.
- Perlindungan tautan dengan login, PIN, atau kata sandi.

## 7. Persyaratan Fungsional

### FR-01 — Konfigurasi Konten Terpusat

- Seluruh teks yang berbeda untuk setiap pesanan harus berasal dari file di `constants`.
- Konfigurasi harus mencakup setidaknya identitas pengirim dan penerima, metadata halaman, judul pesan, serta isi pesan.
- Komponen tidak boleh berisi teks personal yang harus diedit untuk pesanan baru.
- Perubahan konfigurasi yang valid harus tercermin tanpa perubahan komponen.

### FR-02 — Aset Pesanan Terstandar

- Seluruh gambar yang berbeda untuk setiap pesanan harus berada di `public` dengan nama dan lokasi yang terdokumentasi serta konsisten.
- Setiap pesanan harus memiliki dua gambar karakter: keadaan kotak tertutup dan keadaan kotak terbuka.
- Setiap pesanan harus memiliki tepat empat foto kenangan.
- Setiap gambar harus memiliki deskripsi alternatif yang berasal dari konfigurasi atau teks generik yang bermakna.
- Ketidakhadiran aset wajib harus menyebabkan pemeriksaan kualitas atau build gagal, bukan menghasilkan halaman rusak yang siap di-deploy.

### FR-03 — Keadaan Awal Hadiah

- Saat halaman pertama kali dimuat, kotak harus berada dalam keadaan tertutup.
- Pesan dan foto tidak boleh terlihat sebelum interaksi membuka kotak.
- Karakter tertutup harus menjadi elemen visual utama.
- Kontrol membuka kotak harus dapat digunakan dengan pointer dan keyboard.

### FR-04 — Interaksi Membuka Kotak

- Satu aksi pada karakter atau kotak harus mengubah keadaan dari tertutup menjadi terbuka.
- Perubahan keadaan harus menampilkan gambar karakter dengan kotak terbuka dan panel hadiah.
- Pengguna harus dapat menutup kembali kotak tanpa memuat ulang halaman.
- Interaksi tidak boleh memicu navigasi atau membutuhkan koneksi ke layanan eksternal.

### FR-05 — Panel Pesan

- Panel harus menampilkan identitas atau sapaan penerima, judul pesan, isi pesan, dan identitas pengirim.
- Konten harus tetap terbaca tanpa terpotong atau keluar dari panel pada ukuran layar yang didukung.
- Urutan baca harus logis bagi pengguna keyboard dan pembaca layar.

### FR-06 — Galeri Kenangan

- Panel harus menampilkan tepat empat foto kenangan.
- Foto harus menjaga rasio visual tanpa distorsi.
- Foto dapat dilihat dengan jelas pada mobile dan desktop tanpa memerlukan zoom browser.
- Layout tidak boleh rusak ketika foto menggunakan orientasi portrait atau landscape yang berbeda.

### FR-07 — Metadata dan Identitas Produk

- Judul dan deskripsi halaman harus berasal dari konfigurasi.
- Halaman harus mempertahankan identitas Pixel Wish Box dan Giftkuy.id tanpa mengurangi kesan personal.
- Tidak boleh ada data contoh atau identitas pelanggan sebelumnya setelah konfigurasi pesanan diganti.

### FR-08 — URL dan Privasi Dasar

- Setiap pesanan harus di-deploy ke URL unik yang tidak dipublikasikan oleh Giftkuy.id.
- Halaman tidak membutuhkan autentikasi.
- Pelanggan harus diberi tahu bahwa siapa pun yang memiliki URL dapat membuka hadiah.
- URL unik bukan jaminan keamanan untuk materi yang sangat sensitif.

## 8. Persyaratan Nonfungsional

### Responsivitas

- Pengalaman harus berfungsi mulai lebar viewport 320 px hingga desktop modern.
- Tidak boleh ada horizontal scrolling pada ukuran layar yang didukung.
- Konten utama harus tetap dapat diakses saat tinggi viewport terbatas.

### Aksesibilitas

- Seluruh interaksi utama dapat dijalankan dengan keyboard.
- Fokus keyboard terlihat jelas.
- Gambar bermakna memiliki teks alternatif.
- Teks dan kontrol memenuhi kontras minimum WCAG 2.2 AA.
- Animasi menghormati preferensi `prefers-reduced-motion`.

### Performa

- Production build tidak menghasilkan error.
- Gambar menggunakan optimasi yang tersedia pada Next.js dan ukuran sumber yang wajar.
- Halaman awal tidak mengunduh aset media di luar gambar yang dibutuhkan produk.
- Tidak ada request runtime ke database, API, analytics, atau layanan eksternal.

### Kompatibilitas

- Mendukung versi stabil terbaru Chrome, Safari, Edge, dan Firefox pada saat deployment.
- Pengalaman inti tetap berfungsi pada browser mobile berbasis Chromium dan Safari.

### Keandalan Konten

- Semua konfigurasi dan aset wajib divalidasi sebelum deployment.
- Satu pesanan tidak boleh menyisakan nama, pesan, metadata, atau foto dari pesanan lain.

## 9. Kontrak Konten Operasional

Setiap pesanan wajib menyediakan:

| Kelompok  | Data wajib                                     |
| --------- | ---------------------------------------------- |
| Identitas | Nama atau panggilan pengirim dan penerima      |
| Metadata  | Judul dan deskripsi halaman                    |
| Pesan     | Sapaan/judul dan isi pesan personal            |
| Karakter  | Gambar kotak tertutup dan gambar kotak terbuka |
| Kenangan  | Empat foto beserta deskripsi alternatif        |

Aturan operasional:

- Field, jumlah gambar, nama file, dan struktur folder tetap sama untuk semua pesanan.
- Konten harus diperiksa agar tidak mengandung salah ketik atau materi milik pelanggan lain.
- Konten yang terlalu panjang harus dikembalikan untuk disesuaikan, bukan diatasi dengan perubahan layout per pesanan.
- Spesifikasi batas panjang teks harus ditetapkan pada fase plan berdasarkan pengujian layout template.

## 10. Target Operasional

- Penggantian konfigurasi dan gambar untuk satu pesanan selesai dalam maksimal **30 menit**.
- Target 30 menit tidak mencakup pembuatan dua aset karakter atau proses deployment.
- Operator yang memahami struktur repository dapat memproses pesanan menggunakan panduan tertulis tanpa meminta perubahan kode.
- Pemeriksaan harus mencegah deployment jika data atau salah satu dari enam gambar wajib belum tersedia.

## 11. Tech Stack

Versi mengikuti `package.json` saat PRD ini ditulis:

- Next.js 16.2.6 dengan App Router
- React dan React DOM 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Pixelarticons 2.1.0
- pnpm sebagai package manager berdasarkan `pnpm-lock.yaml`
- ESLint 9 dan Prettier 3.8.3 untuk kualitas kode

Versi pertama tidak membutuhkan dependency runtime tambahan kecuali disetujui terlebih dahulu.

## 12. Commands

Jalankan dari root repository:

| Tujuan             | Perintah                         |
| ------------------ | -------------------------------- |
| Install dependency | `pnpm install --frozen-lockfile` |
| Development        | `pnpm dev`                       |
| Production build   | `pnpm build`                     |
| Menjalankan build  | `pnpm start`                     |
| Lint               | `pnpm lint`                      |
| Pemeriksaan format | `pnpm format:check`              |
| Format file        | `pnpm format`                    |
| Type check         | `pnpm exec tsc --noEmit`         |

Belum ada perintah test otomatis pada `package.json`. Penambahan test runner harus disetujui sebelum implementasi.

## 13. Project Structure

```text
app/                 Halaman, layout, metadata, dan global styles
components/          Komponen pengalaman Pixel Wish Box
constants/           Seluruh konfigurasi yang diganti per pesanan
public/              Dua gambar karakter dan empat foto kenangan
docs/intent/         Pernyataan intent produk yang telah dikonfirmasi
docs/prd/            Product Requirements Document
```

Komponen tidak boleh membaca data personal dari lokasi selain `constants`, dan aset personal tidak boleh ditempatkan di luar `public`.

## 14. Code Style

- Gunakan TypeScript dan komponen React berbentuk function.
- Gunakan `PascalCase` untuk nama komponen, `camelCase` untuk variabel dan fungsi, serta nama konfigurasi yang menjelaskan maknanya.
- Gunakan alias `@/` untuk import internal.
- Gunakan double quotes dan format Prettier yang dikonfigurasi repository.
- Utamakan semantic HTML dan elemen interaktif native.
- Pisahkan data pesanan dari markup presentasi.

Contoh arah kontrak konfigurasi, bukan keputusan implementasi final:

```ts
export const wishBoxContent = {
  senderName: "Nama Pengirim",
  recipientName: "Nama Penerima",
  message: {
    title: "Untukmu",
    body: ["Paragraf pertama.", "Paragraf kedua."],
  },
  memories: [{ src: "/memories/01.jpg", alt: "Deskripsi kenangan pertama" }],
} as const;
```

Implementasi akhir harus menjamin tepat empat item `memories` tanpa meminta operator mengubah komponen.

## 15. Testing Strategy

### Pemeriksaan Otomatis Wajib

- Lint seluruh source code.
- Type-check tanpa menghasilkan output.
- Periksa format.
- Jalankan production build.
- Validasi keberadaan seluruh field konfigurasi dan enam gambar wajib.

### Pengujian Komponen/Integrasi

Test runner belum tersedia dan pemilihannya memerlukan persetujuan. Setelah tersedia, pengujian minimal harus membuktikan bahwa:

- keadaan awal adalah kotak tertutup;
- aksi pointer dan keyboard membuka kotak;
- aksi berikutnya dapat menutup kotak;
- panel pesan dan empat foto muncul hanya saat kotak terbuka;
- konfigurasi yang tidak lengkap ditolak.

### Pemeriksaan Browser Manual

Sebelum setiap deployment:

- uji viewport mobile 320 px dan 390 px;
- uji satu viewport desktop minimal 1280 px;
- uji Chrome dan Safari jika perangkat tersedia;
- uji navigasi keyboard dan fokus yang terlihat;
- uji dengan `prefers-reduced-motion`;
- pastikan portrait dan landscape photos tidak merusak layout;
- pastikan tidak ada data dari pesanan sebelumnya.

Tidak ada target coverage numerik pada versi pertama. Cakupan diprioritaskan pada alur membuka hadiah dan validasi konfigurasi.

## 16. Boundaries

### Selalu Dilakukan

- Mengikuti dokumentasi yang tersedia di `node_modules/next/dist/docs/` sebelum mengubah kode Next.js.
- Menjaga seluruh personalisasi di `constants` dan `public`.
- Memvalidasi field serta aset wajib sebelum deployment.
- Menjalankan lint, type-check, format check, dan production build.
- Memeriksa tampilan mobile dan desktop.
- Menghapus seluruh data pesanan sebelumnya dari deployment baru.
- Menjaga teks alternatif dan akses keyboard untuk interaksi utama.

### Minta Persetujuan Terlebih Dahulu

- Menambah atau mengganti dependency.
- Mengubah jumlah foto atau struktur konten.
- Mengubah layout atau alur inti membuka kotak.
- Menambah database, API, analytics, atau integrasi eksternal.
- Mengubah strategi hosting, domain, atau deployment.
- Menambah test runner atau konfigurasi CI.

### Tidak Pernah Dilakukan

- Menyimpan secret, credential, atau token di repository.
- Menyimpan materi pelanggan di luar lokasi aset dan konfigurasi yang ditentukan.
- Mengedit `node_modules` atau file hasil build.
- Men-deploy halaman dengan placeholder, aset hilang, atau data pelanggan sebelumnya.
- Mengklaim URL unik sebagai mekanisme keamanan untuk konten sensitif.
- Menambahkan fitur di luar scope tanpa memperbarui dan menyetujui PRD terlebih dahulu.

## 17. Success Criteria dan Acceptance Criteria

Versi pertama dianggap memenuhi PRD apabila seluruh kondisi berikut terpenuhi:

1. Penerima dapat membuka URL unik pada browser mobile tanpa login.
2. Halaman pertama menampilkan karakter dengan kotak tertutup dan menyembunyikan pesan serta foto.
3. Interaksi pointer maupun keyboard membuka kotak dan menampilkan karakter terbuka, pesan personal, serta tepat empat foto.
4. Penerima dapat menutup kembali kotak tanpa reload.
5. Layout tidak mengalami horizontal overflow pada viewport 320 px, 390 px, dan 1280 px.
6. Teks, fokus, alternative text, dan reduced motion memenuhi persyaratan aksesibilitas pada bagian 8.
7. Tim dapat membuat satu pesanan baru hanya dengan mengganti data di `constants` dan gambar di `public`.
8. Penggantian tersebut selesai maksimal 30 menit, di luar pembuatan karakter dan deployment.
9. Konfigurasi atau aset wajib yang hilang terdeteksi sebelum deployment.
10. Lint, type-check, format check, dan production build selesai tanpa error.
11. Halaman yang siap dikirim tidak mengandung data, gambar, atau metadata milik pesanan sebelumnya.
12. Beberapa pesanan berbayar pertama menghasilkan umpan balik kualitatif mengenai reaksi penerima dan kemauan pelanggan untuk merekomendasikan atau memesan kembali.

## 18. Risiko dan Mitigasi Produk

| Risiko                                      | Dampak                                             | Mitigasi versi pertama                                                        |
| ------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| Konten terlalu panjang merusak layout       | Pengalaman terlihat tidak rapi dan proses melambat | Tetapkan batas konten dari hasil uji layout dan validasi sebelum build        |
| Foto dengan rasio berbeda merusak komposisi | Kenangan sulit dilihat atau terpotong buruk        | Gunakan container konsisten dan aturan crop yang diuji                        |
| Data pelanggan lama tertinggal              | Pelanggaran privasi dan kepercayaan                | Checklist per pesanan serta validasi string/aset placeholder                  |
| URL diteruskan ke pihak lain                | Materi personal dapat dilihat orang lain           | Jelaskan model privasi URL kepada pelanggan dan hindari konten sensitif       |
| Pembuatan karakter memakan waktu            | Lead time pesanan meningkat                        | Pisahkan metrik waktu pembuatan karakter dari target penggantian template     |
| Operator perlu mengubah komponen            | Workflow tidak dapat diulang dengan konsisten      | Jadikan kebutuhan baru sebagai perubahan template, bukan pengecualian pesanan |

## 19. Metrik Validasi Awal

Karena analytics berada di luar scope, data dikumpulkan secara manual melalui percakapan WhatsApp atau follow-up pelanggan:

- jumlah pesanan berbayar yang selesai;
- waktu penggantian konten per pesanan;
- apakah penerima menunjukkan reaksi emosional positif menurut pelanggan;
- apakah pelanggan bersedia merekomendasikan produk;
- apakah pelanggan berminat memesan kembali;
- masalah produksi atau tampilan yang terjadi per pesanan.

Tidak ada target volume numerik selain memperoleh beberapa pesanan berbayar pertama. Target kuantitatif baru ditetapkan setelah data awal tersedia.

## 20. Open Questions

Tidak ada pertanyaan yang menghalangi persetujuan PRD. Batas panjang teks dan aturan dimensi/ukuran file gambar akan ditentukan pada fase plan melalui pengujian layout, lalu ditambahkan ke dokumen ini sebelum implementasi dianggap selesai.
