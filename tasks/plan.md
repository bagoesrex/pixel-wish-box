# Implementation Plan: Pixel Wish Box v1

## Status

- **Status:** Disetujui
- **Tanggal:** 3 Agustus 2026
- **Tanggal persetujuan:** 3 Agustus 2026
- **PRD:** [`../docs/prd/pixel-wish-box.md`](../docs/prd/pixel-wish-box.md)
- **Scope fase:** Plan saja; `tasks/todo.md` dibuat pada fase Tasks setelah plan ini disetujui.

## 1. Overview

Plan ini mengubah prototype Pixel Wish Box menjadi satu template produksi yang personal, responsif, dapat diakses, dan dapat diproses ulang oleh tim Giftkuy.id tanpa mengubah komponen. Implementasi mempertahankan alur yang sudah ada—karakter dengan kotak tertutup, interaksi membuka kotak, lalu pesan dan empat foto—sambil memusatkan data pesanan di `constants`, menstandardisasi aset di `public/images`, serta membuat build gagal ketika konten atau aset wajib belum lengkap.

Plan tidak mencakup akun, database, pembayaran, dashboard, integrasi WhatsApp, analytics, atau deployment otomatis.

## 2. Baseline dan Temuan Current Project

### Stack Terdeteksi

- Next.js 16.2.6 dengan App Router
- React dan React DOM 19.2.4
- TypeScript 5 dalam strict mode
- Tailwind CSS 4
- Pixelarticons 2.1.0
- Node.js lokal 22.12.0; Next.js 16.2.6 mensyaratkan Node.js minimal 20.9.0
- pnpm 10.12.4

### Kondisi Prototype

- `app/page.tsx` sudah memiliki state buka/tutup dan dua gambar karakter.
- Seluruh halaman saat ini menjadi Client Component meskipun hanya toggle yang memerlukan state.
- Target klik masih berupa `<div>` sehingga belum dapat dioperasikan dengan keyboard secara native.
- `components/WishBoxPanel.tsx` masih berisi teks personal hard-coded.
- Empat pemanggilan `next/image` pada panel belum memiliki props wajib dan belum terhubung ke aset.
- Metadata masih hard-coded, deskripsi kosong, dan bahasa dokumen masih `en`.
- Layout panel berorientasi desktop, memakai tinggi viewport tetap, dan belum aman untuk layar 320 px atau konten panjang.
- Belum ada validasi konfigurasi, validasi aset, test runner, atau empat foto kenangan.
- Worktree sudah memiliki perubahan aplikasi milik pengguna; implementasi harus melanjutkan perubahan tersebut, bukan mengembalikannya ke versi `HEAD`.

### Aset Saat Ini

| Aset                    |  Dimensi | Catatan                   |
| ----------------------- | -------: | ------------------------- |
| `main-background.png`   | 1672×941 | Background utama          |
| `person-closed-box.png` |  744×970 | Karakter keadaan tertutup |
| `person-opened-box.png` |  744×970 | Karakter keadaan terbuka  |

Kedua gambar karakter sudah memiliki dimensi dan rasio yang sama. Empat foto kenangan belum tersedia dan menjadi input wajib sebelum checkpoint galeri.

## 3. Dokumentasi Resmi yang Menjadi Dasar

Plan menggunakan dokumentasi lokal yang dikirim bersama Next.js 16.2.6 di `node_modules/next/dist/docs/` dan tautan resminya:

- Server dan Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Image optimization: https://nextjs.org/docs/app/getting-started/images
- Metadata dan OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Deployment modes: https://nextjs.org/docs/app/getting-started/deploying
- Vitest dengan Next.js: https://nextjs.org/docs/app/guides/testing/vitest

Implikasi yang digunakan dalam plan:

- Page dan layout tetap Server Components secara default; hanya subtree yang membutuhkan state dan event handler diberi batas `"use client"`.
- Data dari Server Component ke Client Component harus serializable.
- Gambar dari `public` menggunakan path string dan `next/image`; penggunaan `fill` harus memiliki parent berukuran dan `sizes` yang sesuai.
- Metadata statis diekspor dari Server Component melalui objek `Metadata`.
- Strategi deployment tidak diubah dalam scope ini; script `build` dan `start` yang ada tetap kompatibel dengan deployment Node.js.
- Vitest dipakai hanya untuk pure logic serta komponen sinkron; browser verification menangani pengalaman end-to-end.

## 4. Architecture Decisions

### AD-01 — Server Page dengan Client Boundary yang Sempit

`app/page.tsx` menjadi Server Component dan merender `WishBoxExperience`. Hanya `WishBoxExperience` yang memakai `"use client"` untuk state buka/tutup dan event handler.

**Alasan:** mengurangi area JavaScript client, menjaga metadata dan validasi pada sisi build/server, serta mengikuti model komposisi Next.js 16.2.6.

### AD-02 — Satu Konfigurasi Pesanan Bertipe

Seluruh data pesanan ditempatkan pada `constants/wish-box.ts` sebagai objek `wishBoxContent` yang memenuhi tipe `WishBoxContent`. `app/page.tsx` memvalidasi objek tersebut lalu mengirim data serializable sebagai props.

Kontrak mencakup:

- metadata halaman;
- nama pengirim dan penerima;
- judul serta paragraf pesan;
- dua path karakter;
- tepat empat item kenangan dengan `src` dan `alt`.

**Alasan:** operator hanya mengubah satu file konten, TypeScript menangkap perubahan struktur, dan komponen bebas dari data personal.

### AD-03 — Validasi Dua Lapis Tanpa Runtime Dependency

1. TypeScript dan pure validation memastikan shape, jumlah foto, field wajib, dan batas panjang teks.
2. Script Node.js memastikan file gambar wajib tersedia, tidak kosong, memakai ekstensi yang diizinkan, dan tidak melewati batas ukuran file.

Perintah `pnpm validate:order` dijalankan sebelum `next build`; script `build` diubah agar validasi tidak dapat terlewati secara tidak sengaja.

**Alasan:** kesalahan operator harus berhenti sebelum deployment tanpa menambahkan schema library ke runtime.

### AD-04 — Struktur Aset Tetap

```text
public/images/background.png
public/images/character/closed.png
public/images/character/open.png
public/images/memories/01.jpg
public/images/memories/02.jpg
public/images/memories/03.jpg
public/images/memories/04.jpg
```

Ekstensi foto dapat ditetapkan ke `.jpg`, `.jpeg`, `.png`, atau `.webp` melalui konfigurasi, tetapi jumlah dan slot tetap empat. Dua karakter wajib memiliki dimensi dan rasio yang sama; pemeriksaan ini dilakukan dalam checklist operator jika validator tidak membaca dimensi gambar.

**Alasan:** nama dan lokasi stabil mempercepat proses manual serta mengurangi risiko membawa aset pesanan sebelumnya.

### AD-05 — Komponen Interaktif Menggunakan Semantik Native

Karakter/kotak dibungkus `<button type="button">` dengan accessible name, `aria-expanded`, dan `aria-controls`. Panel menggunakan landmark/region dengan heading yang terhubung.

**Alasan:** pointer, keyboard, dan screen reader memperoleh perilaku yang konsisten tanpa meniru button melalui JavaScript.

### AD-06 — Galeri Tetap Empat Slot dengan Crop Konsisten

Setiap foto memakai container berasio tetap, `next/image` dengan `fill`, `sizes`, dan `object-cover`. Foto pertama menjadi visual utama; tiga foto lain menjadi grid pendamping pada desktop dan tetap mudah dilihat pada mobile.

**Alasan:** layout stabil untuk kombinasi portrait dan landscape tanpa mengubah komponen per pesanan.

### AD-07 — Layout Mobile-first dan Scroll Aman

Pada mobile, karakter tetap menjadi pembuka dan panel hadiah menjadi area yang dapat discroll setelah dibuka. Pada desktop, karakter dan panel dapat tampil berdampingan. Halaman tidak mengunci seluruh konten dengan `overflow-hidden` ketika panel terbuka.

**Alasan:** `100svh` dan panel tinggi tetap saat ini berisiko memotong pesan pada layar pendek.

### AD-08 — Metadata Berasal dari Konfigurasi

`app/layout.tsx` tetap Server Component dan mengekspor `Metadata` dari konfigurasi. Bahasa dokumen diubah ke `id`. Tidak ada metadata dinamis, fetch, atau runtime service.

**Alasan:** setiap deployment mendapat judul/deskripsi personal tanpa API dan tetap dapat diprerender saat build.

## 5. Kontrak Konten yang Direncanakan

Batas berikut bersifat provisional dan harus dikalibrasi melalui stress fixture pada checkpoint foundation:

| Field                             | Aturan awal                                                    |
| --------------------------------- | -------------------------------------------------------------- |
| `senderName`                      | 1–40 karakter                                                  |
| `recipientName`                   | 1–40 karakter                                                  |
| `metadata.title`                  | 1–60 karakter                                                  |
| `metadata.description`            | 1–160 karakter                                                 |
| `message.title`                   | 1–60 karakter                                                  |
| `message.body`                    | 1–3 paragraf; maksimal 240 karakter per paragraf dan 600 total |
| `character.closedAlt` / `openAlt` | 1–120 karakter                                                 |
| `memories`                        | Tepat empat item                                               |
| `memories[].alt`                  | 1–120 karakter                                                 |

Aturan aset awal:

- ekstensi: `.jpg`, `.jpeg`, `.png`, atau `.webp`;
- setiap file wajib lebih besar dari 0 byte;
- batas ukuran per gambar: 5 MB;
- dua gambar karakter harus memakai dimensi yang sama;
- operator mengompresi aset sebelum build jika melampaui batas;
- hanya gambar karakter tertutup yang diberi prioritas load; gambar panel tetap lazy-loaded sampai mendekati viewport.

Jika stress test menunjukkan layout tidak stabil, batas diperketat dan PRD bagian kontrak konten diperbarui sebelum core UI dinyatakan selesai.

## 6. Dependency Graph

```text
Persetujuan plan dan test tooling
        |
        v
Kontrak konten bertipe -----> Validasi konten
        |                          |
        v                          v
Struktur aset tetap --------> Validasi aset/build gate
        |
        +-------------> Metadata dari konfigurasi
        |
        v
Server page + client boundary
        |
        v
Accessible open/close interaction
        |
        v
Panel pesan responsif
        |
        v
Galeri empat foto
        |
        v
Stress test + browser QA
        |
        v
Panduan operator + final release gate
```

Urutan implementasi mengikuti graph tersebut. Kontrak data dan validasi dibangun lebih dulu karena metadata, interaksi, panel, galeri, serta workflow operator bergantung kepadanya.

## 7. Work Packages

Work packages di bawah ini adalah unit perencanaan. Checklist executable dengan acceptance criteria final akan dibuat di `tasks/todo.md` pada fase Tasks setelah plan disetujui.

### WP-01 — Test Harness dan Quality Commands

**Outcome:** project memiliki test command yang dapat dijalankan sekali di CI/local, tanpa watch mode.

**Rencana:** mengikuti panduan resmi Next.js untuk menambahkan Vitest, React Testing Library, jsdom, plugin React, dan tsconfig paths sebagai dev dependencies. Tambahkan `test` dan `test:watch` scripts.

**Acceptance:** test smoke sinkron berjalan; `pnpm test`, lint, type-check, format check, dan build memiliki perintah yang eksplisit.

**Verification:** `pnpm test -- --run`, `pnpm lint`, `pnpm exec tsc --noEmit`.

**Dependencies:** persetujuan eksplisit untuk penambahan dev dependencies.

**Files likely touched:** `package.json`, `pnpm-lock.yaml`, `vitest.config.mts`, `tests/setup.ts`.

**Scope:** Medium, 4 files.

### WP-02 — Kontrak dan Validasi Konten

**Outcome:** seluruh personalisasi berada pada satu object bertipe dan data tidak valid ditolak.

**Rencana:** definisikan tipe fixed tuple untuk empat foto, pure validator untuk nilai kosong dan batas teks, serta tests untuk konfigurasi valid dan invalid.

**Acceptance:** tepat empat memories diwajibkan; empty/oversized fields menghasilkan error yang menunjuk field; tidak ada teks personal di komponen.

**Verification:** focused unit tests, type-check, dan negative fixture.

**Dependencies:** WP-01.

**Files likely touched:** `constants/wish-box.ts`, `lib/validate-wish-box-content.ts`, `tests/validate-wish-box-content.test.ts`.

**Scope:** Medium, 3 files.

### WP-03 — Struktur Aset dan Build Gate

**Outcome:** satu struktur gambar konsisten dan build berhenti saat aset wajib tidak aman untuk dipakai.

**Rencana:** pindahkan aset existing ke struktur standar, tambahkan empat foto pesanan, buat validator aset Node.js, dan hubungkan `validate:order` ke `build`.

**Acceptance:** missing/empty/unsupported/oversized asset gagal dengan pesan actionable; seluruh path konfigurasi sesuai aset; dua karakter tetap memiliki rasio yang sama.

**Verification:** jalankan validator pada fixture valid lalu controlled negative check; jalankan production build.

**Dependencies:** WP-02 dan empat foto kenangan dari pengguna/tim Giftkuy.id.

**Files likely touched:** `public/images/**`, `scripts/validate-order-assets.mjs`, `package.json`, `tests/validate-order-assets.test.ts`.

**Scope:** Medium secara logika; perpindahan aset bersifat mekanis.

### Checkpoint A — Foundation

- Semua test foundation lulus.
- Konfigurasi valid dan invalid memberikan hasil deterministik.
- Build ditolak jika satu dari enam gambar personal hilang.
- Batas teks diuji dengan stress fixture dan disesuaikan bila perlu.
- PRD diperbarui jika batas provisional berubah.
- Review manusia sebelum masuk ke UI core.

### WP-04 — Server/Client Composition dan Metadata

**Outcome:** page/layout tetap server-rendered dan hanya pengalaman toggle yang dikirim sebagai Client Component.

**Rencana:** pindahkan state dari `app/page.tsx` ke `WishBoxExperience`, pass validated serializable content sebagai props, dan gunakan konfigurasi pada metadata serta document language.

**Acceptance:** `app/page.tsx` tidak memiliki `"use client"`; metadata mengikuti constants; tidak ada fetch atau runtime API.

**Verification:** type-check, production build, inspeksi output metadata di browser.

**Dependencies:** WP-02 dan WP-03.

**Files likely touched:** `app/page.tsx`, `app/layout.tsx`, `components/WishBoxExperience.tsx`, `tests/wish-box-experience.test.tsx`.

**Scope:** Medium, 4 files.

### WP-05 — Accessible Open/Close Experience

**Outcome:** penerima dapat membuka dan menutup hadiah dengan pointer maupun keyboard.

**Rencana:** gunakan native button untuk karakter, hubungkan state ke dua image layers, expose expanded state, dan hormati reduced-motion.

**Acceptance:** keadaan awal tertutup; Enter/Space/click membuka; aksi berikutnya menutup; fokus terlihat; panel tidak tersedia sebagai konten hadiah sebelum dibuka.

**Verification:** component tests berbasis role dan keyboard event, lalu browser keyboard check.

**Dependencies:** WP-04.

**Files likely touched:** `components/WishBoxExperience.tsx`, `tests/wish-box-experience.test.tsx`, `app/globals.css`.

**Scope:** Medium, 3 files.

### WP-06 — Responsive Message Panel

**Outcome:** pesan personal dapat dibaca pada mobile dan desktop tanpa clipping atau horizontal overflow.

**Rencana:** ubah `WishBoxPanel` menjadi presentational component yang menerima content props, gunakan semantic headings/region, dan bangun mobile-first scroll behavior.

**Acceptance:** tidak ada hard-coded customer content; pesan maksimum tetap terbaca pada 320 px, 390 px, dan 1280 px; panel memiliki accessible name dan urutan baca logis.

**Verification:** component render test, stress content fixture, dan browser responsive check.

**Dependencies:** WP-05.

**Files likely touched:** `components/WishBoxPanel.tsx`, `components/WishBoxExperience.tsx`, `app/globals.css`, `tests/wish-box-panel.test.tsx`.

**Scope:** Medium, 4 files.

### WP-07 — Four-photo Memory Gallery

**Outcome:** empat foto tampil konsisten untuk kombinasi portrait dan landscape.

**Rencana:** render galeri dari fixed tuple, gunakan parent berasio dengan `Image fill`, tetapkan `sizes`, dan bedakan visual utama dari tiga foto pendamping.

**Acceptance:** tepat empat image dirender dengan alt masing-masing; tidak ada distorsi; layout tidak overflow; gambar panel tidak diberi eager priority.

**Verification:** component tests untuk jumlah/alt/src dan browser check pada tiga viewport dengan aset portrait/landscape.

**Dependencies:** WP-03 dan WP-06.

**Files likely touched:** `components/WishBoxPanel.tsx`, `tests/wish-box-panel.test.tsx`, `app/globals.css`.

**Scope:** Medium, 3 files.

### Checkpoint B — Core Experience

- Alur tertutup → terbuka → tertutup bekerja tanpa reload.
- Pesan dan empat foto hanya terlihat setelah kotak dibuka.
- Keyboard, focus-visible, reduced-motion, dan image alt diverifikasi.
- Tidak ada horizontal overflow di 320 px, 390 px, dan 1280 px.
- Lint, tests, type-check, format check, dan production build lulus.
- Review manusia sebelum operational hardening.

### WP-08 — Operator Workflow dan Privacy Checklist

**Outcome:** operator dapat menyelesaikan konten satu pesanan tanpa mengubah komponen dalam target 30 menit.

**Rencana:** dokumentasikan input WhatsApp, mapping constants/assets, batas konten, optimasi gambar, validation command, browser QA, deployment handoff, dan penghapusan data pelanggan lama.

**Acceptance:** panduan hanya meminta perubahan di `constants` dan `public/images`; menjelaskan bahwa siapa pun dengan URL dapat mengakses hadiah; memiliki checklist anti-data-leak.

**Verification:** dry run dengan salinan materi pesanan dan pencatatan waktu aktual.

**Dependencies:** Checkpoint B.

**Files likely touched:** `docs/operations/new-pixel-wish-box-order.md`, `README.md`, `docs/prd/pixel-wish-box.md` bila batas konten berubah.

**Scope:** Medium, 3 files.

### WP-09 — Final Quality Gate

**Outcome:** template memenuhi seluruh acceptance criteria PRD dan siap untuk deployment manual pertama.

**Rencana:** jalankan suite kualitas penuh, browser matrix, keyboard audit, reduced-motion audit, content leakage check, serta production smoke test.

**Acceptance:** seluruh 12 acceptance criteria PRD memiliki evidence pass; tidak ada placeholder atau data pesanan sebelumnya; dry run operator ≤30 menit di luar pembuatan karakter/deployment.

**Verification:** `pnpm test -- --run`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm format:check`, `pnpm build`, `pnpm start`, dan browser smoke test.

**Dependencies:** WP-08.

**Files likely touched:** tidak ada secara default; hanya bugfix terfokus bila gate menemukan masalah.

**Scope:** Small untuk verifikasi; defect ditangani sebagai task terpisah.

### Checkpoint C — Complete

- Semua quality commands lulus.
- Semua acceptance criteria PRD memiliki evidence.
- Operator dry run memenuhi target waktu.
- Empat foto dan seluruh konten final bukan placeholder.
- Build siap diserahkan untuk deployment manual.
- Review manusia memberi keputusan go/no-go.

## 8. Verification Matrix

| Requirement                | Primary evidence                                            |
| -------------------------- | ----------------------------------------------------------- |
| FR-01 konfigurasi terpusat | Type test, code review, operator dry run                    |
| FR-02 aset standar         | Asset validator dan controlled negative check               |
| FR-03 keadaan awal         | Component test dan browser smoke test                       |
| FR-04 buka/tutup           | Pointer/keyboard component test dan browser check           |
| FR-05 panel pesan          | Stress fixture pada 320/390/1280 px                         |
| FR-06 empat foto           | Render assertions dan orientation matrix                    |
| FR-07 metadata             | Browser head inspection dan build output                    |
| FR-08 privasi URL          | Operator/customer checklist review                          |
| Aksesibilitas              | Role-based tests, keyboard, focus, contrast, reduced motion |
| Operasional ≤30 menit      | Timed dry run oleh operator Giftkuy.id                      |
| Tidak ada data lama        | Pre-deploy content and asset checklist                      |

## 9. Parallelization dan Urutan

Implementasi direkomendasikan tetap berurutan karena codebase kecil dan sebagian besar work package menyentuh `package.json`, `app/globals.css`, atau komponen yang sama. Parallel work hanya aman setelah kontrak konten stabil:

- WP-04 metadata dapat berjalan paralel dengan persiapan interaction test untuk WP-05.
- Dokumentasi operator dapat mulai setelah Checkpoint B, paralel dengan final browser QA.
- WP-05, WP-06, dan WP-07 harus berurutan karena berbagi state, panel, dan responsive CSS.
- Perubahan aset tidak boleh berjalan paralel dengan pesanan aktif tanpa koordinasi karena file bersifat global per deployment.

## 10. Risks and Mitigations

| Risiko                                         | Dampak                                                | Mitigasi                                                               |
| ---------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| Empat foto belum tersedia                      | Galeri dan crop matrix tidak dapat diverifikasi penuh | Jadikan aset sebagai input wajib sebelum WP-03 selesai                 |
| Konten maksimum merusak layout                 | Operator harus mengubah UI per pesanan                | Stress fixture lebih awal; validasi panjang; panel scroll aman         |
| Client boundary terlalu luas                   | Bundle dan coupling meningkat                         | State hanya di `WishBoxExperience`; page/layout tetap server           |
| Build dapat melewati validasi                  | Pesanan incomplete ter-deploy                         | `build` memanggil `validate:order` terlebih dahulu                     |
| Data pesanan lama tertinggal                   | Risiko privasi tinggi                                 | Fixed paths, checklist, metadata audit, dan negative placeholder check |
| Foto besar memperlambat halaman                | Pengalaman mobile buruk                               | Batas 5 MB, kompresi operator, `next/image`, lazy loading              |
| CSS existing menutup overflow                  | Pesan tidak dapat dijangkau                           | Mobile-first document/panel scrolling dan viewport tests               |
| Test component tidak merepresentasikan browser | Bug runtime lolos                                     | Browser verification sebagai checkpoint wajib                          |
| Dependency test menambah maintenance           | Setup dan lockfile bertambah                          | Ikuti guide resmi Next.js dan batasi tooling pada dev dependencies     |

## 11. Approval Gates

### Gate Plan

Persetujuan plan ini berarti menyetujui:

1. arsitektur Server Page + `WishBoxExperience` Client Component;
2. konfigurasi tunggal di `constants/wish-box.ts`;
3. struktur aset tetap di `public/images`;
4. validasi konten/aset sebelum setiap build;
5. penambahan dev dependencies resmi untuk Vitest + React Testing Library;
6. batas konten provisional yang akan dikalibrasi saat stress test.

### Gate Tasks

Setelah Gate Plan disetujui, fase berikutnya membuat `tasks/todo.md` berisi task granular, acceptance criteria, verification command, dependency, dan file scope. Implementasi belum dimulai sampai task list tersebut disetujui.

### Gate Implementasi

Implementasi berjalan satu task pada satu waktu dengan test-first workflow dan checkpoint manusia setelah foundation, core experience, dan final quality gate.

## 12. Inputs Needed Before Implementation

- Empat foto kenangan representatif, termasuk kombinasi portrait dan landscape, untuk menguji galeri.
- Konfirmasi bahwa perubahan nama/lokasi aset existing ke `public/images/**` dapat dilakukan.
- Persetujuan eksplisit plan, termasuk penambahan test dev dependencies yang tercantum pada Gate Plan.

Tidak ada keputusan hosting atau deployment provider yang dibutuhkan pada fase ini karena strategi tersebut tetap di luar scope.
