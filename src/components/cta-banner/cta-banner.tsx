"use client";
import React, { useState, useEffect } from "react";
import { Zap, TrendingUp, Shield, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTABanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    targetDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: TrendingUp, value: "90%", label: "Profit Split" },
    { icon: Shield, value: "$400K", label: "Max Funding" },
    { icon: Zap, value: "24/7", label: "Support" },
  ];

  // Clock dial component
  const ClockDial = ({ value, max, label, size = "large" }: { value: number; max: number; label: string; size?: "large" | "small" }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const isLarge = size === "large";

    return (
      <div className={`relative flex flex-col items-center ${isLarge ? 'mx-2 md:mx-4' : 'mx-1 md:mx-2'}`}>
        {/* Clock face */}
        <div className={`relative ${isLarge ? 'w-[100px] h-[100px] md:w-[130px] md:h-[130px]' : 'w-[80px] h-[80px] md:w-[100px] md:h-[100px]'}`}>
          {/* Outer glow */}
          <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full blur-xl opacity-50" />

          {/* Glass background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

          {/* SVG Clock */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,215,0,0.1)"
              strokeWidth="3"
            />
            {/* Progress arc */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#clockGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Tick marks */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="8"
                x2="50"
                y2="12"
                stroke="rgba(255,215,0,0.3)"
                strokeWidth="1"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
            <defs>
              <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Inner glass circle */}
            <div className={`absolute ${isLarge ? 'w-[70px] h-[70px] md:w-[90px] md:h-[90px]' : 'w-[55px] h-[55px] md:w-[70px] md:h-[70px]'} rounded-full bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.05]`} />

            <motion.span
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-black bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent`}
            >
              {String(value).padStart(2, '0')}
            </motion.span>
          </div>

          {/* Animated pulse ring for seconds */}
          {label === "Sec" && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#FFD700]/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        {/* Label */}
        <span className={`mt-2 md:mt-3 ${isLarge ? 'text-[10px] md:text-xs' : 'text-[9px] md:text-[10px]'} font-semibold text-[#FFD700]/70 uppercase tracking-widest`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/[0.015] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/[0.03] blur-[120px] rounded-full" />

      <div className="container relative z-10">
        <div className="relative max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm font-semibold text-[#FFD700]">Limited Time Offer</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
              Ready to Get{" "}
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#B8860B] bg-clip-text text-transparent">
                Funded
              </span>
              ?
            </h2>
            <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto">
              Join thousands of successful traders and start your journey to financial freedom
            </p>
          </div>

          {/* Clock Timer Widget */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Outer container glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-[#FFD700]/10 via-[#FFD700]/20 to-[#FFD700]/10 rounded-[50px] blur-2xl opacity-50" />

              {/* Main glass container */}
              <div className="relative flex items-center gap-1 md:gap-2 px-6 md:px-10 py-6 md:py-8 rounded-[40px] bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
                {/* Inner shine */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                {/* Clock dials */}
                <ClockDial value={timeLeft.days} max={30} label="Days" size="large" />

                {/* Separator */}
                <div className="flex flex-col items-center gap-3 mx-1 md:mx-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#FFD700]"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#FFD700]"
                  />
                </div>

                <ClockDial value={timeLeft.hours} max={24} label="Hours" size="large" />

                {/* Separator */}
                <div className="flex flex-col items-center gap-3 mx-1 md:mx-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#FFD700]"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#FFD700]"
                  />
                </div>

                <ClockDial value={timeLeft.minutes} max={60} label="Min" size="small" />

                {/* Separator */}
                <div className="flex flex-col items-center gap-3 mx-1 md:mx-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#FFD700]/60"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#FFD700]/60"
                  />
                </div>

                <ClockDial value={timeLeft.seconds} max={60} label="Sec" size="small" />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-10 max-w-xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/[0.03] border border-[#FFD700]/20 mb-2 transition-all duration-300 group-hover:bg-[#FFD700]/10 group-hover:scale-110 group-hover:border-[#FFD700]/40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.05] to-transparent" />
                  <stat.icon className="relative w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" />
                </div>
                <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/challenges"
              className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black font-bold text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Zap className="relative w-4 h-4" />
              <span className="relative">Get Funded Now</span>
              <ChevronRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/giveaway"
              className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/[0.03] border border-[#FFD700]/30 text-white font-semibold text-sm transition-all duration-300 hover:bg-[#FFD700]/10 hover:border-[#FFD700]/50 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>Join Giveaway</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
