import React from "react";
import SectionHeader from "@/components/section-header";
import FundingSchemaCard from "./affiliate-schema-card";

const data = [
  {
    referralRange: "0-99",
    commission: "4.00%",
    commissionDescription: "Commission on every new sales",
  },
  {
    referralRange: "100-499",
    commission: "8.00%",
    commissionDescription: "Commission on every new sales",
  },
  {
    referralRange: "500+",
    commission: "10.00%",
    commissionDescription: "Commission on every new sales",
  },
];

const PartnerFunding = () => {
  return (
    <section className="container  py-[120px] md:py-[420px] lg:py-24">
      <SectionHeader
        title="Partner with Pipzen"
        shortDescription="Join our affiliates program"
      ></SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((r, i) => (
          <FundingSchemaCard
            key={i}
            commission={r.commission}
            commissionDescription={r.commissionDescription}
            referralRange={r.referralRange}
          />
        ))}
      </div>

      {/* <div className="mt-10 lg:mt-20">
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-white">
          +7% Lifetime Commision
        </h3>
        <p className="text-center text-white/75 text-sm font-normal">
          You will earn a 7% lifetime commission on all future sales made using
          your affiliate code, even if the customer is not a new customer.
        </p>
      </div> */}
    </section>
  );
};

export default PartnerFunding;
