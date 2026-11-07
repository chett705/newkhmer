import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  Rss,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង | Admin Dashboard - NewKhmer",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-khmer">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-5 overflow-hidden rounded shadow">
                <Image
                  src="/images/cambodia-flag.svg"
                  alt="Cambodia Flag"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-lg text-blue-900 dark:text-blue-400">
                NewKhmer <span className="text-red-600 font-extrabold">ADMIN</span>
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              <ExternalLink size={14} /> ទៅកាន់គេហទំព័រ (Live Site)
            </Link>
            <LanguageToggle />
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow">
              <ShieldCheck size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1">
        {children}
      </div>
    </div>
  );
}

