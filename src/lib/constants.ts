import { Category } from "@/types/news";

export const CATEGORIES: Category[] = [
  { id: "all", slug: "all", nameEn: "All News", nameKm: "ទំព័រដើម", icon: "Globe" },
  { id: "national", slug: "national", nameEn: "National", nameKm: "ព័ត៌មានជាតិ", descriptionKm: "ព្រឹត្តិការណ៍នយោបាយ និងសង្គមកម្ពុជា", icon: "Landmark" },
  { id: "business", slug: "business", nameEn: "Business & Economy", nameKm: "សេដ្ឋកិច្ច", descriptionKm: "ទីផ្សារ ធនាគារ និងការវិនិយោគ", icon: "TrendingUp" },
  { id: "technology", slug: "technology", nameEn: "Technology", nameKm: "បច្ចេកវិទ្យា", descriptionKm: "ឌីជីថល នវានុវត្តន៍ និងទូរស័ព្ទ", icon: "Cpu" },
  { id: "sports", slug: "sports", nameEn: "Sports", nameKm: "កីឡា", descriptionKm: "បាល់ទាត់ គុនខ្មែរ និងព្រឹត្តិការណ៍កីឡាជាតិ-អន្តរជាតិ", icon: "Trophy" },
  { id: "tourism", slug: "tourism", nameEn: "Tourism & Culture", nameKm: "ទេសចរណ៍ និងវប្បធម៌", descriptionKm: "តំបន់ទេសចរណ៍ ប្រាសាទបុរាណ និងវប្បធម៌ខ្មែរ", icon: "Palmtree" },
];

export const FALLBACK_IMAGE = "/images/placeholder-news.svg";

export const REAL_NEWS_SOURCES = [
  {
    name: "RFI ខេមរភាសា (កម្ពុជា)",
    category: "national",
    lang: "km",
    url: "https://www.rfi.fr/km/cambodia/rss",
    sourceId: "rfi-khmer",
  },
  {
    name: "RFI ខេមរភាសា (ទូទៅ)",
    category: "general",
    lang: "km",
    url: "https://www.rfi.fr/km/general/rss",
    sourceId: "rfi-world",
  },
  {
    name: "Khmer Times (National)",
    category: "national",
    lang: "en",
    url: "https://www.khmertimeskh.com/feed/",
    sourceId: "khmer-times",
  },
  {
    name: "Khmer Times (Business)",
    category: "business",
    lang: "en",
    url: "https://www.khmertimeskh.com/category/business/feed/",
    sourceId: "khmer-times-biz",
  },
  {
    name: "Google News Cambodia",
    category: "all",
    lang: "en",
    url: "https://news.google.com/rss/search?q=Cambodia&hl=en-US&gl=US&ceid=US:en",
    sourceId: "google-news",
  },
];

export const CAMBODIAN_PUBLISHERS = REAL_NEWS_SOURCES;

export const MOCK_ARTICLES = [
  {
    id: "cambodia-national-update",
    title: "ព័ត៌មានកម្ពុជាទាន់ហេតុការណ៍ប្រចាំថ្ងៃ",
    link: "https://www.rfi.fr/km/",
    description: "បច្ចុប្បន្នភាពព័ត៌មានជាតិ សេដ្ឋកិច្ច សង្គម និងការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធក្នុងព្រះរាជាណាចក្រកម្ពុជា។",
    content: "ព័ត៌មានបន្តធ្វើបច្ចុប្បន្នភាពផ្ទាល់ពីប្រភពព័ត៌មានផ្លូវការ...",
    pubDate: new Date().toISOString(),
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
    source_id: "rfi-khmer",
    source_name: "RFI ខេមរភាសា",
    category: ["national"],
    language: "km"
  }
];
