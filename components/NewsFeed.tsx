import { NewsItem } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export default function NewsFeed({ news }: { news: NewsItem[] }) {
  const bullCount = news.filter((n) => n.sentiment === "bullish").length;
  const bearCount = news.filter((n) => n.sentiment === "bearish").length;
  const overall = bullCount > bearCount ? "Mostly Bullish" : bearCount > bullCount ? "Mostly Bearish" : "Mixed";
  const overallClass = bullCount > bearCount ? "badge-up" : bearCount > bullCount ? "badge-down" : "badge-neutral";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "var(--text2)" }}>Sentiment:</span>
        <span className={`badge ${overallClass}`}>{overall}</span>
        <span style={{ fontSize: 11, color: "var(--text3)" }}>{bullCount} bullish · {bearCount} bearish</span>
      </div>

      {news.map((item) => (
        <div key={item.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "var(--text3)" }}>{item.source} · {item.datetime}</span>
            <span className={`badge ${item.sentiment === "bullish" ? "badge-up" : item.sentiment === "bearish" ? "badge-down" : "badge-neutral"}`}>
              {item.sentiment === "bullish" ? "Bullish" : item.sentiment === "bearish" ? "Bearish" : "Neutral"}
            </span>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "var(--text)", fontSize: 13, lineHeight: 1.4, display: "block", marginBottom: 4 }}>
            {item.headline}
            <ExternalLink size={10} style={{ marginLeft: 4, display: "inline", color: "var(--text3)" }} />
          </a>
          {item.summary && <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.4 }}>{item.summary.slice(0, 120)}...</p>}
        </div>
      ))}
    </div>
  );
}
