export function getSafeExcerpt(
  excerptHtml?: string,
  contentHtml?: string,
  wordLimit: number = 25
): string {
  if (excerptHtml) {
    const cleanExcerpt = excerptHtml.replace(/<[^>]*>?/gm, "").trim();
    if (cleanExcerpt.length > 0) {
      return cleanExcerpt;
    }
  }

  if (contentHtml) {
    const cleanContent = contentHtml.replace(/<[^>]*>?/gm, "").trim();
    const words = cleanContent.split(/\s+/);

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return cleanContent;
  }

  return "Explore full details, tour itinerary, and gallery for this sacred temple.";
}