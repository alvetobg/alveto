import "server-only";

import {
  getCategoryHeroImage,
  getProductImageFallback,
} from "@/features/menu/presentation";
import type { MenuCategory, MenuProduct } from "@/features/menu/types";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";

type GeneratedPublicMenuRow =
  Database["public"]["Functions"]["get_alveto_published_menu"]["Returns"][number];

type PublicMenuRow = Omit<
  GeneratedPublicMenuRow,
  | "product_id"
  | "product_slug"
  | "product_name"
  | "product_description"
  | "product_base_price_minor"
  | "product_display_order"
  | "image_storage_path"
  | "image_alt_text"
> &
  Readonly<{
    product_id: string | null;
    product_slug: string | null;
    product_name: string | null;
    product_description: string | null;
    product_base_price_minor: number | null;
    product_display_order: number | null;
    image_storage_path: string | null;
    image_alt_text: string | null;
  }>;

type PublicProductRow = PublicMenuRow &
  Readonly<{
    product_id: string;
    product_slug: string;
    product_name: string;
    product_description: string;
    product_base_price_minor: number;
    product_display_order: number;
  }>;

type OrderedProduct = Readonly<{
  order: number;
  product: MenuProduct;
}>;

type OrderedCategory = Readonly<{
  id: string;
  slug: string;
  title: string;
  order: number;
  products: OrderedProduct[];
}>;

const signedImageLifetimeSeconds = 86_400;

export class PublishedMenuRepositoryError extends Error {
  constructor() {
    super("The published menu could not be loaded.");
    this.name = "PublishedMenuRepositoryError";
  }
}

export interface PublishedMenuRepository {
  list(): Promise<readonly MenuCategory[]>;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isOrder(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function isCategoryRow(row: PublicMenuRow) {
  return (
    isNonEmptyString(row.category_id) &&
    isNonEmptyString(row.category_slug) &&
    isNonEmptyString(row.category_name) &&
    isOrder(row.category_display_order)
  );
}

function isEmptyProductRow(row: PublicMenuRow) {
  return (
    row.product_id === null &&
    row.product_slug === null &&
    row.product_name === null &&
    row.product_description === null &&
    row.product_base_price_minor === null &&
    row.product_display_order === null &&
    row.image_storage_path === null &&
    row.image_alt_text === null
  );
}

function isProductRow(row: PublicMenuRow): row is PublicProductRow {
  const hasValidImage =
    (row.image_storage_path === null && row.image_alt_text === null) ||
    (isNonEmptyString(row.image_storage_path) &&
      isNonEmptyString(row.image_alt_text));

  return (
    isNonEmptyString(row.product_id) &&
    isNonEmptyString(row.product_slug) &&
    isNonEmptyString(row.product_name) &&
    typeof row.product_description === "string" &&
    typeof row.product_base_price_minor === "number" &&
    Number.isInteger(row.product_base_price_minor) &&
    row.product_base_price_minor >= 0 &&
    isOrder(row.product_display_order) &&
    hasValidImage
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
    ...(status ? { status } : {}),
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
      "[public-menu] product image signing failed",
      getErrorDiagnostic(error),
    );
    return new Map<string, string>();
  }
}

function mapProduct(
  row: PublicProductRow,
  signedImageByPath: ReadonlyMap<string, string>,
): MenuProduct {
  const signedImage = row.image_storage_path
    ? signedImageByPath.get(row.image_storage_path)
    : undefined;

  return {
    id: row.product_id,
    slug: row.product_slug,
    name: row.product_name,
    description: row.product_description,
    price: row.product_base_price_minor / 100,
    image: signedImage ?? getProductImageFallback(row.product_slug),
    imageAlt: row.image_alt_text ?? row.product_name,
  };
}

export function createPublishedMenuRepository(
  supabase: SupabaseServerClient,
): PublishedMenuRepository {
  return {
    async list() {
      const rows =
        (await supabase.getPublishedMenuRows()) as unknown as PublicMenuRow[];
      const categoriesById = new Map<string, OrderedCategory>();
      const products = new Map<string, PublicProductRow>();

      rows.forEach((row) => {
        if (!isCategoryRow(row)) {
          throw new PublishedMenuRepositoryError();
        }

        const existingCategory = categoriesById.get(row.category_id);

        if (
          existingCategory &&
          (existingCategory.slug !== row.category_slug ||
            existingCategory.title !== row.category_name ||
            existingCategory.order !== row.category_display_order)
        ) {
          throw new PublishedMenuRepositoryError();
        }

        if (!existingCategory) {
          categoriesById.set(row.category_id, {
            id: row.category_id,
            slug: row.category_slug,
            title: row.category_name,
            order: row.category_display_order,
            products: [],
          });
        }

        if (isEmptyProductRow(row)) {
          return;
        }

        if (!isProductRow(row) || products.has(row.product_id)) {
          throw new PublishedMenuRepositoryError();
        }

        products.set(row.product_id, row);
      });

      const imagePaths = [
        ...new Set(
          [...products.values()].flatMap((product) =>
            product.image_storage_path
              ? [product.image_storage_path]
              : [],
          ),
        ),
      ];
      const signedImageByPath = await getSignedImages(
        supabase,
        imagePaths,
      );

      products.forEach((row) => {
        const category = categoriesById.get(row.category_id);

        if (!category) {
          throw new PublishedMenuRepositoryError();
        }

        category.products.push({
          order: row.product_display_order,
          product: mapProduct(row, signedImageByPath),
        });
      });

      return [...categoriesById.values()]
        .sort(
          (left, right) =>
            left.order - right.order || left.id.localeCompare(right.id),
        )
        .map<MenuCategory>((category) => ({
          id: category.slug,
          title: category.title,
          image: getCategoryHeroImage(category.slug),
          kind:
            category.slug === "create-your-own" ? "builder" : "products",
          products: category.products
            .sort(
              (left, right) =>
                left.order - right.order ||
                left.product.id.localeCompare(right.product.id),
            )
            .map(({ product }) => product),
        }))
        .filter(
          (category) =>
            category.kind === "builder" || category.products.length > 0,
        );
    },
  };
}
