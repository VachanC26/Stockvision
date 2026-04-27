# 📈 StockVision — AI-Powered Stock Analysis Platform

A full-stack stock market analysis platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features real-time stock data, interactive candlestick charts, technical indicators, news sentiment analysis, stock screener, and watchlist management.

> 🚀 **Live Demo**: [stockvision.vercel.app](https://stockvision.vercel.app)

---

## ✨ Features

- **📊 Live Stock Prices** — Real-time quotes via Finnhub API
- **🕯️ Candlestick Charts** — TradingView Lightweight Charts with 1D/1W/1M/3M/1Y ranges
- **🔬 Technical Analysis** — RSI, MACD, Moving Averages, Bollinger Bands with Buy/Sell/Hold signals
- **📰 News Sentiment** — Latest news with Bullish/Bearish sentiment scoring
- **🔍 Stock Screener** — Filter by sector, market cap, gainers/losers with sortable columns
- **📊 Compare Stocks** — Side-by-side chart and fundamental comparison of two stocks
- **⭐ Watchlist** — Save and track favourite stocks (persisted in localStorage)
- **📱 Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | TradingView Lightweight Charts |
| Data Viz | Recharts |
| Stock API | Finnhub |
| Historical Data | Alpha Vantage |
| News | NewsAPI |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/VachanC26/stockvision.git
cd stockvision
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your API keys in `.env.local`:
```env
FINNHUB_API_KEY=your_finnhub_api_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
NEWS_API_KEY=your_news_api_key
```

Get free API keys from:
- **Finnhub**: https://finnhub.io (60 calls/min free)
- **Alpha Vantage**: https://www.alphavantage.co (25 calls/day free)
- **NewsAPI**: https://newsapi.org (100 calls/day free)

> **Note**: The app works without API keys using built-in mock data for all stocks.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
stockvision/
├── app/
│   ├── page.tsx              # Dashboard / Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── api/
│   │   ├── stock/route.ts    # Stock quote API
│   │   ├── chart/route.ts    # Historical chart data API
│   │   └── news/route.ts     # News API
│   ├── stock/[symbol]/
│   │   └── page.tsx          # Individual stock detail page
│   ├── screener/
│   │   └── page.tsx          # Stock screener
│   ├── compare/
│   │   └── page.tsx          # Stock comparison
│   └── watchlist/
│       └── page.tsx          # User watchlist
├── components/
│   ├── Navbar.tsx            # Navigation bar with search
│   ├── StockCard.tsx         # Stock card component
│   ├── PriceChart.tsx        # TradingView candlestick chart
│   ├── TechnicalAnalysis.tsx # RSI, MACD, indicators panel
│   ├── NewsFeed.tsx          # News with sentiment badges
│   ├── MarketOverview.tsx    # Index cards (S&P, NASDAQ etc.)
│   └── WatchlistButton.tsx   # Star/unstar button
└── lib/
    ├── api.ts                # All external API calls
    ├── mockData.ts           # Fallback mock data
    ├── types.ts              # TypeScript interfaces
    └── utils.ts              # Utility functions
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in the Vercel dashboard
4. Deploy!

```bash
# Or deploy via CLI
npm i -g vercel
vercel
```

---

## 📸 Screenshots

| Dashboard | Stock Detail |
|---|---|
| Market overview with gainers/losers | Candlestick chart + technical indicators |

| Screener | Compare |
|---|---|
| Filter by sector, sort all columns | Side-by-side stock comparison |

---

## 🔮 Future Enhancements

- [ ] User authentication (Clerk/NextAuth)
- [ ] Portfolio tracker with P&L
- [ ] Price alerts via email/SMS
- [ ] AI chatbot for stock Q&A
- [ ] Options chain viewer
- [ ] Dark/Light mode toggle

---

## 👨‍💻 Author

Built by **Vachan C** as a major project demonstrating full-stack development with Next.js, real-time APIs, and financial data visualization.

---

## 📄 License

MIT License — feel free to use this project as inspiration for your own work.
