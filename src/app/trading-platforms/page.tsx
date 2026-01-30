import React from "react";

import AppLayout from "@/components/app-layout";
import Intro from "@/components/trading-platforms/intro";
import PlatformFeature from "@/components/trading-platforms/platform-feature";

import matchTrader from "@/../public/match-trader.jpg";
import dxTrader from "@/../public/dxtrader.jpg";
import cTrader from "@/../public/ctrader.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Platforms | Trade with Match Trader, DXtrade & MT5 on Pipzen",
  description:
    "Discover the trading platforms supported by Pipzen. Trade forex, crypto, and indices using Match Trader, DXtrade, MT5, and more — with tight spreads, fast execution, and top-tier reliability.",
  keywords: [
    "Pipzen trading platforms",
    "Match Trader prop firm",
    "DXtrade prop trading",
    "MT5 funded account",
    "prop firm trading platforms",
    "prop firm MT5",
    "prop firm Match Trader",
    "Pipzen DXtrade platform",
    "best prop firm platforms",
    "prop firm platform options",
  ],
  openGraph: {
    title:
      "Trading Platforms | Trade with Match Trader, DXtrade & MT5 on Pipzen",
    description:
      "Explore Pipzen’s supported trading platforms including Match Trader, DXtrade, and MT5. Enjoy tight spreads, fast execution, and seamless trading experiences.",
    url: "https://www.pipzen.io/trading-platforms",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-trading-platforms.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Trading Platforms",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/trading-platforms",
  },
};

const TradingPlatForm = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <Intro
            title="Pipzen Trading Platforms"
            description="Select a professional trading platform customized to fit your trading needs."
            featuresButtons={[
              {
                label: "MatchTrader",
                redirect: "#matchtrader",
              },
              {
                label: "DxTrader",
                redirect: "#dxtrader",
              },
              {
                label: "CTrader",
                redirect: "#ctrader",
              },
            ]}
          />

          <PlatformFeature
            title="MatchTrader"
            sideImage={matchTrader}
            description="Match-Trader is a next-generation trading platform designed for brokers and proprietary trading firms, offering fast order execution, advanced charting tools, and seamless multi-device accessibility. It features a customizable interface, built-in risk management, and supports API integration for automated trading, making it a robust choice for modern traders."
            featues={[
              "Customizable interface",
              "Beginner Friendly",
              "Advanced charting and analysis tools",
              "Market Depth",
            ]}
            id={"matchtrader"}
            buttons={[
              {
                lable: "CTrade",
                redirect: "#",
              },
              {
                lable: "Full Tutorial",
                redirect: "#",
              },
            ]}
          />

          <PlatformFeature
            title="DxTrade"
            sideImage={dxTrader}
            description="Dx Trade is designed for institutional traders and offers advanced features like deep liquidity and institutional-grade order types. It allows for customized workflows and high-frequency trading."
            featues={[
              "Customizable workflows",
              "Advanced order management",
              "Depth of Market (DOM) feature",
              "Support for algorithmic trading",
              "Real-time market data",
              "Integrable with TradingView",
            ]}
            id={"dxtrader"}
            buttons={[
              {
                lable: "DxTrade",
                redirect: "#",
              },
              {
                lable: "Full Tutorial",
                redirect: "#",
              },
            ]}
            contenAlign="right"
          />

          <PlatformFeature
            title="cTrader"
            sideImage={cTrader}
            description="cTrader is a popular trading platform known for its intuitive interface and powerful charting tools. It provides a smooth trading experience with fast order execution and advanced features for technical analysis."
            featues={[
              "Advanced charting and analysis tools",
              "Fast order execution",
              "Support for algorithmic trading via cTrader Automate",
              "Customizable interface",
            ]}
            id={"ctrader"}
            buttons={[
              {
                lable: "CTrade",
                redirect: "#",
              },
              {
                lable: "Full Tutorial",
                redirect: "#",
              },
            ]}
          />
        </main>
      </AppLayout>
    </div>
  );
};

export default TradingPlatForm;
