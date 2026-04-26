const INDICES = [
  { name: "S&P 500", value: "5,248.32", change: "+0.84%", up: true },
  { name: "NASDAQ", value: "16,428.11", change: "+1.12%", up: true },
  { name: "DOW JONES", value: "38,996.70", change: "-0.21%", up: false },
  { name: "VIX", value: "14.82", change: "Low Volatility", up: true },
];

export default function MarketOverview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
      {INDICES.map((idx) => (
        <div key={idx.name} className="card-sm">
          <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{idx.name}</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>{idx.value}</div>
          <div style={{ fontSize: 12, color: idx.up ? "var(--green)" : "var(--red)" }}>{idx.change}</div>
        </div>
      ))}
    </div>
  );
}
