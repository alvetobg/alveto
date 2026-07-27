"use client";

import { useMemo, useState } from "react";
import CategoryHero from "@/components/menu/CategoryHero";
import MenuItem from "@/components/menu/MenuItem";
import CreateYourOwn from "@/components/menu/create-your-own/CreateYourOwn";
import MenuNavigation from "@/components/menu/MenuNavigation";

import { menu, type MenuProduct } from "@/data/menu";

import Container from "@/components/ui/Container";
import ProductModal from "@/components/menu/ProductModal";

export default function MenuSection() {
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const [search, setSearch] = useState("");
  const filteredMenu = useMemo(() => {
  if (!search.trim()) {
    return menu;
  }

  const query = search.toLowerCase();

  return menu
    .map((category) => ({
      ...category,
      products: category.products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.description
            .toLowerCase()
            .includes(query)
      ),
    }))
    .filter(
      (category) =>
        category.id === "create-your-own" ||
        category.products.length > 0
    );
}, [search]);

  return (
    <section className="bg-cream py-24">
      <Container>
        <MenuNavigation
  categories={menu.map((category) => ({
    id: category.id,
    title: category.title,
  }))}
/>
        <div className="mb-16">

  <div className="mx-auto max-w-3xl">

    <div className="relative">

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search pancakes, coffee, desserts..."
        className="w-full rounded-full border border-neutral-300 bg-white px-14 py-5 text-lg shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      />

      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">
        🔍
      </span>

    </div>

  </div>

</div>
        {filteredMenu.map((category) => (
          <section
  key={category.id}
  id={category.id}
  data-category
  className="mb-32 scroll-mt-44"
>
            <CategoryHero
              title={category.title}
              image={category.image}
            />

            {category.id === "create-your-own" ? (
              <div className="mx-auto max-w-6xl">
                <CreateYourOwn />
              </div>
            ) : (
              <div className="mx-auto max-w-5xl space-y-2">
                {category.products.map((item) => (
                  <MenuItem
                    key={`${category.id}-${item.name}-${item.price}`}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    badge={item.badge}
                    onClick={() => setSelectedProduct(item)}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </Container>

      <ProductModal
        open={selectedProduct !== null}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
