/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Monitor, Check } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

// Import platform logos
import ctraderLogo from "@/../public/ctrader-logo.jpg";
import matchTraderLogo from "@/../public/matchtrader-logo.png";
import dxtraderLogo from "@/../public/dxtrader-logo.png";

interface ContentPairProps {
  images: any[];
  title: string;
  features: string[];
}

const platformLogos: Record<string, any> = {
  "cTrader": ctraderLogo,
  "MatchTrader": matchTraderLogo,
  "DxTrader": dxtraderLogo,
};

const ContentPair = ({ title, features }: ContentPairProps) => {
  const [activePlatform, setActivePlatform] = useState(0);
  const { isDark } = useTheme();

  return (
    <section className={`relative py-12 overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 ${
              isDark ? '' : 'bg-amber-100 border-amber-300'
            }`}
            style={isDark ? {
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
            } : {
              border: '1px solid rgb(252, 211, 77)',
            }}
          >
            <Monitor className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
            <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-[#FFD700]' : 'text-amber-700'}`}>Trading Platforms</span>
          </div>
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title.split(',')[0]},
            <br />
            <span className="text-[#FFD700]">
              {title.split(',')[1]}
            </span>
          </h2>
        </div>

        {/* Crystal Glass Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActivePlatform(index)}
                className="relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Crystal Glass Card */}
                <div
                  className={`relative rounded-xl overflow-hidden ${
                    isDark ? '' : 'bg-white shadow-lg'
                  }`}
                  style={isDark ? {
                    background: 'rgba(255,255,255,0.03)',
                    border: activePlatform === index
                      ? '2px solid rgba(255,215,0,0.6)'
                      : '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  } : {
                    border: activePlatform === index
                      ? '2px solid rgb(255,215,0)'
                      : '1px solid rgb(229, 231, 235)',
                  }}
                >
                  {/* Logo Section */}
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={platformLogos[feature]}
                      alt={feature}
                      fill
                      className="object-cover"
                    />

                    {/* Active badge */}
                    {activePlatform === index && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]">
                        <Check className="w-3 h-3 text-black" />
                        <span className="text-[10px] font-black text-black uppercase">Active</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-5 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                    <h3
                      className="text-xl md:text-2xl font-black mb-2"
                      style={{
                        color: activePlatform === index
                          ? '#FFD700'
                          : isDark ? '#FFFFFF' : '#111827',
                      }}
                    >
                      {feature}
                    </h3>
                    <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                      Professional trading platform with advanced tools
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {['Advanced Charts', 'Fast Execution', 'Multi-Asset'].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#FFD700]' : 'bg-amber-500'}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom text */}
          <div className="mt-8 text-center">
            <p className={`text-sm font-semibold ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              All platforms available on desktop, web, and mobile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentPair;
