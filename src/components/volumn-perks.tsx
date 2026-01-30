import React from "react";
import { Check, Gift } from "lucide-react";

const VolumnPerks = ({
  perks,
}: {
  perks: string[];
  account_size: string;
}) => {
  return (
    <div className="h-full">
      <div className="h-full p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
        {/* Compact Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
          <Gift className="w-4 h-4 text-[#FFD700]" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Included</span>
        </div>

        {/* Compact Perks List */}
        <div className="space-y-1.5">
          {perks.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-2 py-1.5 px-2 rounded-md hover:bg-white/[0.03] transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-[#FFD700] flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/70 leading-tight">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolumnPerks;
