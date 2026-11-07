import { parseStringPromise } from "xml2js";
import { Article } from "@/types/news";
import { CATEGORY_FALLBACK_IMAGES } from "@/lib/constants";

function generateHashId(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function parseRssFeed(
  feedUrl: string,
  sourceName: string,
  defaultCategory: string = "national",
  lang: string = "km",
  sourceId: string = "cambodia-news"
): Promise<Article[]> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch RSS from ${feedUrl}: status ${res.status}`);
      return [];
    }

    const xmlText = await res.text();
    const result = await parseStringPromise(xmlText, { explicitArray: false, trim: true });

    const channel = result?.rss?.channel || result?.feed;
    if (!channel) return [];

    const items = Array.isArray(channel.item)
      ? channel.item
      : channel.item
      ? [channel.item]
      : Array.isArray(channel.entry)
      ? channel.entry
      : channel.entry
      ? [channel.entry]
      : [];

    return items.map((item: any) => {
      const title = item.title?._ || item.title || "No Title";
      const link = item.link?.$?.href || item.link || "";
      const rawDescription = item.description?._ || item.description || item.summary?._ || item.summary || "";
      const rawContent = item["content:encoded"]?._ || item["content:encoded"] || rawDescription;
      const pubDate = item.pubDate || item.published || item.updated || new Date().toISOString();

      // Extract image: Check media:thumbnail, enclosure, media:content, or regex from HTML
      let imageUrl: string | null = null;
      if (item["media:thumbnail"]?.$?.url) {
        imageUrl = item["media:thumbnail"].$.url;
      } else if (item.enclosure?.$?.url) {
        imageUrl = item.enclosure.$.url;
      } else if (item["media:content"]?.$?.url) {
        imageUrl = item["media:content"].$.url;
      } else {
        const match = (rawContent || rawDescription).match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match && match[1]) {
          imageUrl = match[1];
        }
      }

      // Upgrade thumbnail to higher resolution if from Khmer Times WordPress thumbnails
      if (imageUrl && imageUrl.includes("khmertimeskh.com")) {
        imageUrl = imageUrl.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, "$1");
      }

      // If still no image, assign category authentic Cambodian news photo
      if (!imageUrl) {
        imageUrl = CATEGORY_FALLBACK_IMAGES[defaultCategory] || CATEGORY_FALLBACK_IMAGES.national;
      }

      // Clean HTML tags from snippet
      const cleanDesc = rawDescription
        .replace(/<[^>]*>?/gm, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();

      const cleanContent = rawContent
        .replace(/<[^>]*>?/gm, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();

      // Stable URL-friendly ID
      const safeSlug = title
        .slice(0, 30)
        .replace(/[^a-zA-Z0-9\u1780-\u17FF]/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();
      const id = `${generateHashId(link || title)}-${encodeURIComponent(safeSlug || "news")}`;

      // Derive categories
      const categories: string[] = [defaultCategory];
      if (item.category) {
        const itemCats = Array.isArray(item.category) ? item.category : [item.category];
        itemCats.forEach((c: any) => {
          const catName = typeof c === "string" ? c : c?._ || "";
          if (catName && !categories.includes(catName.toLowerCase())) {
            categories.push(catName.toLowerCase());
          }
        });
      }

      return {
        id,
        title: title.trim(),
        link,
        description: cleanDesc ? cleanDesc.slice(0, 240) + (cleanDesc.length > 240 ? "..." : "") : title,
        content: cleanContent || cleanDesc,
        pubDate: new Date(pubDate).toISOString(),
        image_url: imageUrl,
        source_id: sourceId,
        source_name: sourceName,
        category: categories,
        language: lang,
      };
    });
  } catch (error) {
    console.error(`RSS parse error for ${feedUrl}:`, error);
    return [];
  }
}
