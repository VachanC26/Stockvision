export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  pe: number;
  sector: string;
  high52: number;
  low52: number;
  open: number;
  high: number;
  low: number;
  avgVolume: string;
  dividend: string;
  beta: number;
}

export interface ChartCandle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  source: string;
  headline: string;
  summary: string;
  url: string;
  datetime: string;
  sentiment: "bullish" | "bearish" | "neutral";
  sentimentScore: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  macdSignal: number;
  ma50: number;
  ma200: number;
  bollingerUpper: number;
  bollingerLower: number;
  bollingerMid: number;
  volume: number;
  avgVolume: number;
  overallSignal: "Bullish" | "Bearish" | "Neutral";
  signalScore: number;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: string;
}

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y";
