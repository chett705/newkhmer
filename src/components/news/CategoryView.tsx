"use client";

import Link from "next/link";
import { Article, Category } from "@/types/news";
import { NewsGrid } from "./NewsGrid";
import { CategoryPills } from "./CategoryPills";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryViewProps {
  category: Category;
  articles: Article[];
}

export function CategoryView({ category, articles }: CategoryViewProps) {
  const { locale } = useLanguage();

  const getCategoryTitle = () => {
    if (locale === "km") return category.nameKm;
    if (locale === "zh") {
      const zhMap: Record<string, string> = {
        national: "国内要闻",
        business: "经济与商业",
        technology: "科技创新",
        sports: "体育竞技",
        tourism: "文化与旅游",
      };
      return zhMap[category.slug] || category.nameEn;
    }
    return category.nameEn;
  };

  const getCategoryDesc = () => {
    if (locale === "km") return category.descriptionKm;
    if (locale === "zh") {
      const zhDesc: Record<string, string> = {
        national: "关于柬埔寨国内政治、社会治理与民生发展的最新报道",
        business: "追踪柬埔寨投资、银行金融、商业合作与市场动态",
        technology: "关注人工智能、数字转型、移动通信与科技创新",
        sports: "斗武棉 (Kun Khmer)、足球与国内外重大体育赛事",
        tourism: "吴哥窟、文化遗产与柬埔寨特色文旅胜地",
      };
      return zhDesc[category.slug] || category.nameEn;
    }
    return category.descriptionEn || `Latest news and updates in ${category.nameEn}`;
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Navigation */}
      <CategoryPills selectedCategory={category.slug} />

      {/* Category Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition"
        >
          <ArrowLeft size={14} />
          {locale === "km" ? "ត្រឡប់ទៅទំព័រដើម" : locale === "zh" ? "返回首页" : "Back to Homepage"}
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {getCategoryTitle()}
        </h1>
        <p className="text-sm sm:text-base text-blue-100/90 max-w-2xl">
          {getCategoryDesc()}
        </p>
      </div>

      {/* Grid */}
      <NewsGrid
        articles={articles}
        title={
          locale === "km"
            ? `អត្ថបទព័ត៌មានក្នុងជំពូក "${category.nameKm}"`
            : locale === "zh"
            ? `"${getCategoryTitle()}" 相关新闻`
            : `Articles in "${category.nameEn}"`
        }
      />
    </div>
  );
}

