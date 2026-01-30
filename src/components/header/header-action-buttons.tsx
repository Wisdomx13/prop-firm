"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const HeaderActionButtons = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-6 items-center">
      <Link
        href="/signin"
        className={`text-sm font-bold tracking-wide transition-all duration-300 ${
          isDark
            ? 'text-white/90 hover:text-[#FFD700]'
            : 'text-black hover:text-amber-600'
        }`}
      >
        TRADER LOGIN
      </Link>
      <Link
        href="/signup"
        className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide backdrop-blur-xl transition-all duration-300 ${
          isDark
            ? 'bg-white/5 border border-[#FFD700]/40 text-white hover:bg-[#FFD700]/10 hover:border-[#FFD700]/80 hover:shadow-lg hover:shadow-[#FFD700]/10'
            : 'bg-amber-500 border border-amber-600 text-black hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30'
        }`}
      >
        GET FUNDED
      </Link>
    </div>
  );
};

export default HeaderActionButtons;
