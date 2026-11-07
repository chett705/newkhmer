import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/dateUtils";
import { Clock, ExternalLink } from "lucide-react";

interface HeroBannerProps {
  article?: Article;
}

export function HeroBanner({ article }: HeroBannerProps) {
  if (!article) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl group border border-slate-800">
      <div className="relative h-80 sm:h-96 md:h-[450px] w-full">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
            ព័ត៌មានកម្ពុជា
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 flex flex-col justify-end space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="danger" className="animate-pulse uppercase tracking-wider font-bold">
            ព័ត៌មានទាន់ហេតុការណ៍
          </Badge>
          {article.source_name && (
            <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-white/20">
              {article.source_name}
            </Badge>
          )}
          <span className="flex items-center gap-1 text-xs text-slate-300 font-khmer">
            <Clock size={13} />
            {formatRelativeTime(article.pubDate, "km")}
          </span>
        </div>

        <Link href={`/article/${encodeURIComponent(article.id)}`}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-khmer leading-snug hover:text-blue-300 transition-colors line-clamp-2 md:line-clamp-3 drop-shadow-md">
            {article.title}
          </h1>
        </Link>

        <p className="text-sm md:text-base text-slate-200/90 font-khmer line-clamp-2 max-w-3xl drop-shadow">
          {article.description}
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Link
            href={`/article/${encodeURIComponent(article.id)}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-khmer transition shadow-md shadow-red-900/40"
          >
            អានអត្ថបទពេញលេញ
          </Link>
          {article.link && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition"
            >
              ប្រភពដើម <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

