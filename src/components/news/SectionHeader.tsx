"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  titleKm: string;
  titleEn: string;
  titleZh?: string;
  subtitleKm?: string;
  subtitleEn?: string;
  subtitleZh?: string;
  badgeColor?: string;
  moreLink?: string;
}

export function SectionHeader({
  titleKm,
  titleEn,
  titleZh,
  subtitleKm,
  subtitleEn,
  subtitleZh,
  badgeColor = "bg-blue-600",
  moreLink,
}: SectionHeaderProps) {
  const { locale } = useLanguage();

  const getTitle = () => {
    if (locale === "km") return titleKm;
    if (locale === "zh") return titleZh || titleEn;
    return titleEn;
  };

  const getSubtitle = () => {
    if (locale === "km") return subtitleKm;
    if (locale === "zh") return subtitleZh || subtitleEn;
    return subtitleEn;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className={`w-1.5 h-6 ${badgeColor} rounded-full inline-block`} />
          {getTitle()}
        </h2>
        {(subtitleKm || subtitleEn) && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
            {getSubtitle()}
          </p>
        )}
      </div>

      {moreLink && (
        <Link
          href={moreLink}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          {locale === "km" ? "មើលទាំងអស់" : locale === "zh" ? "查看全部" : "View All"}
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}
