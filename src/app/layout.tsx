import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fractional Real Estate Investing in Canada | Asset Crony",
  description: "Invest in real estate fractionally starting from $500. Trade ownership shares instantly and borrow against your holdings through our blockchain-powered platform.",
  keywords: "fractional real estate, real estate investment, blockchain, Canada, property tokens, secondary market, P2P lending",
  openGraph: {
    title: "Asset Crony - Fractional Real Estate Investing",
    description: "Own real estate fraction by fraction. Invest, trade, or borrow — all on one transparent blockchain-powered platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
