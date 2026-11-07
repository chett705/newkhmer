import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-5 overflow-hidden rounded">
                <Image
                  src="/images/cambodia-flag.svg"
                  alt="Cambodia Flag"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold font-khmer text-white">
                ព័ត៌មានកម្ពុជា • NEWKHMER
              </span>
            </div>
            <p className="text-sm font-khmer leading-relaxed text-slate-400 max-w-md">
              គេហទំព័រព័ត៌មានជាតិ និងអន្តរជាតិឈានមុខគេ នាំមកជូននូវព័ត៌មានទាន់ហេតុការណ៍ សេដ្ឋកិច្ច
              បច្ចេកវិទ្យា ទេសចរណ៍ និងកីឡា ប្រកបដោយភាពសុក្រឹត និងល្បឿនលឿន។
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider font-khmer mb-4">
              ជំពូកព័ត៌មាន
            </h3>
            <ul className="space-y-2 text-sm font-khmer">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.nameKm}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info & Sources */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider font-khmer mb-4">
              ដៃគូព័ត៌មាន
            </h3>
            <ul className="space-y-2 text-sm font-khmer">
              <li>Khmer Times</li>
              <li>Phnom Penh Post</li>
              <li>Thmey Thmey</li>
              <li>Fresh News</li>
              <li>Sabay News</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cambodia News App (NEWKHMER). All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

