import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchLiveCambodiaNews } from "@/services/newsApi";
import { MOCK_ARTICLES } from "@/lib/constants";
import { ArticleView } from "@/components/news/ArticleView";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

async function getArticleById(id: string) {
  const allArticles = await fetchLiveCambodiaNews();
  const decodedId = decodeURIComponent(id);

  const found =
    allArticles.find((a) => a.id === decodedId || a.id.startsWith(decodedId.split("-")[0])) ||
    MOCK_ARTICLES.find((a) => a.id === decodedId);

  return { article: found || allArticles[0], allArticles };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { article } = await getArticleById(params.id);

  if (!article) {
    return { title: "អត្ថបទព័ត៌មាន | Cambodia News" };
  }

  return {
    title: `${article.title} | Cambodia News`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article, allArticles } = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return <ArticleView article={article} relatedArticles={relatedArticles} />;
}
