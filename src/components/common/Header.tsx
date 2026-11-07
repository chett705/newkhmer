"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Search, Menu, X, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { formatKhmerDate } from "@/lib/dateUtils";
import { CATEGORIES } from "@/lib/constants";

export function Header() {
  const [khmerDate, setKhmerDate] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setKhmerDate(formatKhmerDate(new Date()));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Banner: Date and National Indicator */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span className="font-khmer font-medium text-slate-200">{khmerDate || "ព័ត៌មានកម្ពុជា"}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            <span className="hover:text-white cursor-pointer transition">ភ្នំពេញ ៣១°C</span>
            <span className="text-slate-500">|</span>
            <span className="hover:text-white cursor-pointer transition">អត្រាប្តូរប្រាក់ ៤,០៥០ ៛/$</span>
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
              ព័ត៌មានកម្ពុជា
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-red-600 tracking-widest uppercase">
              NEWKHMER NEWS
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-6 relative items-center"
        >
          <Search className="absolute left-3.5 text-gray-400" size={17} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ស្វែងរកព័ត៌មាន ប្រធានបទ..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition"
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
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

      {/* Primary Category Navigation Bar */}
      <nav className="border-t border-gray-100 dark:border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
              className="px-3.5 py-2 text-sm font-medium font-khmer rounded-md text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800/60 transition whitespace-nowrap"
            >
              {cat.nameKm}
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
              placeholder="ស្វែងរកព័ត៌មាន..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-transparent focus:outline-none"
            />
          </form>
          <div className="flex flex-col space-y-1 pt-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium font-khmer rounded-md text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                {cat.nameKm} ({cat.nameEn})
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

