/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionHeader from "../section-header";
import EvaluationsContent from "../evaluations/evaluations-content";

interface EevaluationsProps {
  evaluation: {
    title: string;
    description: string;
    evaluationPlan: any;
  };
}
const Eevaluations = ({ evaluation }: EevaluationsProps) => {
  const { title, description, evaluationPlan } = evaluation;
  return (
    <section className="container pt-[120px] md:pt-[420px] lg:pt-24">
      <SectionHeader title={title} shortDescription={description} />
      <div>
        <EvaluationsContent data={evaluationPlan} />
      </div>
    </section>
  );
};

export default Eevaluations;
