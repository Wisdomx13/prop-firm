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
        className="text-sm font-bold tracking-wide transition-all duration-300"
        style={{
          color: isDark ? 'rgba(255,255,255,0.9)' : '#000000',
        }}
      >
        TRADER LOGIN
      </Link>
      <Link
        href="/signup"
        className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300"
        style={{
          backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f59e0b',
          border: isDark ? '1px solid rgba(255,215,0,0.4)' : '1px solid #d97706',
          color: isDark ? '#ffffff' : '#000000',
        }}
      >
        GET FUNDED
      </Link>
    </div>
  );
};

export default HeaderActionButtons;
