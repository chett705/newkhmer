import { fetchLiveCambodiaNews } from "@/services/newsApi";
import { HeroBanner } from "@/components/news/HeroBanner";
import { NewsGrid } from "@/components/news/NewsGrid";
import { TrendingSidebar } from "@/components/news/TrendingSidebar";
import { BreakingTicker } from "@/components/news/BreakingTicker";
import { MOCK_ARTICLES } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const selectedCategory = searchParams.category || "all";
  const searchQuery = searchParams.search;

  const allArticles = await fetchLiveCambodiaNews();

  // Search filter
  let filtered = allArticles;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  } else if (selectedCategory && selectedCategory !== "all") {
    const cat = selectedCategory.toLowerCase();
    filtered = allArticles.filter((a) =>
      a.category.some((c) => c.toLowerCase().includes(cat)) ||
      a.title.toLowerCase().includes(cat)
    );
  }

  // Cambodian hero story with real image
  const nationalArticles = allArticles.filter(
    (a) => a.source_id === "rfi-khmer" || a.category.includes("national")
  );
  const heroArticle = nationalArticles[0] || allArticles[0] || MOCK_ARTICLES[0];
  const trendingArticles = allArticles.filter((a) => a.id !== heroArticle.id).slice(0, 4);

  // Business and Sports specialized sections for the homepage
  const businessArticles = allArticles
    .filter((a) => a.category.includes("business") || a.source_id === "khmer-times-biz")
    .slice(0, 3);

  const sportsArticles = allArticles
    .filter((a) => a.category.includes("sports") || a.source_id === "khmer-times-sports")
    .slice(0, 3);

  const mainGridArticles = filtered
    .filter((a) => a.id !== heroArticle.id && !trendingArticles.some((t) => t.id === a.id))
    .slice(0, 12);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Breaking News Ticker */}
      <BreakingTicker articles={allArticles} />

      {/* 2. Search Status Notice */}
      {searchQuery && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 flex items-center justify-between">
          <p className="font-khmer text-sm text-blue-900 dark:text-blue-200">
            លទ្ធផលស្វែងរកសម្រាប់៖ <span className="font-bold">"{searchQuery}"</span> ({filtered.length} អត្ថបទ)
          </p>
          <Link
            href="/"
            className="text-xs font-khmer text-blue-600 dark:text-blue-400 hover:underline"
          >
            សម្អាតការស្វែងរក
          </Link>
        </div>
      )}

      {/* 3. Hero Section: Banner + Trending Sidebar (shown on default view) */}
      {!searchQuery && selectedCategory === "all" && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <HeroBanner article={heroArticle} />
          </div>
          <div className="lg:col-span-1">
            <TrendingSidebar articles={trendingArticles} />
          </div>
        </section>
      )}

      {/* 4. Category Filter Tabs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold font-khmer text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            ជ្រើសរើសតាមជំពូកព័ត៌មាន
          </h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "ទាំងអស់" },
            { id: "national", label: "ព័ត៌មានជាតិ" },
            { id: "business", label: "សេដ្ឋកិច្ច" },
            { id: "sports", label: "កីឡា" },
            { id: "tourism", label: "ទេសចរណ៍" },
            { id: "technology", label: "បច្ចេកវិទ្យា" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.id === "all" ? "/" : `/?category=${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-khmer transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Main News Grid */}
      <section>
        <NewsGrid
          articles={selectedCategory === "all" && !searchQuery ? mainGridArticles : filtered}
          title={
            searchQuery
              ? "លទ្ធផលស្វែងរក"
              : selectedCategory === "all"
              ? "ព័ត៌មានសំខាន់ៗប្រចាំថ្ងៃ"
              : `ព័ត៌មានក្នុងជំពូក`
          }
          subtitle="បច្ចុប្បន្នភាពចុងក្រោយបង្អស់ពីស្ថាប័នព័ត៌មានជាតិ និងអន្តរជាតិ"
        />
      </section>

      {/* 6. Curated Business & Economy Section (on default home) */}
      {!searchQuery && selectedCategory === "all" && businessArticles.length > 0 && (
        <section className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-khmer text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block" />
                សេដ្ឋកិច្ច និងធុរកិច្ច
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-khmer mt-1">
                ទីផ្សារ ធនាគារ ការវិនិយោគ និងពាណិជ្ជកម្មកម្ពុជា
              </p>
            </div>
            <Link
              href="/category/business"
              className="text-xs font-semibold font-khmer text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              មើលទាំងអស់ <ArrowRight size={13} />
            </Link>
          </div>
          <NewsGrid articles={businessArticles} />
        </section>
      )}

      {/* 7. Curated Sports Section (on default home) */}
      {!searchQuery && selectedCategory === "all" && sportsArticles.length > 0 && (
        <section className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-khmer text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block" />
                កីឡា និងគុនខ្មែរ
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-khmer mt-1">
                គុនខ្មែរ បាល់ទាត់ និងព្រឹត្តិការណ៍កីឡាជាតិ-អន្តរជាតិ
              </p>
            </div>
            <Link
              href="/category/sports"
              className="text-xs font-semibold font-khmer text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              មើលទាំងអស់ <ArrowRight size={13} />
            </Link>
          </div>
          <NewsGrid articles={sportsArticles} />
        </section>
      )}
    </div>
  );
}
