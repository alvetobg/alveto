import "server-only";

import type {
  PublishedGalleryCollection,
  PublishedGalleryItem,
} from "@/features/gallery/types";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";

type GeneratedGalleryRow =
  Database["public"]["Functions"]["get_alveto_published_gallery"]["Returns"][number];

type RuntimeGalleryRow = Omit<
  GeneratedGalleryRow,
  "collection_description" | "item_caption" | "item_description"
> & {
  collection_description: string | null;
  item_caption: string | null;
  item_description: string | null;
};

const signedUrlLifetimeSeconds = 60 * 60;
const allowedImageMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
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

      const paths = [...new Set(rows.map((row) => row.image_storage_path))];
      const signedImages = await supabase.createSignedImageUrls(
        paths,
        signedUrlLifetimeSeconds,
      );
      const signedUrlByPath = new Map(
        signedImages.map((image) => [image.path, image.signedUrl]),
      );
      const itemIds = new Set<string>();
      const collections = new Map<string, PublishedGalleryCollection>();

      for (const row of rows) {
        if (itemIds.has(row.item_id)) {
          throw new GalleryPublicRepositoryError();
        }

        itemIds.add(row.item_id);
        const imageUrl = signedUrlByPath.get(row.image_storage_path);

        if (!imageUrl) {
          throw new GalleryPublicRepositoryError();
        }

        const item = {
          id: row.item_id,
          title: row.item_title.trim(),
          description: row.item_description?.trim() ?? null,
          altText: row.item_alt_text.trim(),
          caption: row.item_caption?.trim() ?? null,
          displayOrder: row.item_display_order,
          imageUrl,
          imageWidth: row.image_width,
          imageHeight: row.image_height,
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
