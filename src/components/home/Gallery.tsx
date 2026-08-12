import Image from "next/image";

import PremiumReveal from "@/components/animations/PremiumReveal";
import Heading from "@/components/ui/Heading";
import PremiumContainer from "@/components/ui/PremiumContainer";
import Section from "@/components/ui/Section";
import type {
  PublishedGalleryCollection,
  PublishedGalleryItem,
} from "@/features/gallery/types";
import { shouldBypassContentImageOptimizer } from "@/lib/content-images";

interface GalleryProps {
  collections: readonly PublishedGalleryCollection[];
}

export default function Gallery({ collections }: GalleryProps) {
  const publishedCollections = collections.filter(
    (collection) => collection.items.length > 0,
  );

  if (publishedCollections.length === 0) {
    return null;
  }

  return (
    <Section id="gallery" className="bg-[#fcfaf6]">
      <PremiumContainer>
        <PremiumReveal>
          <div>
            {publishedCollections.map((collection, collectionIndex) => (
              <div
                key={collection.id}
                className={collectionIndex > 0 ? "mt-20 md:mt-24" : undefined}
              >
                <div className="max-w-3xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
                    Alveto gallery
                  </p>
                  <Heading className="mt-4">{collection.title}</Heading>
                  {collection.description ? (
                    <p className="mt-5 max-w-2xl text-base leading-8 text-text md:mt-6 md:text-lg">
                      {collection.description}
                    </p>
                  ) : null}
                </div>

                <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6">
                  {collection.items.map((item) => (
                    <li key={item.id}>
                      <GalleryFigure item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PremiumReveal>
      </PremiumContainer>
    </Section>
  );
}

function GalleryFigure({ item }: Readonly<{ item: PublishedGalleryItem }>) {
  const ratio = item.imageWidth / item.imageHeight;
  const aspectClass =
    ratio >= 1.3
      ? "aspect-[4/3]"
      : ratio <= 0.85
        ? "aspect-[4/5]"
        : "aspect-square";

  return (
    <figure className="group overflow-hidden rounded-[20px] border border-dark/8 bg-cream md:rounded-[24px]">
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <Image
          src={item.imageUrl}
          alt={item.altText}
          fill
          unoptimized={shouldBypassContentImageOptimizer(item.imageUrl)}
          quality={85}
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 44px), 370px"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.012] motion-reduce:transition-none"
        />
      </div>
      {item.caption || item.title ? (
        <figcaption className="px-5 py-4">
          <p className="font-medium leading-6 text-dark">
            {item.caption ?? item.title}
          </p>
          {item.caption && item.title !== item.caption ? (
            <p className="mt-1 text-sm leading-6 text-text">{item.title}</p>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
