import type { MenuProduct } from "@/features/menu/types";

export type HomepageHero = Readonly<{
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
  imagePath: string;
}>;

export type HomepageFeaturedSection = Readonly<{
  eyebrow: string;
  title: string;
  displayOrder: number;
  products: readonly MenuProduct[];
}>;

export type PublishedHomepageContent = Readonly<{
  hero: HomepageHero;
  featuredSection: HomepageFeaturedSection | null;
}>;

export type PublishedHomepageResult = Readonly<{
  content: PublishedHomepageContent | null;
  state: "ready" | "empty" | "error";
}>;
