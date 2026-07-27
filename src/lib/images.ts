const localImagePath = /^\/(?:images|logos)\//;

export function getOptionalImageSource(
  image?: string | null,
): string | null {
  const source = image?.trim();

  return source && localImagePath.test(source) ? source : null;
}
