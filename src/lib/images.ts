const localImagePath = /^\/(?:images|logos)\//;

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
    (localImagePath.test(source) || isSupabaseSignedImage(source))
    ? source
    : null;
}
