import React from "react";

const BenefitsSection: React.FC = () => {
  return (
    <section className="px-0 py-24 container">
      <div className="pb-8 lg:pb-16">
        <h2 className="text-2xl text-center lg:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
          START EARNING
        </h2>
        <h2 className="text-3xl text-center lg:text-5xl font-extrabold bg-gradient-to-r from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent">
          RECURRING INCOME
        </h2>
      </div>
      <div className=" py-0 mx-auto my-0 ">
        <div className="grid gap-5 grid-cols-[1fr_1fr] max-md:grid-cols-[1fr]">
          <BenefitCard
            title="Boost Your Income"
            description="With our multi-tiered structure, you can gradually earn up to 10% on every referral you bring in."
            ariaLabel="Passive Income Benefits"
          />
          <BenefitCard
            title="Passive Income"
            description="Earn passive income with Pipzen. It's an easy way to generate ongoing income while helping others advance their trading career."
            ariaLabel="Passive Income Benefits"
          />
          <BenefitCard
            title="Boost Your Income"
            description="With our multi-tiered structure, you can gradually earn up to 10% on every referral you bring in."
            ariaLabel="Passive Income Benefits"
          />
          <BenefitCard
            title="Ongoing Rewards"
            description="Our program rewards you for every successful referral, whether it's a first sign up or a recurring purchase."
            ariaLabel="Passive Income Benefits"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
interface BenefitCardProps {
  title: string;
  description: string;
  ariaLabel: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  ariaLabel,
}) => {
  return (
    <article
      role="article"
      aria-label={ariaLabel}
      className="p-10 rounded-2xl "
      style={{
        background: "linear-gradient(135deg, #c2bf00 0%, #2d2c0f);",
      }}
    >
      <h3 className="mb-8 text-2xl lg:text-5xl font-extrabold">{title}</h3>
      <p className="text-sm lg:text-lg leading-snug font-normal">
        {description}
      </p>
    </article>
  );
};
