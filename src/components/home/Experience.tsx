import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Container from "@/components/ui/Container";

const moments = [
  {
    title: "Morning",
    text: "Fresh coffee, artisan breakfast and slow mornings made to be enjoyed.",
    image: "/images/experience/morning.webp",
    frame:
      "rounded-[1.75rem] rounded-br-[4.5rem] sm:rounded-[2.25rem] sm:rounded-br-[7rem]",
  },
  {
    title: "Afternoon",
    text: "Brunch favorites, waffles and signature creations for every taste.",
    image: "/images/experience/afternoon.webp",
    frame:
      "rounded-[1.75rem] rounded-tl-[4.5rem] sm:rounded-[2.25rem] sm:rounded-tl-[7rem]",
  },
  {
    title: "Evening",
    text: "Cocktails, desserts and warm conversations as the day comes to an end.",
    image: "/images/experience/evening.webp",
    frame:
      "rounded-[1.75rem] rounded-tr-[4.5rem] sm:rounded-[2.25rem] sm:rounded-tr-[7rem]",
  },
] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 bg-[var(--atelier-ivory)] py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <header className="grid items-end gap-7 border-b border-[var(--atelier-line)] pb-10 lg:grid-cols-12 lg:gap-8 lg:pb-14">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--atelier-coral)]" />
              Alveto moments
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="experience-title"
              className="max-w-[13ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance"
            >
              Every Moment Has a Flavor
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
              From your first coffee of the morning to the last cocktail of the
              evening.
            </p>
          </div>
        </header>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-28 lg:mt-28 lg:space-y-36">
          {moments.map((moment, index) => (
            <Moment key={moment.title} {...moment} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type MomentProps = Readonly<(typeof moments)[number] & { index: number }>;

function Moment({ image, title, text, frame, index }: MomentProps) {
  const mediaPlacement =
    index % 2 === 0
      ? "lg:col-span-8 lg:col-start-1"
      : "lg:col-span-8 lg:col-start-5";
  const copyPlacement =
    index % 2 === 0
      ? "lg:col-span-4 lg:col-start-9 lg:row-start-1"
      : "lg:col-span-4 lg:col-start-1 lg:row-start-1";

  return (
    <article className="grid min-w-0 items-center gap-9 lg:grid-cols-12 lg:gap-12">
      <div className={"min-w-0 " + copyPlacement}>
        <p
          aria-hidden="true"
          className="font-[family-name:var(--font-display)] text-6xl font-semibold leading-none tracking-[-0.06em] text-[var(--atelier-coral)] sm:text-7xl"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ink-soft)]">
          Alveto moment
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          {title}
        </h3>
        <p className="mt-6 max-w-md text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
          {text}
        </p>
      </div>

      <AtelierMotion
        direction={index % 2 === 0 ? "left" : "right"}
        className={"min-w-0 " + mediaPlacement}
      >
        <div
          className={
            "group relative aspect-[4/5] overflow-hidden bg-[var(--atelier-ivory-deep)] shadow-[0_24px_70px_rgba(34,34,34,0.1)] sm:aspect-[16/11] lg:aspect-[16/10] " +
            frame
          }
        >
          <Image
            src={image}
            alt={title + " at Alveto"}
            fill
            quality={85}
            sizes="(max-width: 1023px) calc(100vw - 48px), 66vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
          />
        </div>
      </AtelierMotion>
    </article>
  );
}
