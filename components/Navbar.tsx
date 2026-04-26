"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, TrendingUp, BarChart2, Star, GitCompare } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const sym = query.trim().toUpperCase();
    if (sym) {
      router.push(`/stock/${sym}`);
      setQuery("");
    }
  }

  return (
    <nav style={{
      background: "var(--bg2)",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.5px", color: "var(--text)" }}>
          Stock<span style={{ color: "var(--blue)" }}>Vision</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 4 }}>
        <NavLink href="/" icon={<TrendingUp size={14} />} label="Dashboard" />
        <NavLink href="/screener" icon={<BarChart2 size={14} />} label="Screener" />
        <NavLink href="/compare" icon={<GitCompare size={14} />} label="Compare" />
        <NavLink href="/watchlist" icon={<Star size={14} />} label="Watchlist" />
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", minWidth: 240 }}>
        <Search size={14} color="var(--text2)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbol... AAPL, TSLA"
          style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "var(--text)", width: "100%" }}
        />
      </form>
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 12px", borderRadius: 6, fontSize: 13,
        color: "var(--text2)", transition: "all 0.15s",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg3)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text2)"; }}
      >
        {icon} {label}
      </div>
    </Link>
  );
}
