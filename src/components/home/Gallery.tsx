import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Container from "@/components/ui/Container";
import type {
  PublishedGalleryCollection,
  PublishedGalleryResult,
} from "@/features/gallery/types";

type GalleryProps = Readonly<{
  collections: readonly PublishedGalleryCollection[];
  state: PublishedGalleryResult["state"];
}>;

const itemLayouts = [
  "sm:col-span-7 sm:row-span-2",
  "sm:col-span-5",
  "sm:col-span-5",
  "sm:col-span-4",
  "sm:col-span-8",
  "sm:col-span-6",
  "sm:col-span-6",
] as const;

export default function Gallery({ collections, state }: GalleryProps) {
  if (collections.length === 0) {
    return (
      <section
        id="gallery"
        aria-labelledby="gallery-empty-title"
        className="bg-[var(--atelier-ivory-deep)] py-24 sm:py-28"
      >
        <Container>
          <div className="border-y border-[var(--atelier-line)] py-14">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--atelier-coral)]" />
              Alveto gallery
            </p>
            <h2
              id="gallery-empty-title"
              className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.045em] sm:text-5xl"
            >
              Gallery
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--atelier-ink-soft)]">
              {state === "error"
                ? "Gallery content is temporarily unavailable."
                : "Gallery content will appear here when it is published."}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      aria-label="Alveto gallery"
      className="bg-[var(--atelier-ivory-deep)] py-24 sm:py-28 lg:py-36"
    >
      <Container>
        {collections.map((collection, collectionIndex) => (
          <div
            key={collection.id}
            className={
              collectionIndex > 0
                ? "mt-24 border-t border-[var(--atelier-line)] pt-20 lg:mt-32 lg:pt-24"
                : undefined
            }
          >
            <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-4">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--atelier-coral)]" />
                  Alveto gallery
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-[13ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
                  {collection.title}
                </h2>
                {collection.description ? (
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
                    {collection.description}
                  </p>
                ) : null}
              </div>
            </header>

            <AtelierMotion className="mt-12 sm:mt-16 lg:mt-20">
              <ul className="grid min-w-0 grid-cols-1 gap-4 sm:auto-rows-[230px] sm:grid-cols-12 sm:gap-5 lg:auto-rows-[270px] lg:gap-6">
                {collection.items.map((item, itemIndex) => {
                  const layout =
                    itemLayouts[itemIndex % itemLayouts.length];

                  return (
                    <li
                      key={item.id}
                      className={"min-h-[360px] min-w-0 sm:min-h-0 " + layout}
                    >
                      <figure className="group relative h-full min-h-[360px] overflow-hidden rounded-[1.5rem] bg-[var(--atelier-ivory)] shadow-[0_18px_50px_rgba(34,34,34,0.1)] sm:min-h-0 sm:rounded-[2rem]">
                        <Image
                          src={item.imageUrl}
                          alt={item.altText}
                          fill
                    quality={85}
                          sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 58vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                        />

                        {item.caption || item.title ? (
                          <>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/72 to-transparent" />
                            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                              <p className="font-semibold leading-6">
                                {item.caption ?? item.title}
                              </p>
                              {item.caption && item.title !== item.caption ? (
                                <p className="mt-1 text-sm leading-6 text-white/78">
                                  {item.title}
                                </p>
                              ) : null}
                            </figcaption>
                          </>
                        ) : null}
                      </figure>
                    </li>
                  );
                })}
              </ul>
            </AtelierMotion>
          </div>
        ))}
      </Container>
    </section>
  );
}
