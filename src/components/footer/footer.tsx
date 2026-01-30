"use client";
import React from "react";
import Nav from "./nav";
import Legal from "./legal";
import Contact from "./contact";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`relative pt-20 md:pt-24 pb-8 overflow-hidden border-t ${
      isDark
        ? 'bg-black border-white/[0.05]'
        : 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200'
    }`}>
      {/* Subtle background gradient */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-transparent via-[#FFD700]/[0.01] to-transparent'
          : 'bg-gradient-to-b from-transparent via-amber-50/50 to-transparent'
      }`} />

      {/* Ambient glow */}
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none ${
        isDark ? 'bg-[#FFD700]/[0.03]' : 'bg-[#FFD700]/[0.08]'
      }`} />

      <div className="container relative z-10 mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          <Contact />
          <Nav />
          <Legal />
        </div>

        {/* Divider */}
        <div className={`w-full h-px mb-8 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
            : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
        }`} />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className={`text-sm flex items-center gap-2 ${isDark ? 'text-white/40' : 'text-gray-700'}`}>
            © {new Date().getFullYear()} <span className={isDark ? 'text-[#FFD700]' : 'text-amber-700 font-bold'}>Pipzen</span>. All rights reserved.
          </p>

          {/* Powered by badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-sm ${
              isDark
                ? ''
                : 'bg-white shadow-sm border border-gray-200'
            }`}
            style={isDark ? {
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
            } : {}}
          >
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-white/50' : 'text-gray-700'}`}>Empowering Traders Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
