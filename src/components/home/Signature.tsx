import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { PublishedHomepageResult } from "@/features/homepage/types";
import type { MenuProduct } from "@/features/menu/types";
import { getOptionalImageSource } from "@/lib/images";

type SignatureProps = Readonly<{
  eyebrow: string;
  title: string;
  products: readonly MenuProduct[];
  state: PublishedHomepageResult["state"];
}>;

export default function Signature({
  eyebrow,
  title,
  products,
  state,
}: SignatureProps) {
  const leadProduct = products[0] ?? null;
  const supportingProducts = products.slice(1);

  return (
    <section
      id="signature"
      aria-labelledby="signature-title"
      className="bg-[var(--atelier-ivory-deep)] py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <header className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--atelier-coral)]" />
              {eyebrow}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="signature-title"
              className="max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance"
            >
              {title}
            </h2>
          </div>
        </header>

        {leadProduct ? (
          <div className="mt-14 border-t border-[var(--atelier-line)] pt-10 sm:mt-20 sm:pt-14 lg:mt-24 lg:pt-16">
            <LeadProduct product={leadProduct} />

            {supportingProducts.length > 0 ? (
              <ol className="mt-16 divide-y divide-[var(--atelier-line)] border-y border-[var(--atelier-line)] lg:mt-24">
                {supportingProducts.map((product, index) => (
                  <SupportingProduct
                    key={product.id}
                    product={product}
                    index={index + 2}
                  />
                ))}
              </ol>
            ) : null}

            <div className="mt-12 flex justify-start sm:mt-16 lg:justify-end">
              <Button
                href="/menu"
                variant="ink"
                className="min-h-12 w-full rounded-full px-8 sm:w-auto"
              >
                Explore the full menu
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-14 border-t border-[var(--atelier-line)] pt-10">
            <p className="max-w-2xl text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
              {state === "error"
                ? "Our signature collection is temporarily unavailable."
                : "Our next signature collection is coming soon."}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

function LeadProduct({ product }: Readonly<{ product: MenuProduct }>) {
  const imageSource = getOptionalImageSource(product.image);

  return (
    <article className="grid min-w-0 items-center gap-9 lg:grid-cols-12 lg:gap-12">
      <AtelierMotion
        direction="left"
        className="min-w-0 lg:col-span-7"
      >
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] rounded-tr-[5rem] bg-[var(--atelier-ink-deep)] shadow-[0_24px_70px_rgba(34,34,34,0.12)] sm:aspect-[16/11] sm:rounded-[2.25rem] sm:rounded-tr-[8rem]">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={product.imageAlt ?? product.name}
              fill
              quality={85}
              sizes="(max-width: 1023px) calc(100vw - 48px), 58vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
            />
          ) : (
            <div className="flex h-full items-end p-7 sm:p-10 lg:p-12">
              <p className="max-w-[8ch] font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-[var(--atelier-ivory)] sm:text-7xl">
                {product.name}
              </p>
            </div>
          )}
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--atelier-ivory)] text-sm font-semibold text-[var(--atelier-ink-deep)] sm:left-8 sm:top-8"
          >
            01
          </span>
        </div>
      </AtelierMotion>

      <div className="min-w-0 lg:col-span-5 lg:pl-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ink-soft)]">
          Signature selection
        </p>
        <h3 className="mt-5 break-words font-[family-name:var(--font-display)] text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
          {product.name}
        </h3>
        <p className="mt-7 text-base leading-8 text-[var(--atelier-ink-soft)] sm:text-lg">
          {product.description}
        </p>
        <p className="mt-8 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {product.price.toLocaleString("sr-RS")} RSD
        </p>
      </div>
    </article>
  );
}

function SupportingProduct({
  product,
  index,
}: Readonly<{ product: MenuProduct; index: number }>) {
  const imageSource = getOptionalImageSource(product.image);

  return (
    <li>
      <article className="grid min-w-0 gap-5 py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-7 sm:py-10">
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tracking-[-0.05em] text-[var(--atelier-coral)] sm:text-5xl"
        >
          {String(index).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="break-words text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            {product.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--atelier-ink-soft)] sm:text-base">
            {product.description}
          </p>
          <p className="mt-4 text-lg font-semibold sm:text-xl">
            {product.price.toLocaleString("sr-RS")} RSD
          </p>
        </div>

        {imageSource ? (
          <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-[var(--atelier-ivory)] sm:h-28 sm:w-24">
            <Image
              src={imageSource}
              alt={product.imageAlt ?? product.name}
              fill
              sizes="(max-width: 639px) calc(100vw - 48px), 96px"
              className="object-cover transition-transform duration-500 hover:scale-[1.025] motion-reduce:transform-none"
            />
          </div>
        ) : null}
      </article>
    </li>
  );
}
