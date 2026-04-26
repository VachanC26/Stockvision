import { NextRequest, NextResponse } from "next/server";
import { fetchCandleData } from "@/lib/api";
import { TimeRange } from "@/lib/types";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const range = (request.nextUrl.searchParams.get("range") || "1M") as TimeRange;
  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }
  try {
    const data = await fetchCandleData(symbol.toUpperCase(), range);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}
