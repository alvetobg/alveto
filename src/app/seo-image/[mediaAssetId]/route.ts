import { findPublicSeoImage, getPublicSeo } from "@/features/seo/service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const mediaAssetIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function unavailable(status: 404 | 503) {
  return new Response(null, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ mediaAssetId: string }> },
) {
  const { mediaAssetId } = await context.params;

  if (!mediaAssetIdPattern.test(mediaAssetId)) {
    return unavailable(404);
  }

  const result = await getPublicSeo();

  if (result.state === "error") {
    return unavailable(503);
  }

  const image = findPublicSeoImage(result.settings, mediaAssetId);

  if (!image) {
    return unavailable(404);
  }

  try {
    const [signedImage] = await createSupabaseServerClient().createSignedImageUrls(
      [image.storagePath],
      60,
    );

    if (!signedImage) {
      return unavailable(503);
    }

    const upstream = await fetch(signedImage.signedUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });

    if (!upstream.ok || !upstream.body) {
      return unavailable(503);
    }

    const upstreamType = upstream.headers.get("content-type")?.split(";")[0];

    if (upstreamType !== image.mimeType) {
      return unavailable(503);
    }

    return new Response(upstream.body, {
      headers: {
        "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
        "content-type": image.mimeType,
        "x-content-type-options": "nosniff",
      },
    });
  } catch {
    return unavailable(503);
  }
}
