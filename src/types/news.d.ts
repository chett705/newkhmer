export interface Article {
  id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[] | null;
  video_url?: string | null;
  description: string;
  content?: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_priority?: number;
  country?: string[];
  category: string[];
  language: string;
  source_name?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage?: string | null;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameKm: string;
  descriptionEn?: string;
  descriptionKm?: string;
  icon?: string;
}

export type SupportedLocale = 'km' | 'en';

