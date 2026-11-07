"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { formatRelativeTime } from "@/lib/dateUtils";
import { CATEGORY_FALLBACK_IMAGES, FALLBACK_IMAGE } from "@/lib/constants";
import { Flame, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TrendingSidebarProps {
  articles: Article[];
}

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  const { locale } = useLanguage();
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-slate-800">
        <Flame className="text-red-500 fill-red-500" size={18} />
        <h3 className="font-bold text-base text-gray-900 dark:text-white">
          {locale === "km" ? "ព័ត៌មានពេញនិយម" : "Trending Stories"}
        </h3>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-slate-800/80 space-y-3">
        {articles.slice(0, 4).map((art, idx) => {
          const cat = art.category?.[0] || "national";
          const fallback = CATEGORY_FALLBACK_IMAGES[cat] || FALLBACK_IMAGE;

          return (
            <Link
              key={art.id}
              href={`/article/${encodeURIComponent(art.id)}`}
              className="pt-3 first:pt-0 flex gap-3 group items-start"
            >
              <span className="text-lg font-extrabold text-slate-300 dark:text-slate-600 group-hover:text-red-600 transition font-sans w-4 shrink-0">
                0{idx + 1}
              </span>
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={art.image_url || fallback}
                  alt={art.title}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-snug transition-colors">
                  {art.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span className="text-blue-600 dark:text-blue-400 font-medium truncate max-w-[90px]">
                    {art.source_name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={10} />
                    {formatRelativeTime(art.pubDate, locale)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
