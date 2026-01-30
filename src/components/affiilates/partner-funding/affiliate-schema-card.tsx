import React from "react";

interface FundingSchemaCardProps {
  referralRange: string;
  commission: string;
  commissionDescription: string;
}
const AffiliateSchemaCard = ({
  referralRange,
  commission,
  commissionDescription,
}: FundingSchemaCardProps) => {
  return (
    <div className="affiliate-schema-card">
      <div className="bg-gradient-to-r rounded-t-sm from-[#FFD700] to-[#B8860B] py-3">
        <span className="block uppercase text-center text-base lg:text-xl font-semibold text-black">
          {referralRange} referrals
        </span>
      </div>

      <div className="bg-transparent p-3 w-full h-[175px] flex justify-center items-center border border-[#B8860B]">
        <div>
          <h3 className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text  text-center">
            {commission}
          </h3>
          <p className="text-sm text-white/75 text-center mt-1">
            {commissionDescription}
          </p>
        </div>
      </div>

      <div className="affiliate-schema-card-back"></div>
    </div>
  );
};

export default AffiliateSchemaCard;
