import "server-only";

import type {
  PublishedGalleryCollection,
  PublishedGalleryItem,
} from "@/features/gallery/types";
import type { Database } from "@/lib/supabase/database.types";
import { createContentImageUrl } from "@/lib/content-images";
import {
  type PublicStorageBucket,
  type SupabaseServerClient,
} from "@/lib/supabase/server";

type GeneratedGalleryRow =
  Database["public"]["Functions"]["get_alveto_published_gallery_v2"]["Returns"][number];

type RuntimeGalleryRow = Omit<
  GeneratedGalleryRow,
  "collection_description" | "item_caption" | "item_description"
> & {
  collection_description: string | null;
  item_caption: string | null;
  item_description: string | null;
};

const allowedImageMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const allowedImageBuckets = new Set<PublicStorageBucket>([
  "product-images",
  "site-media",
]);

export class GalleryPublicRepositoryError extends Error {
  constructor() {
    super("The published Gallery could not be loaded.");
    this.name = "GalleryPublicRepositoryError";
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalText(value: unknown): value is string | null {
  return value === null || isNonEmptyString(value);
}

function isPublicStorageBucket(value: unknown): value is PublicStorageBucket {
  return (
    typeof value === "string" &&
    allowedImageBuckets.has(value as PublicStorageBucket)
  );
}

function isGalleryRow(value: unknown): value is RuntimeGalleryRow {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const row = value as Record<string, unknown>;

  return (
    isNonEmptyString(row.collection_id) &&
    isNonEmptyString(row.collection_title) &&
    isOptionalText(row.collection_description) &&
    Number.isInteger(row.collection_display_order) &&
    isNonEmptyString(row.item_id) &&
    isNonEmptyString(row.item_title) &&
    isOptionalText(row.item_description) &&
    isNonEmptyString(row.item_alt_text) &&
    isOptionalText(row.item_caption) &&
    Number.isInteger(row.item_display_order) &&
    isPublicStorageBucket(row.image_bucket_id) &&
    isNonEmptyString(row.image_storage_path) &&
    isNonEmptyString(row.image_mime_type) &&
    allowedImageMimeTypes.has(row.image_mime_type) &&
    Number.isInteger(row.image_width) &&
    Number(row.image_width) > 0 &&
    Number.isInteger(row.image_height) &&
    Number(row.image_height) > 0
  );
}

export function createPublishedGalleryRepository(
  supabase: SupabaseServerClient,
) {
  return {
    async list(): Promise<PublishedGalleryCollection[]> {
      const rawRows = await supabase.getPublishedGalleryRows();

      if (!rawRows.every(isGalleryRow)) {
        throw new GalleryPublicRepositoryError();
      }

      const rows = rawRows as RuntimeGalleryRow[];

      if (rows.length === 0) {
        return [];
      }

      const itemIds = new Set<string>();
      const collections = new Map<string, PublishedGalleryCollection>();

      for (const row of rows) {
        if (itemIds.has(row.item_id)) {
          throw new GalleryPublicRepositoryError();
        }

        itemIds.add(row.item_id);
        const storageImage = {
          bucketId: row.image_bucket_id as PublicStorageBucket,
          path: row.image_storage_path,
        };
        const item = {
          id: row.item_id,
          title: row.item_title.trim(),
          description: row.item_description?.trim() ?? null,
          altText: row.item_alt_text.trim(),
          caption: row.item_caption?.trim() ?? null,
          displayOrder: row.item_display_order,
          imageUrl: createContentImageUrl("gallery", row.item_id, storageImage),
          imageWidth: row.image_width,
          imageHeight: row.image_height,
          storageImage,
        };
        const existingCollection = collections.get(row.collection_id);

        if (existingCollection) {
          (existingCollection.items as PublishedGalleryItem[]).push(item);
          continue;
        }

        collections.set(row.collection_id, {
          id: row.collection_id,
          title: row.collection_title.trim(),
          description: row.collection_description?.trim() ?? null,
          displayOrder: row.collection_display_order,
          items: [item],
        });
      }

      return [...collections.values()];
    },
  };
}
