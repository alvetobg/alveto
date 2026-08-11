import Image from "next/image";

import { getOptionalImageSource } from "@/lib/images";

type CategoryHeroProps = Readonly<{
  title: string;
  image?: string;
  index: number;
  total: number;
  itemCount?: number;
}>;

export default function CategoryHero({
  title,
  image,
  index,
  total,
  itemCount,
}: CategoryHeroProps) {
  const imageSource = getOptionalImageSource(image);

  return (
    <header
      className={`mb-7 border-t border-dark/12 pt-7 md:mb-9 md:pt-10 ${
        imageSource
          ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] md:items-end md:gap-10"
          : ""
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text/80">
          <span>
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {typeof itemCount === "number" ? (
            <>
              <span aria-hidden="true" className="h-px w-6 bg-primary" />
              <span>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </>
          ) : null}
        </div>

        <h2 className="mt-3 max-w-3xl text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] text-dark min-[390px]:text-[34px] md:mt-4 md:text-[48px] lg:text-[52px]">
          {title}
        </h2>
      </div>

      {imageSource ? (
        <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-[18px] bg-[#ece5db] md:mt-0 md:rounded-[20px]">
          <Image
            src={imageSource}
            alt=""
            fill
            quality={85}
            sizes="(max-width: 767px) calc(100vw - 48px), 440px"
            className="object-cover object-[50%_62%]"
          />
        </div>
      ) : null}
    </header>
  );
}
