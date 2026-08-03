"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import type {
  HomepageHero,
  PublishedHomepageResult,
} from "@/features/homepage/types";

type HeroProps = Readonly<{
  content: HomepageHero | null;
  state: PublishedHomepageResult["state"];
}>;

export default function Hero({ content, state }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-dark md:min-h-screen">
      {/* Background */}

      {content ? (
        <Image
          src={content.imagePath}
          alt="Alveto"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
      ) : null}

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/70" />

      {/* Content */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-16 text-center md:pt-24">
        <FadeIn>
          <Image
            src="/logos/alveto-wordmark.png"
            alt="Alveto"
            width={340}
            height={83}
            sizes="(max-width: 767px) 176px, 340px"
            draggable={false}
            className="mb-8 h-auto w-44 select-none md:mb-20 md:w-[340px]"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-4 text-[11px] uppercase tracking-[6px] text-white/75 sm:text-sm md:mb-5 md:text-base md:tracking-[10px]">
            COFFEE • BRUNCH • DESSERTS • COCKTAILS
          </p>
        </FadeIn>

        {content ? (
          <>
            <FadeIn delay={0.2}>
              <h1 className="max-w-4xl whitespace-pre-line text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-7xl xl:text-[7.5rem]">
                {content.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/85 md:mt-12 md:max-w-2xl md:text-xl md:leading-9">
                {content.subtitle}
              </p>
            </FadeIn>
          </>
        ) : (
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/85 md:mt-12 md:max-w-2xl md:text-xl md:leading-9">
              {state === "error"
                ? "Homepage content is temporarily unavailable."
                : "New homepage content is coming soon."}
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.5}>
          <div className="mt-10 flex w-full max-w-sm gap-3 md:mt-20 md:max-w-none md:w-auto md:gap-4">
            {content ? (
              <Button
                href={content.buttonUrl}
                className="flex-1 md:w-auto"
              >
                {content.buttonLabel}
              </Button>
            ) : null}

            <Button
              href="#reservation"
              variant="secondary"
              className="flex-1 md:w-auto"
            >
              Reserve
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
