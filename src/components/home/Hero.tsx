import Image from "next/image";

import styles from "@/components/home/Homepage.module.css";
import PremiumButton from "@/components/ui/PremiumButton";
import type { HomepageHero } from "@/features/homepage/types";
import type { PublicReservationSettings } from "@/features/reservations/types";

type HeroProps = Readonly<{
  content: HomepageHero | null;
  hasPublishedSignature: boolean;
  reservationSettings: PublicReservationSettings | null;
}>;

const fallbackHero: HomepageHero = {
  title: "Every Moment Has a Flavor.",
  subtitle:
    "Specialty coffee, thoughtfully crafted brunch and signature desserts in a warm Belgrade atmosphere.",
  buttonLabel: "Explore Menu",
  buttonUrl: "/menu",
  imagePath: "/images/hero.jpg",
};

export default function Hero({
  content,
  hasPublishedSignature,
  reservationSettings,
}: HeroProps) {
  const hero = content ?? fallbackHero;
  const primaryHref =
    hero.buttonUrl === "#signature" && !hasPublishedSignature
      ? "/menu"
      : hero.buttonUrl;
  const canReserve = Boolean(
    reservationSettings?.reservationsEnabled &&
      reservationSettings.reservationUrl,
  );

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-dark"
    >
      <Image
        src={hero.imagePath}
        alt="Alveto cafe interior"
        fill
        priority
        quality={85}
        sizes="100vw"
        className={`${styles.heroImage} object-cover object-[55%_52%] md:object-[52%_48%]`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,17,0.52)_0%,rgba(20,18,17,0.32)_42%,rgba(20,18,17,0.68)_100%)]" />

      <div
        className={`${styles.heroContent} relative z-10 mx-auto flex w-full max-w-[960px] flex-col items-center px-5 text-center min-[375px]:px-6 md:px-8`}
        style={{
          paddingTop: "calc(6.5rem + env(safe-area-inset-top))",
          paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        }}
      >
        <Image
          src="/logos/alveto-wordmark.png"
          alt="Alveto"
          width={244}
          height={60}
          sizes="(max-width: 767px) 148px, 244px"
          draggable={false}
          className="mb-5 h-auto w-[148px] select-none md:mb-7 md:w-[220px] lg:w-[244px]"
        />

        <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.26em] text-white/80 min-[375px]:text-[11px] md:text-xs md:tracking-[0.32em]">
          Coffee · Brunch · Desserts · Cocktails
        </p>

        <h1 className="mt-4 max-w-[860px] whitespace-pre-line text-[2.375rem] font-bold leading-[0.98] tracking-[-0.045em] text-white min-[375px]:text-[2.5rem] md:mt-5 md:text-[3.5rem] lg:text-[5rem] xl:text-[5.25rem]">
          {hero.title}
        </h1>

        <p className="mt-5 max-w-[620px] text-[15px] leading-6 text-white/88 md:mt-6 md:text-lg md:leading-8">
          {hero.subtitle}
        </p>

        <div className="mt-7 flex w-full max-w-sm flex-col gap-2.5 sm:w-auto sm:max-w-none sm:flex-row md:mt-8 md:gap-3">
          <PremiumButton
            href={primaryHref}
            showArrow
            className="w-full sm:w-auto"
          >
            {hero.buttonLabel}
          </PremiumButton>

          {canReserve ? (
            <PremiumButton
              href="#reservation"
              variant="image"
              className="w-full sm:w-auto"
            >
              {reservationSettings?.primaryCtaLabel}
            </PremiumButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
