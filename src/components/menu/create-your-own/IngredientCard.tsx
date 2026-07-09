import Image from "next/image";

export type IngredientCardProps = {
  name: string;
  image: string;
  price: number;
  selected: boolean;
  onClick: () => void;
};

export default function IngredientCard({
  name,
  image,
  price,
  selected,
  onClick,
}: IngredientCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[32px] border bg-white text-left transition-all duration-300 ${
        selected
          ? "scale-[1.02] border-primary ring-2 ring-primary shadow-2xl"
          : "border-neutral-200 hover:-translate-y-2 hover:scale-[1.02] hover:border-primary hover:shadow-xl"
      }`}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {selected && (
          <>
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-primary backdrop-blur">
              Selected
            </div>

            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-xl transition-all duration-300">
              ✓
            </div>
          </>
        )}
      </div>

      <div className="space-y-4 p-6">
        <h3 className="min-h-[56px] text-lg font-bold leading-7 text-dark">
          {name}
        </h3>

        <div className="inline-flex rounded-full bg-primary/10 px-4 py-2">
          <p className="text-sm font-bold text-primary">
            +{price.toLocaleString("sr-RS")} RSD
          </p>
        </div>
      </div>
    </button>
  );
}