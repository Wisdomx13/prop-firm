import React from "react";
import SectionHeader from "../section-header";
import StepsCards from "../evaluation-steps/steps-cards";

// const data = [
//   {
//     stepNo: 1,
//     title: "Choose Your Account Size",
//     description:
//       "Tradexprop offers account sizes ranging from $5k to $200k. Choose the one that suits you best.",
//   },
//   {
//     stepNo: 2,
//     title: "Evaluation Phase",
//     description:
//       "Achieve the profit target without breaching drawdown limits to pass and get funded. No time limits, no hidden rules.",
//   },
//   {
//     stepNo: 3,
//     title: "Get Funded, Get Payouts",
//     description:
//       "Trade the exact same conditions as your challenge phase. Receive up to 90% payout share on the account gains.",
//   },
// ];

interface ForexEvaluationStepsProps {
  evaluationsSteps: {
    title: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
}

const EvaluationSteps = ({ evaluationsSteps }: ForexEvaluationStepsProps) => {
  const { title, steps } = evaluationsSteps;
  return (
    <section className=" pt-[120px] md:pt-[420px] lg:pt-24 container">
      <SectionHeader title={title} />
      <StepsCards steps={steps} />
    </section>
  );
};

export default EvaluationSteps;
