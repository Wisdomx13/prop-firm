import pipzen from "@/../public/logo.png";
import ftmo from "@/../public/FTMO.png";
import fundedNext from "@/../public/funded-next.png";
import { forexPlan } from "../forex-plan";

export const ForexEvaluationData = {
  hero: {
    titleHighited: "Forex Evaluation",
    title: "Unleash your trading potential with Forex Trader Accounts.",
    description:
      "Accounts up to $400k with 80% virtual profit splits, no time limit, no trailing drawdown.",
    button: {
      label: "GET STARTED",
      link: "/challenges",
    },
  },

  forexEvaluationsSteps: {
    title: "Forex Evaluation",
    steps: [
      {
        title: "Choose Your Account Size",
        description:
          "Tradexprop offers account sizes ranging from $5k to $200k. Choose the one that suits you best.",
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

  forexEvalutions: {
    title: "Our Evaluations",
    description:
      "We are a modern prop trading firm providing a demo trading evaluation program. Traders can join the program with a minimal initial fee and showcase their trading abilities in a risk-free environment. Upon successful completion of the evaluation, they are eligible for a virtual profit split based on the virtual profits generated in their PIPZEN Account.",
    evaluationPlan: forexPlan,
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
