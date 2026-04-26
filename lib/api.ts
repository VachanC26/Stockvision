import { Stock, ChartCandle, NewsItem, TechnicalIndicators, TimeRange } from "./types";
import { MOCK_STOCKS, getMockNews, getMockIndicators, generateCandleData } from "./mockData";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function fetchStockQuote(symbol: string): Promise<Stock> {
  try {
    const quote = await yahooFinance.quote(symbol);
    return {
      symbol,
      name: quote.longName || quote.shortName || symbol,
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      volume: formatVolume(quote.regularMarketVolume || 0),
      marketCap: formatMarketCap(quote.marketCap || 0),
      pe: quote.trailingPE || 0,
      sector: quote.sector || "N/A",
      high52: quote.fiftyTwoWeekHigh || 0,
      low52: quote.fiftyTwoWeekLow || 0,
      open: quote.regularMarketOpen || 0,
      high: quote.regularMarketDayHigh || 0,
      low: quote.regularMarketDayLow || 0,
      avgVolume: formatVolume(quote.averageDailyVolume3Month || 0),
      dividend: quote.dividendRate ? `${quote.dividendRate}` : "N/A",
      beta: quote.beta || 1,
    };
  } catch (error) {
    console.error(`Yahoo Finance error for ${symbol}:`, error);
    return MOCK_STOCKS[symbol] || { ...MOCK_STOCKS["AAPL"], symbol, name: symbol };
  }
}

export async function fetchCandleData(symbol: string, range: TimeRange): Promise<ChartCandle[]> {
  try {
    const rangeMap: Record<TimeRange, { period1: Date; interval: "1d" | "1h" | "1wk" }> = {
      "1D": { period1: new Date(Date.now() - 86400000), interval: "1h" },
      "1W": { period1: new Date(Date.now() - 7 * 86400000), interval: "1d" },
      "1M": { period1: new Date(Date.now() - 30 * 86400000), interval: "1d" },
      "3M": { period1: new Date(Date.now() - 90 * 86400000), interval: "1d" },
      "1Y": { period1: new Date(Date.now() - 365 * 86400000), interval: "1d" },
    };
    const { period1, interval } = rangeMap[range];
    const result = await yahooFinance.chart(symbol, { period1, interval });
    const quotes = result.quotes || [];
    return quotes
      .filter((q: any) => q.open && q.high && q.low && q.close)
      .map((q: any) => ({
        time: new Date(q.date).toISOString().split("T")[0],
        open: parseFloat(q.open.toFixed(2)),
        high: parseFloat(q.high.toFixed(2)),
        low: parseFloat(q.low.toFixed(2)),
        close: parseFloat(q.close.toFixed(2)),
        volume: q.volume || 0,
      }));
  } catch (error) {
    console.error(`Chart error for ${symbol}:`, error);
    const days = range === "1D" ? 1 : range === "1W" ? 7 : range === "1M" ? 30 : range === "3M" ? 90 : 365;
    return generateCandleData(MOCK_STOCKS[symbol]?.price || 150, days);
  }
}

export async function fetchStockNews(symbol: string): Promise<NewsItem[]> {
  try {
    const result = await yahooFinance.search(symbol, { newsCount: 6, quotesCount: 0 });
    const news = result.news || [];
    return news.map((item: any, i: number) => ({
      id: String(i),
      source: item.publisher || "Yahoo Finance",
      headline: item.title || "",
      summary: item.summary || "",
      url: item.link || "#",
      datetime: item.providerPublishTime
        ? new Date(item.providerPublishTime * 1000).toLocaleString()
        : "Recent",
      sentiment: analyzeSentiment(item.title + " " + (item.summary || "")),
      sentimentScore: 0.5,
    }));
  } catch {
    return getMockNews(symbol);
  }
}

export async function fetchIndicators(symbol: string): Promise<TechnicalIndicators> {
  try {
    const candles = await fetchCandleData(symbol, "3M");
    if (candles.length < 14) return getMockIndicators(symbol);
    const closes = candles.map((c) => c.close);
    const rsi = calculateRSI(closes, 14);
    const { macd, signal } = calculateMACD(closes);
    const ma50 = closes.length >= 50 ? average(closes.slice(-50)) : average(closes);
    const ma200 = closes.length >= 200 ? average(closes.slice(-200)) : average(closes);
    const lastClose = closes[closes.length - 1];
    const bullSignals = [rsi < 70, macd > signal, lastClose > ma50].filter(Boolean).length;
    const bearSignals = [rsi > 70, macd < signal, lastClose < ma50].filter(Boolean).length;
    const overallSignal = bullSignals > bearSignals ? "Bullish" : bearSignals > bullSignals ? "Bearish" : "Neutral";
    return {
      rsi, macd, macdSignal: signal,
      ma50: parseFloat(ma50.toFixed(2)),
      ma200: parseFloat(ma200.toFixed(2)),
      bollingerUpper: lastClose * 1.05,
      bollingerLower: lastClose * 0.95,
      bollingerMid: lastClose,
      volume: candles[candles.length - 1]?.volume || 0,
      avgVolume: Math.round(average(candles.map((c) => c.volume))),
      overallSignal,
      signalScore: Math.round((bullSignals / 3) * 100),
    };
  } catch {
    return getMockIndicators(symbol);
  }
}

export async function fetchMultipleQuotes(symbols: string[]): Promise<Stock[]> {
  return Promise.all(symbols.map((s) => fetchStockQuote(s)));
}

function average(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateRSI(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50;
  let gains = 0, losses = 0;
  for (let i = closes.length - period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) gains += diff; else losses -= diff;
  }
  const rs = (gains / period) / (losses / period || 1);
  return parseFloat((100 - 100 / (1 + rs)).toFixed(2));
}

function calculateMACD(closes: number[]): { macd: number; signal: number } {
  if (closes.length < 26) return { macd: 0, signal: 0 };
  const macd = calculateEMA(closes, 12) - calculateEMA(closes, 26);
  return { macd: parseFloat(macd.toFixed(2)), signal: parseFloat((macd * 0.85).toFixed(2)) };
}

function calculateEMA(closes: number[], period: number): number {
  const k = 2 / (period + 1);
  let ema = closes[0];
  for (let i = 1; i < closes.length; i++) ema = closes[i] * k + ema * (1 - k);
  return ema;
}

function formatVolume(v: number): string {
  if (!v) return "N/A";
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
  return (v / 1e3).toFixed(1) + "K";
}

function formatMarketCap(v: number): string {
  if (!v) return "N/A";
  if (v >= 1e12) return "$" + (v / 1e12).toFixed(2) + "T";
  if (v >= 1e9) return "$" + (v / 1e9).toFixed(1) + "B";
  return "$" + (v / 1e6).toFixed(1) + "M";
}

function analyzeSentiment(text: string): "bullish" | "bearish" | "neutral" {
  const bull = ["surge","rally","beat","record","growth","gain","profit","strong","rise","jump","soar"];
  const bear = ["drop","fall","miss","decline","loss","weak","down","bear","cut","warn","crash","plunge"];
  const lower = text.toLowerCase();
  const b = bull.filter(w => lower.includes(w)).length;
  const s = bear.filter(w => lower.includes(w)).length;
  return b > s ? "bullish" : s > b ? "bearish" : "neutral";
}