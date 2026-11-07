import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchNewsData, fetchLiveCambodiaNews } from "@/services/newsApi";
import { MOCK_ARTICLES, CATEGORY_FALLBACK_IMAGES, FALLBACK_IMAGE } from "@/lib/constants";
import { formatKhmerDate, formatRelativeTime } from "@/lib/dateUtils";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/news/NewsCard";
import { ArrowLeft, Clock, Share2, ExternalLink, Bookmark } from "lucide-react";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

async function getArticleById(id: string) {
  const allArticles = await fetchLiveCambodiaNews();
  const decodedId = decodeURIComponent(id);

  // Exact match or prefix hash match
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

  const cat = article.category?.[0] || "national";
  const displayImage = article.image_url || CATEGORY_FALLBACK_IMAGES[cat] || FALLBACK_IMAGE;
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-khmer text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={16} /> ត្រឡប់ទៅទំព័រដើម
        </Link>
        <div className="flex items-center gap-3 text-gray-500 dark:text-slate-400">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition" title="Save">
            <Bookmark size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition" title="Share">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Header Info */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {article.category &&
            article.category.map((c) => (
              <Badge key={c} variant="primary" className="uppercase">
                {c}
              </Badge>
            ))}
          {article.source_name && <Badge variant="secondary">{article.source_name}</Badge>}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-khmer text-gray-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-slate-400 pt-2 border-y border-gray-100 dark:border-slate-800 py-3">
          <span className="flex items-center gap-1.5 font-khmer">
            <Clock size={15} />
            {formatKhmerDate(article.pubDate)}
          </span>
          <span>•</span>
          <span className="font-khmer">{formatRelativeTime(article.pubDate, "km")}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-72 sm:h-96 md:h-[480px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
        <Image
          src={displayImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Body Content */}
      <div className="prose dark:prose-invert max-w-none text-base sm:text-lg leading-relaxed font-khmer text-gray-800 dark:text-slate-200 space-y-6">
        <p className="font-semibold text-lg sm:text-xl text-gray-900 dark:text-white leading-relaxed border-l-4 border-red-600 pl-4 py-1 italic bg-red-50/50 dark:bg-red-950/20 rounded-r-lg">
          {article.description}
        </p>

        {article.content && (
          <div className="whitespace-pre-line space-y-4 text-gray-700 dark:text-slate-300">
            {article.content}
          </div>
        )}

        <div className="mt-8 p-5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 font-khmer">ប្រភពព័ត៌មានដើម៖</p>
            <p className="font-medium text-sm text-gray-800 dark:text-slate-200 font-khmer">
              {article.source_name || "Cambodia Live News"}
            </p>
          </div>
          {article.link && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-khmer rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow"
            >
              អានព័ត៌មានលើគេហទំព័រដើម <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-10 border-t border-gray-200 dark:border-slate-800 space-y-6">
          <h2 className="text-xl font-bold font-khmer text-gray-900 dark:text-white">
            ព័ត៌មានពាក់ព័ន្ធ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <NewsCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
