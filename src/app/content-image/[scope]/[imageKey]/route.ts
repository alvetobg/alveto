import {
  hasCurrentContentImageVersion,
} from "@/lib/content-images";
import { getPublishedGallery } from "@/features/gallery/service";
import type { PublishedGalleryItem } from "@/features/gallery/types";
import { getPublishedHomepage } from "@/features/homepage/service";
import type {
  HomepageFeaturedProduct,
  HomepageImage,
} from "@/features/homepage/types";
import {
  createSupabaseServerClient,
  type StorageImageReference,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const allowedImageMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const homepageSignedLifetimeSeconds = 24 * 60 * 60;
const gallerySignedLifetimeSeconds = 60 * 60;

type ResolvedContentImage = Readonly<{
  storageImage: StorageImageReference;
  signedLifetimeSeconds: number;
  edgeCacheSeconds: number;
}>;

function unavailable(status: 404 | 503) {
  return new Response(null, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex",
    },
  });
}

function findHomepageSlot(
  imageKey: string,
  images: Readonly<{
    experienceImages: Readonly<{
      morning: HomepageImage | null;
      afternoon: HomepageImage | null;
      evening: HomepageImage | null;
    }>;
    aboutImages: Readonly<{
      primary: HomepageImage | null;
      secondary: HomepageImage | null;
    }>;
  }>,
) {
  const slots: Readonly<Record<string, HomepageImage | null>> = {
    "experience-morning": images.experienceImages.morning,
    "experience-afternoon": images.experienceImages.afternoon,
    "experience-evening": images.experienceImages.evening,
    "about-primary": images.aboutImages.primary,
    "about-secondary": images.aboutImages.secondary,
  };

  return Object.hasOwn(slots, imageKey) ? slots[imageKey] : null;
}

async function resolveHomepageImage(
  scope: "homepage" | "signature",
  imageKey: string,
): Promise<ResolvedContentImage | null | "error"> {
  const result = await getPublishedHomepage();

  if (result.state === "error") {
    return "error";
  }

  if (!result.content) {
    return null;
  }

  const image =
    scope === "homepage"
      ? findHomepageSlot(imageKey, result.content)
      : uuidPattern.test(imageKey)
        ? result.content.featuredSection?.products.find(
            (product: HomepageFeaturedProduct) => product.id === imageKey,
          )
        : null;
  const storageImage = image?.storageImage;

  return storageImage
    ? {
        storageImage,
        signedLifetimeSeconds: homepageSignedLifetimeSeconds,
        edgeCacheSeconds: 12 * 60 * 60,
      }
    : null;
}

async function resolveGalleryImage(
  imageKey: string,
): Promise<ResolvedContentImage | null | "error"> {
  if (!uuidPattern.test(imageKey)) {
    return null;
  }

  const result = await getPublishedGallery();

  if (result.state === "error") {
    return "error";
  }

  const item = result.collections
    .flatMap((collection) => collection.items)
    .find((candidate: PublishedGalleryItem) => candidate.id === imageKey);

  return item
    ? {
        storageImage: item.storageImage,
        signedLifetimeSeconds: gallerySignedLifetimeSeconds,
        edgeCacheSeconds: 30 * 60,
      }
    : null;
}

async function resolveContentImage(
  scope: string,
  imageKey: string,
): Promise<ResolvedContentImage | null | "error"> {
  if (scope === "homepage" || scope === "signature") {
    return resolveHomepageImage(scope, imageKey);
  }

  if (scope === "gallery") {
    return resolveGalleryImage(imageKey);
  }

  return null;
}

export async function GET(
  request: Request,
  context: {
    params: Promise<{ scope: string; imageKey: string }>;
  },
) {
  const { scope, imageKey } = await context.params;
  const requestUrl = new URL(request.url);

  if (
    requestUrl.searchParams.size !== 1 ||
    !requestUrl.searchParams.has("v")
  ) {
    return unavailable(404);
  }

  const resolved = await resolveContentImage(scope, imageKey);

  if (resolved === "error") {
    return unavailable(503);
  }

  if (
    !resolved ||
    !hasCurrentContentImageVersion(
      requestUrl.searchParams.get("v"),
      resolved.storageImage,
    )
  ) {
    return unavailable(404);
  }

  try {
    const [signedImage] =
      await createSupabaseServerClient().createSignedStorageImageUrls(
        [resolved.storageImage],
        resolved.signedLifetimeSeconds,
      );

    if (!signedImage) {
      return unavailable(503);
    }

    const upstream = await fetch(signedImage.signedUrl, {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(5_000),
    });

    if (!upstream.ok || !upstream.body) {
      return unavailable(503);
    }

    const contentType = upstream.headers.get("content-type")?.split(";")[0];

    if (!contentType || !allowedImageMimeTypes.has(contentType)) {
      return unavailable(503);
    }

    return new Response(upstream.body, {
      headers: {
        "cache-control": "public, max-age=0, must-revalidate",
        "content-type": contentType,
        "cross-origin-resource-policy": "same-origin",
        "vercel-cdn-cache-control": `public, max-age=${resolved.edgeCacheSeconds}`,
        "x-content-type-options": "nosniff",
        "x-robots-tag": "noindex",
      },
    });
  } catch {
    return unavailable(503);
  }
}
