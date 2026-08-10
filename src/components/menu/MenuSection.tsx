"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import CategoryHero from "@/components/menu/CategoryHero";
import MenuItem from "@/components/menu/MenuItem";
import CreateYourOwn from "@/components/menu/create-your-own/CreateYourOwn";
import MenuNavigation from "@/components/menu/MenuNavigation";

import type {
  MenuCategory,
  MenuProduct,
  PublishedMenuResult,
} from "@/features/menu/types";
import type {
  PublicBuilder,
  PublishedBuildersResult,
} from "@/features/builders/types";

import Container from "@/components/ui/Container";
const ProductModal = dynamic(() => import("@/components/menu/ProductModal"), {
  ssr: false,
});

type MenuSectionProps = Readonly<{
  menu: readonly MenuCategory[];
  state: PublishedMenuResult["state"];
  builders: readonly PublicBuilder[];
  builderState: PublishedBuildersResult["state"];
}>;

export default function MenuSection({
  menu,
  state,
  builders,
  builderState,
}: MenuSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const query = search.trim();
  const hasSearchValue = search.length > 0;
  const searchActive = query.length > 0;
  const displayedMenu = useMemo<readonly MenuCategory[]>(
    () =>
      builders.length > 0 &&
      !menu.some((category) => category.kind === "builder")
        ? [
            ...menu,
            {
              id: "create-your-own",
              title: "Create Your Own",
              kind: "builder",
              products: [],
            },
          ]
        : menu,
    [builders.length, menu],
  );

  const filteredMenu = useMemo(() => {
    if (!query) {
      return displayedMenu;
    }

    const normalizedQuery = query.toLowerCase();

    return displayedMenu
      .filter((category) => category.kind !== "builder")
      .map((category) => ({
        ...category,
        products: category.products.filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.description.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [displayedMenu, query]);

  const navigationCategories = useMemo(
    () =>
      filteredMenu.map((category) => ({
        id: category.id,
        title: category.title,
      })),
    [filteredMenu]
  );
  const resultCount = searchActive
    ? filteredMenu.reduce(
        (count, category) => count + category.products.length,
        0
      )
    : 0;
  const searchStatus = searchActive
    ? resultCount === 0
      ? `No menu items found for ${query}.`
      : `${resultCount} menu ${resultCount === 1 ? "item" : "items"} found in ${
          filteredMenu.length
        } ${filteredMenu.length === 1 ? "category" : "categories"}.`
    : "";

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.focus();
  };

  return (
    <section className="bg-cream py-24">
      <Container>
        {navigationCategories.length > 0 && (
          <MenuNavigation categories={navigationCategories} />
        )}

        <div className="mb-16">
          <div className="mx-auto max-w-3xl">
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>

            <div className="relative">
              <input
                ref={searchInputRef}
                id="menu-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search pancakes, coffee, desserts..."
                aria-describedby="menu-search-status"
                autoComplete="off"
                className="w-full rounded-full border border-neutral-300 bg-white py-5 pl-14 pr-16 text-lg shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-2xl"
              >
                🔍
              </span>

              {hasSearchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear menu search"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-dark"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              )}
            </div>

            <p
              id="menu-search-status"
              role="status"
              aria-atomic="true"
              className="sr-only"
            >
              {searchStatus}
            </p>
          </div>
        </div>

        {!searchActive && displayedMenu.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-[32px] border border-black/5 bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(0,0,0,0.05)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-primary">
              {state === "error" ? "Temporarily unavailable" : "Coming soon"}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-dark">
              {state === "error"
                ? "The menu could not be loaded"
                : "No published menu items yet"}
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-text">
              {state === "error"
                ? "Please try again shortly."
                : "Our published menu will appear here as soon as it is ready."}
            </p>
          </div>
        ) : searchActive && resultCount === 0 ? (
          <div className="mx-auto max-w-3xl rounded-[32px] border border-black/5 bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(0,0,0,0.05)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[4px] text-primary">
              No results
            </p>
            <h2 className="mt-4 text-3xl font-bold text-dark">
              No menu items found
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-text">
              Try a different dish, ingredient or drink, or clear the search to
              browse the full menu.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-8 rounded-2xl bg-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredMenu.map((category) => (
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

              {category.kind === "builder" ? (
                <div className="mx-auto max-w-6xl">
                  <CreateYourOwn
                    builders={builders}
                    state={builderState}
                  />
                </div>
              ) : (
                <div className="mx-auto max-w-5xl space-y-2">
                  {category.products.map((item) => (
                    <MenuItem
                      key={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      onClick={() => setSelectedProduct(item)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </Container>

      {selectedProduct && (
        <ProductModal
          open
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
