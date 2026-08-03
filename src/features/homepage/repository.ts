import "server-only";

import type {
  HomepageFeaturedSection,
  PublishedHomepageContent,
} from "@/features/homepage/types";
import { getProductImageFallback } from "@/features/menu/presentation";
import type { MenuProduct } from "@/features/menu/types";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";

type GeneratedHomepageRow =
  Database["public"]["Functions"]["get_alveto_published_homepage"]["Returns"][number];

type PublicHomepageRow = Omit<
  GeneratedHomepageRow,
  | "featured_section_eyebrow"
  | "featured_section_title"
  | "featured_section_display_order"
  | "featured_product_id"
  | "featured_product_slug"
  | "featured_product_name"
  | "featured_product_description"
  | "featured_product_base_price_minor"
  | "featured_product_display_order"
  | "image_storage_path"
  | "image_alt_text"
> &
  Readonly<{
    featured_section_eyebrow: string | null;
    featured_section_title: string | null;
    featured_section_display_order: number | null;
    featured_product_id: string | null;
    featured_product_slug: string | null;
    featured_product_name: string | null;
    featured_product_description: string | null;
    featured_product_base_price_minor: number | null;
    featured_product_display_order: number | null;
    image_storage_path: string | null;
    image_alt_text: string | null;
  }>;

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
  product: MenuProduct;
}>;

const signedImageLifetimeSeconds = 86_400;

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
  return typeof value === "string" && value.length > 0;
}

function isOrder(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isSafeInternalLink(value: string) {
  return /^#[A-Za-z][A-Za-z0-9_-]*$/.test(value) ||
    (value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes(".."));
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

function isEmptyProductRow(row: PublicHomepageRow) {
  return (
    row.featured_product_id === null &&
    row.featured_product_slug === null &&
    row.featured_product_name === null &&
    row.featured_product_description === null &&
    row.featured_product_base_price_minor === null &&
    row.featured_product_display_order === null &&
    row.image_storage_path === null &&
    row.image_alt_text === null
  );
}

function isProductRow(row: PublicHomepageRow): row is FeaturedProductRow {
  const hasValidImage =
    (row.image_storage_path === null && row.image_alt_text === null) ||
    (isNonEmptyString(row.image_storage_path) &&
      isNonEmptyString(row.image_alt_text));

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
    hasValidImage
  );
}

function hasSameHero(
  row: PublicHomepageRow,
  content: PublishedHomepageContent,
) {
  return (
    row.hero_title === content.hero.title &&
    row.hero_subtitle === content.hero.subtitle &&
    row.hero_button_label === content.hero.buttonLabel &&
    row.hero_button_url === content.hero.buttonUrl &&
    row.hero_image_path === content.hero.imagePath
  );
}

function getErrorDiagnostic(error: unknown) {
  const status =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : undefined;

  return {
    name: error instanceof Error ? error.name : "UnknownError",
    ...(status !== undefined ? { status } : {}),
  };
}

async function getSignedImages(
  supabase: SupabaseServerClient,
  paths: readonly string[],
) {
  if (paths.length === 0) {
    return new Map<string, string>();
  }

  try {
    const signedImages = await supabase.createSignedImageUrls(
      paths,
      signedImageLifetimeSeconds,
    );

    return new Map(
      signedImages.map((image) => [image.path, image.signedUrl]),
    );
  } catch (error) {
    console.error(
      "[public-homepage] featured image signing failed",
      getErrorDiagnostic(error),
    );
    return new Map<string, string>();
  }
}

function mapProduct(
  row: FeaturedProductRow,
  signedImageByPath: ReadonlyMap<string, string>,
): MenuProduct {
  const signedImage = row.image_storage_path
    ? signedImageByPath.get(row.image_storage_path)
    : undefined;

  return {
    id: row.featured_product_id,
    slug: row.featured_product_slug,
    name: row.featured_product_name,
    description: row.featured_product_description,
    price: row.featured_product_base_price_minor / 100,
    image:
      signedImage ?? getProductImageFallback(row.featured_product_slug),
    imageAlt: row.image_alt_text ?? row.featured_product_name,
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

      if (!isHeroRow(firstRow)) {
        throw new PublishedHomepageRepositoryError();
      }

      const hasSection = !isEmptySectionRow(firstRow);

      if (hasSection && !isSectionRow(firstRow)) {
        throw new PublishedHomepageRepositoryError();
      }

      const content: PublishedHomepageContent = {
        hero: {
          title: firstRow.hero_title,
          subtitle: firstRow.hero_subtitle,
          buttonLabel: firstRow.hero_button_label,
          buttonUrl: firstRow.hero_button_url,
          imagePath: firstRow.hero_image_path,
        },
        featuredSection: hasSection
          ? {
              eyebrow: firstRow.featured_section_eyebrow as string,
              title: firstRow.featured_section_title as string,
              displayOrder: firstRow.featured_section_display_order as number,
              products: [],
            }
          : null,
      };
      const productRows = new Map<string, FeaturedProductRow>();

      rows.forEach((row) => {
        if (!isHeroRow(row) || !hasSameHero(row, content)) {
          throw new PublishedHomepageRepositoryError();
        }

        if (!content.featuredSection) {
          if (!isEmptySectionRow(row)) {
            throw new PublishedHomepageRepositoryError();
          }

          return;
        }

        if (
          !isSectionRow(row) ||
          row.featured_section_eyebrow !== content.featuredSection.eyebrow ||
          row.featured_section_title !== content.featuredSection.title ||
          row.featured_section_display_order !==
            content.featuredSection.displayOrder
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

      if (!content.featuredSection) {
        return content;
      }

      const imagePaths = [
        ...new Set(
          [...productRows.values()].flatMap((product) =>
            product.image_storage_path ? [product.image_storage_path] : [],
          ),
        ),
      ];
      const signedImageByPath = await getSignedImages(supabase, imagePaths);
      const orderedProducts: OrderedProduct[] = [...productRows.values()].map(
        (row) => ({
          order: row.featured_product_display_order,
          product: mapProduct(row, signedImageByPath),
        }),
      );
      const featuredSection: HomepageFeaturedSection = {
        ...content.featuredSection,
        products: orderedProducts
          .sort(
            (left, right) =>
              left.order - right.order ||
              left.product.id.localeCompare(right.product.id),
          )
          .map(({ product }) => product),
      };

      return {
        ...content,
        featuredSection,
      };
    },
  };
}
