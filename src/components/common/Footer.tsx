"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { Shield } from "lucide-react";

export function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-5 overflow-hidden rounded">
                <Image
                  src="/images/cambodia-flag.svg"
                  alt="Cambodia Flag"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold font-khmer text-white">
                {locale === "km" ? "ព័ត៌មានកម្ពុជា" : "Cambodia News"} • NEWKHMER
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              {t("footer.about")}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {t("footer.categories")}
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {locale === "km" ? cat.nameKm : cat.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info & Sources */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {locale === "km" ? "ដៃគូព័ត៌មាន" : "Media Partners"}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>RFI Khmère (Radio France Internationale)</li>
              <li>Khmer Times Media</li>
              <li>Kiripost Tech Media</li>
              <li>Ministry of Information Cambodia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cambodia News App (NEWKHMER). {t("footer.copyright")}</p>
          <div className="flex items-center gap-5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition font-semibold"
            >
              <Shield size={13} /> Admin Portal
            </Link>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
