import Navbar from "@/components/Navbar";
import PriceChart from "@/components/PriceChart";
import TechnicalAnalysis from "@/components/TechnicalAnalysis";
import NewsFeed from "@/components/NewsFeed";
import WatchlistButton from "@/components/WatchlistButton";
import { fetchStockQuote, fetchIndicators, fetchStockNews } from "@/lib/api";
import { MOCK_STOCKS, getMockIndicators, getMockNews } from "@/lib/mockData";
import { formatPrice, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export const revalidate = 60;

export default async function StockPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const symbol = resolvedParams.symbol.toUpperCase();

  let quote = MOCK_STOCKS[symbol] || { ...MOCK_STOCKS["AAPL"], symbol, name: symbol };
  let indicators = getMockIndicators(symbol);
  let news = getMockNews(symbol);

  try {
    [quote, indicators, news] = await Promise.all([
      fetchStockQuote(symbol),
      fetchIndicators(symbol),
      fetchStockNews(symbol),
    ]);
  } catch {}

  const isUp = quote.changePercent >= 0;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* Stock Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700 }}>{symbol}</h1>
              <span style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "2px 10px", borderRadius: 6, fontSize: 12, color: "var(--text2)" }}>{quote.sector}</span>
            </div>
            <div style={{ color: "var(--text2)", fontSize: 14 }}>{quote.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{formatPrice(quote.price)}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginTop: 4 }}>
              {isUp ? <TrendingUp size={16} color="var(--green)" /> : <TrendingDown size={16} color="var(--red)" />}
              <span style={{ color: isUp ? "var(--green)" : "var(--red)", fontWeight: 500 }}>
                {isUp ? "+" : ""}{quote.change.toFixed(2)} ({formatPercent(quote.changePercent)})
              </span>
            </div>
            <div style={{ marginTop: 8 }}>
              <WatchlistButton symbol={symbol} />
            </div>
          </div>
        </div>

        {/* Key Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Open", value: formatPrice(quote.open) },
            { label: "High", value: formatPrice(quote.high) },
            { label: "Low", value: formatPrice(quote.low) },
            { label: "Mkt Cap", value: quote.marketCap },
            { label: "P/E", value: quote.pe.toFixed(1) },
            { label: "Beta", value: quote.beta.toFixed(2) },
          ].map((stat) => (
            <div key={stat.label} className="card-sm" style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* 52W Range Bar */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>52-Week Range</span>
            <span style={{ fontSize: 13 }}>{formatPrice(quote.low52)} – {formatPrice(quote.high52)}</span>
          </div>
          <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.min(100, ((quote.price - quote.low52) / (quote.high52 - quote.low52)) * 100)}%`,
              background: isUp ? "var(--green)" : "var(--red)",
              borderRadius: 3,
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "var(--text3)" }}>
            <span>52W Low</span>
            <span style={{ color: "var(--text2)" }}>Current: {formatPrice(quote.price)}</span>
            <span>52W High</span>
          </div>
        </div>

        {/* Chart */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Activity size={16} color="var(--blue)" />
            <h2 style={{ fontSize: 15, fontWeight: 500 }}>Price Chart</h2>
          </div>
          <PriceChart symbol={symbol} isUp={isUp} />
        </div>

        {/* Analysis + News */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="card">
            <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Technical Analysis</h2>
            <TechnicalAnalysis indicators={indicators} />
          </div>
          <div className="card">
            <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 0 }}>Latest News</h2>
            <NewsFeed news={news} />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="card" style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Fundamentals</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[
              { label: "Volume", value: quote.volume },
              { label: "Avg Volume", value: quote.avgVolume },
              { label: "Dividend", value: quote.dividend },
              { label: "Sector", value: quote.sector },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 500 }}>{f.value || "N/A"}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
