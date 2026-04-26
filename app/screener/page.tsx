"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_STOCKS } from "@/lib/mockData";
import { Stock } from "@/lib/types";
import { formatPrice, formatPercent } from "@/lib/utils";
import Link from "next/link";
import { ChevronUp, ChevronDown, Star } from "lucide-react";

const SECTORS = ["All", "Technology", "Consumer", "Finance", "Healthcare", "Energy"];
const FILTERS = [
  { key: "all", label: "All" },
  { key: "gainers", label: "Gainers" },
  { key: "losers", label: "Losers" },
  { key: "largecap", label: "Large Cap" },
];

type SortKey = keyof Stock;

export default function ScreenerPage() {
  const [sector, setSector] = useState("All");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("changePercent");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") return JSON.parse(localStorage.getItem("watchlist") || "[]");
    return [];
  });

  function toggleWatch(sym: string) {
    const next = watchlist.includes(sym) ? watchlist.filter((s) => s !== sym) : [...watchlist, sym];
    setWatchlist(next);
    localStorage.setItem("watchlist", JSON.stringify(next));
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else { setSortKey(key); setSortDir(-1); }
  }

  const stocks = useMemo(() => {
    let data = Object.values(MOCK_STOCKS);
    if (sector !== "All") data = data.filter((s) => s.sector === sector);
    if (filter === "gainers") data = data.filter((s) => s.changePercent > 0);
    if (filter === "losers") data = data.filter((s) => s.changePercent < 0);
    if (filter === "largecap") data = data.filter((s) => s.marketCap.includes("T"));
    data.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === "string") return av.localeCompare(bv) * sortDir;
      return ((av as number) - (bv as number)) * sortDir;
    });
    return data;
  }, [sector, filter, sortKey, sortDir]);

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <span style={{ opacity: 0.3 }}>↕</span>;
    return sortDir === -1 ? <ChevronDown size={12} /> : <ChevronUp size={12} />;
  }

  const thStyle: React.CSSProperties = { padding: "10px 12px", fontSize: 11, color: "var(--text2)", fontWeight: 500, textAlign: "left", borderBottom: "1px solid var(--border)", cursor: "pointer", whiteSpace: "nowrap" };
  const tdStyle: React.CSSProperties = { padding: "11px 12px", borderBottom: "1px solid var(--border)", fontSize: 13 };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Stock Screener</h1>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Filter and sort stocks by key metrics</p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {SECTORS.map((s) => (
                <button key={s} onClick={() => setSector(s)} style={{
                  padding: "5px 12px", borderRadius: 100, fontSize: 12,
                  border: "1px solid", borderColor: sector === s ? "var(--blue)" : "var(--border)",
                  background: sector === s ? "rgba(55,138,221,0.15)" : "transparent",
                  color: sector === s ? "var(--blue)" : "var(--text2)",
                }}>{s}</button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "var(--border)" }} />
            <div style={{ display: "flex", gap: 6 }}>
              {FILTERS.map((f) => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  padding: "5px 12px", borderRadius: 100, fontSize: 12,
                  border: "1px solid", borderColor: filter === f.key ? "var(--text)" : "var(--border)",
                  background: filter === f.key ? "var(--text)" : "transparent",
                  color: filter === f.key ? "var(--bg)" : "var(--text2)",
                }}>{f.label}</button>
              ))}
            </div>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text2)" }}>{stocks.length} stocks</span>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg3)" }}>
                  <th style={thStyle} onClick={() => handleSort("symbol")}>Symbol <SortIcon k="symbol" /></th>
                  <th style={thStyle}>Company</th>
                  <th style={thStyle} onClick={() => handleSort("sector")}>Sector <SortIcon k="sector" /></th>
                  <th style={thStyle} onClick={() => handleSort("price")}>Price <SortIcon k="price" /></th>
                  <th style={thStyle} onClick={() => handleSort("changePercent")}>Change <SortIcon k="changePercent" /></th>
                  <th style={thStyle} onClick={() => handleSort("volume")}>Volume <SortIcon k="volume" /></th>
                  <th style={thStyle} onClick={() => handleSort("marketCap")}>Mkt Cap <SortIcon k="marketCap" /></th>
                  <th style={thStyle} onClick={() => handleSort("pe")}>P/E <SortIcon k="pe" /></th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.symbol} style={{ transition: "background 0.1s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg3)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <td style={tdStyle}><strong>{stock.symbol}</strong></td>
                    <td style={{ ...tdStyle, color: "var(--text2)" }}>{stock.name}</td>
                    <td style={tdStyle}>
                      <span style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 4, fontSize: 11 }}>{stock.sector}</span>
                    </td>
                    <td style={tdStyle}>{formatPrice(stock.price)}</td>
                    <td style={{ ...tdStyle, color: stock.changePercent >= 0 ? "var(--green)" : "var(--red)" }}>
                      {formatPercent(stock.changePercent)}
                    </td>
                    <td style={{ ...tdStyle, color: "var(--text2)" }}>{stock.volume}</td>
                    <td style={tdStyle}>{stock.marketCap}</td>
                    <td style={tdStyle}>{stock.pe}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => toggleWatch(stock.symbol)} style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: watchlist.includes(stock.symbol) ? "#FFC107" : "var(--text3)", fontSize: 16,
                        }}>
                          <Star size={15} fill={watchlist.includes(stock.symbol) ? "#FFC107" : "none"} />
                        </button>
                        <Link href={`/stock/${stock.symbol}`}>
                          <button style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, border: "1px solid var(--border)", background: "none", color: "var(--text)", cursor: "pointer" }}>
                            View
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
