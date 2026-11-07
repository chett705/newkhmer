import { NextResponse } from "next/server";
import { CAMBODIAN_PUBLISHERS, MOCK_ARTICLES } from "@/lib/constants";
import { parseRssFeed } from "@/services/rssParser";

export async function GET() {
  try {
    const feedPromises = CAMBODIAN_PUBLISHERS.map((pub) =>
      parseRssFeed(pub.url, pub.name, pub.category, pub.lang, pub.sourceId).catch(() => [])
    );

    const results = await Promise.all(feedPromises);
    const combined = results.flat();

    const finalArticles = combined.length > 0 ? combined : MOCK_ARTICLES;

    return NextResponse.json({
      status: "success",
      totalResults: finalArticles.length,
      results: finalArticles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to parse RSS" },
      { status: 500 }
    );
  }
}
