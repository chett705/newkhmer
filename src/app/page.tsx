import { fetchLiveCambodiaNews } from "@/services/newsApi";
import { HeroBanner } from "@/components/news/HeroBanner";
import { NewsGrid } from "@/components/news/NewsGrid";
import { TrendingSidebar } from "@/components/news/TrendingSidebar";
import { BreakingTicker } from "@/components/news/BreakingTicker";
import { CategoryPills } from "@/components/news/CategoryPills";
import { SectionHeader } from "@/components/news/SectionHeader";
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

  const allArticles = await fetchLiveCambodiaNews();

  // Search or category filtering
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

  // Business and Sports specialized sections
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

      {/* 3. Hero Section: Banner + Trending Sidebar */}
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

      {/* 4. Category Filter Pills */}
      <CategoryPills selectedCategory={selectedCategory} />

      {/* 5. Main News Grid */}
      <section className="space-y-6">
        <SectionHeader
          titleKm={
            searchQuery
              ? "លទ្ធផលស្វែងរក"
              : selectedCategory === "all"
              ? "ព័ត៌មានសំខាន់ៗប្រចាំថ្ងៃ"
              : "ព័ត៌មានក្នុងជំពូក"
          }
          titleEn={
            searchQuery
              ? "Search Results"
              : selectedCategory === "all"
              ? "Top Stories of the Day"
              : "Category News"
          }
          subtitleKm="បច្ចុប្បន្នភាពចុងក្រោយបង្អស់ពីស្ថាប័នព័ត៌មានជាតិ និងអន្តរជាតិ"
          subtitleEn="Up-to-the-minute reports from national and international news agencies"
          badgeColor="bg-red-600"
        />
        <NewsGrid
          articles={selectedCategory === "all" && !searchQuery ? mainGridArticles : filtered}
        />
      </section>

      {/* 6. Curated Business & Economy Section */}
      {!searchQuery && selectedCategory === "all" && businessArticles.length > 0 && (
        <section className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-4">
          <SectionHeader
            titleKm="សេដ្ឋកិច្ច និងធុរកិច្ច"
            titleEn="Business & Economy"
            subtitleKm="ទីផ្សារ ធនាគារ ការវិនិយោគ និងពាណិជ្ជកម្មកម្ពុជា"
            subtitleEn="Markets, banking, trade, and investments in Cambodia"
            badgeColor="bg-emerald-600"
            moreLink="/category/business"
          />
          <NewsGrid articles={businessArticles} />
        </section>
      )}

      {/* 7. Curated Sports Section */}
      {!searchQuery && selectedCategory === "all" && sportsArticles.length > 0 && (
        <section className="pt-6 border-t border-gray-200/80 dark:border-slate-800 space-y-4">
          <SectionHeader
            titleKm="កីឡា និងគុនខ្មែរ"
            titleEn="Sports & Kun Khmer"
            subtitleKm="គុនខ្មែរ បាល់ទាត់ និងព្រឹត្តិការណ៍កីឡាជាតិ-អន្តរជាតិ"
            subtitleEn="Kun Khmer, football, and national martial arts tournaments"
            badgeColor="bg-amber-600"
            moreLink="/category/sports"
          />
          <NewsGrid articles={sportsArticles} />
        </section>
      )}
    </div>
  );
}
