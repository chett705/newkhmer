# Cambodia News App (NewKhmer)

A modern, responsive news web application for Cambodia built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Features real-time live news feeds in Khmer and English, Google Fonts integration (Kantumruy Pro & Battambang), dark/light mode, and server-side API proxying.

---

## 🌟 Key Features

- **Live Cambodian News**: Integrated with active news feeds (RFI Khmer, Khmer Times, Google News Cambodia) with instant automated updates.
- **Khmer Font Support**: Kantumruy Pro & Battambang fonts optimized with fallback.
- **Khmer Lunar & Solar Calendar**: Displays live Khmer dates, Buddhist Era (ព.ស.), and zodiac year approximations.
- **Responsive Layout**:
  - Top Breaking Hero Story
  - 3-Column Responsive News Grid
  - Category Filtering (National, Business, Technology, Sports, Tourism)
  - Full Article View (`/article/[id]`) with original source link and related stories
  - Instant Search Filter
- **Dark & Light Mode**: Seamless theme switching with persistent user preference.
- **Secure Server-side Proxy**: API keys and external endpoints are protected behind `/api/news` and `/api/rss`.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
> The application works immediately out-of-the-box using live Cambodian RSS feeds (RFI Khmer, Khmer Times, Google News). If you also have a [NewsData.io](https://newsdata.io) API key, you can add it to `NEWSDATA_API_KEY` in `.env.local`.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Architecture

```
cambodia-news-app/
├── .env.local                   # API keys (NEWSDATA_API_KEY, NEXT_PUBLIC_SITE_URL)
├── .env.example
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── public/
│   ├── favicon.ico
│   ├── images/
│   │   ├── placeholder-news.webp
│   │   ├── placeholder-news.svg
│   │   └── cambodia-flag.svg
│   └── locales/                 # Multi-language strings (Khmer / English)
│       ├── en.json
│       └── km.json
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Global HTML, Navbar, Footer, Khmer Font config
│   │   ├── page.tsx             # Homepage (Breaking News, Categories, Search)
│   │   ├── article/[id]/page.tsx # Single News Reading View (Detail page)
│   │   ├── category/[slug]/page.tsx # Filter by: Business, Tech, Sports, National
│   │   └── api/                 # Server-side API Proxy
│   │       ├── news/route.ts    # GET /api/news?category=...&lang=km
│   │       └── rss/route.ts     # GET /api/rss (Aggregated live feeds)
│   ├── components/
│   │   ├── common/              # Header, Footer, ThemeToggle, ThemeProvider
│   │   ├── news/                # HeroBanner, NewsCard, NewsGrid, CategoryTabs
│   │   └── ui/                  # Skeleton loader, Badge, Button
│   ├── lib/                     # Constants, Khmer date utils, Font loaders
│   ├── services/                # NewsData.io & Live RSS feed parsers
│   └── types/                   # TypeScript interfaces
```
