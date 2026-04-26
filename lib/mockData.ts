import { Stock, NewsItem, TechnicalIndicators } from "./types";

export const MOCK_STOCKS: Record<string, Stock> = {
  AAPL: { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 2.24, changePercent: 1.24, volume: "82.4M", marketCap: "$2.84T", pe: 28.4, sector: "Technology", high52: 198.23, low52: 164.08, open: 180.28, high: 183.15, low: 179.92, avgVolume: "57.2M", dividend: "0.96 (0.53%)", beta: 1.29 },
  MSFT: { symbol: "MSFT", name: "Microsoft Corp.", price: 415.30, change: 3.57, changePercent: 0.87, volume: "22.1M", marketCap: "$3.08T", pe: 36.2, sector: "Technology", high52: 430.82, low52: 309.45, open: 411.73, high: 416.44, low: 410.85, avgVolume: "20.4M", dividend: "3.00 (0.72%)", beta: 0.91 },
  GOOGL: { symbol: "GOOGL", name: "Alphabet Inc.", price: 174.15, change: 2.64, changePercent: 1.54, volume: "28.7M", marketCap: "$2.17T", pe: 25.8, sector: "Technology", high52: 180.25, low52: 120.21, open: 171.51, high: 174.91, low: 171.08, avgVolume: "24.1M", dividend: "N/A", beta: 1.06 },
  AMZN: { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.07, change: 3.84, changePercent: 2.11, volume: "38.9M", marketCap: "$1.93T", pe: 42.5, sector: "Consumer", high52: 191.70, low52: 118.35, open: 181.23, high: 185.69, low: 180.92, avgVolume: "34.8M", dividend: "N/A", beta: 1.17 },
  TSLA: { symbol: "TSLA", name: "Tesla Inc.", price: 178.79, change: -6.35, changePercent: -3.42, volume: "112.3M", marketCap: "$570B", pe: 48.1, sector: "Consumer", high52: 299.29, low52: 138.80, open: 185.14, high: 186.22, low: 178.04, avgVolume: "98.7M", dividend: "N/A", beta: 2.31 },
  NVDA: { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.35, change: 38.62, changePercent: 4.62, volume: "45.6M", marketCap: "$2.16T", pe: 64.8, sector: "Technology", high52: 960.00, low52: 430.21, open: 836.73, high: 878.50, low: 831.42, avgVolume: "40.2M", dividend: "0.16 (0.02%)", beta: 1.68 },
  META: { symbol: "META", name: "Meta Platforms", price: 527.14, change: 10.22, changePercent: 1.98, volume: "17.8M", marketCap: "$1.35T", pe: 27.3, sector: "Technology", high52: 542.81, low52: 290.32, open: 516.92, high: 528.74, low: 515.80, avgVolume: "16.1M", dividend: "N/A", beta: 1.22 },
  JPM: { symbol: "JPM", name: "JPMorgan Chase", price: 197.44, change: -1.07, changePercent: -0.54, volume: "9.2M", marketCap: "$568B", pe: 11.8, sector: "Finance", high52: 205.88, low52: 148.29, open: 198.51, high: 199.12, low: 196.84, avgVolume: "8.4M", dividend: "4.60 (2.33%)", beta: 1.11 },
  JNJ: { symbol: "JNJ", name: "Johnson & Johnson", price: 151.82, change: -1.75, changePercent: -1.14, volume: "7.8M", marketCap: "$364B", pe: 15.2, sector: "Healthcare", high52: 172.72, low52: 143.13, open: 153.57, high: 153.80, low: 151.60, avgVolume: "7.1M", dividend: "4.96 (3.27%)", beta: 0.55 },
  XOM: { symbol: "XOM", name: "Exxon Mobil", price: 115.62, change: 0.37, changePercent: 0.32, volume: "14.2M", marketCap: "$461B", pe: 13.4, sector: "Energy", high52: 123.75, low52: 95.77, open: 115.25, high: 116.10, low: 114.88, avgVolume: "16.2M", dividend: "3.80 (3.29%)", beta: 0.88 },
  BAC: { symbol: "BAC", name: "Bank of America", price: 37.84, change: -0.72, changePercent: -1.87, volume: "42.1M", marketCap: "$296B", pe: 10.2, sector: "Finance", high52: 39.56, low52: 26.32, open: 38.56, high: 38.70, low: 37.72, avgVolume: "38.5M", dividend: "1.00 (2.64%)", beta: 1.42 },
  WMT: { symbol: "WMT", name: "Walmart Inc.", price: 67.22, change: 0.29, changePercent: 0.44, volume: "11.6M", marketCap: "$539B", pe: 29.4, sector: "Consumer", high52: 70.23, low52: 54.01, open: 66.93, high: 67.55, low: 66.80, avgVolume: "9.8M", dividend: "0.83 (1.23%)", beta: 0.49 },
};

export const TRENDING_SYMBOLS = ["AAPL", "NVDA", "TSLA", "MSFT", "META", "GOOGL", "AMZN", "JPM"];

export function getMockNews(symbol: string): NewsItem[] {
  const newsMap: Record<string, NewsItem[]> = {
    AAPL: [
      { id: "1", source: "Reuters", headline: "Apple eyes AI-powered Siri overhaul for WWDC 2024", summary: "Apple is planning a major overhaul of its Siri voice assistant powered by generative AI.", url: "#", datetime: "2h ago", sentiment: "bullish", sentimentScore: 0.78 },
      { id: "2", source: "Bloomberg", headline: "iPhone 16 production ramp signals strong Q3 demand outlook", summary: "Supply chain sources indicate Apple has increased orders for the upcoming iPhone 16 lineup.", url: "#", datetime: "4h ago", sentiment: "bullish", sentimentScore: 0.82 },
      { id: "3", source: "CNBC", headline: "Apple facing antitrust scrutiny in European markets", summary: "European regulators have opened a new investigation into Apple's App Store practices.", url: "#", datetime: "6h ago", sentiment: "bearish", sentimentScore: -0.45 },
      { id: "4", source: "WSJ", headline: "Services revenue hits record high, beats analyst estimates", summary: "Apple's services segment grew 14% year-over-year, beating Wall Street forecasts.", url: "#", datetime: "8h ago", sentiment: "bullish", sentimentScore: 0.91 },
    ],
    TSLA: [
      { id: "1", source: "Reuters", headline: "Tesla misses delivery estimates for third consecutive quarter", summary: "Tesla delivered fewer vehicles than analysts expected amid intensifying competition.", url: "#", datetime: "1h ago", sentiment: "bearish", sentimentScore: -0.82 },
      { id: "2", source: "Bloomberg", headline: "Musk signals further price cuts may be needed to boost volume", summary: "CEO Elon Musk suggested Tesla may continue reducing prices to stimulate demand.", url: "#", datetime: "3h ago", sentiment: "bearish", sentimentScore: -0.61 },
      { id: "3", source: "CNBC", headline: "Tesla FSD miles driven surpass 1 billion milestone", summary: "Tesla's Full Self-Driving system has accumulated over 1 billion miles of real-world driving data.", url: "#", datetime: "5h ago", sentiment: "bullish", sentimentScore: 0.55 },
      { id: "4", source: "WSJ", headline: "Cybertruck recall issued over accelerator pedal concerns", summary: "Tesla issued a recall for approximately 3,878 Cybertrucks due to an accelerator pedal defect.", url: "#", datetime: "7h ago", sentiment: "bearish", sentimentScore: -0.74 },
    ],
    NVDA: [
      { id: "1", source: "Reuters", headline: "NVIDIA Blackwell chip demand far exceeds supply capacity", summary: "NVIDIA's next-generation Blackwell GPU is seeing unprecedented demand from hyperscalers.", url: "#", datetime: "2h ago", sentiment: "bullish", sentimentScore: 0.94 },
      { id: "2", source: "Bloomberg", headline: "Data center revenue soars 427% year over year in Q4", summary: "NVIDIA reported data center revenue of $18.4 billion, up 427% from a year ago.", url: "#", datetime: "4h ago", sentiment: "bullish", sentimentScore: 0.96 },
      { id: "3", source: "CNBC", headline: "NVIDIA announces $10B stock buyback program", summary: "NVIDIA's board authorized a $10 billion share repurchase program effective immediately.", url: "#", datetime: "5h ago", sentiment: "bullish", sentimentScore: 0.71 },
      { id: "4", source: "WSJ", headline: "Export restrictions on AI chips may weigh on China revenue", summary: "New US export controls could significantly reduce NVIDIA's revenue from Chinese customers.", url: "#", datetime: "9h ago", sentiment: "bearish", sentimentScore: -0.58 },
    ],
  };
  return newsMap[symbol] || [
    { id: "1", source: "Reuters", headline: "Markets rally as Fed signals rate cut timeline clarity", summary: "US equity markets surged after Federal Reserve officials provided clearer guidance on rate cuts.", url: "#", datetime: "2h ago", sentiment: "bullish", sentimentScore: 0.72 },
    { id: "2", source: "Bloomberg", headline: "Earnings season outperforms analyst expectations broadly", summary: "With 70% of S&P 500 companies reporting, earnings are beating estimates by an average of 8%.", url: "#", datetime: "4h ago", sentiment: "bullish", sentimentScore: 0.68 },
    { id: "3", source: "CNBC", headline: "Inflation data comes in cooler than expected in latest reading", summary: "The Consumer Price Index rose 3.2% year-over-year, slightly below the 3.4% forecast.", url: "#", datetime: "6h ago", sentiment: "bullish", sentimentScore: 0.61 },
    { id: "4", source: "WSJ", headline: "Mixed signals from manufacturing sector raise growth concerns", summary: "The ISM Manufacturing PMI fell to 48.7, indicating contraction in factory activity.", url: "#", datetime: "8h ago", sentiment: "bearish", sentimentScore: -0.44 },
  ];
}

export function getMockIndicators(symbol: string): TechnicalIndicators {
  const map: Record<string, TechnicalIndicators> = {
    AAPL: { rsi: 58.4, macd: 2.14, macdSignal: 1.82, ma50: 178.20, ma200: 172.50, bollingerUpper: 190.40, bollingerLower: 172.10, bollingerMid: 181.25, volume: 82400000, avgVolume: 57200000, overallSignal: "Bullish", signalScore: 72 },
    TSLA: { rsi: 38.7, macd: -5.14, macdSignal: -3.22, ma50: 195.30, ma200: 210.80, bollingerUpper: 210.40, bollingerLower: 168.20, bollingerMid: 189.30, volume: 112300000, avgVolume: 98700000, overallSignal: "Bearish", signalScore: 28 },
    NVDA: { rsi: 74.8, macd: 18.42, macdSignal: 14.21, ma50: 790.20, ma200: 620.40, bollingerUpper: 920.10, bollingerLower: 810.40, bollingerMid: 865.25, volume: 45600000, avgVolume: 40200000, overallSignal: "Bullish", signalScore: 88 },
  };
  return map[symbol] || { rsi: 52.1, macd: 0.44, macdSignal: 0.28, ma50: 113.80, ma200: 108.20, bollingerUpper: 122.10, bollingerLower: 108.90, bollingerMid: 115.50, volume: 14200000, avgVolume: 16200000, overallSignal: "Neutral", signalScore: 52 };
}

export function generateCandleData(basePrice: number, days: number) {
  const candles = [];
  let price = basePrice * 0.92;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const open = price;
    const change = (Math.random() - 0.48) * price * 0.02;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * price * 0.008;
    const low = Math.min(open, close) - Math.random() * price * 0.008;
    candles.push({
      time: date.toISOString().split("T")[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 80000000 + 20000000),
    });
    price = close;
  }
  candles[candles.length - 1].close = basePrice;
  return candles;
}
