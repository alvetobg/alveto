import Image from "next/image";

import PremiumReveal from "@/components/animations/PremiumReveal";
import Heading from "@/components/ui/Heading";
import PremiumContainer from "@/components/ui/PremiumContainer";
import Section from "@/components/ui/Section";
import type { HomepageExperienceImages } from "@/features/homepage/types";

const moments = [
  {
    imageKey: "morning",
    number: "01",
    title: "Morning",
    fallbackImage: "/images/experience/morning.webp",
    fallbackAlt: "Brunch served at Alveto in the morning",
    position: "moment-focus-morning",
    text: "Fresh coffee, artisan breakfast and slow mornings made to be enjoyed.",
  },
  {
    imageKey: "afternoon",
    number: "02",
    title: "Afternoon",
    fallbackImage: "/images/experience/afternoon.webp",
    fallbackAlt: "Alveto dessert served in the afternoon",
    position: "moment-focus-afternoon",
    text: "Brunch favorites, waffles and signature creations for every taste.",
  },
  {
    imageKey: "evening",
    number: "03",
    title: "Evening",
    fallbackImage: "/images/experience/evening.webp",
    fallbackAlt: "Cocktail at Alveto in the evening",
    position: "moment-focus-evening",
    text: "Cocktails, desserts and warm conversations as the day comes to an end.",
  },
] as const;

type ExperienceProps = Readonly<{
  images: HomepageExperienceImages | null;
}>;

export default function Experience({ images }: ExperienceProps) {
  return (
    <Section id="experience" className="bg-cream">
      <PremiumContainer>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
            Alveto moments
          </p>
          <Heading className="mt-4 text-center">
            Every Moment Has a Flavor
          </Heading>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text md:mt-6 md:text-lg md:leading-8">
            From your first coffee of the morning to the last cocktail of the
            evening.
          </p>
        </div>

        <ol className="mt-12 space-y-16 md:mt-16 md:space-y-20 lg:mt-20 lg:space-y-24">
          {moments.map((moment, index) => {
            const cmsImage = images?.[moment.imageKey];

            return (
              <li key={moment.title}>
                <PremiumReveal>
                  <Moment
                    {...moment}
                    image={cmsImage?.url ?? moment.fallbackImage}
                    alt={cmsImage?.altText ?? moment.fallbackAlt}
                    reverse={index % 2 === 1}
                  />
                </PremiumReveal>
              </li>
            );
          })}
        </ol>
      </PremiumContainer>
    </Section>
  );
}

function Moment({
  number,
  title,
  image,
  alt,
  position,
  text,
  reverse,
}: (typeof moments)[number] & {
  image: string;
  alt: string;
  reverse: boolean;
}) {
  return (
    <article className="moment-layout">
      <div
        className={`moment-image ${
          reverse ? "moment-image-reverse" : ""
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          quality={85}
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 58vw, 680px"
          className={`moment-photo ${position}`}
        />
      </div>

      <div
        className={`moment-copy ${
          reverse ? "moment-copy-reverse" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          <p className="text-xs font-semibold tracking-[0.22em] text-primary">
            {number}
          </p>
        </div>
        <h3 className="mt-4 text-[1.75rem] font-bold leading-tight tracking-[-0.035em] text-dark md:text-[2rem] lg:text-[2.25rem]">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-7 text-text md:mt-5 md:leading-8">
          {text}
        </p>
      </div>
    </article>
  );
}
