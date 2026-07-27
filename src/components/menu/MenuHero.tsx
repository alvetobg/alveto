import Image from "next/image";

export default function MenuHero() {
  return (
    <section className="relative flex h-[65vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/menu-hero.webp"
        alt="Menu"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center text-white">
        <p className="mb-4 uppercase tracking-[8px] text-white/70">
          ALVETO MENU
        </p>

        <h1 className="text-6xl font-extrabold leading-none md:text-8xl">
          Crafted
          <br />
          With Passion
        </h1>
      </div>
    </section>
  );
}
