import React from "react";

interface StepProps {
  title: string;
  description: string;
  stepNo?: number;
}

interface StepsCardsProps {
  steps: StepProps[];
}

const StepsCards = ({ steps }: StepsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-0 md:px-10 lg:px-16 gap-4 md:gap-6 lg:gap-8">
      {steps.map((step, i) => (
        <StepCard
          key={i}
          title={step.title}
          description={step.description}
          stepNo={i + 1}
        />
      ))}
    </div>
  );
};

export default StepsCards;

const StepCard = ({ description, stepNo, title }: StepProps) => {
  return (
    <div className="step-card bg-[#121212]">
      <div className="step-card-content">
        <div className="py-2">
          {/* icons */}
          <h4 className="text-center text-base lg:text-lg font-bold lg:font-semibold text-white">
            Step {stepNo}
          </h4>
        </div>

        <div>
          <h3 className="text-center lg:text-start text-lg lg:text-xl text-foreground font-bold">
            {title}
          </h3>
          <p className="text-xs lg:text-sm text-foreground mt-2 text-center lg:text-start">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
