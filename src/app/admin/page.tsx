"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";
import { REAL_NEWS_SOURCES, CATEGORIES, FALLBACK_IMAGE } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/dateUtils";
import {
  Plus,
  Trash2,
  ExternalLink,
  Search,
  Rss,
  Newspaper,
  CheckCircle2,
  Layers,
  Sparkles,
  RefreshCw,
  Clock,
  X,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [customArticles, setCustomArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "custom" | "feeds">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Article Form State
  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "national",
    description: "",
    content: "",
    image_url: "",
    source_name: "ការិយាល័យនិពន្ធ NewKhmer",
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Fetch live articles
      const liveRes = await fetch("/api/rss");
      const liveData = await liveRes.json();
      const liveList: Article[] = liveData.results || [];

      // 2. Fetch custom articles
      const customRes = await fetch("/api/admin/articles");
      const customData = await customRes.json();
      const customList: Article[] = customData.results || [];

      setCustomArticles(customList);
      setArticles([...customList, ...liveList]);
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.description) {
      alert("សូមបំពេញចំណងជើង និងសេចក្តីសង្ខេប!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewArticle({
          title: "",
          category: "national",
          description: "",
          content: "",
          image_url: "",
          source_name: "ការិយាល័យនិពន្ធ NewKhmer",
        });
        await loadAllData();
      } else {
        alert("ការបង្កើតអត្ថបទបរាជ័យ!");
      }
    } catch (err) {
      alert("មានបញ្ហាក្នុងការភ្ជាប់បណ្តាញ!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCustomArticle = async (id: string) => {
    if (!confirm("តើអ្នកប្រាកដថាចង់លុបអត្ថបទនេះមែនទេ?")) return;

    try {
      const res = await fetch(`/api/admin/articles?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await loadAllData();
      }
    } catch (e) {
      alert("ការលុបបរាជ័យ!");
    }
  };

  // Filtered articles
  const displayedArticles = (activeTab === "custom" ? customArticles : articles).filter((a) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      (a.source_name && a.source_name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Banner with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <span>ផ្ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200">
              CMS v1.0
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90">
            គ្រប់គ្រងអត្ថបទព័ត៌មាន បង្កើតព្រឹត្តិការណ៍ទាន់ហេតុការណ៍ និងត្រួតពិនិត្យប្រភពព័ត៌មានផ្ទាល់
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            title="Reload Data"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-900/40 transition active:scale-95"
          >
            <Plus size={18} /> បង្កើតអត្ថបទថ្មី
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              អត្ថបទសរុប (Total News)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {articles.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
            <Newspaper size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              ប្រភពផ្សាយផ្ទាល់ (Live Feeds)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {REAL_NEWS_SOURCES.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
            <Rss size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              អត្ថបទបង្កើតផ្ទាល់ (Editorial)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              {customArticles.length}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
            <Sparkles size={24} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              ជំពូកព័ត៌មាន (Categories)
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {CATEGORIES.length - 1}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* 3. Live Feeds Health Monitor Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Rss className="text-emerald-500" size={20} />
            ស្ថានភាពប្រភពព័ត៌មានផ្សាយផ្ទាល់ (Live News Sources Health)
          </h2>
          <span className="text-xs text-gray-500">ស្ទ្រីមស្វ័យប្រវត្តរៀងរាល់ ៥ នាទីម្តង</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REAL_NEWS_SOURCES.map((source) => (
            <div
              key={source.sourceId}
              className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {source.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                  <CheckCircle2 size={12} /> Active
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
                {source.url}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-200/50 dark:border-slate-800">
                <span>ភាសា: {source.lang.toUpperCase()}</span>
                <span>ប្រភេទ: {source.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Article Management Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-sm space-y-5">
        {/* Table Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              អត្ថបទទាំងអស់ ({articles.length})
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === "custom"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              បង្កើតដោយផ្ទាល់ ({customArticles.length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ស្វែងរកចំណងជើង..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-transparent focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-gray-50 dark:bg-slate-800/80 text-gray-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">រូបភាព & ចំណងជើង</th>
                <th className="py-3.5 px-4 hidden md:table-cell">ប្រភព</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">ជំពូក</th>
                <th className="py-3.5 px-4 hidden lg:table-cell">កាលបរិច្ឆេទ</th>
                <th className="py-3.5 px-4 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
              {displayedArticles.slice(0, 20).map((art) => {
                const isCustom = art.source_id === "editorial";

                return (
                  <tr
                    key={art.id}
                    className="hover:bg-gray-50/80 dark:hover:bg-slate-850/60 transition group"
                  >
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800">
                          <Image
                            src={art.image_url || FALLBACK_IMAGE}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug">
                          {art.title}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 hidden md:table-cell">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          isCustom
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                            : "bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {art.source_name}
                      </span>
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-xs uppercase font-semibold text-gray-500 dark:text-slate-400">
                        {art.category?.[0] || "General"}
                      </span>
                    </td>

                    <td className="py-3 px-4 hidden lg:table-cell text-xs text-gray-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {formatRelativeTime(art.pubDate, "km")}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/article/${encodeURIComponent(art.id)}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-blue-600 transition"
                          title="មើលអត្ថបទ"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        {isCustom && (
                          <button
                            onClick={() => handleDeleteCustomArticle(art.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 dark:hover:bg-red-950/50 transition"
                            title="លុបអត្ថបទ"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Create Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Plus size={22} className="text-red-600" />
                បង្កើត និងផ្សាយអត្ថបទព័ត៌មានថ្មី
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                  ចំណងជើងអត្ថបទ (Article Title) *
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="ឧ. ពិធីបើកសម្ពោធគម្រោងហេដ្ឋារចនាសម្ព័ន្ធថ្មី..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                    ជំពូកព័ត៌មាន (Category)
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="national">ព័ត៌មានជាតិ (National)</option>
                    <option value="business">សេដ្ឋកិច្ច (Business)</option>
                    <option value="technology">បច្ចេកវិទ្យា (Technology)</option>
                    <option value="sports">កីឡា (Sports)</option>
                    <option value="tourism">ទេសចរណ៍ (Tourism)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                    ឈ្មោះស្ថាប័ន / អ្នកនិពន្ធ (Author)
                  </label>
                  <input
                    type="text"
                    value={newArticle.source_name}
                    onChange={(e) => setNewArticle({ ...newArticle, source_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                  តំណភ្ជាប់រូបភាព (Cover Image URL)
                </label>
                <input
                  type="url"
                  value={newArticle.image_url}
                  onChange={(e) => setNewArticle({ ...newArticle, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... (ទុកទទេដើម្បីប្រើរូបភាពស្វ័យប្រវត្ត)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                  សេចក្តីសង្ខេបព័ត៌មាន (Summary / Lead) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newArticle.description}
                  onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                  placeholder="សេចក្តីសង្ខេបខ្លី ១-២ ជួរ..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-slate-300">
                  ខ្លឹមសារពេញលេញ (Full Article Body)
                </label>
                <textarea
                  rows={5}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="ខ្លឹមសារលម្អិតនៃអត្ថបទព័ត៌មាន..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 font-semibold transition"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {submitting ? "កំពុងផ្សាយ..." : "ផ្សាយអត្ថបទភ្លាមៗ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

