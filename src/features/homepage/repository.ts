import "server-only";

import type {
  HomepageFeaturedProduct,
  HomepageFeaturedSection,
  HomepageImage,
  PublishedHomepageContent,
} from "@/features/homepage/types";
import { createContentImageUrl } from "@/lib/content-images";
import type { Database } from "@/lib/supabase/database.types";
import {
  type PublicStorageBucket,
  type SupabaseServerClient,
} from "@/lib/supabase/server";

type GeneratedHomepageRow =
  Database["public"]["Functions"]["get_alveto_published_homepage_v2"]["Returns"][number];

type HeroColumn =
  | "hero_title"
  | "hero_subtitle"
  | "hero_button_label"
  | "hero_button_url"
  | "hero_image_path";

type PublicHomepageRow = Pick<GeneratedHomepageRow, HeroColumn> & {
  [Column in Exclude<keyof GeneratedHomepageRow, HeroColumn>]:
    | GeneratedHomepageRow[Column]
    | null;
};

type FeaturedProductRow = PublicHomepageRow &
  Readonly<{
    featured_section_eyebrow: string;
    featured_section_title: string;
    featured_section_display_order: number;
    featured_product_id: string;
    featured_product_slug: string;
    featured_product_name: string;
    featured_product_description: string;
    featured_product_base_price_minor: number;
    featured_product_display_order: number;
  }>;

type OrderedProduct = Readonly<{
  order: number;
  product: HomepageFeaturedProduct;
}>;

type ImageFields = Readonly<{
  bucketId: string | null;
  path: string | null;
  altText: string | null;
  width: number | null;
  height: number | null;
}>;

type ValidImageFields = Readonly<{
  bucketId: PublicStorageBucket;
  path: string;
  altText: string;
  width: number;
  height: number;
}>;

type HomepageMediaPrefix =
  | "experience_morning"
  | "experience_afternoon"
  | "experience_evening"
  | "about_primary"
  | "about_secondary";

const homepageMediaPrefixes: readonly HomepageMediaPrefix[] = [
  "experience_morning",
  "experience_afternoon",
  "experience_evening",
  "about_primary",
  "about_secondary",
];
const allowedImageBuckets = new Set<PublicStorageBucket>([
  "product-images",
  "site-media",
]);
const maximumFeaturedProducts = 6;

export class PublishedHomepageRepositoryError extends Error {
  constructor() {
    super("The published homepage could not be loaded.");
    this.name = "PublishedHomepageRepositoryError";
  }
}

export interface PublishedHomepageRepository {
  get(): Promise<PublishedHomepageContent | null>;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOrder(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isPublicStorageBucket(value: unknown): value is PublicStorageBucket {
  return (
    typeof value === "string" &&
    allowedImageBuckets.has(value as PublicStorageBucket)
  );
}

function isSafeInternalLink(value: string) {
  return (
    /^#[A-Za-z][A-Za-z0-9_-]*$/.test(value) ||
    (value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes(".."))
  );
}

function isSafeImagePath(value: string) {
  return (
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("..") &&
    /\.(?:avif|jpe?g|png|webp)$/i.test(value)
  );
}

function isHeroRow(row: PublicHomepageRow) {
  return (
    isNonEmptyString(row.hero_title) &&
    isNonEmptyString(row.hero_subtitle) &&
    isNonEmptyString(row.hero_button_label) &&
    isNonEmptyString(row.hero_button_url) &&
    isSafeInternalLink(row.hero_button_url) &&
    isNonEmptyString(row.hero_image_path) &&
    isSafeImagePath(row.hero_image_path)
  );
}

function getImageFields(
  row: PublicHomepageRow,
  prefix: HomepageMediaPrefix,
): ImageFields {
  return {
    bucketId: row[`${prefix}_image_bucket_id`],
    path: row[`${prefix}_image_storage_path`],
    altText: row[`${prefix}_image_alt_text`],
    width: row[`${prefix}_image_width`],
    height: row[`${prefix}_image_height`],
  };
}

function getFeaturedImageFields(row: PublicHomepageRow): ImageFields {
  return {
    bucketId: row.image_bucket_id,
    path: row.image_storage_path,
    altText: row.image_alt_text,
    width: row.image_width,
    height: row.image_height,
  };
}

function isEmptyImage(fields: ImageFields) {
  return Object.values(fields).every((value) => value === null);
}

function isValidImage(fields: ImageFields): fields is ValidImageFields {
  return (
    isPublicStorageBucket(fields.bucketId) &&
    isNonEmptyString(fields.path) &&
    isNonEmptyString(fields.altText) &&
    isPositiveInteger(fields.width) &&
    isPositiveInteger(fields.height)
  );
}

function hasValidOptionalImage(fields: ImageFields) {
  return isEmptyImage(fields) || isValidImage(fields);
}

function isEmptyProductRow(row: PublicHomepageRow) {
  return (
    row.featured_product_id === null &&
    row.featured_product_slug === null &&
    row.featured_product_name === null &&
    row.featured_product_description === null &&
    row.featured_product_base_price_minor === null &&
    row.featured_product_display_order === null &&
    isEmptyImage(getFeaturedImageFields(row))
  );
}

function isEmptySectionRow(row: PublicHomepageRow) {
  return (
    row.featured_section_eyebrow === null &&
    row.featured_section_title === null &&
    row.featured_section_display_order === null &&
    isEmptyProductRow(row)
  );
}

function isSectionRow(row: PublicHomepageRow) {
  return (
    isNonEmptyString(row.featured_section_eyebrow) &&
    isNonEmptyString(row.featured_section_title) &&
    isOrder(row.featured_section_display_order)
  );
}

function isProductRow(row: PublicHomepageRow): row is FeaturedProductRow {
  return (
    isSectionRow(row) &&
    isNonEmptyString(row.featured_product_id) &&
    isNonEmptyString(row.featured_product_slug) &&
    isNonEmptyString(row.featured_product_name) &&
    typeof row.featured_product_description === "string" &&
    typeof row.featured_product_base_price_minor === "number" &&
    Number.isInteger(row.featured_product_base_price_minor) &&
    row.featured_product_base_price_minor >= 0 &&
    isOrder(row.featured_product_display_order) &&
    hasValidOptionalImage(getFeaturedImageFields(row))
  );
}

function hasValidHomepageImages(row: PublicHomepageRow) {
  return homepageMediaPrefixes.every((prefix) =>
    hasValidOptionalImage(getImageFields(row, prefix)),
  );
}

function hasSameHero(
  row: PublicHomepageRow,
  firstRow: PublicHomepageRow,
) {
  return (
    row.hero_title === firstRow.hero_title &&
    row.hero_subtitle === firstRow.hero_subtitle &&
    row.hero_button_label === firstRow.hero_button_label &&
    row.hero_button_url === firstRow.hero_button_url &&
    row.hero_image_path === firstRow.hero_image_path
  );
}

function hasSameHomepageImages(
  row: PublicHomepageRow,
  firstRow: PublicHomepageRow,
) {
  return homepageMediaPrefixes.every((prefix) => {
    const image = getImageFields(row, prefix);
    const firstImage = getImageFields(firstRow, prefix);

    return (
      image.bucketId === firstImage.bucketId &&
      image.path === firstImage.path &&
      image.altText === firstImage.altText &&
      image.width === firstImage.width &&
      image.height === firstImage.height
    );
  });
}

function mapHomepageImage(
  fields: ImageFields,
  imageKey: string,
): HomepageImage | null {
  if (!isValidImage(fields)) {
    return null;
  }

  const storageImage = {
    bucketId: fields.bucketId,
    path: fields.path,
  };

  return {
    url: createContentImageUrl("homepage", imageKey, storageImage),
    altText: fields.altText,
    width: fields.width,
    height: fields.height,
    storageImage,
  };
}

function mapProduct(row: FeaturedProductRow): HomepageFeaturedProduct {
  const imageFields = getFeaturedImageFields(row);
  const image = mapHomepageImage(imageFields, row.featured_product_id);

  return {
    id: row.featured_product_id,
    slug: row.featured_product_slug,
    name: row.featured_product_name,
    description: row.featured_product_description,
    price: row.featured_product_base_price_minor / 100,
    image: image
      ? createContentImageUrl(
          "signature",
          row.featured_product_id,
          image.storageImage,
        )
      : undefined,
    imageAlt: image?.altText ?? row.featured_product_name,
    storageImage: image?.storageImage,
  };
}

export function createPublishedHomepageRepository(
  supabase: SupabaseServerClient,
): PublishedHomepageRepository {
  return {
    async get() {
      const rows =
        (await supabase.getPublishedHomepageRows()) as unknown as PublicHomepageRow[];

      if (rows.length === 0) {
        return null;
      }

      const firstRow = rows[0];

      if (!isHeroRow(firstRow) || !hasValidHomepageImages(firstRow)) {
        throw new PublishedHomepageRepositoryError();
      }

      const hasSection = !isEmptySectionRow(firstRow);

      if (hasSection && !isSectionRow(firstRow)) {
        throw new PublishedHomepageRepositoryError();
      }

      const productRows = new Map<string, FeaturedProductRow>();

      rows.forEach((row) => {
        if (
          !isHeroRow(row) ||
          !hasSameHero(row, firstRow) ||
          !hasValidHomepageImages(row) ||
          !hasSameHomepageImages(row, firstRow)
        ) {
          throw new PublishedHomepageRepositoryError();
        }

        if (!hasSection) {
          if (!isEmptySectionRow(row)) {
            throw new PublishedHomepageRepositoryError();
          }

          return;
        }

        if (
          !isSectionRow(row) ||
          row.featured_section_eyebrow !==
            firstRow.featured_section_eyebrow ||
          row.featured_section_title !== firstRow.featured_section_title ||
          row.featured_section_display_order !==
            firstRow.featured_section_display_order
        ) {
          throw new PublishedHomepageRepositoryError();
        }

        if (isEmptyProductRow(row)) {
          return;
        }

        if (!isProductRow(row) || productRows.has(row.featured_product_id)) {
          throw new PublishedHomepageRepositoryError();
        }

        productRows.set(row.featured_product_id, row);
      });

      if (productRows.size > maximumFeaturedProducts) {
        throw new PublishedHomepageRepositoryError();
      }

      const orderedProducts: OrderedProduct[] = [...productRows.values()].map(
        (row) => ({
          order: row.featured_product_display_order,
          product: mapProduct(row),
        }),
      );
      const featuredSection: HomepageFeaturedSection | null = hasSection
        ? {
            eyebrow: firstRow.featured_section_eyebrow as string,
            title: firstRow.featured_section_title as string,
            displayOrder: firstRow.featured_section_display_order as number,
            products: orderedProducts
              .sort(
                (left, right) =>
                  left.order - right.order ||
                  left.product.id.localeCompare(right.product.id),
              )
              .map(({ product }) => product),
          }
        : null;

      return {
        hero: {
          title: firstRow.hero_title,
          subtitle: firstRow.hero_subtitle,
          buttonLabel: firstRow.hero_button_label,
          buttonUrl: firstRow.hero_button_url,
          imagePath: firstRow.hero_image_path,
        },
        featuredSection,
        experienceImages: {
          morning: mapHomepageImage(
            getImageFields(firstRow, "experience_morning"),
            "experience-morning",
          ),
          afternoon: mapHomepageImage(
            getImageFields(firstRow, "experience_afternoon"),
            "experience-afternoon",
          ),
          evening: mapHomepageImage(
            getImageFields(firstRow, "experience_evening"),
            "experience-evening",
          ),
        },
        aboutImages: {
          primary: mapHomepageImage(
            getImageFields(firstRow, "about_primary"),
            "about-primary",
          ),
          secondary: mapHomepageImage(
            getImageFields(firstRow, "about_secondary"),
            "about-secondary",
          ),
        },
      };
    },
  };
}
