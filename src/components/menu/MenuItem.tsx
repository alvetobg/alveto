import Image from "next/image";

import { getOptionalImageSource } from "@/lib/images";

type MenuItemProps = Readonly<{
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageAlt?: string;
  variant: "text" | "image" | "feature";
  onClick?: () => void;
}>;

export default function MenuItem({
  id,
  name,
  description,
  price,
  image,
  imageAlt,
  variant,
  onClick,
}: MenuItemProps) {
  const imageSource = getOptionalImageSource(image);
  const resolvedVariant = imageSource ? variant : "text";
  const titleId = `menu-product-${id}-title`;
  const descriptionId = `menu-product-${id}-description`;
  const priceId = `menu-product-${id}-price`;

  if (resolvedVariant === "feature" && imageSource) {
    return (
      <article className="group relative overflow-hidden rounded-[22px] border border-dark/10 bg-white md:col-span-2 md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:rounded-[24px]">
        <div className="relative aspect-[3/2] overflow-hidden bg-[#ece5db] md:aspect-auto md:min-h-[330px]">
          <Image
            src={imageSource}
            alt={imageAlt ?? name}
            fill
            quality={85}
            sizes="(max-width: 767px) calc(100vw - 48px), 520px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between p-5 min-[390px]:p-6 md:p-8 lg:p-10">
          <div>
            <h3
              id={titleId}
              className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-dark transition-colors duration-200 group-hover:text-primary md:text-3xl"
            >
              {name}
            </h3>
            <p
              id={descriptionId}
              className="mt-3 text-sm leading-6 text-text md:mt-4 md:max-w-xl md:text-base md:leading-7"
            >
              {description}
            </p>
          </div>
          <p
            id={priceId}
            className="mt-6 whitespace-nowrap text-xl font-bold tracking-[-0.025em] text-primary md:text-2xl"
          >
            {price.toLocaleString("sr-RS")} RSD
          </p>
        </div>

        <ProductTrigger
          name={name}
          titleId={titleId}
          descriptionId={descriptionId}
          priceId={priceId}
          onClick={onClick}
          roundedClass="rounded-[22px] md:rounded-[24px]"
        />
      </article>
    );
  }

  if (resolvedVariant === "image" && imageSource) {
    return (
      <article className="group relative grid min-w-0 grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-dark/10 py-5 min-[390px]:grid-cols-[112px_minmax(0,1fr)] md:grid-cols-[128px_minmax(0,1fr)] md:gap-5 md:py-6">
        <div className="relative aspect-[3/2] self-start overflow-hidden rounded-[14px] bg-[#ece5db] md:rounded-[16px]">
          <Image
            src={imageSource}
            alt={imageAlt ?? name}
            fill
            quality={85}
            sizes="(max-width: 389px) 96px, (max-width: 767px) 112px, 128px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3
              id={titleId}
              className="min-w-0 text-[17px] font-semibold leading-[1.25] tracking-[-0.025em] text-dark transition-colors duration-200 group-hover:text-primary md:text-lg"
            >
              {name}
            </h3>
            <p
              id={priceId}
              className="shrink-0 whitespace-nowrap text-[15px] font-bold tracking-[-0.02em] text-primary md:text-base"
            >
              {price.toLocaleString("sr-RS")} RSD
            </p>
          </div>
          <p
            id={descriptionId}
            className="mt-2 text-[13px] leading-5 text-text md:text-sm md:leading-6"
          >
            {description}
          </p>
        </div>

        <ProductTrigger
          name={name}
          titleId={titleId}
          descriptionId={descriptionId}
          priceId={priceId}
          onClick={onClick}
          roundedClass="rounded-[14px]"
        />
      </article>
    );
  }

  return (
    <article className="group relative min-w-0 border-b border-dark/10 py-5 md:py-6">
      <div className="flex items-start justify-between gap-4">
        <h3
          id={titleId}
          className="min-w-0 text-[17px] font-semibold leading-[1.25] tracking-[-0.025em] text-dark transition-colors duration-200 group-hover:text-primary md:text-lg"
        >
          {name}
        </h3>
        <p
          id={priceId}
          className="shrink-0 whitespace-nowrap text-[15px] font-bold tracking-[-0.02em] text-primary md:text-base"
        >
          {price.toLocaleString("sr-RS")} RSD
        </p>
      </div>
      <p
        id={descriptionId}
        className="mt-2 max-w-[58ch] text-[13px] leading-5 text-text md:text-sm md:leading-6"
      >
        {description}
      </p>

      <ProductTrigger
        name={name}
        titleId={titleId}
        descriptionId={descriptionId}
        priceId={priceId}
        onClick={onClick}
        roundedClass="rounded-[12px]"
      />
    </article>
  );
}

function ProductTrigger({
  name,
  titleId,
  descriptionId,
  priceId,
  onClick,
  roundedClass,
}: Readonly<{
  name: string;
  titleId: string;
  descriptionId: string;
  priceId: string;
  onClick?: () => void;
  roundedClass: string;
}>) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-labelledby={titleId}
      aria-describedby={`${descriptionId} ${priceId}`}
      onClick={onClick}
      className={`absolute inset-0 z-10 ${roundedClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      <span className="sr-only">View details for {name}</span>
    </button>
  );
}
