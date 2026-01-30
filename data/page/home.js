import pipzen from "@/../public/logo.png";
import ftmo from "@/../public/FTMO.png";
import fundedNext from "@/../public/funded-next.png";
import { Contact } from "./contact";
import { cryptoPlan } from "../crypto-plan";
import { forexPlan } from "../forex-plan";

import { instantFunded } from "../instant-funded-plan";

// start editing
export const HomePageData = {
  hero: {
    badge: "Ctrader Available",
    title1: "Unleashing Traders",
    title2: "Potential",
    description:
      "Join our elite community of funded traders and receive up to 90% of your trading profits. With our industry-leading payout system, you can withdraw your earnings twice a month with no restrictions.",
    buttons: [
      {
        label: "GET STARTED",
        link: "/challenges",
      },
      {
        label: "JOIN OUR COMMUNITY",
        link: "https://discord.gg/pipzen",
        icon: "discord",
      },
    ],
  },

  evaluations: {
    title: "Our Evaluations",
    description:
      "Explore our cutting-edge Forex & Crypto evaluations designed for traders’ success.",
    evaluationsPlans: [forexPlan, cryptoPlan],
  },

  instantFunding: {
    title: "Our Instant Funding",
    description: "Skip the Evaluation and get Instant Funded from the get go.",
    instantFundingVolumns: instantFunded,
  },

  propfirmComparison: {
    title: "Why choose Pipzen",
    description:
      "Explore the features that make Pipzen stand out from so many other trading prop firms.",
    company: {
      companies: [
        {
          name: "Pipzen",
          image: pipzen,
        },
        {
          name: "FTMO",
          image: ftmo,
        },
        {
          name: "Funded Next",
          image: fundedNext,
        },
      ],
      services: [
        {
          name: "Min Trading Days",
          values: {
            value1: "0",
            value2: "4 days",
            value3: "5 days",
          },
        },
        {
          name: "Max Trading Days",
          values: {
            value1: "Infinite",
            value2: "Infinite",
            value3: "Infinite",
          },
        },
        {
          name: "Daily Max Loss",
          values: {
            value1: "5%",
            value2: "5%",
            value3: "5%",
          },
        },
        {
          name: "One Step Challenge",
          values: {
            value1: true,
            value2: false,
            value3: false,
          },
        },
        {
          name: "Instant Payout",
          values: {
            value1: true,
            value2: false,
            value3: false,
          },
        },
        {
          name: "Profit Share",
          values: {
            value1: "Up to 90%",
            value2: "Up to 90%",
            value3: "Up to 90%",
          },
        },
        {
          name: "Drawdown Type",
          values: {
            value1: "Balance Based",
            value2: "Balance Based",
            value3: "Balance Based",
          },
        },
        {
          name: "Crypto only challenge",
          values: {
            value1: true,
            value2: false,
            value3: false,
          },
        },
      ],
    },
  },
};
