/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Volumn from "@/components/Volumn";
import { Zap, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const InstantFundingVolumns = ({
  instantFundingVolumns,
}: {
  instantFundingVolumns: any;
}) => {
  const { isDark } = useTheme();

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* 3D effect - shadow layers */}
      <div className={`absolute -inset-1 rounded-2xl blur-xl ${
        isDark
          ? 'bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#FFD700]/10'
          : 'bg-gradient-to-r from-[#FFD700]/20 via-[#FFA500]/20 to-[#FFD700]/20'
      }`} />

      {/* Main container with 3D glass effect */}
      <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm ${
        isDark
          ? 'border border-[#FFD700]/20 bg-gradient-to-br from-white/[0.05] to-white/[0.02]'
          : 'border border-amber-200 bg-white shadow-xl'
      }`}>
        {/* Compact header banner */}
        <div className="relative overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00]" />

          {/* Animated shine effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
            style={{
              animation: 'shimmer 3s infinite',
            }}
          />

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Compact content */}
          <div className="relative py-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <div className="p-1.5 rounded-lg bg-black/10">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-black tracking-tight">
                Instant Funded X
              </h2>
              <Sparkles className="w-4 h-4 text-black/70 animate-pulse" />
            </div>
          </div>

          {/* 3D bottom edge effect */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>

        {/* Cylinder content - compact padding */}
        <div className="p-3 md:p-4">
          <Volumn plans={instantFundingVolumns} />
        </div>

        {/* 3D depth indicators - corner accents */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-t border-l ${isDark ? 'border-[#FFD700]/20' : 'border-amber-300'}`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${isDark ? 'border-[#FFD700]/20' : 'border-amber-300'}`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b border-l ${isDark ? 'border-[#FFD700]/20' : 'border-amber-300'}`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b border-r ${isDark ? 'border-[#FFD700]/20' : 'border-amber-300'}`} />
      </div>
    </div>
  );
};

export default InstantFundingVolumns;
