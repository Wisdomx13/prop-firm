import pipzen from "@/../public/logo.png";
import mcf from "@/../public/mcf.png";
import propw from "@/../public/propw.png";
import { cryptoPlan } from "../crypto-plan";

// start editing
export const CryptoEvaluationData = {
  hero: {
    titleHighited: "Crypto Evaluation",
    title: "Unleash your crypto trading potential with PIPZEN Accounts.",
    description:
      "Accounts up to $200k with 90% virtual profit splits, no time limit, no trailing drawdown.",
    button: {
      label: "GET STARTED",
      link: "/challenges",
    },
  },

  cryptoEvaluationsSteps: {
    title: "Crypto Evaluation",
    steps: [
      {
        title: "Choose Your Account Size",
        description:
          "Pipzen offers account sizes ranging from $5k to $200k. Choose the one that suits you best.",
      },
      {
        title: "Evaluation Phase",
        description:
          "Achieve the profit target without breaching drawdown limits to pass and get funded. No time limits, no hidden rules.",
      },
      {
        title: "Get Funded, Get Payouts",
        description:
          "Trade the exact same conditions as your challenge phase. Receive up to 90% payout share on the account gains.",
      },
    ],
  },

  cryptoEvalutions: {
    title: "Our Evaluations",
    description:
      "We are a modern prop trading firm providing a demo trading evaluation program. Traders can join the program with a minimal initial fee and showcase their trading abilities in a risk-free environment. Upon successful completion of the evaluation, they are eligible for a virtual profit split based on the virtual profits generated in their PIPZEN Account.",
    evaluationPlan: cryptoPlan,
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
          name: "MCF",
          image: mcf,
        },
        {
          name: "Propw",
          image: propw,
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
            value2: "30 days",
            value3: "Infinite",
          },
        },
        {
          name: "Equity Growth Target",
          values: {
            value1: "9%",
            value2: "10%",
            value3: "8%",
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
            value1: "90%",
            value2: "80%",
            value3: "Up to 80%",
          },
        },
        {
          name: "Drawdown-Type",
          values: {
            value1: "Balance Based",
            value2: "N/A",
            value3: "Trailing Based",
          },
        },
      ],
    },
  },
};
