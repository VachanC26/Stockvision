"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_STOCKS } from "@/lib/mockData";
import { formatPrice, formatPercent } from "@/lib/utils";
import Link from "next/link";
import { Star, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    setWatchlist(JSON.parse(localStorage.getItem("watchlist") || '["AAPL","NVDA","MSFT"]'));
  }, []);

  function remove(sym: string) {
    const next = watchlist.filter((s) => s !== sym);
    setWatchlist(next);
    localStorage.setItem("watchlist", JSON.stringify(next));
  }

  const stocks = watchlist.map((s) => MOCK_STOCKS[s]).filter(Boolean);
  const totalValue = stocks.reduce((sum, s) => sum + s.price, 0);
  const gainers = stocks.filter((s) => s.changePercent > 0).length;
  const losers = stocks.filter((s) => s.changePercent < 0).length;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>My Watchlist</h1>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Track your favourite stocks in one place</p>
        </div>

        {/* Summary */}
        {stocks.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            <div className="card-sm">
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>WATCHING</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>{stocks.length} Stocks</div>
            </div>
            <div className="card-sm">
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>TODAY</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                <span style={{ color: "var(--green)" }}>{gainers} up</span>
                <span style={{ color: "var(--text2)", margin: "0 8px" }}>·</span>
                <span style={{ color: "var(--red)" }}>{losers} down</span>
              </div>
            </div>
            <div className="card-sm">
              <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>PORTFOLIO SCORE</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>
                {gainers > losers ? <span style={{ color: "var(--green)" }}>Bullish</span> : gainers < losers ? <span style={{ color: "var(--red)" }}>Bearish</span> : <span>Mixed</span>}
              </div>
            </div>
          </div>
        )}

        {/* Watchlist */}
        {stocks.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
            <Star size={40} color="var(--text3)" style={{ margin: "0 auto 16px" }} />
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Your watchlist is empty</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Star stocks in the Screener to add them here</div>
            <Link href="/screener">
              <button style={{ padding: "8px 20px", borderRadius: 8, background: "var(--blue)", color: "#fff", border: "none", fontSize: 13 }}>
                Go to Screener
              </button>
            </Link>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            {stocks.map((stock, i) => (
              <div key={stock.symbol} style={{
                display: "flex", alignItems: "center", padding: "16px 20px",
                borderBottom: i < stocks.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.1s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg3)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{stock.symbol}</span>
                    <span style={{ fontSize: 12, color: "var(--text2)" }}>{stock.name}</span>
                    <span style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "1px 6px", borderRadius: 4, fontSize: 10, color: "var(--text2)" }}>{stock.sector}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>Vol: {stock.volume} · Mkt Cap: {stock.marketCap}</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{formatPrice(stock.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}>
                    {stock.changePercent >= 0 ? <TrendingUp size={12} color="var(--green)" /> : <TrendingDown size={12} color="var(--red)" />}
                    <span style={{ fontSize: 12, color: stock.changePercent >= 0 ? "var(--green)" : "var(--red)" }}>
                      {formatPercent(stock.changePercent)}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={`/stock/${stock.symbol}`}>
                    <button style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid var(--border)", background: "none", color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
                      Analyse
                    </button>
                  </Link>
                  <button onClick={() => remove(stock.symbol)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border)", background: "none", color: "var(--red)", fontSize: 12, cursor: "pointer" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
