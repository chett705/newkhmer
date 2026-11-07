"use client";

import { CATEGORIES } from "@/lib/constants";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export function CategoryTabs({ selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-khmer transition-all whitespace-nowrap cursor-pointer ${
              isSelected
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat.nameKm}
          </button>
        );
      })}
    </div>
  );
}

