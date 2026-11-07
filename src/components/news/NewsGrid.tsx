import { Article } from "@/types/news";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
}

export function NewsGrid({ articles, title, subtitle }: NewsGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-gray-300 dark:border-slate-800 rounded-2xl">
        <p className="text-gray-500 dark:text-slate-400 font-khmer">
          មិនមានអត្ថបទព័ត៌មាននៅឡើយទេ
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {title && (
        <div className="flex items-end justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-khmer text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-khmer mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

