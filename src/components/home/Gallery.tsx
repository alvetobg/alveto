import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Container from "@/components/ui/Container";
import type { PublishedGalleryCollection } from "@/features/gallery/types";

type GalleryProps = Readonly<{
  collections: readonly PublishedGalleryCollection[];
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

export default function Gallery({ collections }: GalleryProps) {
  const visibleCollections = collections.filter(
    (collection) => collection.items.length > 0,
  );

  if (visibleCollections.length === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      aria-label="Alveto gallery"
      className="scroll-mt-20 bg-[var(--atelier-ivory-deep)] py-20 sm:py-28 lg:py-36"
    >
      <Container className="max-w-[1440px]">
        {visibleCollections.map((collection, collectionIndex) => (
          <div
            key={collection.id}
            className={
              collectionIndex > 0
                ? "mt-24 border-t border-[var(--atelier-line)] pt-20 lg:mt-32 lg:pt-24"
                : undefined
            }
          >
            <header className="grid gap-8 border-b border-[var(--atelier-line)] pb-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
              <div className="lg:col-span-4">
                <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--atelier-ink-soft)] sm:text-xs">
                  <span className="h-px w-10 bg-[var(--atelier-coral)]" />
                  Alveto gallery
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.85rem,7vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-balance">
                  {collection.title}
                </h2>
                {collection.description ? (
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
                    {collection.description}
                  </p>
                ) : null}
              </div>
            </header>

            <AtelierMotion className="mt-10 sm:mt-14 lg:mt-16">
              <ul className="grid min-w-0 grid-cols-1 gap-4 sm:auto-rows-[230px] sm:grid-cols-12 sm:gap-5 lg:auto-rows-[275px] lg:gap-6">
                {collection.items.map((item, itemIndex) => {
                  const layout =
                    itemLayouts[itemIndex % itemLayouts.length];

                  return (
                    <li
                      key={item.id}
                      className={"min-h-[330px] min-w-0 sm:min-h-0 " + layout}
                    >
                      <figure className="group h-full overflow-hidden rounded-[1.25rem] bg-[var(--atelier-ivory)] sm:relative sm:min-h-0 sm:rounded-[1.5rem]">
                        <div className="relative min-h-[330px] sm:absolute sm:inset-0 sm:min-h-0">
                          <Image
                            src={item.imageUrl}
                            alt={item.altText}
                            fill
                            quality={85}
                            sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 58vw, 50vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] motion-reduce:transform-none"
                          />
                          {item.caption || item.title ? (
                            <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/76 to-transparent sm:block" />
                          ) : null}
                        </div>

                        {item.caption || item.title ? (
                          <figcaption className="relative border-t border-[var(--atelier-line)] p-5 text-[var(--atelier-ink-deep)] sm:absolute sm:inset-x-0 sm:bottom-0 sm:border-0 sm:p-6 sm:text-white">
                            <p className="font-medium leading-6">
                              {item.caption ?? item.title}
                            </p>
                            {item.caption && item.title !== item.caption ? (
                              <p className="mt-1 text-sm leading-6 text-[var(--atelier-ink-soft)] sm:text-white/76">
                                {item.title}
                              </p>
                            ) : null}
                          </figcaption>
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
