"use client";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function WatchlistButton({ symbol }: { symbol: string }) {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const wl: string[] = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatched(wl.includes(symbol));
  }, [symbol]);

  function toggle() {
    const wl: string[] = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const next = wl.includes(symbol) ? wl.filter((s) => s !== symbol) : [...wl, symbol];
    localStorage.setItem("watchlist", JSON.stringify(next));
    setWatched(!watched);
  }

  return (
    <button onClick={toggle} title={watched ? "Remove from watchlist" : "Add to watchlist"} style={{
      display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
      borderRadius: 8, border: "1px solid var(--border)",
      background: watched ? "rgba(255,193,7,0.1)" : "var(--bg3)",
      color: watched ? "#FFC107" : "var(--text2)",
      fontSize: 13, transition: "all 0.15s",
    }}>
      <Star size={14} fill={watched ? "#FFC107" : "none"} />
      {watched ? "Watching" : "Add to Watchlist"}
    </button>
  );
}
