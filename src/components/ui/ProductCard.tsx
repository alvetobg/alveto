import Image from "next/image";

type ProductCardProps = {
  image: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductCard({
  image,
  name,
  description,
  price,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[40px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      <div className="relative h-[380px] overflow-hidden">

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

      </div>

      <div className="p-8">

        <div className="flex items-center justify-between">

          <h3 className="text-2xl font-semibold text-dark">
            {name}
          </h3>

          <span className="font-semibold text-primary">
            {price.toLocaleString("sr-RS")} RSD
          </span>

        </div>

        <p className="mt-4 leading-7 text-gray-600">
          {description}
        </p>

        <button className="mt-8 rounded-full border border-dark px-6 py-3 text-sm font-semibold transition hover:bg-dark hover:text-white">
          View Product
        </button>

      </div>

    </article>
  );
}