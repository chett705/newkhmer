"use client";

import Link from "next/link";
import { Article } from "@/types/news";
import { Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  const { locale } = useLanguage();
  if (!articles || articles.length === 0) return null;

  const topThree = articles.slice(0, 3);

  return (
    <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-2.5 sm:p-3 flex items-center gap-3 overflow-hidden shadow-sm">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-bold shrink-0 shadow-sm">
        <Zap size={13} className="animate-bounce" />
        <span>{locale === "km" ? "ទាន់ហេតុការណ៍" : "BREAKING"}</span>
      </div>

      <div className="flex-1 overflow-x-auto scrollbar-none whitespace-nowrap text-xs sm:text-sm text-red-950 dark:text-red-200 flex items-center gap-4">
        {topThree.map((art, idx) => (
          <Link
            key={art.id}
            href={`/article/${encodeURIComponent(art.id)}`}
            className="hover:underline flex items-center gap-2"
          >
            {idx > 0 && <span className="text-red-400">•</span>}
            <span className="font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors">
              {art.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
