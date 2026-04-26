import { NextRequest, NextResponse } from "next/server";
import { fetchStockQuote, fetchIndicators } from "@/lib/api";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }
  try {
    const [quote, indicators] = await Promise.all([
      fetchStockQuote(symbol.toUpperCase()),
      fetchIndicators(symbol.toUpperCase()),
    ]);
    return NextResponse.json({ quote, indicators });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
