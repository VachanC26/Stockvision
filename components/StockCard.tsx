import Link from "next/link";
import { Stock } from "@/lib/types";
import { formatPrice, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StockCard({ stock }: { stock: Stock }) {
  const isUp = stock.changePercent >= 0;
  return (
    <Link href={`/stock/${stock.symbol}`} style={{ textDecoration: "none" }}>
      <div className="card-sm" style={{ cursor: "pointer", border: "1px solid var(--border)", transition: "border-color 0.15s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{stock.symbol}</div>
            <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 1 }}>{stock.name}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>{formatPrice(stock.price)}</div>
            <div style={{ fontSize: 12, color: isUp ? "var(--green)" : "var(--red)", display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
              {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {formatPercent(stock.changePercent)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text2)" }}>
          <span>Vol: {stock.volume}</span>
          <span>{stock.sector}</span>
        </div>
      </div>
    </Link>
  );
}