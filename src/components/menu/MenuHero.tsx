import Image from "next/image";

import styles from "./MenuHero.module.css";

export default function MenuHero() {
  return (
    <section
      id="menu-hero"
      aria-labelledby="menu-title"
      className="relative isolate h-[400px] overflow-hidden bg-dark min-[390px]:h-[420px] md:h-[520px] lg:h-[560px]"
    >
      <Image
        src="/images/menu-hero.webp"
        alt="Alveto dishes arranged for the table"
        fill
        priority
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className={`${styles.image} object-cover object-[50%_52%]`}
      />

      <div aria-hidden="true" className="absolute inset-0 bg-dark/50" />

      <div className="mx-auto flex h-full w-full max-w-[1280px] items-end px-6 pb-10 pt-[calc(5rem+env(safe-area-inset-top))] md:px-8 md:pb-14 lg:px-12 xl:px-16">
        <div className={`${styles.content} relative z-10 max-w-2xl text-white`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72 md:text-xs">
            Breakfast / Sweets / Savory / Drinks
          </p>
          <h1
            id="menu-title"
            className="mt-3 text-[42px] font-semibold leading-[0.98] tracking-[-0.045em] min-[390px]:text-[44px] md:mt-4 md:text-[68px] lg:text-[76px]"
          >
            The Alveto Menu
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/82 md:mt-5 md:text-base md:leading-7">
            Brunch, coffee and desserts made for every part of the day.
            Explore all 13 categories below.
          </p>
        </div>
      </div>
    </section>
  );
}
