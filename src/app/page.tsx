import AppLayout from "@/components/app-layout";
import Hero from "@/components/home/hero/hero";
import Evaluations from "@/components/evaluations/evaluations";
import FeatureHighlights from "@/components/feature-highlights/feature-highlights";
import ContentPair from "@/components/content-pair/content-pair";
import CertifiedProve from "@/components/certified-prove/certified-prove";
import InstantFunding from "@/components/instant-funding/instant-funding";

import image1 from "@/../public/content-pair/2151660829.jpg";
import image2 from "@/../public/content-pair/2151807639.jpg";
import image3 from "@/../public/content-pair/2151807732.jpg";
import certificate from "@/../public/certificates/certificate.png";
import PropfirmComparison from "@/components/propfirm-comparison/propfirm-comparison";

import { HomePageData } from "@/../data/page/home";
import { FadeIn } from "@/components/fade-in";
import ScrollingLogo from "@/components/ScrollingLogo";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black relative transition-colors duration-300">
      <AppLayout>
        <ScrollingLogo>
          <main>
            <Hero hero={HomePageData.hero} />
            <Evaluations evaluations={HomePageData.evaluations} />
            <FadeIn>
              <FeatureHighlights />
            </FadeIn>
            <FadeIn>
              <ContentPair
                features={["cTrader", "MatchTrader", "DxTrader"]}
                title="Your Favourite Trading Platforms, All in One Place!"
                images={[image1, image2, image3]}
              />
            </FadeIn>
            <FadeIn>
              <InstantFunding funding={HomePageData.instantFunding} />
            </FadeIn>
            <FadeIn>
              <PropfirmComparison
                title={HomePageData.propfirmComparison.title}
                description={HomePageData.propfirmComparison.description}
                company={HomePageData.propfirmComparison.company}
              />
            </FadeIn>
            <FadeIn>
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
            </FadeIn>
          </main>
        </ScrollingLogo>
      </AppLayout>
    </div>
  );
}
