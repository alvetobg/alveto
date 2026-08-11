const localImagePath = /^\/(?:images|logos)\//;
const contentImagePath =
  /^\/content-image\/(?:homepage\/(?:experience-(?:morning|afternoon|evening)|about-(?:primary|secondary))|signature\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\?v=[A-Za-z0-9_-]{16}$/i;

function isSupabaseSignedImage(source: string) {
  try {
    const url = new URL(source);

    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".supabase.co") &&
      url.pathname.startsWith(
        "/storage/v1/object/sign/product-images/",
      )
    );
  } catch {
    return false;
  }
}

export function getOptionalImageSource(
  image?: string | null,
): string | null {
  const source = image?.trim();

  return source &&
    (localImagePath.test(source) ||
      contentImagePath.test(source) ||
      isSupabaseSignedImage(source))
    ? source
    : null;
}
