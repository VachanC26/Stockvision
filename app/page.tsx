import Navbar from "@/components/Navbar";
import MarketOverview from "@/components/MarketOverview";
import StockCard from "@/components/StockCard";
import { fetchMultipleQuotes } from "@/lib/api";
import { TRENDING_SYMBOLS, MOCK_STOCKS } from "@/lib/mockData";
import { Stock } from "@/lib/types";
import { formatPercent } from "@/lib/utils";
import Link from "next/link";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  let stocks: Stock[] = [];
  try {
    stocks = await fetchMultipleQuotes(TRENDING_SYMBOLS);
  } catch {
    stocks = TRENDING_SYMBOLS.map((s) => MOCK_STOCKS[s]).filter(Boolean);
  }

  const gainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const losers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Market Dashboard</h1>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Real-time stock analysis with technical indicators & news sentiment</p>
        </div>

        <MarketOverview />

        {/* Trending Stocks Grid */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 500, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Trending Stocks</h2>
            <Link href="/screener" style={{ fontSize: 12, color: "var(--blue)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {stocks.slice(0, 8).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        {/* Gainers & Losers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Top Gainers */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={16} color="var(--green)" />
              <h2 style={{ fontSize: 15, fontWeight: 500 }}>Top Gainers</h2>
            </div>
            {gainers.map((stock) => (
              <Link key={stock.symbol} href={`/stock/${stock.symbol}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{stock.symbol}</div>
                    <div style={{ fontSize: 11, color: "var(--text2)" }}>{stock.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 500 }}>${stock.price.toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: "var(--green)" }}>{formatPercent(stock.changePercent)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Top Losers */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingDown size={16} color="var(--red)" />
              <h2 style={{ fontSize: 15, fontWeight: 500 }}>Top Losers</h2>
            </div>
            {losers.map((stock) => (
              <Link key={stock.symbol} href={`/stock/${stock.symbol}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{stock.symbol}</div>
                    <div style={{ fontSize: 11, color: "var(--text2)" }}>{stock.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 500 }}>${stock.price.toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: "var(--red)" }}>{formatPercent(stock.changePercent)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
