import { Heart } from "pixelarticons/react";
import Image from "next/image";

export default function WishBoxPanel() {
  return (
    <div className="absolute right-0 z-50 h-svh w-full max-w-[120svh] p-3 text-center font-light">
      <div className="h-full w-full">
        <div className="pixel-corners--wrapper min-h-full min-w-full bg-[#fce9e9]">
          <div className="absolute inset-0 flex size-full items-center justify-center p-3">
            <div className="relative size-full">
              <div className="pixel-corners--wrapper absolute! inset-0 size-full">
                <div className="grid h-full grid-cols-3 gap-2 p-2 px-5 py-6">
                  <div className="flex flex-col items-center gap-8 rounded-xl border-2 border-[#fdc9c9] px-4.5 py-5">
                    <p className="block w-full border-b border-[#fdc9c9] pb-3 text-center">Pesan</p>
                    <p>Untukmu</p>
                    <Heart className="size-20" />
                    <p>Terima kasih sudah hadir di hidupku</p>
                    <p>
                      Dari hal kecil sampai momen sederhana, semuanya terasa lebih indah kalau ada
                      kamu
                    </p>
                  </div>
                  <div className="col-span-2 flex flex-col items-center gap-4 rounded-xl border-2 border-[#fdc9c9] px-4.5 py-5">
                    <p className="block w-full pb-2 text-center">Foto</p>
                    <p>Kenangan Kita</p>
                    <div className="min-h-60 w-full border border-[#fdc9c9]">
                      <Image />
                    </div>
                    <div className="flex h-full w-full gap-4">
                      <div className="size-full border border-black">
                        <Image />
                      </div>
                      <div className="size-full border border-black">
                        <Image />
                      </div>
                      <div className="size-full border border-black">
                        <Image />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
