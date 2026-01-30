"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Volumn from "../Volumn";

interface EvaluationsContentProps {
  data: any;
}

const EvaluationsContent = ({ data }: EvaluationsContentProps) => {
  const stepNames = data.steps.map((step: any) => step.stepName);

  const getPlansForStep = (stepName: string) => {
    const step = data.steps.find(
      (s: any) => s.stepName.toLowerCase() === stepName.toLowerCase()
    );
    return step?.plans || [];
  };

  // Get all steps data
  const stepsData = data.steps.map((step: any) => ({
    stepName: step.stepName,
    plans: step.plans,
  }));

  return (
    <div className="w-full">
      <Volumn
        stepsData={stepsData}
        stepNames={stepNames}
        getPlansForStep={getPlansForStep}
      />
    </div>
  );
};

export default EvaluationsContent;
