import React from "react";
interface CommissionTierCardProps {
  level: string;
  percentage: string;
  description1: string;
  description2: string;
}
interface CommissionTiersProps {
  tires: CommissionTierCardProps[];
}
const CommissionTiers = ({ tires }: CommissionTiersProps) => {
  return (
    <section
      className="px-0 py-24 sm:bg-none "
      style={{ background: "linear-gradient(#0000 40%,#ffd9001d)" }}
    >
      <div className="container">
        <div className="pb-8 lg:gap-20 lg:pb-16 flex items-center justify-between">
          <div className="flex-1 md:hidden lg:block h-[1px] bg-[#ddd]"></div>
          <div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground">
              Multi - Tiered
            </h2>
            <h2 className="text-3xl lg:text-5xl font-semibold text-foreground">
              Affiliate Rewards
            </h2>
          </div>
        </div>

        <div className="flex gap-8 lg:gap-16 justify-between px-5 py-0 mx-auto my-0  max-md:flex-col ">
          {tires.map((tire, i) => (
            <CommissionTierCard
              key={i}
              level={tire.level}
              percentage={tire.percentage}
              description1={tire.description1}
              description2={tire.description2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommissionTiers;

const CommissionTierCard: React.FC<CommissionTierCardProps> = ({
  level,
  percentage,
  description1,
  description2,
}) => {
  return (
    <article
      role="article"
      aria-label={`Level ${level} Commission Tier`}
      className="flex-1 p-10 text-center rounded-2xl  shadow-bg"
    >
      <h3 className="mb-5 text-lg lg:text-3xl font-semibold">Level {level}</h3>
      <div className="mb-5 text-4xl lg:text-7xl font-extrabold text-[#FFD700]">
        {percentage}
      </div>
      <p className="mb-2.5 text-base lg:text-lg">{description1}</p>
      <p className="text-base lg:text-lg font-medium">{description2}</p>
    </article>
  );
};
