import Order from "@/components/challenges/order";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Trading Challenges | Pipzen Prop Firm - Choose Your Evaluation & Platform",
  description:
    "Join Pipzen’s trading challenges by selecting your product type, account balance, and trading platform. Choose from X-1 evaluation, DXTrader, MatchTrader, and cTrader, then proceed to order with personal details like name, email, and billing address.",
  keywords: [
    "trading challenges Pipzen",
    "X-1 evaluation",
    "X-2 evaluation",
    "X-1 evaluation ctrypto",
    "X-2 evaluation ctrypto",
    "Instant Funding",
    "account balance selection",
    "choose trading platform",
    "DXTrader evaluation",
    "MatchTrader prop firm",
    "cTrader challenges",
    "trading challenge order",
    "prop firm account balance",
    "select trading product",
  ],
  openGraph: {
    title:
      "Trading Challenges | Pipzen Prop Firm - Choose Your Evaluation & Platform",
    description:
      "Select your product type and platform, such as X-1 evaluation, DXTrader, or cTrader, and complete your order with details like name, email, and billing address.",
    url: "https://www.pipzen.io/challenges",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-challenges.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Trading Challenges",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/challenges",
  },
};

const Challenges = () => {
  return (
    <div className="container py-8 lg:py-16 ">
      <header></header>
      <main>
        <Order />
      </main>
    </div>
  );
};

export default Challenges;
