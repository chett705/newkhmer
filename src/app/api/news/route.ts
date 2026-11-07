import { NextRequest, NextResponse } from "next/server";
import { fetchNewsData } from "@/services/newsApi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || "all";
  const lang = searchParams.get("lang") || "km";
  const q = searchParams.get("q") || undefined;

  try {
    const articles = await fetchNewsData(category, lang, q);
    return NextResponse.json({
      status: "success",
      totalResults: articles.length,
      results: articles,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to fetch news" },
      { status: 500 }
    );
  }
}

