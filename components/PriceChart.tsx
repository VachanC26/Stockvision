"use client";
import { useEffect, useRef, useState } from "react";
import { TimeRange, ChartCandle } from "@/lib/types";

const RANGES: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y"];

interface Props {
  symbol: string;
  isUp: boolean;
}

export default function PriceChart({ symbol, isUp }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [range, setRange] = useState<TimeRange>("1M");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let chart: any;
    async function init() {
      const LWC = await import("lightweight-charts");
      if (!containerRef.current) return;
      if (chartRef.current) { chartRef.current.remove(); chartRef.current = null; }

      chart = LWC.createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height: 280,
        layout: { background: { color: "transparent" }, textColor: "#888899" },
        grid: { vertLines: { color: "rgba(255,255,255,0.05)" }, horzLines: { color: "rgba(255,255,255,0.05)" } },
        crosshair: { mode: LWC.CrosshairMode.Normal },
        rightPriceScale: { borderColor: "rgba(255,255,255,0.1)" },
        timeScale: { borderColor: "rgba(255,255,255,0.1)", timeVisible: true },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#1D9E75",
        downColor: "#E24B4A",
        borderUpColor: "#1D9E75",
        borderDownColor: "#E24B4A",
        wickUpColor: "#1D9E75",
        wickDownColor: "#E24B4A",
      });

      chartRef.current = chart;
      seriesRef.current = candleSeries;

      const resizeObserver = new ResizeObserver(() => {
        if (containerRef.current && chart) {
          chart.applyOptions({ width: containerRef.current.clientWidth });
        }
      });
      resizeObserver.observe(containerRef.current);
    }
    init();
    return () => { if (chart) chart.remove(); };
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!seriesRef.current) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/chart?symbol=${symbol}&range=${range}`);
        const json = await res.json();
        if (json.data && seriesRef.current) {
          seriesRef.current.setData(json.data);
          if (chartRef.current) chartRef.current.timeScale().fitContent();
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    loadData();
  }, [symbol, range]);

  return (
    <div>
      {/* Range Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)} style={{
            padding: "4px 12px", borderRadius: 6, fontSize: 12, border: "1px solid",
            borderColor: range === r ? "var(--blue)" : "var(--border)",
            background: range === r ? "var(--blue)" : "transparent",
            color: range === r ? "#fff" : "var(--text2)",
            transition: "all 0.15s",
          }}>{r}</button>
        ))}
        {loading && <span style={{ fontSize: 11, color: "var(--text2)", alignSelf: "center", marginLeft: 8 }}>Loading...</span>}
      </div>
      {/* Chart Container */}
      <div ref={containerRef} style={{ width: "100%", height: 280, borderRadius: 8, overflow: "hidden" }} />
    </div>
  );
}
