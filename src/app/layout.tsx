import type { Metadata } from "next";
import "./globals.css";
import { kantumruyPro, battambang } from "@/lib/khmerFont";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ThemeProvider } from "@/components/common/ThemeProvider";

export const metadata: Metadata = {
  title: "ព័ត៌មានកម្ពុជា | Cambodia News - NewKhmer",
  description: "កម្មវិធីព័ត៌មានកម្ពុជាទាន់ហេតុការណ៍ សេដ្ឋកិច្ច បច្ចេកវិទ្យា ទេសចរណ៍ និងកីឡា",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="km" suppressHydrationWarning className={`${kantumruyPro.variable} ${battambang.variable}`}>
      <body className="min-h-screen flex flex-col font-khmer selection:bg-red-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

