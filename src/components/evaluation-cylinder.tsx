"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, Zap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Plan {
  planid: string;
  account_size: string;
  onetime_fee: string;
  perks: string[];
  metrics: {
    label: string;
    value: string;
    additional: string;
  }[];
}

interface EvaluationCylinderProps {
  plan: Plan;
  isTransitioning: boolean;
  steps: string[];
  activeStep: string;
  onStepChange: (step: string) => void;
}

const EvaluationCylinder = ({ plan, isTransitioning, steps, activeStep, onStepChange }: EvaluationCylinderProps) => {
  const [rotationY, setRotationY] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isTransitioning) {
      setRotationY((prev) => prev + 360);
      setShowContent(false);
      setTimeout(() => setShowContent(true), 300);
    }
  }, [isTransitioning, plan]);

  return (
    <div className="relative w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">

        {/* Large 3D Glass Cylinder - Center */}
        <div className="relative order-1 lg:order-2">
          <div className="relative h-[340px] w-[280px] perspective-[1200px] flex items-center justify-center">
            {/* Ambient glow effects */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] blur-[60px] rounded-full ${isDark ? 'bg-[#FFD700]/15' : 'bg-[#FFD700]/25'}`} />
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[160px] h-[80px] blur-[50px] rounded-full ${isDark ? 'bg-[#FFD700]/10' : 'bg-[#FFD700]/20'}`} />

            {/* Rotating Cylinder */}
            <motion.div
              className="relative"
              animate={{ rotateY: rotationY }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={plan.planid}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {/* Large Glass Cylinder */}
                  <div className="relative w-[240px] h-[300px]">
                    {/* Top Ellipse - Glass effect */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-[45px] rounded-[50%] z-10"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,215,0,0.9) 0%, rgba(184,134,11,0.8) 100%)',
                        boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 -8px 15px rgba(0,0,0,0.2)',
                      }}
                    />

                    {/* Cylinder Body - Glass Effect */}
                    <div
                      className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[240px] h-[256px] overflow-hidden"
                      style={{
                        background: isDark
                          ? 'linear-gradient(180deg, rgba(20,20,25,0.95) 0%, rgba(15,15,18,0.98) 50%, rgba(20,20,25,0.95) 100%)'
                          : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,250,252,0.98) 50%, rgba(255,255,255,0.95) 100%)',
                        borderLeft: isDark ? '1px solid rgba(255,215,0,0.15)' : '1px solid rgba(255,215,0,0.4)',
                        borderRight: isDark ? '1px solid rgba(255,215,0,0.15)' : '1px solid rgba(255,215,0,0.4)',
                        boxShadow: isDark
                          ? 'inset 20px 0 40px rgba(255,215,0,0.03), inset -20px 0 40px rgba(255,215,0,0.03)'
                          : 'inset 20px 0 40px rgba(255,215,0,0.08), inset -20px 0 40px rgba(255,215,0,0.08), 0 10px 40px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Glass reflection overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isDark
                            ? 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)'
                            : 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)',
                        }}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-between py-4 px-3">
                        {/* Step Selection - Inside Cylinder */}
                        <div className="w-full">
                          <div className={`flex items-center justify-center gap-1 p-0.5 rounded-lg border ${
                            isDark
                              ? 'bg-black/40 border-white/[0.08]'
                              : 'bg-gray-100 border-gray-200'
                          }`}>
                            {steps.map((step, i) => (
                              <button
                                key={i}
                                onClick={() => onStepChange(step)}
                                className={`
                                  flex-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300
                                  ${activeStep === step
                                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-lg shadow-[#FFD700]/30'
                                    : isDark
                                      ? 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                                      : 'text-black font-bold hover:text-black hover:bg-gray-200'
                                  }
                                `}
                              >
                                {step}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Account Info */}
                        <div className="text-center flex-1 flex flex-col items-center justify-center">
                          <div className="flex items-center gap-2 mb-2">
                            <Wallet className={`w-4 h-4 ${isDark ? 'text-[#FFD700]/50' : 'text-amber-500/50'}`} />
                            <span className={`text-xs uppercase tracking-[0.15em] font-semibold ${isDark ? 'text-white/40' : 'text-black/70'}`}>Account Size</span>
                          </div>
                          <motion.h2
                            key={plan.account_size}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-black bg-gradient-to-b from-[#FFD700] via-[#FFC107] to-[#FFD700] bg-clip-text text-transparent drop-shadow-lg"
                          >
                            {plan.account_size}
                          </motion.h2>

                          {/* Divider */}
                          <div className={`w-20 h-px my-3 ${isDark ? 'bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-400/60 to-transparent'}`} />

                          {/* Fee */}
                          <span className={`text-xs uppercase tracking-[0.15em] font-semibold mb-1 ${isDark ? 'text-white/40' : 'text-black/70'}`}>One-Time Fee</span>
                          <motion.h3
                            key={plan.onetime_fee}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
                          >
                            {plan.onetime_fee}
                          </motion.h3>
                        </div>

                        {/* Quick Stats */}
                        <div className="w-full grid grid-cols-2 gap-2">
                          {plan.metrics.slice(0, 2).map((m, i) => (
                            <div key={i} className={`text-center p-2 rounded-lg border ${
                              isDark
                                ? 'bg-white/[0.03] border-white/[0.05]'
                                : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className={`text-[11px] uppercase tracking-wider mb-0.5 font-medium ${isDark ? 'text-white/50' : 'text-black/70'}`}>{m.label}</div>
                              <div className={`text-base font-bold ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>{m.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Animated scan lines */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute left-0 right-0 h-px pointer-events-none ${isDark ? 'bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-400/20 to-transparent'}`}
                          style={{ top: `${15 + i * 18}%` }}
                          animate={{ opacity: [0.05, 0.15, 0.05] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </div>

                    {/* Bottom Ellipse */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[45px] rounded-[50%]"
                      style={{
                        background: 'linear-gradient(0deg, rgba(100,80,20,0.9) 0%, rgba(140,115,0,0.8) 100%)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                      }}
                    />

                    {/* Reflection underneath */}
                    <div
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[200px] h-[50px] rounded-[50%] opacity-20 blur-sm"
                      style={{
                        background: 'radial-gradient(ellipse, rgba(255,215,0,0.3) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Left Panel - Key Metrics */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={plan.planid + "-metrics"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-full lg:w-[180px] order-2 lg:order-1"
            >
              <div className={`relative rounded-xl p-3 backdrop-blur-sm border ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.03] to-transparent border-white/[0.06]'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-500'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/80' : 'text-black'}`}>Key Metrics</span>
                </div>

                <div className="space-y-1.5">
                  {plan.metrics.map((m, i) => (
                    <motion.div
                      key={`${plan.planid}-metric-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center justify-between py-2 px-2.5 rounded-lg border transition-colors group ${
                        isDark
                          ? 'bg-black/30 border-white/[0.04] hover:border-[#FFD700]/20'
                          : 'bg-gray-50 border-gray-100 hover:border-amber-200'
                      }`}
                    >
                      <span className={`text-xs transition-colors ${isDark ? 'text-white/60 group-hover:text-white/80' : 'text-black/70 group-hover:text-black'}`}>{m.label}</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>{m.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Panel - Included Benefits */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={plan.planid + "-perks"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="w-full lg:w-[180px] order-3"
            >
              <div className={`relative rounded-xl p-3 backdrop-blur-sm border ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.03] to-transparent border-white/[0.06]'
                  : 'bg-white border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Check className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-500'}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white/80' : 'text-black'}`}>Included</span>
                </div>

                <div className="space-y-1.5">
                  {plan.perks.map((perk, i) => (
                    <motion.div
                      key={`${plan.planid}-perk-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-2 py-2 px-2.5 rounded-lg border transition-colors group ${
                        isDark
                          ? 'bg-black/30 border-white/[0.04] hover:border-[#FFD700]/20'
                          : 'bg-gray-50 border-gray-100 hover:border-amber-200'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-colors ${isDark ? 'text-[#FFD700]/70 group-hover:text-[#FFD700]' : 'text-amber-500 group-hover:text-amber-600'}`} />
                      <span className={`text-xs leading-tight transition-colors ${isDark ? 'text-white/60 group-hover:text-white/80' : 'text-black/70 group-hover:text-black'}`}>{perk}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EvaluationCylinder;
