import { validateWishBoxContent } from "@/lib/validate-wish-box-content";

export const wishBoxContent = validateWishBoxContent({
  metadata: {
    title: "Untukmu | Pixel Wish Box",
    description: "Hadiah digital personal dari seseorang tersayang.",
  },
  senderName: "Seseorang Tersayang",
  recipientName: "Kamu",
  message: {
    title: "Untukmu",
    body: [
      "Terima kasih sudah hadir di hidupku.",
      "Dari hal kecil sampai momen sederhana, semuanya terasa lebih indah kalau ada kamu.",
    ],
  },
  character: {
    closed: {
      src: "/images/character/closed.png",
      alt: "Karakter pengirim membawa kotak hadiah tertutup",
    },
    open: {
      src: "/images/character/open.png",
      alt: "Karakter pengirim membawa kotak hadiah terbuka",
    },
  },
  memories: [
    { src: "/images/memories/01.jpg", alt: "Kenangan pertama bersama" },
    { src: "/images/memories/02.jpg", alt: "Kenangan kedua bersama" },
    { src: "/images/memories/03.jpg", alt: "Kenangan ketiga bersama" },
    { src: "/images/memories/04.jpg", alt: "Kenangan keempat bersama" },
  ],
});
