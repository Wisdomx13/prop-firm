import React from "react";

import AppLayout from "@/components/app-layout";
import Hero from "@/components/hero/hero";
import ContentPair from "@/components/content-pair/content-pair";
import image1 from "@/../public/content-pair/2151660829.jpg";
import image2 from "@/../public/content-pair/2151807639.jpg";
import image3 from "@/../public/content-pair/2151807732.jpg";
import certificate from "@/../public/certificates/certificate.png";
import CertifiedProve from "@/components/certified-prove/certified-prove";
import EvaluationSteps from "@/components/evaluation-steps/evaluation-steps";
import InstantFunding from "@/components/instant-funding/instant-funding";
import PropfirmComparison from "@/components/propfirm-comparison/propfirm-comparison";

import { InstantEvaluationData } from "../../../../data/page/instant-funded";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Instant Funded Program | Get Instant Funded Trading Accounts with Pipzen",
  description:
    "Access instant funded accounts with Pipzen’s Instant Funded Program. Trade forex, crypto, and indices without any evaluation and keep up to 90% of your profits. Start trading today.",
  keywords: [
    "instant funded prop firm",
    "instant funded trading account",
    "Pipzen instant funding",
    "no evaluation prop firm",
    "instant funding forex account",
    "crypto instant funded account",
    "indices instant funded trading",
    "prop firm instant funding program",
    "instant prop firm account",
    "instant funding program",
  ],
  openGraph: {
    title:
      "Instant Funded Program | Get Instant Funded Trading Accounts with Pipzen",
    description:
      "Get funded instantly with Pipzen’s Instant Funded Program. No evaluation, no delays — trade forex, crypto, and indices with up to 90% profit splits and funding up to $100K.",
    url: "https://www.pipzen.io/instant-funded-x",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-instant-funded.png", // replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Pipzen Instant Funded Program",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/instant-funded-x",
  },
};

const InstantFunded = () => {
  return (
    <div className="bg-black">
      <AppLayout>
        <main>
          <Hero hero={InstantEvaluationData.hero} />
          <EvaluationSteps
            evaluationsSteps={InstantEvaluationData.instantFundedSteps}
          />
          <InstantFunding funding={InstantEvaluationData.instantFunding} />
          <ContentPair
            features={["cTrader", "MatchTrader", "DxTrader"]}
            title="Your Favourite Trading Platforms, All in One Place!"
            images={[image1, image2, image3]}
          />
          <PropfirmComparison
            title={InstantEvaluationData.propfirmComparison.title}
            description={InstantEvaluationData.propfirmComparison.description}
            company={InstantEvaluationData.propfirmComparison.company}
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

export default InstantFunded;
