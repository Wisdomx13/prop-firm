/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEvaluationSelect } from "@/lib/store.zustand";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import EvaluationCylinder from "./evaluation-cylinder";
import { useTheme } from "@/context/ThemeContext";

interface VolumnPropsWithSteps {
  stepsData: { stepName: string; plans: any[] }[];
  stepNames: string[];
  getPlansForStep: (stepName: string) => any[];
  plans?: never;
}

interface VolumnPropsWithPlans {
  plans: any[];
  stepsData?: never;
  stepNames?: never;
  getPlansForStep?: never;
}

type VolumnProps = VolumnPropsWithSteps | VolumnPropsWithPlans;

const Volumn = (props: VolumnProps) => {
  const { isDark } = useTheme();

  // Determine if we're using steps mode or simple plans mode
  const hasSteps = 'stepNames' in props && props.stepNames !== undefined;

  const initialStepNames = hasSteps ? props.stepNames : ['Challenge'];
  const initialPlans = hasSteps ? props.getPlansForStep!(props.stepNames[0]) : props.plans;

  const [activeStep, setActiveStep] = useState(initialStepNames[0]);
  const [plans, setPlans] = useState(initialPlans);
  const accountsSize = plans.map((plan: any) => plan.account_size);
  const [selectedSize, setSelectedSize] = useState(accountsSize[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const findPlanIdBySize = (size: string) => {
    const plan = plans.find((plan: any) => plan.account_size === size);
    return plan?.planid;
  };

  const findPlan = (size: string) => {
    const plan = plans.find((plan: any) => plan.account_size === size);
    return plan;
  };

  const { setPlanid, planid } = useEvaluationSelect((state) => state);

  useEffect(() => {
    if (plans && accountsSize.length > 0) {
      setPlanid(findPlanIdBySize(accountsSize[0]));
    }
  }, []);

  // Update plans when props change (for non-step mode)
  useEffect(() => {
    if (!hasSteps && props.plans) {
      setPlans(props.plans);
      const newAccountSizes = props.plans.map((p: any) => p.account_size);
      if (newAccountSizes.length > 0) {
        setSelectedSize(newAccountSizes[0]);
        setPlanid(props.plans[0]?.planid);
      }
    }
  }, [hasSteps ? null : props.plans]);

  // Handle step change
  const handleStepChange = (step: string) => {
    if (!hasSteps) return;

    if (step !== activeStep) {
      setIsTransitioning(true);
      setActiveStep(step);
      const newPlans = props.getPlansForStep!(step);
      setPlans(newPlans);
      const newAccountSizes = newPlans.map((p: any) => p.account_size);
      setSelectedSize(newAccountSizes[0]);
      setPlanid(newPlans[0]?.planid);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const handleSizeChange = (size: string) => {
    if (size !== selectedSize) {
      setIsTransitioning(true);
      setSelectedSize(size);
      setPlanid(findPlanIdBySize(size));
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const currentPlan = findPlan(selectedSize);
  const currentAccountSizes = plans.map((p: any) => p.account_size);

  if (!currentPlan) return null;

  return (
    <div className="relative">
      {/* Account Size Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <span className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-white/50' : 'text-black/70'}`}>Select Account:</span>
        <div className="flex flex-wrap justify-center gap-2">
          {currentAccountSizes.map((size: any, i: number) => (
            <button
              key={i}
              onClick={() => handleSizeChange(size)}
              className={`
                px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300
                ${selectedSize === size
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-lg shadow-[#FFD700]/25"
                  : isDark
                    ? "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white/90 border border-white/[0.08]"
                    : "bg-gray-100 text-black/80 hover:bg-amber-50 hover:text-black border border-gray-200"
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Cylinder Display */}
      <EvaluationCylinder
        plan={currentPlan}
        isTransitioning={isTransitioning}
        steps={initialStepNames}
        activeStep={activeStep}
        onStepChange={handleStepChange}
      />

      {/* CTA Button */}
      {planid && (
        <div className="flex justify-center mt-4">
          <Link href={`/challenges?planId=${planid}`}>
            <button className="group relative flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black font-bold text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:scale-[1.03] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="relative w-3.5 h-3.5" />
              <span className="relative">Start Challenge</span>
              <ArrowRight className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Volumn;
