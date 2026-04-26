export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatVolume(value: string | number): string {
  if (typeof value === "string") return value;
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
  return String(value);
}

export function getRSISignal(rsi: number): { label: string; color: string } {
  if (rsi >= 70) return { label: "Overbought", color: "text-red-500" };
  if (rsi <= 30) return { label: "Oversold", color: "text-green-500" };
  return { label: "Neutral", color: "text-yellow-500" };
}

export function getMACDSignal(macd: number): { label: string; color: string } {
  if (macd > 0) return { label: "Buy", color: "text-green-500" };
  return { label: "Sell", color: "text-red-500" };
}

export function getOverallSignalColor(signal: string): string {
  if (signal === "Bullish") return "text-green-500";
  if (signal === "Bearish") return "text-red-500";
  return "text-yellow-500";
}
