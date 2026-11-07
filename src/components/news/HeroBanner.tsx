"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Article } from "@/types/news";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/dateUtils";
import { CATEGORY_FALLBACK_IMAGES, FALLBACK_IMAGE } from "@/lib/constants";
import { Clock, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroBannerProps {
  article?: Article;
}

export function HeroBanner({ article }: HeroBannerProps) {
  const { locale } = useLanguage();
  if (!article) return null;

  const cat = article.category?.[0] || "national";
  const defaultFallback = CATEGORY_FALLBACK_IMAGES[cat] || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = useState(article.image_url || defaultFallback);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl group border border-slate-800">
      <div className="relative h-80 sm:h-96 md:h-[450px] w-full">
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={() => setImgSrc(defaultFallback)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col justify-end space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="danger" className="animate-pulse uppercase tracking-wider font-bold">
            {locale === "km" ? "ព័ត៌មានទាន់ហេតុការណ៍" : "BREAKING STORY"}
          </Badge>
          {article.source_name && (
            <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-white/20">
              {article.source_name}
            </Badge>
          )}
          <span className="flex items-center gap-1 text-xs text-slate-300">
            <Clock size={13} />
            {formatRelativeTime(article.pubDate, locale)}
          </span>
        </div>

        <Link href={`/article/${encodeURIComponent(article.id)}`}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug hover:text-blue-300 transition-colors line-clamp-2 md:line-clamp-3 drop-shadow-md">
            {article.title}
          </h1>
        </Link>

        <p className="text-sm md:text-base text-slate-200/90 line-clamp-2 max-w-3xl drop-shadow">
          {article.description}
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Link
            href={`/article/${encodeURIComponent(article.id)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition shadow-md shadow-red-900/40"
          >
            {locale === "km" ? "អានអត្ថបទពេញលេញ" : "Read Full Story"}
          </Link>
          {article.link && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition"
            >
              {locale === "km" ? "ប្រភពដើម" : "Original Source"} <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
