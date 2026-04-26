import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockVision – AI-Powered Stock Analysis Platform",
  description: "Real-time stock market analysis with technical indicators, news sentiment, and AI-powered insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
