import { fetchNewsData } from "@/services/newsApi";
import { HeroBanner } from "@/components/news/HeroBanner";
import { NewsGrid } from "@/components/news/NewsGrid";
import { CategoryTabs } from "@/components/news/CategoryTabs";
import { MOCK_ARTICLES } from "@/lib/constants";
import Link from "next/link";

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function HomePage({ searchParams }: PageProps) {
  const selectedCategory = searchParams.category || "all";
  const searchQuery = searchParams.search;

  const articles = await fetchNewsData(
    selectedCategory === "all" ? "" : selectedCategory,
    "km",
    searchQuery
  );

  const heroArticle = articles.length > 0 ? articles[0] : MOCK_ARTICLES[0];
  const gridArticles = articles.length > 1 ? articles.slice(1) : articles;

  return (
    <div className="space-y-10">
      {/* Search status if searching */}
      {searchQuery && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 flex items-center justify-between">
          <p className="font-khmer text-sm text-blue-900 dark:text-blue-200">
            លទ្ធផលស្វែងរកសម្រាប់៖ <span className="font-bold">"{searchQuery}"</span> ({articles.length} អត្ថបទ)
          </p>
          <Link
            href="/"
            className="text-xs font-khmer text-blue-600 dark:text-blue-400 hover:underline"
          >
            សម្អាតការស្វែងរក
          </Link>
        </div>
      )}

      {/* Hero Banner only on primary home without search */}
      {!searchQuery && selectedCategory === "all" && heroArticle && (
        <section>
          <HeroBanner article={heroArticle} />
        </section>
      )}

      {/* Category Pills Navigation */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-khmer text-gray-900 dark:text-white">
            ជ្រើសរើសតាមជំពូក
          </h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {["all", "national", "business", "technology", "sports", "tourism"].map((cat) => {
            const labels: Record<string, string> = {
              all: "ទាំងអស់",
              national: "ព័ត៌មានជាតិ",
              business: "សេដ្ឋកិច្ច",
              technology: "បច្ចេកវិទ្យា",
              sports: "កីឡា",
              tourism: "ទេសចរណ៍",
            };
            const isActive = selectedCategory === cat;
            return (
              <Link
                key={cat}
                href={cat === "all" ? "/" : `/?category=${cat}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-khmer transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                }`}
              >
                {labels[cat]}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main News Grid */}
      <section>
        <NewsGrid
          articles={selectedCategory === "all" && !searchQuery ? gridArticles : articles}
          title={
            searchQuery
              ? "លទ្ធផលស្វែងរក"
              : selectedCategory === "all"
              ? "ព័ត៌មានសំខាន់ៗប្រចាំថ្ងៃ"
              : `ព័ត៌មាន${selectedCategory}`
          }
          subtitle="បច្ចុប្បន្នភាពចុងក្រោយបង្អស់ពីស្ថាប័នព័ត៌មានជាតិ"
        />
      </section>
    </div>
  );
}

