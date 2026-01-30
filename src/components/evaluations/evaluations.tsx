"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import EvaluationsContent from "./evaluations-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Coins } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface EvaluationsProps {
  evaluations: {
    title: string;
    description: string;
    evaluationsPlans: any;
  };
}

const modelIcons: Record<string, React.ReactNode> = {
  forex: <TrendingUp className="w-3 h-3" />,
  crypto: <Coins className="w-3 h-3" />,
};

const Evaluations = ({ evaluations }: EvaluationsProps) => {
  const { evaluationsPlans } = evaluations;
  const { isDark } = useTheme();

  return (
    <section className="container mt-20 md:mt-16 lg:mt-20">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${isDark ? 'bg-[#FFD700]/10 border border-[#FFD700]/20' : 'bg-amber-100 border border-amber-300'}`}>
            <div className="w-1 h-1 rounded-full bg-[#FFD700] animate-pulse" />
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-[#FFD700]' : 'text-amber-700'}`}>Trading Challenges</span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose Your <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Evaluation</span>
          </h2>
          <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}>Select your preferred market and challenge type</p>
        </div>

        {/* Model Tabs - Small Boxed Buttons Centered */}
        <Tabs defaultValue={"forex"} className="w-full">
          <div className="flex justify-center mb-5">
            <TabsList className={`inline-flex rounded-lg p-1 gap-1 ${isDark ? 'bg-black/30 border border-white/[0.06]' : 'bg-gray-100 border border-gray-200'}`}>
              {evaluationsPlans.map((plan: any, i: any) => (
                <TabsTrigger
                  key={i}
                  value={plan.model.toLowerCase()}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200 data-[state=active]:bg-[#FFD700] data-[state=active]:text-black border-0 ${
                    isDark
                      ? 'data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white'
                      : 'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {modelIcons[plan.model.toLowerCase()]}
                    {plan.model}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {evaluationsPlans.map((plan: any, i: any) => (
            <TabsContent key={i} value={plan.model.toLowerCase()} className="mt-0">
              <EvaluationsContent data={plan} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
  );
};

export default Evaluations;
