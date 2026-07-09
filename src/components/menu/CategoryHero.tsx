import Image from "next/image";

type CategoryHeroProps = {
  title: string;
  image?: string;
};

export default function CategoryHero({
  title,
  image,
}: CategoryHeroProps) {
  const heroImage =
    image && image.trim().length > 0
      ? image
      : "/images/menu-hero.jpg";

  return (
    <section className="relative mb-16 h-[420px] overflow-hidden rounded-[40px]">

      <Image
        src={heroImage}
        alt={title}
        fill
        priority
        className="scale-105 object-cover transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

      {/* Light blur */}
      <div className="absolute inset-0 backdrop-[1px]" />

      <div className="absolute bottom-12 left-12 z-10">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[8px] text-white/70">
          ALVETO
        </p>

        <h2 className="max-w-3xl text-5xl font-extrabold leading-none text-white md:text-7xl">
          {title}
        </h2>

      </div>

    </section>
  );
}