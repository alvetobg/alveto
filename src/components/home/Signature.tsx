import Image from "next/image";

import Heading from "@/components/ui/Heading";
import PremiumContainer from "@/components/ui/PremiumContainer";
import Section from "@/components/ui/Section";
import type { MenuProduct } from "@/features/menu/types";
import { getOptionalImageSource } from "@/lib/images";

type SignatureProps = Readonly<{
  eyebrow: string;
  title: string;
  products: readonly MenuProduct[];
}>;

const repeatedDaypartFallbacks = new Set([
  "/images/menu/breakfast/waffle-benedict.webp",
  "/images/menu/sweet/raffaello-raspberry.webp",
]);

export default function Signature({
  eyebrow,
  title,
  products,
}: SignatureProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Section id="signature" className="bg-[#fcfaf6]">
      <PremiumContainer>
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
            {eyebrow}
          </p>
          <Heading className="mt-4">{title}</Heading>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          {products.map((product, index) => {
            const candidateImage = getOptionalImageSource(product.image);
            const imageSource =
              candidateImage && !repeatedDaypartFallbacks.has(candidateImage)
                ? candidateImage
                : null;

            return imageSource ? (
              <article
                key={product.id}
                className="grid items-center gap-7 border-t border-dark/12 py-12 md:grid-cols-12 md:gap-10 md:py-16 lg:gap-16"
              >
                <div
                  className={`group relative aspect-[4/5] overflow-hidden rounded-[20px] bg-[#eee8df] md:col-span-7 md:aspect-[4/3] md:rounded-[24px] ${
                    index % 2 === 1
                      ? "md:order-2 md:col-start-6"
                      : ""
                  }`}
                >
                  <Image
                    src={imageSource}
                    alt={product.imageAlt ?? product.name}
                    fill
                    quality={85}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 58vw, 680px"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.012] motion-reduce:transition-none"
                  />
                </div>

                <ProductCopy
                  product={product}
                  className={`md:col-span-5 ${
                    index % 2 === 1
                      ? "md:order-1 md:col-start-1 md:pr-4 lg:pr-10"
                      : "md:pl-4 lg:pl-10"
                  }`}
                />
              </article>
            ) : (
              <article
                key={product.id}
                className="grid gap-6 border-t border-dark/12 py-10 md:grid-cols-12 md:gap-10 md:py-14"
              >
                <h3 className="text-[1.875rem] font-bold leading-tight tracking-[-0.035em] text-dark md:col-span-5 md:text-[2.5rem]">
                  {product.name}
                </h3>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="text-base leading-7 text-text md:text-lg md:leading-8">
                    {product.description}
                  </p>
                  <p className="mt-5 text-xl font-bold text-primary md:text-2xl">
                    {product.price.toLocaleString("sr-RS")} RSD
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </PremiumContainer>
    </Section>
  );
}

function ProductCopy({
  product,
  className,
}: Readonly<{ product: MenuProduct; className: string }>) {
  return (
    <div className={className}>
      <h3 className="text-[1.875rem] font-bold leading-tight tracking-[-0.035em] text-dark md:text-[2.25rem] lg:text-[2.75rem]">
        {product.name}
      </h3>
      <p className="mt-4 text-base leading-7 text-text md:mt-5 md:leading-8">
        {product.description}
      </p>
      <p className="mt-6 text-xl font-bold text-primary md:text-2xl">
        {product.price.toLocaleString("sr-RS")} RSD
      </p>
    </div>
  );
}
