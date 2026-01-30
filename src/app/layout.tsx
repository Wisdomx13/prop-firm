import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./logo.css";

import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "@/context/ThemeContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Pipzen | Get Funded to Trade Forex, Crypto & Indices with Top Prop Firm Challenges",
  description:
    "Join Pipzen — the next-gen prop firm offering instant funding and trader challenges. Get up to $200K funded accounts, up to 90% profit splits, and trade forex, crypto, and indices with zero risk to your capital.",
  keywords: [
    "Pipzen",
    "prop firm",
    "funded trading accounts",
    "forex prop firm",
    "crypto trading",
    "prop firm challenge",
    "instant funding",
    "profit split trading",
    "forex funded account",
    "prop trading firm",
  ],
  openGraph: {
    title: "Pipzen",
    description:
      "Trade with Pipzen and unlock up to $200K in funded accounts. Join our trader challenge or opt for instant funding and keep up to 90% of your profits.",
    url: "https://www.pipzen.io/",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-og-banner.png",
        width: 1200,
        height: 630,
        alt: "Pipzen Funded Trading Accounts",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.pipzen.io/",
  },
  icons: {
    icon: "/fav/favicon.ico",
    shortcut: "/fav/favicon-32x32.png",
    apple: "/fav/apple-touch-icon.png",
  },
  manifest: "/fav/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <PrimeReactProvider>{children}</PrimeReactProvider>
        </ThemeProvider>

        {/* Google Analytics - Lazy loaded to not block page rendering */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17260588436"
          strategy="lazyOnload"
        />
        <Script id="gtag-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17260588436');
          `}
        </Script>
      </body>
    </html>
  );
}
