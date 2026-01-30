import React from "react";

import AppLayout from "@/components/app-layout";
import Eevaluations from "@/components/crypto-evaluation/evaluation";
import Hero from "@/components/hero/hero";
import ContentPair from "@/components/content-pair/content-pair";
import image1 from "@/../public/content-pair/2151660829.jpg";
import image2 from "@/../public/content-pair/2151807639.jpg";
import image3 from "@/../public/content-pair/2151807732.jpg";
import certificate from "@/../public/certificates/certificate.png";
import CertifiedProve from "@/components/certified-prove/certified-prove";
import EvaluationSteps from "@/components/evaluation-steps/evaluation-steps";
import PropfirmComparison from "@/components/propfirm-comparison/propfirm-comparison";
import { Metadata } from "next";

import { CryptoEvaluationData } from "../../../../data/page/crypto-evaluation";

export const metadata: Metadata = {
  title: "Crypto Evaluation Program | Get Funded to Trade Crypto with Pipzen",
  description:
    "Join Pipzen’s Crypto Evaluation Program and prove your crypto trading skills to get funded up to $100K. Keep up to 90% of your profits and trade popular cryptocurrencies risk-free.",
  keywords: [
    "crypto prop firm",
    "crypto evaluation program",
    "crypto funded account",
    "prop trading crypto",
    "funded crypto trading account",
    "crypto trading challenge",
    "Pipzen crypto program",
    "crypto instant funding",
    "crypto prop firm evaluation",
  ],
  openGraph: {
    title: "Crypto Evaluation Program | Get Funded to Trade Crypto with Pipzen",
    description:
      "Prove your skills in Pipzen’s Crypto Evaluation and unlock funded accounts up to $100K. Trade Bitcoin, Ethereum, and altcoins with top-tier conditions and up to 90% profit split.",
    url: "https://www.pipzen.io/crypto-evaluation",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-crypto-evaluation.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Crypto Evaluation Program",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/crypto-evaluation",
  },
};

const CryptoEvaluation = () => {
  return (
    <div className="bg-black">
      <AppLayout>
        <main>
          <Hero hero={CryptoEvaluationData.hero} />
          <EvaluationSteps
            evaluationsSteps={CryptoEvaluationData.cryptoEvaluationsSteps}
          />
          <Eevaluations evaluation={CryptoEvaluationData.cryptoEvalutions} />
          <ContentPair
            features={["cTrader", "MatchTrader", "DxTrader"]}
            title="Your Favourite Trading Platforms, All in One Place!"
            images={[image1, image2, image3]}
          />
          <PropfirmComparison
            title={CryptoEvaluationData.propfirmComparison.title}
            description={CryptoEvaluationData.propfirmComparison.description}
            company={CryptoEvaluationData.propfirmComparison.company}
          />
          <CertifiedProve
            certificates={[
              certificate,
              certificate,
              certificate,
              certificate,
              certificate,
            ]}
            title="Get Certified As A Profitable Traders"
          />
        </main>
      </AppLayout>
    </div>
  );
};

export default CryptoEvaluation;
