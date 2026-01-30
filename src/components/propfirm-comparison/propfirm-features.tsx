"use client";
import Image from "next/image";
import React from "react";
import { Check, X } from "lucide-react";
import { PropFirmCompany } from "./propfirm-comparison";
import { useTheme } from "@/context/ThemeContext";

const PropfirmFeatures = ({ company }: { company: PropFirmCompany }) => {
  const { isDark } = useTheme();

  return (
    <div className="w-full">
      {/* Compact table */}
      <div className={`rounded-lg overflow-hidden border ${
        isDark
          ? 'border-gray-700 bg-[#0d0d0d]'
          : 'border-gray-200 bg-white shadow-lg'
      }`}>
        {/* Header row with company logos */}
        <div className={`grid grid-cols-4 border-b ${
          isDark
            ? 'bg-[#141414] border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className={`px-3 py-3 border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
          {company.companies.map((comp, i) => (
            <div
              key={i}
              className={`px-2 py-3 flex items-center justify-center ${
                i < company.companies.length - 1
                  ? `border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}`
                  : ''
              } ${i === 0 ? (isDark ? 'bg-[#FFD700]/10' : 'bg-amber-50') : ''}`}
            >
              <Image
                src={comp.image}
                className="h-4 w-auto object-contain"
                alt={comp.name}
              />
            </div>
          ))}
        </div>

        {/* Feature rows */}
        {company.services.map((service, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 ${
              i < company.services.length - 1
                ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`
                : ''
            }`}
          >
            <div className={`px-3 py-3 border-r flex items-center ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {service.name}
              </span>
            </div>

            <div className={`px-2 py-3 border-r flex items-center justify-center ${
              isDark
                ? 'border-gray-700 bg-[#FFD700]/10'
                : 'border-gray-200 bg-amber-50'
            }`}>
              {typeof service.values.value1 === "string" ? (
                <span className={`text-sm font-bold ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`}>
                  {service.values.value1}
                </span>
              ) : service.values.value1 === true ? (
                <Check className={`w-5 h-5 ${isDark ? 'text-[#FFD700]' : 'text-amber-600'}`} strokeWidth={3} />
              ) : (
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
              )}
            </div>

            <div className={`px-2 py-3 border-r flex items-center justify-center ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              {typeof service.values.value2 === "string" ? (
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {service.values.value2}
                </span>
              ) : service.values.value2 === true ? (
                <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
              ) : (
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
              )}
            </div>

            <div className="px-2 py-3 flex items-center justify-center">
              {typeof service.values.value3 === "string" ? (
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {service.values.value3}
                </span>
              ) : service.values.value3 === true ? (
                <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
              ) : (
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropfirmFeatures;
