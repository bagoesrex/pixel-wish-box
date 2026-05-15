import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-svh max-w-screen items-center justify-center overflow-hidden">
      {/* Person character — switches between closed/opened box on hover */}
      <div className="group absolute bottom-0 left-1/2 aspect-square h-[70svh] -translate-x-1/2 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105 md:left-1/4">
        {/* Opened box — always visible as base layer */}
        <Image
          src="/person-opened-box.png"
          fill
          alt="Person holding an opened wish box"
          className="object-contain"
          sizes="70svh"
        />
        {/* Closed box — sits on top (z-10), fades out on hover to reveal opened underneath */}
        <Image
          src="/person-closed-box.png"
          fill
          alt="Person holding a closed wish box"
          className="z-10 object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          sizes="70svh"
          priority
        />
      </div>
    </main>
  );
}
