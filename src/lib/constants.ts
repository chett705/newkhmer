import { Category } from "@/types/news";

export const CATEGORIES: Category[] = [
  { id: "all", slug: "all", nameEn: "All News", nameKm: "ទំព័រដើម", icon: "Globe" },
  { id: "national", slug: "national", nameEn: "National", nameKm: "ព័ត៌មានជាតិ", descriptionKm: "ព្រឹត្តិការណ៍នយោបាយ សង្គម និងការអភិវឌ្ឍកម្ពុជា", icon: "Landmark" },
  { id: "business", slug: "business", nameEn: "Business & Economy", nameKm: "សេដ្ឋកិច្ច", descriptionKm: "ទីផ្សារ ធនាគារ ពាណិជ្ជកម្ម និងការវិនិយោគ", icon: "TrendingUp" },
  { id: "technology", slug: "technology", nameEn: "Technology", nameKm: "បច្ចេកវិទ្យា", descriptionKm: "ឌីជីថល បញ្ញាសិប្បនិម្មិត AI និងទូរស័ព្ទ", icon: "Cpu" },
  { id: "sports", slug: "sports", nameEn: "Sports", nameKm: "កីឡា", descriptionKm: "គុនខ្មែរ បាល់ទាត់ និងព្រឹត្តិការណ៍កីឡាជាតិ-អន្តរជាតិ", icon: "Trophy" },
  { id: "tourism", slug: "tourism", nameEn: "Tourism & Culture", nameKm: "ទេសចរណ៍ និងវប្បធម៌", descriptionKm: "រមណីយដ្ឋាន ប្រាសាទបុរាណ និងវប្បធម៌ខ្មែរ", icon: "Palmtree" },
];

// Curated authentic Cambodian category photos for 100% guaranteed beautiful presentation
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  national: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80",
  business: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
  technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
  sports: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
  tourism: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
  all: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1200&auto=format&fit=crop&q=80",
};

export const FALLBACK_IMAGE = CATEGORY_FALLBACK_IMAGES.national;

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
    name: "Khmer Times (Sports)",
    category: "sports",
    lang: "en",
    url: "https://www.khmertimeskh.com/category/sports/feed/",
    sourceId: "khmer-times-sports",
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
    language: "km",
  },
];
