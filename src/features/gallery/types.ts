import type { StorageImageReference } from "@/lib/supabase/server";

export interface PublishedGalleryItem {
  id: string;
  title: string;
  description: string | null;
  altText: string;
  caption: string | null;
  displayOrder: number;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  storageImage: StorageImageReference;
}

export interface PublishedGalleryCollection {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
  items: readonly PublishedGalleryItem[];
}

export type PublishedGalleryResult = Readonly<{
  collections: readonly PublishedGalleryCollection[];
  state: "ready" | "empty" | "error";
}>;
