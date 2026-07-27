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
      role="button"
      tabIndex={0}
      onClick={() => onClick?.()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/10 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex flex-col overflow-hidden md:flex-row">
        {hasImage && (
          <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-72 md:flex-shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              quality={90}
              sizes="(max-width:768px) 100vw, 288px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            {badge && (
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[2px] text-primary shadow-lg backdrop-blur">
                {badge}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-dark transition-colors duration-300 group-hover:text-primary md:text-3xl">
              {name}
            </h3>

            <p className="mt-4 text-sm leading-7 text-text md:text-base md:leading-8">
              {description}
            </p>
          </div>

          <div className="mt-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[4px] text-neutral-400">
                Price
              </p>

              <p className="mt-2 text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
                {price.toLocaleString("sr-RS")} RSD
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
              <span>View Details</span>

              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
