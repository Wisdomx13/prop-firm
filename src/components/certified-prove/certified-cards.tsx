/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { Award, Star, BadgeCheck } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface CertifiedCaresProps {
  certificates: any[];
}

const CertifiedCards = ({ certificates }: CertifiedCaresProps) => {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-center">
      {/* Single unified widget */}
      <div className="relative max-w-2xl w-full">
        {/* Ambient glow */}
        <div className={`absolute -inset-3 rounded-2xl blur-xl ${
          isDark
            ? 'bg-gradient-to-r from-[#FFD700]/20 via-[#FFA500]/15 to-[#FFD700]/20'
            : 'bg-gradient-to-r from-[#FFD700]/30 via-[#FFA500]/25 to-[#FFD700]/30'
        }`} />

        {/* Main card */}
        <div
          className={`relative rounded-xl overflow-hidden border ${
            isDark
              ? 'border-[#FFD700]/40'
              : 'border-amber-200 shadow-xl'
          }`}
          style={{
            background: isDark
              ? 'linear-gradient(145deg, rgba(255,215,0,0.08) 0%, rgba(0,0,0,0.9) 100%)'
              : 'linear-gradient(145deg, rgba(255,215,0,0.1) 0%, rgba(255,255,255,1) 100%)',
          }}
        >
          {/* Top gold accent */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

          {/* Content */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
            {/* Certificate - Left/Top */}
            <div className="relative w-40 sm:w-44 flex-shrink-0">
              <div className={`relative rounded-lg overflow-hidden border shadow-lg ${
                isDark
                  ? 'border-[#FFD700]/30 shadow-[#FFD700]/10'
                  : 'border-amber-200 shadow-amber-100'
              }`}>
                <Image
                  src={certificates[0]}
                  alt="Trading Certificate"
                  width={200}
                  height={150}
                  className="w-full h-auto"
                />
              </div>
              {/* Certificate badge */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#FFD700] flex items-center gap-1">
                <BadgeCheck className="w-2.5 h-2.5 text-black" />
                <span className="text-[8px] font-black text-black uppercase">Verified</span>
              </div>
            </div>

            {/* Woman - Right/Bottom */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/certified-woman.png"
                  alt="Certified Trader"
                  width={280}
                  height={280}
                  className="w-auto h-[200px] sm:h-[220px] object-contain"
                  priority
                />

                {/* Floating badges */}
                <div className="absolute top-2 right-0 flex flex-col gap-1.5">
                  <div className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark
                      ? 'bg-black/80 border-[#FFD700]/40'
                      : 'bg-white border-amber-200 shadow-sm'
                  }`}>
                    <Award className={`w-3 h-3 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
                    <span className={`text-[9px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Certified</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                    isDark
                      ? 'bg-black/80 border-[#FFD700]/40'
                      : 'bg-white border-amber-200 shadow-sm'
                  }`}>
                    <Star className={`w-3 h-3 ${isDark ? 'text-[#FFD700] fill-[#FFD700]' : 'text-amber-500 fill-amber-500'}`} />
                    <span className={`text-[9px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`px-4 py-2 border-t ${
            isDark
              ? 'bg-black/50 border-[#FFD700]/20'
              : 'bg-amber-50 border-amber-100'
          }`}>
            <div className="flex items-center justify-between">
              <p className={`text-[10px] ${isDark ? 'text-white/60' : 'text-gray-600'}`}>Professional Trading Certification</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${isDark ? 'text-[#FFD700] fill-[#FFD700]' : 'text-amber-500 fill-amber-500'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <div className={`absolute top-1 left-1 w-3 h-3 border-t border-l ${isDark ? 'border-[#FFD700]/50' : 'border-amber-300'}`} />
          <div className={`absolute top-1 right-1 w-3 h-3 border-t border-r ${isDark ? 'border-[#FFD700]/50' : 'border-amber-300'}`} />
          <div className={`absolute bottom-1 left-1 w-3 h-3 border-b border-l ${isDark ? 'border-[#FFD700]/50' : 'border-amber-300'}`} />
          <div className={`absolute bottom-1 right-1 w-3 h-3 border-b border-r ${isDark ? 'border-[#FFD700]/50' : 'border-amber-300'}`} />
        </div>
      </div>
    </div>
  );
};

export default CertifiedCards;
