/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import CertifiedCards from "./certified-cards";
import { Award, Shield, BadgeCheck } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface CertifiedProveProps {
  certificates: any[];
  title: string;
}
const CertifiedProve = ({ certificates, title }: CertifiedProveProps) => {
  const { isDark } = useTheme();

  return (
    <section className={`relative py-12 md:py-16 overflow-hidden ${isDark ? '' : 'bg-white'}`}>
      {/* Subtle background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] ${
        isDark ? 'bg-[#FFD700]/5' : 'bg-[#FFD700]/15'
      }`} />

      <div className="container relative z-10 max-w-5xl mx-auto px-4">
        {/* Compact header */}
        <div className="text-center mb-8">
          {/* Title with inline badges */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {/* Compact trust badges - inline */}
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm ${
            isDark
              ? 'bg-black/40 border border-[#FFD700]/20'
              : 'bg-amber-50 border border-amber-200 shadow-sm'
          }`}>
            {[
              { icon: Award, label: "Licensed" },
              { icon: Shield, label: "Insured" },
              { icon: BadgeCheck, label: "Verified" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <badge.icon className={`w-3.5 h-3.5 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
                <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{badge.label}</span>
                {i < 2 && <span className={`ml-2 ${isDark ? 'text-white/20' : 'text-gray-300'}`}>|</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Certificates display */}
        <CertifiedCards certificates={certificates} />
      </div>
    </section>
  );
};

export default CertifiedProve;
