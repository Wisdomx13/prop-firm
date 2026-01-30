import pipzen from "@/../public/logo.png";
import aquafunded from "@/../public/aquafunded.png";
import finotive from "@/../public/finotive.png";
import { instantFunded } from "../instant-funded-plan";

// start editing
export const InstantEvaluationData = {
  hero: {
    titleHighited: "Instant Funded ",
    title: "Skip Evaluation Get Instant Funded up to $100k.",
    description:
      "PIPZEN is built on the principles of guaranteed payouts, transparency, and fairness. Unlike others who focus on gimmicks, we prioritize what matters: delivering payouts every time",
    button: {
      label: "GET STARTED",
      link: "/challenges",
    },
  },

  instantFundedSteps: {
    title: "Instant Funded",
    steps: [
      {
        title: "Choose Your Account Size",
        description:
          "Pipzen offers account sizes ranging from $5k to $200k. Choose the one that suits you best.",
      },
      {
        title: "Instant Funding Access",
        description:
          "Take the fast track to trading success with Instant Funded X. No evaluations—just instant funding at your fingertips.",
      },
    ],
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
          name: "Aquafunded",
          image: aquafunded,
        },
        {
          name: "Finotive",
          image: finotive,
        },
      ],
      services: [
        {
          name: "Profit Share ",
          values: {
            value1: "Up to 90%",
            value2: "Up to 90%",
            value3: "55%",
          },
        },
        {
          name: "Max Drawdown",
          values: {
            value1: "8%",
            value2: "6%",
            value3: "8%",
          },
        },
        {
          name: "Daily Max Loss",
          values: {
            value1: "5%",
            value2: "3%",
            value3: "5%",
          },
        },
        {
          name: "First Payout",
          values: {
            value1: "On demand",

            value2: "Bi-weekly",
            value3: "weekly",
          },
        },
        {
          name: "Leverage",
          values: {
            value1: "1 : 50",
            value2: "1 : 30",
            value3: "1 : 33",
          },
        },
        {
          name: "Consistency Rule ",
          values: {
            value1: "No",
            value2: "Yes",
            value3: "Yes",
          },
        },
      ],
    },
  },
};
