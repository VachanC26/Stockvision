import { TechnicalIndicators } from "@/lib/types";
import { getRSISignal, getMACDSignal } from "@/lib/utils";

export default function TechnicalAnalysis({ indicators }: { indicators: TechnicalIndicators }) {
  const rsiSignal = getRSISignal(indicators.rsi);
  const macdSignal = getMACDSignal(indicators.macd);
  const aboveMA50 = indicators.ma50 > 0;

  const signalBg =
    indicators.overallSignal === "Bullish"
      ? "rgba(29,158,117,0.1)"
      : indicators.overallSignal === "Bearish"
      ? "rgba(226,75,74,0.1)"
      : "rgba(255,255,255,0.05)";

  const signalColor =
    indicators.overallSignal === "Bullish"
      ? "var(--green)"
      : indicators.overallSignal === "Bearish"
      ? "var(--red)"
      : "var(--text2)";

  return (
    <div>
      {/* Overall Signal */}
      <div style={{ background: signalBg, borderRadius: 8, padding: "14px", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 4 }}>OVERALL SIGNAL</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: signalColor }}>{indicators.overallSignal}</div>
        <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 4 }}>Score: {indicators.signalScore}/100</div>
        {/* Score Bar */}
        <div style={{ marginTop: 8, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${indicators.signalScore}%`, background: signalColor, borderRadius: 2, transition: "width 0.5s" }} />
        </div>
      </div>

      {/* Indicators */}
      {[
        { label: "RSI (14)", value: indicators.rsi.toFixed(1), signal: rsiSignal.label, type: indicators.rsi > 70 ? "sell" : indicators.rsi < 30 ? "buy" : "hold" },
        { label: "MACD", value: (indicators.macd >= 0 ? "+" : "") + indicators.macd.toFixed(2), signal: macdSignal.label, type: indicators.macd > 0 ? "buy" : "sell" },
        { label: "MA 50", value: "$" + indicators.ma50.toFixed(2), signal: "Price " + (indicators.ma50 ? "Above" : "Below"), type: "buy" },
        { label: "MA 200", value: "$" + indicators.ma200.toFixed(2), signal: "Long-term", type: "hold" },
        { label: "Bollinger", value: "Mid Band", signal: "Neutral", type: "hold" },
        { label: "Volume", value: indicators.volume > indicators.avgVolume ? "High" : "Low", signal: indicators.volume > indicators.avgVolume ? "Bullish" : "Bearish", type: indicators.volume > indicators.avgVolume ? "buy" : "sell" },
      ].map((row) => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
          <span style={{ color: "var(--text2)", fontSize: 13 }}>{row.label}</span>
          <span style={{ fontSize: 13 }}>{row.value}</span>
          <span className={`signal signal-${row.type}`}>{row.signal}</span>
        </div>
      ))}
    </div>
  );
}
