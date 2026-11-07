import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Article } from "@/types/news";

const DATA_FILE = path.join(process.cwd(), "data", "custom_articles.json");

function getCustomArticles(): Article[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveCustomArticles(articles: Article[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), "utf-8");
}

export async function GET() {
  const articles = getCustomArticles();
  return NextResponse.json({
    status: "success",
    totalResults: articles.length,
    results: articles,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, content, category, image_url, source_name } = body;

    if (!title || !description) {
      return NextResponse.json(
        { status: "error", message: "Title and description are required" },
        { status: 400 }
      );
    }

    const id = `custom-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const newArticle: Article = {
      id,
      title: title.trim(),
      link: `/article/${encodeURIComponent(id)}`,
      description: description.trim(),
      content: content ? content.trim() : description.trim(),
      pubDate: new Date().toISOString(),
      image_url: image_url || null,
      source_id: "editorial",
      source_name: source_name || "NewKhmer Editor",
      category: Array.isArray(category) ? category : [category || "national"],
      language: "km",
    };

    const articles = getCustomArticles();
    articles.unshift(newArticle);
    saveCustomArticles(articles);

    return NextResponse.json({
      status: "success",
      article: newArticle,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "ID is required" },
        { status: 400 }
      );
    }

    let articles = getCustomArticles();
    articles = articles.filter((a) => a.id !== id);
    saveCustomArticles(articles);

    return NextResponse.json({ status: "success", deletedId: id });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}

