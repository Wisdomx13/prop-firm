/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import PropfirmFeatures from "./propfirm-features";
import { useTheme } from "@/context/ThemeContext";

interface Service {
  name: string;
  values: {
    value1: string | boolean | number;
    value2: string | boolean | number;
    value3: string | boolean | number;
  };
}

export interface PropFirmCompany {
  companies: {
    name: string;
    image: any;
  }[];
  services: Service[];
}

interface PropfirmComparisonProps {
  title: string;
  description: string;
  company: PropFirmCompany;
}

const PropfirmComparison = ({
  title,
  description,
  company,
}: PropfirmComparisonProps) => {
  const { isDark } = useTheme();

  return (
    <section className={`py-10 md:py-12 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="container max-w-lg mx-auto px-4">
        {/* Clean header */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl md:text-3xl font-black mb-2 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>
            {title}
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>

        {/* Comparison table */}
        <PropfirmFeatures company={company} />
      </div>
    </section>
  );
};

export default PropfirmComparison;
