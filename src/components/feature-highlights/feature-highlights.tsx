"use client";
import React from "react";
import Image from "next/image";
import { Clock, BarChart3, Zap, Percent, TrendingUp, Shield } from "lucide-react";
import presenter_man from "@/../public/presenter-man.png";
import { useTheme } from "@/context/ThemeContext";

const FeatureHighlights = () => {
  const { isDark } = useTheme();

  const cardStyle = isDark
    ? "border-[#FFD700]/50 bg-black/70"
    : "border-amber-400 bg-white shadow-2xl";

  const cardBoxShadow = isDark
    ? "0 0 30px rgba(255,215,0,0.2), inset 0 0 20px rgba(255,215,0,0.05)"
    : "0 12px 40px rgba(0,0,0,0.12), 0 0 0 2px rgba(255,193,7,0.4)";

  const titleColor = isDark ? "text-[#FFD700]" : "text-amber-500";
  const subtitleColor = isDark ? "text-white/90" : "text-black font-bold";
  const descColor = isDark ? "text-white/50" : "text-black/70";
  const iconColor = isDark ? "text-[#FFD700]" : "text-amber-500";

  return (
    <section className={`relative py-16 md:py-24 ${isDark ? '' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Subtle background gradient */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-transparent via-[#FFD700]/[0.02] to-transparent' : 'bg-gradient-to-b from-amber-50/50 via-transparent to-amber-50/30'}`} />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Circular Layout - Man in center, Cards around */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[550px]">

          {/* Man Image - Centered */}
          <div className="relative z-10">
            {/* Ambient glow behind man */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[350px] md:h-[350px] blur-[80px] ${isDark ? 'bg-[#FFD700]/10' : 'bg-[#FFD700]/20'}`} />

            {/* Holographic circle behind man */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
                border: isDark
                  ? '1px solid rgba(255,215,0,0.15)'
                  : '1px solid rgba(255,215,0,0.4)',
              }}
            />

            {/* Rotating ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full"
              style={{
                border: isDark
                  ? '1px dashed rgba(255,215,0,0.25)'
                  : '1px dashed rgba(255,215,0,0.5)',
                animation: 'spin 40s linear infinite',
              }}
            />

            <Image
              src={presenter_man}
              alt="Professional Trader"
              width={400}
              height={520}
              className="relative z-10 w-auto h-[260px] md:h-[320px] lg:h-[380px]"
              priority
            />

            <style jsx>{`
              @keyframes spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
            `}</style>
          </div>

          {/* Feature Cards - Positioned around the man in circular pattern */}

          {/* Card 1 - Unlimited - Top Left */}
          <div className="absolute top-[5%] left-[12%] md:top-[10%] md:left-[22%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(-5deg)',
            }}>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <Clock className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>Unlimited</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>No Time Limits</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Trade at your own pace</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - 6% - Top Right */}
          <div className="absolute top-[5%] right-[12%] md:top-[10%] md:right-[22%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(5deg)',
            }}>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <BarChart3 className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>6%</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>Static Drawdown</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Consistent rules</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - 90% - Middle Left */}
          <div className="absolute top-[38%] left-[5%] md:left-[18%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(-3deg)',
            }}>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <Percent className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>90%</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>Profit Split</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Industry leading</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - 24hrs - Middle Right */}
          <div className="absolute top-[38%] right-[5%] md:right-[18%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(3deg)',
            }}>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <Zap className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>24hrs</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>Instant Payouts</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Get paid immediately</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 - 2x - Bottom Left */}
          <div className="absolute bottom-[8%] left-[12%] md:bottom-[12%] md:left-[24%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(-4deg)',
            }}>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#FFD700]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <TrendingUp className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>2x</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>Scaling Plan</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Grow your account</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 - $0 - Bottom Right */}
          <div className="absolute bottom-[8%] right-[12%] md:bottom-[12%] md:right-[24%] z-20">
            <div className={`relative p-4 md:p-5 rounded-xl border backdrop-blur-xl ${cardStyle}`} style={{
              boxShadow: cardBoxShadow,
              transform: 'rotate(4deg)',
            }}>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]" />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]" />
              <div className="flex items-start gap-3">
                <Shield className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 ${iconColor}`} />
                <div>
                  <div className={`text-2xl md:text-3xl font-black leading-none ${titleColor}`}>$0</div>
                  <div className={`text-sm md:text-base font-bold ${subtitleColor}`}>No Hidden Fees</div>
                  <div className={`text-xs md:text-sm ${descColor}`}>Transparent pricing</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom floating stats */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div
            className={`inline-flex items-center gap-8 md:gap-12 px-8 py-4 rounded-full ${
              isDark ? '' : 'bg-white shadow-lg border border-gray-200'
            }`}
            style={isDark ? {
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.05)',
            } : {}}
          >
            {[
              { value: "$50M+", label: "Paid Out" },
              { value: "15K+", label: "Traders" },
              { value: "4.9", label: "Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
