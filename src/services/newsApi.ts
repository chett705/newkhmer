import { Article } from "@/types/news";
import { REAL_NEWS_SOURCES, MOCK_ARTICLES } from "@/lib/constants";
import { parseRssFeed } from "./rssParser";
import fs from "fs";
import path from "path";

const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/news";
const DATA_FILE = path.join(process.cwd(), "data", "custom_articles.json");

function getCustomArticles(): Article[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s\u1780-\u17FF]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Fetch real live Cambodian news from active live Cambodian news outlets
 */
export async function fetchLiveCambodiaNews(): Promise<Article[]> {
  const customArticles = getCustomArticles();

  const fetchPromises = REAL_NEWS_SOURCES.map((source) =>
    parseRssFeed(source.url, source.name, source.category, source.lang, source.sourceId).catch(() => [])
  );

  const results = await Promise.all(fetchPromises);
  const flattened = results.flat();

  // De-duplicate articles by normalized title and link
  const seenTitles = new Set<string>();
  const seenLinks = new Set<string>();
  const uniqueArticles: Article[] = [];

  // Put custom editorial articles first
  for (const custom of customArticles) {
    uniqueArticles.push(custom);
    seenTitles.add(normalizeString(custom.title));
  }

  for (const article of flattened) {
    const normTitle = normalizeString(article.title);
    const cleanLink = article.link.split("?")[0].replace(/\/+$/, "").toLowerCase();

    if (normTitle && seenTitles.has(normTitle)) continue;
    if (cleanLink && seenLinks.has(cleanLink)) continue;

    if (normTitle) seenTitles.add(normTitle);
    if (cleanLink) seenLinks.add(cleanLink);

    uniqueArticles.push(article);
  }

  if (uniqueArticles.length === 0) {
    return MOCK_ARTICLES;
  }

  // Custom articles stay on top, then Cambodian national news, then sort by latest publication date
  return uniqueArticles.sort((a, b) => {
    if (a.source_id === "editorial" && b.source_id !== "editorial") return -1;
    if (b.source_id === "editorial" && a.source_id !== "editorial") return 1;

    const aIsNational = a.source_id === "rfi-khmer" || a.category.includes("national");
    const bIsNational = b.source_id === "rfi-khmer" || b.category.includes("national");

    if (aIsNational && !bIsNational) return -1;
    if (!aIsNational && bIsNational) return 1;

    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
}

/**
 * Primary fetcher for news: combines custom articles, live Cambodian feeds & optional NewsData.io API
 */
export async function fetchNewsData(
  category: string = "all",
  lang: string = "km",
  query?: string
): Promise<Article[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;

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
      console.warn("NewsData API fallback to live RSS feeds:", e);
    }
  }

  const liveArticles = await fetchLiveCambodiaNews();

  let filtered = liveArticles;

  if (category && category !== "all") {
    const targetCat = category.toLowerCase();
    filtered = filtered.filter(
      (article) =>
        article.category.some((c) => c.toLowerCase().includes(targetCat)) ||
        article.title.toLowerCase().includes(targetCat)
    );
    if (filtered.length === 0) {
      filtered = liveArticles.slice(0, 12);
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
