import React from "react";
import { BarChart3 } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  additional: string;
}

interface EvaluationsMetricsProps {
  metrics: Metric[];
}

const VolumnMetrics = ({ metrics }: EvaluationsMetricsProps) => {
  return (
    <div className="h-full">
      <div className="h-full p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
        {/* Compact Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
          <BarChart3 className="w-4 h-4 text-[#FFD700]" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Key Metrics</span>
        </div>

        {/* Metrics Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-[#FFD700]/20 transition-colors"
            >
              <p className="text-[10px] text-white/40 uppercase tracking-wide mb-0.5 truncate">
                {m.label}
              </p>
              <p className="text-sm font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolumnMetrics;
