"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES, Locale } from "@/context/LanguageContext";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale, currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Exactly matching user screenshot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 text-gray-900 dark:text-slate-100 shadow-sm transition-all text-sm font-semibold select-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="Select Language"
      >
        <span className="text-base leading-none drop-shadow-sm">{currentLang.flag}</span>
        <span className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-sm tracking-wide">
          {currentLang.shortCode}
        </span>
        {isOpen ? (
          <ChevronUp size={15} className="text-gray-400 dark:text-gray-400 stroke-[2.5]" />
        ) : (
          <ChevronDown size={15} className="text-gray-400 dark:text-gray-400 stroke-[2.5]" />
        )}
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
          {LANGUAGES.map((item) => {
            const isSelected = locale === item.code;

            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 shadow-sm"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{item.flag}</span>
                  <span className={item.code === "km" ? "font-khmer font-bold" : "font-semibold"}>
                    {item.label}
                  </span>
                </div>

                {isSelected && (
                  <Check size={18} className="text-cyan-500 stroke-[2.5] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
