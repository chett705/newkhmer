"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryPillsProps {
  selectedCategory: string;
}

export function CategoryPills({ selectedCategory }: CategoryPillsProps) {
  const { locale } = useLanguage();

  const categories = [
    { id: "all", km: "ទាំងអស់", en: "All News", zh: "全部新闻" },
    { id: "national", km: "ព័ត៌មានជាតិ", en: "National", zh: "国内要闻" },
    { id: "business", km: "សេដ្ឋកិច្ច", en: "Business", zh: "经济商业" },
    { id: "sports", km: "កីឡា", en: "Sports", zh: "体育竞技" },
    { id: "tourism", km: "ទេសចរណ៍", en: "Tourism", zh: "文化旅游" },
    { id: "technology", km: "បច្ចេកវិទ្យា", en: "Technology", zh: "科技创新" },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          {locale === "km"
            ? "ជ្រើសរើសតាមជំពូកព័ត៌មាន"
            : locale === "zh"
            ? "按新闻栏目浏览"
            : "Explore by Category"}
        </h2>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const label = locale === "km" ? cat.km : locale === "zh" ? cat.zh : cat.en;

          return (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/" : `/?category=${cat.id}`}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
