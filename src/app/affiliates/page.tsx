import AppLayout from "@/components/app-layout";

import PartnerFunding from "@/components/affiilates/partner-funding/partner";
import { Metadata } from "next";
import React from "react";
import Hero from "@/components/affiilates/hero";
import CommissionTiers from "@/components/affiilates/commision-tiers";
import BenefitsSection from "@/components/affiilates/benefits";
import NavigateButton from "@/components/affiilates/navigate-button";

export const metadata: Metadata = {
  title: "Pipzen Affiliate Program | Earn Commission on Prop Firm Referrals",
  description:
    "Join the Pipzen Affiliate Program and start earning generous commissions by referring traders to our prop firm. Access multiple affiliate plans, exclusive benefits, and monthly payouts.",
  keywords: [
    "prop firm affiliate program",
    "Pipzen affiliate",
    "affiliate commission forex",
    "refer and earn prop firm",
    "trading affiliate program",
    "prop firm referral program",
    "crypto trading affiliate",
    "affiliate plans for prop trading",
    "best affiliate program for traders",
    "affiliate partnership Pipzen",
  ],
  openGraph: {
    title: "Pipzen Affiliate Program | Earn Commission on Prop Firm Referrals",
    description:
      "Discover Pipzen’s Affiliate Program — earn top commissions by referring traders. Choose from multiple affiliate plans with exclusive benefits and regular payouts.",
    url: "https://www.pipzen.io/affiliates",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-affiliates.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Pipzen Affiliate Program",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/affiliates",
  },
};

const commisionTiers = [
  {
    level: "1",
    percentage: "4%",
    description1: "Recurring Commission",
    description2: "Affiliate Start here!",
  },
  {
    level: "2",
    percentage: "8%",
    description1: "Recurring Commission",
    description2: "Total Referrals: >100",
  },
  {
    level: "3",
    percentage: "10%",
    description1: "Recurring Commission",
    description2: "Total Referrals: >500",
  },
];

const Affilates = () => {
  return (
    <div className="bg-black">
      <AppLayout>
        <main>
          <Hero
            titleHighlighted="Earn Commission"
            title="by Referring Traders"
            button={{ label: "Become a Affiliate", link: "#" }}
          />
          <CommissionTiers tires={commisionTiers} />
          <BenefitsSection />
          <NavigateButton />
          <PartnerFunding />
        </main>
      </AppLayout>

      {/* grow effect */}
      <div className="grow-effect absolute top-0 left-0 right-0 w-full h-[450px]"></div>
    </div>
  );
};

export default Affilates;
