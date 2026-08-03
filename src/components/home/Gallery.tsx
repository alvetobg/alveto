import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import type { PublishedGalleryCollection } from "@/features/gallery/types";

interface GalleryProps {
  collections: readonly PublishedGalleryCollection[];
}

export default function Gallery({ collections }: GalleryProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <Section id="gallery" className="bg-primary/5">
      <Container>
        {collections.map((collection, collectionIndex) => (
          <div
            key={collection.id}
            className={collectionIndex > 0 ? "mt-20 lg:mt-28" : undefined}
          >
            <FadeIn>
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4 uppercase tracking-[6px] text-primary">
                  ALVETO GALLERY
                </p>
                <Heading>{collection.title}</Heading>
                {collection.description ? (
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text sm:text-lg">
                    {collection.description}
                  </p>
                ) : null}
              </div>
            </FadeIn>

            <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
              {collection.items.map((item, itemIndex) => (
                <li key={item.id}>
                  <FadeIn delay={Math.min(itemIndex * 0.08, 0.32)}>
                    <figure className="group overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:rounded-[36px]">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={item.altText}
                          fill
                          sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 42px), 360px"
                          unoptimized
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                      {item.caption || item.title ? (
                        <figcaption className="px-5 py-5 sm:px-6">
                          <p className="font-medium text-foreground">
                            {item.caption ?? item.title}
                          </p>
                          {item.caption && item.title !== item.caption ? (
                            <p className="mt-1 text-sm leading-6 text-text">
                              {item.title}
                            </p>
                          ) : null}
                        </figcaption>
                      ) : null}
                    </figure>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </Section>
  );
}
