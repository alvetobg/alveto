"use client";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero.jpg"
        alt="Alveto"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover scale-[1.02]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">
        <FadeIn>
  <Image
  src="/logos/alveto-logo.png"
  alt="Alveto"
  width={340}
  height={128}
  priority
  className="mb-12 w-56 select-none md:mb-20 md:w-[340px]"
  draggable={false}
/>
</FadeIn>

        <FadeIn delay={0.1}>
  <p className="mb-5 text-sm uppercase tracking-[10px] text-white/70 md:text-base">
    COFFEE • BRUNCH • DESSERTS • COCKTAILS
  </p>
</FadeIn>

        <FadeIn delay={0.2}>
  <h1 className="max-w-4xl text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl xl:text-[7.5rem]">
    Every Moment
    <br />
    Has a Flavor.
  </h1>
</FadeIn>

        <FadeIn delay={0.35}>
  <p className="mt-8 max-w-2xl text-base leading-8 text-white/80 md:mt-12 md:text-xl md:leading-9">
    A place where specialty coffee, beautiful food and slow moments come
    together.
  </p>
</FadeIn>

        <FadeIn delay={0.5}>
  <div className="mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center md:mt-20">

    <Button
      href="#signature"
      className="w-full sm:w-auto"
    >
      Explore Menu
    </Button>

    <Button
      href="#reservation"
      variant="secondary"
      className="w-full sm:w-auto"
    >
      Reserve
    </Button>

  </div>
</FadeIn>
      </div>
    </section>
  );
}