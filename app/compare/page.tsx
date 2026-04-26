"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MOCK_STOCKS } from "@/lib/mockData";
import { formatPrice, formatPercent } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const SYMBOLS = Object.keys(MOCK_STOCKS);

function generateData(base: number, points = 12) {
  const months = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
  let price = base * 0.9;
  return months.map((m) => {
    price += (Math.random() - 0.47) * price * 0.05;
    return { month: m, price: parseFloat(price.toFixed(2)) };
  });
}

export default function ComparePage() {
  const [sym1, setSym1] = useState("AAPL");
  const [sym2, setSym2] = useState("MSFT");

  const s1 = MOCK_STOCKS[sym1];
  const s2 = MOCK_STOCKS[sym2];
  const data1 = generateData(s1.price);
  const data2 = generateData(s2.price);

  const chartData = data1.map((d, i) => ({
    month: d.month,
    [sym1]: d.price,
    [sym2]: data2[i].price,
  }));

  const selectStyle: React.CSSProperties = { padding: "8px 14px", fontSize: 14, borderRadius: 8, minWidth: 180 };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Compare Stocks</h1>
          <p style={{ color: "var(--text2)", fontSize: 13 }}>Side-by-side comparison of two stocks</p>
        </div>

        {/* Stock Selectors */}
        <div className="card" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <select style={selectStyle} value={sym1} onChange={(e) => setSym1(e.target.value)}>
            {SYMBOLS.map((s) => <option key={s} value={s}>{s} – {MOCK_STOCKS[s].name}</option>)}
          </select>
          <span style={{ color: "var(--text2)", fontWeight: 500 }}>vs</span>
          <select style={selectStyle} value={sym2} onChange={(e) => setSym2(e.target.value)}>
            {SYMBOLS.map((s) => <option key={s} value={s}>{s} – {MOCK_STOCKS[s].name}</option>)}
          </select>
        </div>

        {/* Price Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[{ sym: sym1, stock: s1, color: "#378ADD" }, { sym: sym2, stock: s2, color: "#1D9E75" }].map(({ sym, stock, color }) => (
            <div key={sym} className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                <span style={{ fontWeight: 700, fontSize: 18 }}>{sym}</span>
                <span style={{ color: "var(--text2)", fontSize: 13 }}>{stock.name}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{formatPrice(stock.price)}</div>
              <div style={{ color: stock.changePercent >= 0 ? "var(--green)" : "var(--red)", fontSize: 14, marginBottom: 16 }}>
                {formatPercent(stock.changePercent)} today
              </div>
              {[
                ["Market Cap", stock.marketCap],
                ["P/E Ratio", stock.pe.toFixed(1)],
                ["Volume", stock.volume],
                ["52W High", formatPrice(stock.high52)],
                ["52W Low", formatPrice(stock.low52)],
                ["Beta", stock.beta.toFixed(2)],
                ["Sector", stock.sector],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                  <span style={{ color: "var(--text2)" }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="card">
          <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 20 }}>12-Month Price Trend</h2>
          <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <span style={{ width: 16, height: 2, background: "#378ADD", display: "inline-block" }} />
              {sym1}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <span style={{ width: 16, height: 2, background: "#1D9E75", display: "inline-block", borderTop: "2px dashed #1D9E75", borderBottom: "none" }} />
              {sym2}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" tick={{ fill: "#888899", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888899", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + v} />
              <Tooltip
                contentStyle={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                formatter={(val: number) => ["$" + val.toFixed(2)]}
              />
              <Line type="monotone" dataKey={sym1} stroke="#378ADD" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey={sym2} stroke="#1D9E75" dot={false} strokeWidth={2} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </>
  );
}
