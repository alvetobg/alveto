import Image from "next/image";

type MenuItemProps = {
  name: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  onClick?: () => void;
};

export default function MenuItem({
  name,
  description,
  price,
  image,
  badge,
  onClick,
}: MenuItemProps) {
  const hasImage =
    !!image && image.trim().length > 0;

  return (
    <article
      onClick={() => onClick?.()}
      className="group cursor-pointer overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="flex flex-col overflow-hidden md:flex-row">

        {hasImage && (
          <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-72 md:flex-shrink-0">

            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

            {badge && (
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-primary shadow-lg backdrop-blur">
                {badge}
              </span>
            )}

          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">

          <div>

            <h3 className="text-2xl font-bold text-dark transition-colors duration-300 group-hover:text-primary md:text-3xl">
              {name}
            </h3>
<p className="mt-4 text-sm leading-7 text-text md:text-base md:leading-8">
            
              {description}
            </p>

          </div>

          <div className="mt-8 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[4px] text-neutral-400">
                Price
              </p>

              <p className="mt-2 text-2xl font-extrabold text-primary md:text-3xl">
                {price.toLocaleString("sr-RS")} RSD
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-2">

              View Details

              <span className="text-xl">→</span>

            </div>

          </div>

        </div>

      </div>
    </article>
  );
}