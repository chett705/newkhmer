import { Article } from "@/types/news";
import { REAL_NEWS_SOURCES, MOCK_ARTICLES } from "@/lib/constants";
import { parseRssFeed } from "./rssParser";

const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/news";

/**
 * Fetch real live Cambodian news from active live Cambodian news outlets
 */
export async function fetchLiveCambodiaNews(): Promise<Article[]> {
  const fetchPromises = REAL_NEWS_SOURCES.map((source) =>
    parseRssFeed(source.url, source.name, source.category, source.lang, source.sourceId).catch(() => [])
  );

  const results = await Promise.all(fetchPromises);
  const flattened = results.flat();

  if (flattened.length === 0) {
    return MOCK_ARTICLES;
  }

  // Sort by latest publication date
  return flattened.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}

/**
 * Primary fetcher for news: combines live Cambodian feeds & optional NewsData.io API
 */
export async function fetchNewsData(
  category: string = "all",
  lang: string = "km",
  query?: string
): Promise<Article[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;

  // 1. If user supplied a valid NewsData.io API key, query it
  if (apiKey && !apiKey.startsWith("pub_demo") && apiKey.length > 10) {
    try {
      const params = new URLSearchParams({
        apikey: apiKey,
        country: "kh",
      });
      if (lang) params.append("language", lang);
      if (category && category !== "all") params.append("category", category);
      if (query) params.append("q", query);

      const res = await fetch(`${NEWSDATA_BASE_URL}?${params.toString()}`, {
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const data: any = await res.json();
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          return data.results.map((item: any) => ({
            id: item.article_id || `nd-${Math.random().toString(36).substring(7)}`,
            title: item.title,
            link: item.link,
            description: item.description || item.title,
            content: item.content || item.description || "",
            pubDate: item.pubDate || new Date().toISOString(),
            image_url: item.image_url || null,
            source_id: item.source_id || "newsdata",
            source_name: item.source_id ? item.source_id.toUpperCase() : "Live News",
            category: item.category || ["national"],
            language: item.language || lang,
          }));
        }
      }
    } catch (e) {
      console.warn("NewsData API failed, using live Cambodian RSS feeds:", e);
    }
  }

  // 2. Default: fetch real live Cambodian news from active publishers
  const liveArticles = await fetchLiveCambodiaNews();

  let filtered = liveArticles;

  if (category && category !== "all") {
    const targetCat = category.toLowerCase();
    filtered = filtered.filter((article) =>
      article.category.some((c) => c.toLowerCase().includes(targetCat)) ||
      article.title.toLowerCase().includes(targetCat)
    );
    // If specific filter returned too few results, keep broader related list
    if (filtered.length === 0) {
      filtered = liveArticles.slice(0, 8);
    }
  }

  if (query) {
    const lowerQ = query.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(lowerQ) ||
        a.description.toLowerCase().includes(lowerQ)
    );
  }

  return filtered;
}
