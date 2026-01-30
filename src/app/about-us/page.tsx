import ContentPair from "@/components/about-us/content-pair";
import AboutUsHero from "@/components/about-us/hero";
import AppLayout from "@/components/app-layout";
import React from "react";

import sideImage from "@/../public/content-pair/about-section-1.jpeg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pipzen | Leading Prop Trading Firm for Forex, Crypto & Indices",
  description:
    "Learn about Pipzen, a next-generation prop trading firm offering funded accounts for forex, crypto, and indices traders. Discover our mission, values, and commitment to trader success.",
  keywords: [
    "about Pipzen",
    "prop firm company info",
    "about prop trading firm",
    "Pipzen trading firm",
    "who is Pipzen",
    "prop trading mission statement",
    "Pipzen company values",
    "forex crypto funded firm",
    "prop firm about us",
    "funded trading company profile",
  ],
  openGraph: {
    title:
      "About Pipzen | Leading Prop Trading Firm for Forex, Crypto & Indices",
    description:
      "Get to know Pipzen — a leading prop trading firm providing funded trading accounts, fair conditions, and trader-focused programs for forex, crypto, and indices markets.",
    url: "https://www.pipzen.io/about-us",
    siteName: "Pipzen",
    images: [
      {
        url: "/images/pipzen-about-us.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "About Pipzen Prop Firm",
      },
    ],
    type: "website",
  },

  alternates: {
    canonical: "https://www.pipzen.io/about-us",
  },
};

const AboutUs = () => {
  return (
    <div>
      <AppLayout>
        <main>
          <AboutUsHero />
          <ContentPair
            image={sideImage}
            button={{ label: "Learn More", link: "#" }}
            header={{
              subtitle: "BEST PROP FIRM IN EUROPEAN ",
              title: "Excellence in Trading Support",
            }}
            title="Industry-Leading Technology"
            description="Our advanced trading platform and risk management systems provide traders with the tools they need to execute their strategies effectively."
            backgroudColor
          />

          <ContentPair
            image={sideImage}
            button={{ label: "Learn More", link: "#" }}
            header={{
              subtitle: "OUR MISSION",
            }}
            title="Empowering Traders Worldwide"
            description="We are committed to providing traders with the capital, technology, and support they need to achieve their financial goals in the global markets."
            contentAlign="left"
            backgroudColor={false}
          />
        </main>
      </AppLayout>
    </div>
  );
};

export default AboutUs;
