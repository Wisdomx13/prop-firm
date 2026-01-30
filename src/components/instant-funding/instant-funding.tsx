/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import InstantFundingVolumns from "./instant-funding-volumn";
import { Zap, TrendingUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface InstantFundingProps {
  funding: {
    title: string;
    description: string;
    instantFundingVolumns: any;
  };
}

const InstantFunding = ({ funding }: InstantFundingProps) => {
  const { description, title, instantFundingVolumns } = funding;
  const { isDark } = useTheme();

  return (
    <section className={`relative py-8 md:py-10 overflow-hidden ${isDark ? '' : 'bg-white'}`}>
      {/* Compact background elements */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] ${isDark ? 'bg-[#FFD700]/5' : 'bg-[#FFD700]/15'}`} />

      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        {/* Compact header */}
        <div className="text-center mb-6">
          {/* Small badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 ${
            isDark
              ? 'bg-[#FFD700]/10 border border-[#FFD700]/20'
              : 'bg-amber-100 border border-amber-300'
          }`}>
            <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#FFD700]' : 'text-amber-700'}`}>Skip The Evaluation</span>
          </div>

          {/* Smaller title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {/* Compact description */}
          <p className={`text-sm max-w-xl mx-auto mb-5 ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
            {description}
          </p>

          {/* Compact inline stats */}
          <div className={`inline-flex items-center gap-6 px-5 py-2.5 rounded-xl ${
            isDark
              ? 'bg-white/[0.02] border border-white/10'
              : 'bg-gray-50 border border-gray-200 shadow-sm'
          }`}>
            {[
              { icon: Zap, label: "Instant Access", value: "No Wait" },
              { icon: TrendingUp, label: "Start Trading", value: "Day 1" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark
                    ? 'bg-[#FFD700]/10 border border-[#FFD700]/20'
                    : 'bg-amber-100 border border-amber-200'
                }`}>
                  <stat.icon className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
                </div>
                <div className="text-left">
                  <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funding component */}
        <InstantFundingVolumns instantFundingVolumns={instantFundingVolumns} />
      </div>
    </section>
  );
};

export default InstantFunding;
