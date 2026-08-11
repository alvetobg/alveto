import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { MenuProduct } from "@/features/menu/types";
import { getOptionalImageSource } from "@/lib/images";

type SignatureProps = Readonly<{
  eyebrow: string;
  title: string;
  products: readonly MenuProduct[];
}>;

export default function Signature({
  eyebrow,
  title,
  products,
}: SignatureProps) {
  const leadProduct = products[0] ?? null;

  if (!leadProduct) {
    return null;
  }

  const supportingProducts = products.slice(1);

  return (
    <section
      id="signature"
      aria-labelledby="signature-title"
      className="scroll-mt-20 bg-[var(--atelier-ink-deep)] py-20 text-[var(--atelier-ivory)] sm:py-28 lg:py-36"
    >
      <Container className="max-w-[1440px]">
        <header className="grid gap-8 border-b border-white/14 pb-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--atelier-ivory)]/58 sm:text-xs">
              <span className="h-px w-10 bg-[var(--atelier-coral)]" />
              {eyebrow}
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2
              id="signature-title"
              className="max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.85rem,7vw,6.7rem)] font-medium leading-[0.92] tracking-[-0.06em] text-balance"
            >
              {title}
            </h2>
          </div>
        </header>

        <div className="pt-12 sm:pt-16 lg:pt-20">
          <LeadProduct product={leadProduct} />

          {supportingProducts.length > 0 ? (
            <ol className="mt-16 divide-y divide-white/14 border-y border-white/14 lg:mt-24">
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
              variant="atelier"
              className="min-h-12 w-full rounded-full px-8 sm:w-auto"
            >
              Explore the full menu
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LeadProduct({ product }: Readonly<{ product: MenuProduct }>) {
  const imageSource = getOptionalImageSource(product.image);

  return (
    <article className="grid min-w-0 items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <AtelierMotion className="min-w-0 lg:col-span-7">
        <div className="group relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[var(--atelier-ink)] sm:aspect-[16/11] sm:rounded-[1.75rem]">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={product.imageAlt ?? product.name}
              fill
              quality={85}
              sizes="(max-width: 1023px) calc(100vw - 48px), 58vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.018] motion-reduce:transform-none"
            />
          ) : (
            <div className="flex h-full items-end border border-white/12 p-7 sm:p-10 lg:p-12">
              <p className="max-w-[8ch] font-[family-name:var(--font-display)] text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-[var(--atelier-ivory)] sm:text-7xl">
                {product.name}
              </p>
            </div>
          )}
          <span
            aria-hidden="true"
            className="absolute left-5 top-5 flex h-11 min-w-11 items-center justify-center rounded-full bg-[var(--atelier-coral)] px-3 text-xs font-semibold tracking-[0.14em] text-[var(--atelier-ink-deep)] sm:left-7 sm:top-7"
          >
            01
          </span>
        </div>
      </AtelierMotion>

      <div className="min-w-0 lg:col-span-5 lg:pl-4">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--atelier-coral)] sm:text-xs">
          Signature selection
        </p>
        <h3 className="mt-5 break-words font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.3rem)] font-medium leading-[0.92] tracking-[-0.055em]">
          {product.name}
        </h3>
        <p className="mt-7 text-base leading-8 text-[var(--atelier-ivory)]/68 sm:text-lg">
          {product.description}
        </p>
        <p className="mt-8 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
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
      <article className="grid min-w-0 gap-5 py-8 min-[480px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[480px]:items-center min-[480px]:gap-7 sm:py-10">
        <span
          aria-hidden="true"
          className="font-[family-name:var(--font-display)] text-4xl font-medium leading-none tracking-[-0.055em] text-[var(--atelier-coral)] sm:text-5xl"
        >
          {String(index).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="break-words text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
            {product.name}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--atelier-ivory)]/64 sm:text-base">
            {product.description}
          </p>
          <p className="mt-4 text-lg font-medium sm:text-xl">
            {product.price.toLocaleString("sr-RS")} RSD
          </p>
        </div>

        {imageSource ? (
          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-[var(--atelier-ink)] min-[480px]:w-24">
            <Image
              src={imageSource}
              alt={product.imageAlt ?? product.name}
              fill
              sizes="(max-width: 479px) calc(100vw - 48px), 96px"
              className="object-cover transition-transform duration-500 hover:scale-[1.018] motion-reduce:transform-none"
            />
          </div>
        ) : null}
      </article>
    </li>
  );
}
