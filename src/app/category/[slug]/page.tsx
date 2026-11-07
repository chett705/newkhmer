import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNewsData } from "@/services/newsApi";
import { CATEGORIES } from "@/lib/constants";
import { NewsGrid } from "@/components/news/NewsGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) {
    return { title: "ជំពូកមិនមាន | Cambodia News" };
  }

  return {
    title: `${cat.nameKm} (${cat.nameEn}) | Cambodia News`,
    description: cat.descriptionKm || `ព័ត៌មានចុងក្រោយក្នុងជំពូក ${cat.nameKm}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);

  if (!category && params.slug !== "all") {
    notFound();
  }

  const articles = await fetchNewsData(params.slug, "km");

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white font-khmer transition"
        >
          <ArrowLeft size={14} /> ត្រឡប់ទៅទំព័រដើម
        </Link>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-khmer">
          {category?.nameKm || "ព័ត៌មានទាំងអស់"}
        </h1>
        {category?.descriptionKm && (
          <p className="text-sm sm:text-base text-blue-100/90 font-khmer max-w-2xl">
            {category.descriptionKm}
          </p>
        )}
      </div>

      {/* Grid */}
      <NewsGrid
        articles={articles}
        title={`អត្ថបទព័ត៌មានក្នុងជំពូក "${category?.nameKm}"`}
      />
    </div>
  );
}

