import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNewsData } from "@/services/newsApi";
import { CATEGORIES } from "@/lib/constants";
import { CategoryView } from "@/components/news/CategoryView";

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

  const currentCategory = category || CATEGORIES[0];
  const articles = await fetchNewsData(params.slug, "km");

  return <CategoryView category={currentCategory} articles={articles} />;
}
