import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Container from "@/components/ui/Container";

const moments = [
  {
    title: "Morning",
    text: "Fresh coffee, artisan breakfast and slow mornings made to be enjoyed.",
    image: "/images/experience/morning.webp",
    imagePosition: "object-center",
  },
  {
    title: "Afternoon",
    text: "Brunch favorites, waffles and signature creations for every taste.",
    image: "/images/experience/afternoon.webp",
    imagePosition: "object-center",
  },
  {
    title: "Evening",
    text: "Cocktails, desserts and warm conversations as the day comes to an end.",
    image: "/images/experience/evening.webp",
    imagePosition: "object-center",
  },
] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 bg-[var(--atelier-ivory)] py-20 sm:py-28 lg:py-36"
    >
      <Container className="max-w-[1440px]">
        <header className="grid gap-8 border-b border-[var(--atelier-line)] pb-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--atelier-ink-soft)] sm:text-xs">
              <span className="h-px w-10 bg-[var(--atelier-coral)]" />
              A day at Alveto
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="experience-title"
              className="max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.85rem,7vw,6.7rem)] font-medium leading-[0.92] tracking-[-0.06em] text-balance"
            >
              Every Moment Has a Flavor
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
              From your first coffee of the morning to the last cocktail of the
              evening.
            </p>
          </div>
        </header>

        <ol className="divide-y divide-[var(--atelier-line)]">
          {moments.map((moment, index) => (
            <Moment key={moment.title} {...moment} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

type MomentProps = Readonly<(typeof moments)[number] & { index: number }>;

function Moment({
  image,
  imagePosition,
  title,
  text,
  index,
}: MomentProps) {
  const even = index % 2 === 0;

  return (
    <li>
      <article className="grid min-w-0 gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
        <AtelierMotion
          className={
            "min-w-0 " +
            (even
              ? "lg:col-span-7 lg:col-start-1"
              : "lg:col-span-7 lg:col-start-6")
          }
        >
          <div className="group relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[var(--atelier-ivory-deep)] sm:aspect-[16/11] sm:rounded-[1.75rem] lg:aspect-[5/4]">
            <Image
              src={image}
              alt={title + " at Alveto"}
              fill
              quality={85}
              sizes="(max-width: 1023px) calc(100vw - 48px), 58vw"
              className={
                "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] motion-reduce:transform-none " +
                imagePosition
              }
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 flex h-11 min-w-11 items-center justify-center rounded-full bg-[var(--atelier-ivory)] px-3 text-xs font-semibold tracking-[0.16em] text-[var(--atelier-ink-deep)] sm:bottom-6 sm:left-6"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </AtelierMotion>

        <div
          className={
            "min-w-0 lg:row-start-1 " +
            (even
              ? "lg:col-span-4 lg:col-start-9 lg:pl-4"
              : "lg:col-span-4 lg:col-start-1 lg:pr-4")
          }
        >
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--atelier-coral)] sm:text-xs">
            {String(index + 1).padStart(2, "0")} / Alveto moment
          </p>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            {title}
          </h3>
          <p className="mt-6 max-w-md text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
            {text}
          </p>
          <span
            aria-hidden="true"
            className="mt-9 block h-px w-16 bg-[var(--atelier-ink)]/28"
          />
        </div>
      </article>
    </li>
  );
}
