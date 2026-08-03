# Task List: Pixel Wish Box v1

## Status

- **Status:** Draft untuk ditinjau
- **Tanggal:** 3 Agustus 2026
- **PRD:** [`../docs/prd/pixel-wish-box.md`](../docs/prd/pixel-wish-box.md)
- **Plan:** [`./plan.md`](./plan.md)
- **Fase:** Tasks; implementasi belum dimulai.

## Aturan Eksekusi

- Kerjakan satu task pada satu waktu sesuai urutan dependency.
- Untuk perubahan behavior atau logic, jalankan siklus **RED → GREEN → REFACTOR** di dalam task yang sama.
- Pastikan test yang baru ditulis gagal untuk alasan yang diharapkan sebelum menulis implementasi.
- Jalankan focused test selama task dan full quality gate pada setiap checkpoint.
- Jangan mengubah lebih dari lima file dalam satu task; perpindahan aset dihitung per file.
- Jangan mengembalikan perubahan pengguna yang sudah ada di worktree.
- Baca guide relevan di `node_modules/next/dist/docs/` sebelum mengubah kode Next.js.
- Tandai checkbox hanya setelah acceptance criteria dan verification task tersebut terpenuhi.
- Jika verification menemukan defect di luar acceptance task, buat task defect terpisah sebelum melanjutkan.

## Prerequisites

- [x] PRD disetujui.
- [x] Implementation plan disetujui.
- [x] Penambahan Vitest dan React Testing Library sebagai dev dependencies disetujui melalui Gate Plan.
- [x] Pemindahan aset ke `public/images/**` disetujui melalui Gate Plan.
- [ ] Empat foto kenangan representatif tersedia sebelum Task 5 dimulai.
- [ ] Sedikitnya satu foto portrait dan satu landscape tersedia untuk browser QA.

## Phase A — Foundation

### Task 1 — Tambahkan test harness resmi Next.js

**Description:** Siapkan Vitest dan React Testing Library mengikuti guide Next.js 16.2.6 agar seluruh behavior berikutnya dapat dikerjakan test-first. Pertahankan dependency serta script existing.

**TDD sequence:**

1. Tambahkan smoke test sinkron yang belum dapat berjalan karena harness belum tersedia.
2. Tambahkan dev dependencies, konfigurasi jsdom, setup cleanup, dan script test.
3. Jalankan smoke test sampai hijau dan rapikan setup tanpa menambah behavior aplikasi.

**Acceptance criteria:**

- [ ] `pnpm test -- --run` menjalankan test sekali dan keluar dengan status sukses.
- [ ] `pnpm test:watch` tersedia untuk development tanpa mengubah script existing.
- [ ] Alias `@/` dapat digunakan dari test dan setup melakukan cleanup antar-test.

**Verification:**

- [ ] `pnpm test -- --run tests/smoke.test.tsx`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm format:check`

**Dependencies:** prerequisites test tooling approval.

**Files likely touched:**

- `package.json`
- `pnpm-lock.yaml`
- `vitest.config.mts`
- `tests/setup.ts`
- `tests/smoke.test.tsx`

**Estimated scope:** Medium, 5 files.

---

### Task 2 — Definisikan kontrak konten dan validator

**Description:** Buat satu konfigurasi pesanan bertipe dengan fixed tuple empat memories dan pure validator untuk field wajib serta batas provisional dalam plan.

**TDD sequence:**

1. Tulis test untuk konfigurasi valid, field kosong, field terlalu panjang, jumlah paragraf, total panjang pesan, dan jumlah memories.
2. Pastikan test gagal karena contract/validator belum ada.
3. Implementasikan tipe, sample content existing, dan validator minimal hingga seluruh test lulus.

**Acceptance criteria:**

- [ ] `wishBoxContent` mencakup metadata, pengirim, penerima, pesan, dua karakter, dan tepat empat memories.
- [ ] Error validasi menyebut path field yang salah dan menolak nilai kosong/oversized.
- [ ] Kontrak dan hasil validasi dapat dikirim ke Client Component sebagai data serializable.

**Verification:**

- [ ] `pnpm test -- --run tests/validate-wish-box-content.test.ts`
- [ ] `pnpm exec tsc --noEmit`
- [ ] Review memastikan data personal hanya didefinisikan di `constants`.

**Dependencies:** Task 1.

**Files likely touched:**

- `constants/wish-box.ts`
- `lib/validate-wish-box-content.ts`
- `tests/validate-wish-box-content.test.ts`

**Estimated scope:** Medium, 3 files.

---

### Task 3 — Standardisasi background dan aset karakter

**Description:** Pindahkan tiga aset existing ke struktur tetap tanpa mengubah pixel data atau menghapus kemampuan untuk mengenali dua state karakter.

**Acceptance criteria:**

- [ ] Background tersedia sebagai `public/images/background.png`.
- [ ] Karakter tersedia sebagai `public/images/character/closed.png` dan `open.png`.
- [ ] Kedua file karakter tetap 744×970 dan dapat dibuka sebagai PNG valid.

**Verification:**

- [ ] Bandingkan ukuran byte/hash sebelum dan sesudah perpindahan untuk membuktikan tidak ada transformasi.
- [ ] Periksa dimensi kedua gambar karakter.
- [ ] `git status --short public`

**Dependencies:** Task 2.

**Files likely touched:**

- `public/main-background.png` → `public/images/background.png`
- `public/person-closed-box.png` → `public/images/character/closed.png`
- `public/person-opened-box.png` → `public/images/character/open.png`

**Estimated scope:** Medium, 3 file moves.

---

### Task 4 — Tambahkan empat foto kenangan final

**Description:** Tempatkan foto representatif/final pada empat slot tetap. Task ini tidak boleh diselesaikan dengan placeholder yang akan terbawa ke deployment.

**Acceptance criteria:**

- [ ] Tepat empat foto tersedia pada slot `01` sampai `04` dengan ekstensi yang didukung.
- [ ] Setidaknya satu foto portrait dan satu landscape tersedia.
- [ ] Setiap file berukuran lebih dari 0 byte dan tidak melebihi 5 MB.

**Verification:**

- [ ] Buka keempat gambar dan periksa orientasi serta isi.
- [ ] Catat ekstensi, dimensi, dan ukuran file.
- [ ] Cocokkan path dan alt text pada `constants/wish-box.ts`.

**Dependencies:** Task 3 dan empat foto dari pengguna/tim Giftkuy.id.

**Files likely touched:**

- `public/images/memories/01.*`
- `public/images/memories/02.*`
- `public/images/memories/03.*`
- `public/images/memories/04.*`

**Estimated scope:** Medium, 4 files.

---

### Task 5 — Buat asset validator dan build gate

**Description:** Buat validator Node.js yang memeriksa semua path gambar dari kontrak operasional, lalu jalankan validator secara otomatis sebelum Next.js production build.

**TDD sequence:**

1. Tulis test dengan temporary fixture untuk valid assets serta kasus missing, empty, unsupported, dan lebih dari 5 MB.
2. Pastikan test gagal karena validator belum ada.
3. Implementasikan validator dan scripts `validate:order`/`build` hingga test lulus.

**Acceptance criteria:**

- [ ] Validator gagal dengan pesan actionable untuk setiap kategori aset invalid.
- [ ] `pnpm validate:order` lulus untuk enam gambar personal dan background yang valid.
- [ ] `pnpm build` selalu menjalankan `validate:order` terlebih dahulu.

**Verification:**

- [ ] `pnpm test -- --run tests/validate-order-assets.test.ts`
- [ ] `pnpm validate:order`
- [ ] Controlled negative check membuktikan build berhenti di validator ketika satu aset tidak tersedia; pulihkan aset setelah check.

**Dependencies:** Tasks 2 dan 4.

**Files likely touched:**

- `scripts/validate-order-assets.mjs`
- `tests/validate-order-assets.test.ts`
- `package.json`

**Estimated scope:** Medium, 3 files.

## Checkpoint A — Foundation

- [ ] Tasks 1–5 selesai dan seluruh focused tests lulus.
- [ ] `pnpm test -- --run`
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm format:check`
- [ ] `pnpm validate:order`
- [ ] Konfigurasi invalid dan aset hilang memberikan failure yang deterministik.
- [ ] Review manusia menyetujui foundation sebelum UI core.

## Phase B — Core Experience

### Task 6 — Hubungkan metadata dengan konfigurasi

**Description:** Gunakan metadata title/description dari `wishBoxContent` pada Server Component layout dan tetapkan bahasa dokumen ke Bahasa Indonesia.

**Acceptance criteria:**

- [ ] `app/layout.tsx` mengekspor objek `Metadata` dari konfigurasi tanpa fetch.
- [ ] `<html lang="id">` digunakan.
- [ ] Title dan description sample lama tidak berada di markup komponen.

**Verification:**

- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] Inspeksi `<head>` pada browser menunjukkan title dan description dari constants.

**Dependencies:** Checkpoint A.

**Files likely touched:**

- `app/layout.tsx`
- `constants/wish-box.ts`

**Estimated scope:** Small, 2 files.

---

### Task 7 — Pisahkan Server Page dan Client Experience

**Description:** Jadikan `app/page.tsx` Server Component yang memvalidasi konten dan merender satu Client Component khusus untuk interaksi. Adaptasi panel minimal agar prototype kembali type-safe dan production build dapat selesai.

**TDD sequence:**

1. Tulis component test yang mengharapkan closed state dan tidak menemukan region hadiah pada render awal.
2. Pastikan test gagal terhadap struktur prototype.
3. Tambahkan `WishBoxExperience`, pass serializable props, dan ubah panel menjadi presentational shell minimal hingga test/build hijau.

**Acceptance criteria:**

- [ ] `app/page.tsx` tidak memiliki `"use client"` atau local state.
- [ ] Hanya `WishBoxExperience` yang memiliki state/event handler dan semua props serializable.
- [ ] Tidak ada pemanggilan `next/image` tanpa `src`, `alt`, dan sizing yang valid.

**Verification:**

- [ ] `pnpm test -- --run tests/wish-box-experience.test.tsx`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm build`

**Dependencies:** Task 6.

**Files likely touched:**

- `app/page.tsx`
- `components/WishBoxExperience.tsx`
- `components/WishBoxPanel.tsx`
- `tests/wish-box-experience.test.tsx`

**Estimated scope:** Medium, 4 files.

---

### Task 8 — Implementasikan interaksi buka/tutup yang aksesibel

**Description:** Ganti target klik prototype dengan native button dan buktikan alur closed → open → closed menggunakan role serta keyboard semantics.

**TDD sequence:**

1. Tambahkan test untuk accessible name, `aria-expanded`, `aria-controls`, click, Enter, dan Space.
2. Pastikan assertions baru gagal.
3. Implementasikan native button, image state, focus-visible, dan toggle minimal hingga test lulus.

**Acceptance criteria:**

- [ ] Keadaan awal tertutup dan pesan/foto tidak tersedia sebelum dibuka.
- [ ] Click, Enter, dan Space membuka hadiah; aksi berikutnya menutup tanpa reload.
- [ ] Button memiliki accessible name, state, target relationship, dan fokus terlihat.

**Verification:**

- [ ] `pnpm test -- --run tests/wish-box-experience.test.tsx`
- [ ] `pnpm lint`
- [ ] Browser keyboard check tanpa menggunakan mouse.

**Dependencies:** Task 7.

**Files likely touched:**

- `components/WishBoxExperience.tsx`
- `tests/wish-box-experience.test.tsx`
- `app/globals.css`

**Estimated scope:** Medium, 3 files.

---

### Task 9 — Render panel pesan dari konfigurasi

**Description:** Ubah panel menjadi semantic region yang seluruh konten personalnya berasal dari props dan tetap terbaca pada konten batas maksimum.

**TDD sequence:**

1. Tulis test untuk region/heading, penerima, pengirim, judul, dan seluruh paragraf dari fixture.
2. Pastikan hard-coded panel gagal memenuhi fixture.
3. Implementasikan presentational panel serta struktur mobile-first minimal sampai test hijau.

**Acceptance criteria:**

- [ ] Tidak ada nama, sapaan, atau isi pesan customer-specific yang hard-coded di komponen.
- [ ] Region hadiah memiliki accessible name dan urutan heading/paragraph logis.
- [ ] Semua paragraf dari konfigurasi dirender tanpa truncation programatis.

**Verification:**

- [ ] `pnpm test -- --run tests/wish-box-panel.test.tsx`
- [ ] `pnpm exec tsc --noEmit`
- [ ] Browser check dengan fixture panjang pada viewport 320 px.

**Dependencies:** Task 8.

**Files likely touched:**

- `components/WishBoxPanel.tsx`
- `components/WishBoxExperience.tsx`
- `tests/wish-box-panel.test.tsx`
- `app/globals.css`

**Estimated scope:** Medium, 4 files.

## Checkpoint B — Interaction and Message

- [ ] Tasks 6–9 selesai.
- [ ] Closed → open → closed bekerja dengan pointer dan keyboard.
- [ ] Metadata berasal dari constants.
- [ ] Pesan maksimum dapat discroll dan dibaca pada 320 px serta 390 px.
- [ ] `pnpm test -- --run`
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm format:check`
- [ ] `pnpm build`
- [ ] Review manusia menyetujui interaction/message sebelum galeri.

## Phase C — Gallery and Responsive Polish

### Task 10 — Render galeri empat foto

**Description:** Render fixed tuple memories menjadi satu foto utama dan tiga foto pendamping menggunakan `next/image` tanpa distorsi.

**TDD sequence:**

1. Tambahkan test yang mengharapkan tepat empat images beserta `src` dan alt text masing-masing.
2. Pastikan test gagal sebelum galeri diimplementasikan.
3. Implementasikan mapped gallery, sized parent, `fill`, `sizes`, dan object-cover hingga test lulus.

**Acceptance criteria:**

- [ ] Tepat empat foto dirender dari konfigurasi dengan alt yang benar.
- [ ] Hanya karakter tertutup memakai eager priority; foto galeri tetap lazy-loaded.
- [ ] Parent berukuran dan `sizes` mencegah layout shift serta over-download yang jelas.

**Verification:**

- [ ] `pnpm test -- --run tests/wish-box-panel.test.tsx`
- [ ] `pnpm build`
- [ ] Browser check memastikan portrait/landscape tidak terdistorsi.

**Dependencies:** Task 9 dan foto Task 4.

**Files likely touched:**

- `components/WishBoxPanel.tsx`
- `tests/wish-box-panel.test.tsx`
- `app/globals.css`

**Estimated scope:** Medium, 3 files.

---

### Task 11 — Stabilkan layout mobile dan desktop

**Description:** Selesaikan responsive layout agar tidak memotong karakter, pesan, atau galeri pada viewport target dan tinggi layar terbatas.

**Acceptance criteria:**

- [ ] Tidak ada horizontal scrolling pada 320 px, 390 px, atau 1280 px.
- [ ] Panel dapat discroll pada layar pendek dan karakter/panel berdampingan pada desktop yang cukup lebar.
- [ ] Portrait/landscape image matrix tetap berada di container tanpa distorsi.

**Verification:**

- [ ] Browser screenshot dan DOM overflow check pada 320 px, 390 px, dan 1280 px.
- [ ] Periksa console browser: tidak ada error atau warning aplikasi.
- [ ] `pnpm build`

**Dependencies:** Task 10.

**Files likely touched:**

- `app/globals.css`
- `components/WishBoxExperience.tsx`
- `components/WishBoxPanel.tsx`

**Estimated scope:** Medium, 3 files.

---

### Task 12 — Verifikasi reduced motion dan visual accessibility

**Description:** Hormati preference reduced motion dan pastikan fokus serta kontras UI utama memenuhi target WCAG 2.2 AA.

**TDD sequence:**

1. Tambahkan assertion terhadap semantic/focus hooks yang dapat diuji pada komponen.
2. Pastikan assertion gagal jika hooks belum tersedia.
3. Tambahkan reduced-motion override dan style fokus/kontras minimal, lalu verifikasi di browser.

**Acceptance criteria:**

- [ ] `prefers-reduced-motion: reduce` menonaktifkan atau meminimalkan transform/fade non-esensial.
- [ ] Focus indicator terlihat jelas terhadap background.
- [ ] Teks dan kontrol utama mencapai kontras minimum WCAG 2.2 AA.

**Verification:**

- [ ] Focused component tests lulus.
- [ ] Browser emulation reduced-motion menunjukkan transisi minimal.
- [ ] Contrast inspection pada foreground/background utama.

**Dependencies:** Task 11.

**Files likely touched:**

- `app/globals.css`
- `components/WishBoxExperience.tsx`
- `tests/wish-box-experience.test.tsx`

**Estimated scope:** Medium, 3 files.

---

### Task 13 — Kalibrasi batas konten dengan stress fixture

**Description:** Uji seluruh batas provisional terhadap layout final, lalu selaraskan validator dan PRD jika nilai perlu diperketat.

**TDD sequence:**

1. Tambahkan boundary tests tepat pada batas dan satu karakter di atas batas.
2. Jalankan fixture maksimum melalui UI dan catat overflow/wrapping.
3. Sesuaikan validator, test, dan PRD secara konsisten hanya jika hasil browser menuntutnya.

**Acceptance criteria:**

- [ ] Nilai pada batas diterima dan tetap terbaca; nilai di atas batas ditolak.
- [ ] Validator, tests, PRD, dan panduan operator menyebut batas yang sama.
- [ ] Tidak ada perubahan layout khusus untuk satu pesanan.

**Verification:**

- [ ] `pnpm test -- --run tests/validate-wish-box-content.test.ts tests/wish-box-panel.test.tsx`
- [ ] Browser check fixture batas pada 320 px, 390 px, dan 1280 px.
- [ ] Review diff PRD untuk memastikan hanya batas yang tervalidasi yang berubah.

**Dependencies:** Task 12.

**Files likely touched:**

- `lib/validate-wish-box-content.ts`
- `tests/validate-wish-box-content.test.ts`
- `docs/prd/pixel-wish-box.md`
- `tests/wish-box-panel.test.tsx`

**Estimated scope:** Medium, 4 files.

## Checkpoint C — Core Experience Complete

- [ ] Tasks 10–13 selesai.
- [ ] Tepat empat foto tampil tanpa distorsi.
- [ ] Tidak ada overflow pada viewport target.
- [ ] Keyboard, focus, contrast, alt text, dan reduced motion diverifikasi.
- [ ] Batas konten final konsisten di validator, tests, dan PRD.
- [ ] `pnpm test -- --run`
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm format:check`
- [ ] `pnpm build`
- [ ] Review manusia menyetujui core experience sebelum operational hardening.

## Phase D — Operational Hardening

### Task 14 — Tulis workflow operator pesanan baru

**Description:** Dokumentasikan proses WhatsApp-to-deployment agar operator dapat mengganti satu pesanan hanya melalui constants dan assets.

**Acceptance criteria:**

- [ ] Panduan mencakup input pelanggan, mapping semua field/file, batas konten, kompresi gambar, dan quality commands.
- [ ] Checklist mencegah data pesanan lama, placeholder, missing alt text, dan aset invalid ikut ter-deploy.
- [ ] Panduan menjelaskan bahwa siapa pun yang memiliki URL dapat membuka hadiah.

**Verification:**

- [ ] Ikuti panduan langkah demi langkah tanpa membuka source component.
- [ ] Semua command yang dicantumkan sama dengan `package.json`.
- [ ] Review privacy handoff wording.

**Dependencies:** Checkpoint C.

**Files likely touched:**

- `docs/operations/new-pixel-wish-box-order.md`
- `README.md`

**Estimated scope:** Small, 2 files.

---

### Task 15 — Mulai dry run dengan konten dan karakter baru

**Description:** Mulai timer dry-run setelah membuat backup terverifikasi di temporary directory, lalu ganti konfigurasi serta dua gambar karakter tanpa menyentuh komponen.

**Acceptance criteria:**

- [ ] Backup konfigurasi dan enam gambar final memiliki hash yang tercatat sebelum timer dimulai.
- [ ] Operator mengganti hanya konfigurasi dan dua gambar karakter pada tahap ini.
- [ ] Konfigurasi dry-run tidak menyisakan nama, pesan, atau metadata pesanan sebelumnya.

**Verification:**

- [ ] Catat waktu mulai, hash backup, dan perubahan tahap pertama pada evidence file.
- [ ] Periksa dua karakter memiliki dimensi/rasio yang sama.
- [ ] `pnpm exec tsc --noEmit`

**Dependencies:** Task 14, materi dry-run yang aman digunakan, dan temporary backup path yang sudah diverifikasi.

**Files likely touched:**

- `tasks/verification.md`
- `constants/wish-box.ts`
- `public/images/character/closed.png`
- `public/images/character/open.png`

**Estimated scope:** Medium, 4 files.

---

### Task 16 — Lanjutkan dry run dengan empat foto kenangan

**Description:** Dengan timer yang sama tetap berjalan, ganti tepat empat slot memories dan periksa bahwa orientasi serta batas ukuran mengikuti kontrak.

**Acceptance criteria:**

- [ ] Keempat slot memories berisi materi dry-run baru, bukan placeholder.
- [ ] Setidaknya satu foto portrait dan satu landscape tersedia.
- [ ] Setiap file valid, tidak kosong, dan berukuran maksimal 5 MB.

**Verification:**

- [ ] Buka keempat file dan catat dimensi/ukuran pada evidence file.
- [ ] Cocokkan `src` dan alt text dengan konfigurasi dry-run.
- [ ] `pnpm validate:order`

**Dependencies:** Task 15; timer dry-run belum dihentikan.

**Files likely touched:**

- `tasks/verification.md`
- `public/images/memories/01.*`
- `public/images/memories/02.*`
- `public/images/memories/03.*`
- `public/images/memories/04.*`

**Estimated scope:** Medium, 5 files.

---

### Task 17 — Selesaikan dan pulihkan dry run

**Description:** Jalankan build, hentikan timer setelah template siap, catat hasil target 30 menit, lalu pulihkan konten final dari backup dan buktikan pemulihan melalui hash.

**Acceptance criteria:**

- [ ] Penggantian konten/aset selesai maksimal 30 menit, di luar pembuatan karakter dan deployment.
- [ ] Dry run tidak membutuhkan perubahan pada `app`, `components`, atau layout.
- [ ] Setelah evidence direkam, seluruh file final dipulihkan dan hash cocok dengan nilai sebelum dry run.

**Verification:**

- [ ] `pnpm validate:order`
- [ ] `pnpm build`
- [ ] Catat waktu selesai, durasi, hambatan, hasil build, dan hasil hash restoration.

**Dependencies:** Task 16; timer yang sama dari Task 15 masih berjalan.

**Files likely touched:**

- `tasks/verification.md`
- Temporary backup di luar repository; hapus hanya setelah seluruh hash restoration cocok.

**Estimated scope:** Small, 1 repository file.

---

### Task 18 — Jalankan final quality dan browser gate

**Description:** Kumpulkan evidence bahwa seluruh acceptance criteria PRD lulus sebelum template diserahkan untuk deployment manual.

**Acceptance criteria:**

- [ ] Seluruh 12 acceptance criteria PRD memiliki evidence pass atau alasan blocker yang eksplisit.
- [ ] Tidak ada placeholder, data pesanan lama, console error, lint/type/build/test failure, atau aset wajib yang hilang.
- [ ] Browser flow tertutup → terbuka → tertutup lulus pada mobile dan desktop.

**Verification:**

- [ ] `pnpm test -- --run`
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm format:check`
- [ ] `pnpm validate:order`
- [ ] `pnpm build`
- [ ] `pnpm start` dan browser smoke test pada 320 px, 390 px, dan 1280 px.
- [ ] Perbarui `tasks/verification.md` dengan hasil final dan tanggal.

**Dependencies:** Task 17.

**Files likely touched:**

- `tasks/verification.md`
- File defect terfokus hanya jika quality gate menemukan masalah; setiap defect dibuat sebagai task tambahan.

**Estimated scope:** Small bila seluruh gate lulus.

## Checkpoint D — Ready for Manual Deployment

- [ ] Tasks 1–18 selesai.
- [ ] Seluruh checkbox acceptance dan verification telah ditinjau.
- [ ] `tasks/verification.md` memetakan evidence ke 12 acceptance criteria PRD.
- [ ] Operator dry run memenuhi target ≤30 menit.
- [ ] Empat foto dan seluruh konten yang akan diserahkan bukan placeholder.
- [ ] Build production siap untuk deployment manual.
- [ ] Human review memberi keputusan go/no-go.

## Traceability

| PRD requirement                 | Tasks               |
| ------------------------------- | ------------------- |
| FR-01 — Konfigurasi terpusat    | 2, 7, 9, 13, 15, 17 |
| FR-02 — Aset terstandar         | 3, 4, 5, 10, 15–17  |
| FR-03 — Keadaan awal            | 7, 8, 18            |
| FR-04 — Interaksi buka/tutup    | 8, 18               |
| FR-05 — Panel pesan             | 9, 11, 13           |
| FR-06 — Galeri kenangan         | 4, 10, 11           |
| FR-07 — Metadata                | 6, 15, 17, 18       |
| FR-08 — URL dan privasi         | 14, 17, 18          |
| Responsivitas                   | 9, 11, 13, 18       |
| Aksesibilitas                   | 8, 9, 12, 18        |
| Performa dan image optimization | 4, 5, 10, 18        |
| Operasional ≤30 menit           | 14–17               |
| Anti-data-leak                  | 5, 14–18            |

## Implementation Gate

Task list ini harus disetujui manusia sebelum Task 1 dimulai. Persetujuan task list tidak memperluas scope PRD dan tidak mengizinkan deployment; deployment tetap memerlukan keputusan go/no-go setelah Checkpoint D.
