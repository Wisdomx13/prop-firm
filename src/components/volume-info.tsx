import React from "react";
import { Wallet, CreditCard } from "lucide-react";

interface VolumnInfoProps {
  account_size: string;
  onetime_fee: string;
}

const VolumeInfo = ({ account_size, onetime_fee }: VolumnInfoProps) => {
  return (
    <div className="h-full">
      <div className="h-full p-4 rounded-xl bg-gradient-to-br from-[#FFD700]/10 to-[#B8860B]/5 border border-[#FFD700]/20 backdrop-blur-sm">
        {/* Account Size */}
        <div className="text-center mb-4 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 mb-2">
            <Wallet className="w-3 h-3 text-[#FFD700]" />
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Account</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            {account_size}
          </h3>
        </div>

        {/* One Time Fee */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 mb-2">
            <CreditCard className="w-3 h-3 text-[#FFD700]" />
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Fee</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {onetime_fee}
          </h3>
          <p className="text-[10px] text-white/40 mt-1">One-time payment</p>
        </div>
      </div>
    </div>
  );
};

export default VolumeInfo;
