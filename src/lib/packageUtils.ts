export function getCoverImageUrl(coverImage: unknown, coverImageUrl?: unknown): string | null {
  if (coverImage && typeof coverImage === "object" && "url" in coverImage && typeof (coverImage as { url: string }).url === "string") {
    return (coverImage as { url: string }).url;
  }
  if (typeof coverImage === "string" && coverImage.length > 0) {
    return coverImage;
  }
  if (typeof coverImageUrl === "string" && coverImageUrl.length > 0) {
    return coverImageUrl;
  }
  return null;
}
