"use client";
import Link from "next/link";
import React from "react";
import { ChevronRight, Compass } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const data = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about-us" },
  { label: "Affiliate", link: "/affiliates" },
  { label: "Contact Us", link: "/contact-us" },
  { label: "FAQs", link: "/crypto-faq" },
];

const Nav = () => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isDark ? 'bg-[#FFD700]/10' : 'bg-amber-100'
        }`}>
          <Compass className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
        </div>
        <h4 className={`text-sm font-semibold uppercase tracking-wider ${
          isDark ? 'text-white/50' : 'text-gray-600'
        }`}>
          Navigation
        </h4>
      </div>

      {/* Nav links */}
      <ul className="space-y-2">
        {data.map((nav, i) => (
          <li key={i}>
            <Link
              href={nav.link}
              className={`group flex items-center gap-2 py-2 px-3 -mx-3 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'hover:bg-white/[0.03]'
                  : 'hover:bg-amber-50'
              }`}
            >
              <ChevronRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1 ${
                isDark
                  ? 'text-white/20 group-hover:text-[#FFD700]'
                  : 'text-gray-300 group-hover:text-amber-600'
              }`} />
              <span className={`text-sm font-medium transition-colors ${
                isDark
                  ? 'text-white/60 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {nav.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
