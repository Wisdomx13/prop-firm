import React from "react";

import AppLayout from "@/components/app-layout";
import Eevaluations from "@/components/forex-evaluation/evaluations";
import Hero from "@/components/hero/hero";
import ContentPair from "@/components/content-pair/content-pair";

import image1 from "@/../public/content-pair/2151660829.jpg";
import image2 from "@/../public/content-pair/2151807639.jpg";
import image3 from "@/../public/content-pair/2151807732.jpg";
import certificate from "@/../public/certificates/certificate.png";
import CertifiedProve from "@/components/certified-prove/certified-prove";
import EvaluationSteps from "@/components/evaluation-steps/evaluation-steps";
import PropfirmComparison from "@/components/propfirm-comparison/propfirm-comparison";

import { ForexEvaluationData } from "../../../../data/page/forex-evaluation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forex Evaluation Program | Get Funded to Trade Forex with Pipzen",
  description:
    "Join Pipzen’s Forex Evaluation Program and showcase your trading skills to earn funded accounts up to $200K. Keep up to 90% profits while trading major and minor forex pairs risk-free.",
  keywords: [
    "forex prop firm",
    "forex evaluation program",
    "funded forex trading account",
    "forex prop trading challenge",
    "Pipzen forex program",
    "forex instant funding",
    "forex funded account",
    "prop firm forex evaluation",
    "trade forex funded account",
  ],
  openGraph: {
    title: "Forex Evaluation Program | Get Funded to Trade Forex with Pipzen",
    description:
      "Prove your forex trading skills with Pipzen’s Forex Evaluation and get funded up to $200K. Trade forex pairs with top-tier conditions and up to 90% profit split.",
    url: "https://www.pipzen.io/forex-evaluation",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-forex-evaluation.png",
        width: 1200,
        height: 630,
        alt: "Pipzen Forex Evaluation Program",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/forex-evaluation",
  },
};

const ForexEvaluation = () => {
  return (
    <div className="bg-black">
      <AppLayout>
        <main>
          <Hero hero={ForexEvaluationData.hero} />
          <EvaluationSteps
            evaluationsSteps={ForexEvaluationData.forexEvaluationsSteps}
          />
          <Eevaluations evalution={ForexEvaluationData.forexEvalutions} />
          <ContentPair
            features={["cTrader", "MatchTrader", "DxTrader"]}
            title="Your Favourite Trading Platforms, All in One Place!"
            images={[image1, image2, image3]}
          />
          <PropfirmComparison
            title={ForexEvaluationData.propfirmComparison.title}
            description={ForexEvaluationData.propfirmComparison.description}
            company={ForexEvaluationData.propfirmComparison.company}
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

export default ForexEvaluation;
