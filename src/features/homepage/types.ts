import type { MenuProduct } from "@/features/menu/types";
import type { StorageImageReference } from "@/lib/supabase/server";

export type HomepageHero = Readonly<{
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonUrl: string;
  imagePath: string;
}>;

export type HomepageImage = Readonly<{
  url: string;
  altText: string;
  width: number;
  height: number;
  storageImage: StorageImageReference;
}>;

export type HomepageFeaturedProduct = MenuProduct &
  Readonly<{
    storageImage?: StorageImageReference;
  }>;

export type HomepageExperienceImages = Readonly<{
  morning: HomepageImage | null;
  afternoon: HomepageImage | null;
  evening: HomepageImage | null;
}>;

export type HomepageAboutImages = Readonly<{
  primary: HomepageImage | null;
  secondary: HomepageImage | null;
}>;

export type HomepageFeaturedSection = Readonly<{
  eyebrow: string;
  title: string;
  displayOrder: number;
  products: readonly HomepageFeaturedProduct[];
}>;

export type PublishedHomepageContent = Readonly<{
  hero: HomepageHero;
  featuredSection: HomepageFeaturedSection | null;
  experienceImages: HomepageExperienceImages;
  aboutImages: HomepageAboutImages;
}>;

export type PublishedHomepageResult = Readonly<{
  content: PublishedHomepageContent | null;
  state: "ready" | "empty" | "error";
}>;
