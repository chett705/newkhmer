"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { formatKhmerDate } from "@/lib/dateUtils";
import { CATEGORIES } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { locale, t } = useLanguage();
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const now = new Date();
    if (locale === "km") {
      setCurrentDateStr(formatKhmerDate(now));
    } else if (locale === "zh") {
      setCurrentDateStr(
        now.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })
      );
    } else {
      setCurrentDateStr(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getBrandTitle = () => {
    if (locale === "km") return "ព័ត៌មានកម្ពុជា";
    if (locale === "zh") return "柬埔寨新闻";
    return "CAMBODIA NEWS";
  };

  const getCategoryName = (cat: any) => {
    if (locale === "km") return cat.nameKm;
    if (locale === "zh") {
      const zhMap: Record<string, string> = {
        all: "首页",
        national: "国内要闻",
        business: "经济商业",
        technology: "科技创新",
        sports: "体育竞技",
        tourism: "文化旅游",
      };
      return zhMap[cat.slug] || cat.nameEn;
    }
    return cat.nameEn;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Banner: Date, Exchange Rate, Weather */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span className="font-medium text-slate-200">
              {currentDateStr || getBrandTitle()}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            <span>
              {locale === "km" ? "ភ្នំពេញ ៣១°C" : locale === "zh" ? "金边 31°C" : "Phnom Penh 31°C"}
            </span>
            <span className="text-slate-500">|</span>
            <span>
              {locale === "km"
                ? "អត្រាប្តូរប្រាក់ ៤,០៥០ ៛/$"
                : locale === "zh"
                ? "汇率 4,050 KHR/$"
                : "Exchange 4,050 KHR/$"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-7 overflow-hidden rounded shadow-sm border border-gray-300 dark:border-slate-700">
            <Image
              src="/images/cambodia-flag.svg"
              alt="Cambodia Flag"
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-khmer text-blue-900 dark:text-blue-400 leading-none tracking-tight">
              {getBrandTitle()}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-red-600 tracking-widest uppercase">
              NEWKHMER NEWS
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-4 relative items-center"
        >
          <Search className="absolute left-3.5 text-gray-400" size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("nav.search_placeholder")}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition"
          />
        </form>

        {/* Right Actions: Language Switcher Dropdown + Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="border-t border-gray-100 dark:border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
              className="px-3.5 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800/60 transition whitespace-nowrap"
            >
              {getCategoryName(cat)}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3.5 top-2.5 text-gray-400" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav.search_placeholder")}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-transparent focus:outline-none"
            />
          </form>
          <div className="flex flex-col space-y-1 pt-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-md text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                {getCategoryName(cat)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
