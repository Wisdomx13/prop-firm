"use client";
import React, { useEffect } from "react";
import Brand from "./brand";
import HeaderActionButtons from "./header-action-buttons";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [showHeader, setShowHeader] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed flex justify-between items-center py-4 lg:py-5 px-4 md:px-8 lg:px-16 w-full z-[100] transition-all duration-500 ${
        isDark ? "bg-black/80" : "bg-white/80"
      } backdrop-blur-md ${showHeader ? "top-0" : "-top-24"}`}
    >
      <Brand />

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark
              ? "bg-[#1a1a1a] hover:bg-[#252525] text-[#FFD700]"
              : "bg-gray-100 hover:bg-gray-200 text-amber-600"
          } border ${isDark ? "border-[#333]" : "border-gray-300"}`}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <HeaderActionButtons />
      </div>
    </header>
  );
};

export default Header;
