export type MenuProduct = Readonly<{
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageAlt?: string;
}>;

export type MenuCategory = Readonly<{
  id: string;
  title: string;
  image?: string;
  kind: "products" | "builder";
  products: readonly MenuProduct[];
}>;

export type PublishedMenuResult = Readonly<{
  menu: readonly MenuCategory[];
  state: "ready" | "empty" | "error";
}>;
