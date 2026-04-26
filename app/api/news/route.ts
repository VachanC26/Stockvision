import { NextRequest, NextResponse } from "next/server";
import { fetchStockNews } from "@/lib/api";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }
  try {
    const news = await fetchStockNews(symbol.toUpperCase());
    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
