import React from "react";

interface SectionHeaderProps {
  title: string;
  shortDescription?: string;
}
const SectionHeader = ({ title, shortDescription }: SectionHeaderProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-8 md:mb-12 lg:mb-16">
      {/* Decorative top line */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FFD700]/50" />
        <div className="w-2 h-2 rounded-full bg-[#FFD700]/50" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFD700]/50" />
      </div>

      {/* Title with enhanced gradient */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#B8860B] bg-clip-text text-transparent max-w-[600px] text-center leading-tight text-glow-gold-subtle">
        {title}
      </h2>

      {/* Description */}
      {shortDescription && (
        <p className="text-base md:text-lg text-white/60 mt-4 text-center max-w-xl leading-relaxed">
          {shortDescription}
        </p>
      )}

      {/* Decorative bottom glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#FFD700]/10 blur-3xl rounded-full" />
    </div>
  );
};

export default SectionHeader;
