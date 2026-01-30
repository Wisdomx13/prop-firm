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
  forex: <TrendingUp className="w-4 h-4" />,
  crypto: <Coins className="w-4 h-4" />,
};

const Evaluations = ({ evaluations }: EvaluationsProps) => {
  const { evaluationsPlans } = evaluations;
  const { isDark } = useTheme();

  return (
    <section className="container mt-20 md:mt-16 lg:mt-20">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 ${isDark ? 'bg-[#FFD700]/10 border border-[#FFD700]/20' : 'bg-amber-100 border border-amber-300'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#FFD700]' : 'text-amber-700'}`}>Trading Challenges</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            Choose Your <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Evaluation</span>
          </h2>
          <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-white/60' : 'text-black/70'}`}>Select your preferred market and challenge type</p>
        </div>

        {/* Model Tabs - Small Boxed Buttons Centered */}
        <Tabs defaultValue={"forex"} className="w-full">
          <div className="flex justify-center mb-5">
            <TabsList className={`inline-flex rounded-xl p-1.5 gap-2 ${isDark ? 'bg-black/30 border border-white/[0.06]' : 'bg-gray-100 border border-gray-200'}`}>
              {evaluationsPlans.map((plan: any, i: any) => (
                <TabsTrigger
                  key={i}
                  value={plan.model.toLowerCase()}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 data-[state=active]:bg-[#FFD700] data-[state=active]:text-black border-0 ${
                    isDark
                      ? 'data-[state=inactive]:text-white/60 data-[state=inactive]:hover:text-white'
                      : 'data-[state=inactive]:text-black/80 data-[state=inactive]:hover:text-black'
                  }`}
                >
                  <span className="flex items-center gap-2">
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
