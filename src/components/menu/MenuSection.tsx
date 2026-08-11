"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import CategoryHero from "@/components/menu/CategoryHero";
import { CloseIcon, SearchIcon } from "@/components/menu/MenuIcons";
import MenuItem from "@/components/menu/MenuItem";
import MenuNavigation from "@/components/menu/MenuNavigation";
import CreateYourOwn from "@/components/menu/create-your-own/CreateYourOwn";
import type {
  MenuCategory,
  MenuProduct,
  PublishedMenuResult,
} from "@/features/menu/types";
import type {
  PublicBuilder,
  PublishedBuildersResult,
} from "@/features/builders/types";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeProductModal = useCallback(() => setModalOpen(false), []);
  const clearExitedProduct = useCallback(() => setSelectedProduct(null), []);
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
    if (!query) return displayedMenu;

    const normalizedQuery = query.toLowerCase();

    return displayedMenu
      .filter((category) => category.kind !== "builder")
      .map((category) => ({
        ...category,
        products: category.products.filter(
          (product) =>
            product.name.toLowerCase().includes(normalizedQuery) ||
            product.description.toLowerCase().includes(normalizedQuery),
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
    [filteredMenu],
  );
  const catalogueProductCount = displayedMenu.reduce(
    (count, category) => count + category.products.length,
    0,
  );
  const resultCount = searchActive
    ? filteredMenu.reduce(
        (count, category) => count + category.products.length,
        0,
      )
    : 0;
  const searchStatus = searchActive
    ? resultCount === 0
      ? `No menu items found for ${query}.`
      : `${resultCount} menu ${resultCount === 1 ? "item" : "items"} found in ${
          filteredMenu.length
        } ${filteredMenu.length === 1 ? "category" : "categories"}.`
    : `Browse all ${catalogueProductCount} menu items across ${displayedMenu.length} categories.`;

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.focus();
  };

  return (
    <section className="bg-cream pb-20 pt-9 md:pb-28 md:pt-12">
      <Container>
        <div className="mx-auto mb-7 max-w-3xl md:mb-9">
          <label
            htmlFor="menu-search"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-dark/65"
          >
            Search the menu
          </label>

          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dark/55" />
            <input
              ref={searchInputRef}
              id="menu-search"
              type="text"
              role="searchbox"
              inputMode="search"
              enterKeyHint="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try pancakes, coffee or an ingredient"
              aria-describedby="menu-search-status"
              autoComplete="off"
              className="min-h-14 w-full rounded-[16px] border border-dark/14 bg-white py-3.5 pl-12 pr-14 text-base text-dark outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text/65 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            {hasSearchValue ? (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear menu search"
                className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[12px] text-dark/60 transition-colors duration-150 hover:bg-cream hover:text-dark"
              >
                <CloseIcon />
              </button>
            ) : null}
          </div>

          <p
            id="menu-search-status"
            role="status"
            aria-atomic="true"
            className="min-h-6 pt-2 text-sm leading-5 text-text"
          >
            {searchStatus}
          </p>
        </div>

        {navigationCategories.length > 0 ? (
          <MenuNavigation categories={navigationCategories} />
        ) : null}

        {!searchActive && displayedMenu.length === 0 ? (
          <EmptyCatalogue state={state} />
        ) : searchActive && resultCount === 0 ? (
          <NoSearchResults onClear={clearSearch} />
        ) : (
          <div className="mt-12 md:mt-16">
            {filteredMenu.map((category) => {
              const originalIndex = Math.max(
                0,
                displayedMenu.findIndex((item) => item.id === category.id),
              );

              return (
                <section
                  key={category.id}
                  id={category.id}
                  data-category
                  className="mb-20 scroll-mt-[calc(9rem+env(safe-area-inset-top))] last:mb-0 md:mb-28 md:scroll-mt-[168px]"
                >
                  <CategoryHero
                    title={category.title}
                    image={
                      category.id === "coffee-beverages"
                        ? category.image
                        : undefined
                    }
                    index={originalIndex + 1}
                    total={displayedMenu.length}
                    itemCount={
                      category.kind === "products"
                        ? category.products.length
                        : undefined
                    }
                  />

                  {category.kind === "builder" ? (
                    <div className="mx-auto max-w-6xl">
                      <CreateYourOwn
                        builders={builders}
                        state={builderState}
                      />
                    </div>
                  ) : (
                    <div className="grid border-t border-dark/10 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
                      {category.products.map((item, itemIndex) => {
                        const isFeature =
                          category.id === "savory-selection" && itemIndex === 0;

                        return (
                          <MenuItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            imageAlt={item.imageAlt}
                            variant={
                              isFeature
                                ? "feature"
                                : item.image
                                  ? "image"
                                  : "text"
                            }
                            onClick={() => {
                              setSelectedProduct(item);
                              setModalOpen(true);
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </Container>

      {selectedProduct ? (
        <ProductModal
          open={modalOpen}
          product={selectedProduct}
          onClose={closeProductModal}
          onExited={clearExitedProduct}
        />
      ) : null}
    </section>
  );
}

function EmptyCatalogue({
  state,
}: Readonly<{ state: PublishedMenuResult["state"] }>) {
  return (
    <div className="mx-auto mt-14 max-w-2xl border-y border-dark/12 py-12 text-center md:mt-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {state === "error" ? "Temporarily unavailable" : "Coming soon"}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-dark">
        {state === "error"
          ? "The menu could not be loaded"
          : "No published menu items yet"}
      </h2>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-text">
        {state === "error"
          ? "Please try again shortly."
          : "Our published menu will appear here as soon as it is ready."}
      </p>
    </div>
  );
}

function NoSearchResults({ onClear }: Readonly<{ onClear: () => void }>) {
  return (
    <div className="mx-auto mt-14 max-w-2xl border-y border-dark/12 py-12 text-center md:mt-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        No results
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-dark">
        Nothing matched that search
      </h2>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-text">
        Try another dish or ingredient, or return to the complete menu.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 min-h-12 rounded-[14px] border border-primary bg-primary px-6 font-semibold text-dark transition-colors duration-150 hover:border-primary-hover hover:bg-primary-hover"
      >
        Clear search
      </button>
    </div>
  );
}
