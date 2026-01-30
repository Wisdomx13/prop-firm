import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ContentPairTextContentProps {
  title: string;
  features: string[];
}
const ContentPairTextContent = ({
  title,
  features,
}: ContentPairTextContentProps) => {
  return (
    <div className="flex flex-col justify-center">
      {/* Title with enhanced styling */}
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-8 leading-tight">
        <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#B8860B] bg-clip-text text-transparent">
          {title}
        </span>
      </h3>

      {/* Features list with glass cards */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li
            key={i}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.05] hover:border-[#FFD700]/20 hover:translate-x-2"
          >
            {/* Animated check icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-[#FFD700]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#FFD700]/20 group-hover:scale-110">
                <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
              </div>
            </div>

            {/* Feature text */}
            <span className="text-base md:text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href="/challenges"
        className="group inline-flex items-center gap-3 self-start px-6 py-3 rounded-xl bg-white/[0.03] border border-[#FFD700]/20 text-white font-semibold transition-all duration-300 hover:bg-[#FFD700]/10 hover:border-[#FFD700]/40"
      >
        <span>Explore Platforms</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default ContentPairTextContent;
