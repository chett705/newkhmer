import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/dateUtils";
import { FALLBACK_IMAGE } from "@/lib/constants";
import { Clock } from "lucide-react";

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <article className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 group">
      {/* Thumbnail */}
      <Link
        href={`/article/${encodeURIComponent(article.id)}`}
        className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 block"
      >
        <Image
          src={article.image_url || FALLBACK_IMAGE}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {article.category && article.category[0] && (
          <div className="absolute top-3 left-3">
            <Badge variant="primary" className="backdrop-blur-sm bg-blue-600/90 text-white border-none shadow">
              {article.category[0]}
            </Badge>
          </div>
        )}
      </Link>

      {/* Meta & Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {article.source_name || "Cambodia News"}
            </span>
            <span className="flex items-center gap-1 font-khmer">
              <Clock size={12} />
              {formatRelativeTime(article.pubDate, "km")}
            </span>
          </div>

          <Link href={`/article/${encodeURIComponent(article.id)}`}>
            <h2 className="text-base sm:text-lg font-bold font-khmer text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h2>
          </Link>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-khmer line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between">
          <Link
            href={`/article/${encodeURIComponent(article.id)}`}
            className="text-xs font-semibold font-khmer text-blue-600 dark:text-blue-400 hover:underline"
          >
            អានបន្ថែម →
          </Link>
          {article.source_id && (
            <span className="text-[11px] text-gray-400 uppercase tracking-wider">
              {article.source_id}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

