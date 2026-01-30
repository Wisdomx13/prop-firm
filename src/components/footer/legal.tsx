"use client";
import React from "react";
import { ChevronRight, Shield } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const data = [
  {
    label: "Terms and Conditions",
    link: "https://dashboardanalytix.com/client-terms-and-policies",
  },
  {
    label: "Refund Policy",
    link: "/refund-policy",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Cookie Policy",
    link: "https://dashboardanalytix.com/cookie-policy/?v=c419b06b4c65",
  },
];

const Legal = () => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isDark ? 'bg-[#FFD700]/10' : 'bg-amber-100'
        }`}>
          <Shield className={`w-4 h-4 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} />
        </div>
        <h4 className={`text-sm font-semibold uppercase tracking-wider ${
          isDark ? 'text-white/50' : 'text-gray-600'
        }`}>
          Legal
        </h4>
      </div>

      {/* Legal links */}
      <ul className="space-y-2">
        {data.map((nav, i) => (
          <li key={i}>
            <a
              href={nav.link}
              target={nav.link.startsWith("http") ? "_blank" : undefined}
              rel={nav.link.startsWith("http") ? "noopener noreferrer" : undefined}
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
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legal;
