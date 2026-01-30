"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface SymbolStats {
  symbol: string;
  trades: number;
  winRate: number;
  pnl: number;
}

interface TimeStats {
  hour: string;
  trades: number;
  winRate: number;
  pnl: number;
}

interface StatisticsBreakdownProps {
  symbolStats: SymbolStats[];
  timeStats: TimeStats[];
  winLossData: { wins: number; losses: number; breakeven: number };
}

export default function StatisticsBreakdown({
  symbolStats,
  timeStats,
  winLossData,
}: StatisticsBreakdownProps) {
  const donutRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Win/Loss Donut Chart
    if (donutRef.current) {
      const chart = echarts.init(donutRef.current, "dark");

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(20, 20, 20, 0.95)",
          borderColor: "#333",
        },
        series: [
          {
            type: "pie",
            radius: ["55%", "75%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: "#111",
              borderWidth: 3,
            },
            label: {
              show: false,
            },
            data: [
              { value: winLossData.wins, name: "Wins", itemStyle: { color: "#22c55e" } },
              { value: winLossData.losses, name: "Losses", itemStyle: { color: "#ef4444" } },
              { value: winLossData.breakeven, name: "Breakeven", itemStyle: { color: "#6b7280" } },
            ],
          },
        ],
      });

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [winLossData]);

  useEffect(() => {
    // Time Performance Bar Chart
    if (barRef.current) {
      const chart = echarts.init(barRef.current, "dark");

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(20, 20, 20, 0.95)",
          borderColor: "#333",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: timeStats.map((t) => t.hour),
          axisLine: { lineStyle: { color: "#333" } },
          axisLabel: { color: "#888", fontSize: 10 },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#333" } },
          axisLabel: {
            color: "#888",
            formatter: (v: number) => `$${v}`,
          },
          splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
        },
        series: [
          {
            type: "bar",
            data: timeStats.map((t) => ({
              value: t.pnl,
              itemStyle: { color: t.pnl >= 0 ? "#22c55e" : "#ef4444" },
            })),
            barWidth: "60%",
            itemStyle: { borderRadius: [4, 4, 0, 0] },
          },
        ],
      });

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [timeStats]);

  const sortedSymbols = [...symbolStats].sort((a, b) => b.pnl - a.pnl);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Symbol Performance */}
      <div className="bg-[#111] rounded-2xl border border-[#222] p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Symbol Performance</h3>
        <div className="space-y-3">
          {sortedSymbols.slice(0, 6).map((stat) => (
            <div key={stat.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-[#FFD700]">
                  {stat.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{stat.symbol}</p>
                  <p className="text-xs text-gray-500">{stat.trades} trades</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${stat.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stat.pnl >= 0 ? "+" : ""}${stat.pnl.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{stat.winRate.toFixed(0)}% WR</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Win/Loss Distribution */}
      <div className="bg-[#111] rounded-2xl border border-[#222] p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Win/Loss Distribution</h3>
        <div ref={donutRef} className="h-[180px]" />
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Wins ({winLossData.wins})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-400">Losses ({winLossData.losses})</span>
          </div>
        </div>
      </div>

      {/* Time Analysis */}
      <div className="bg-[#111] rounded-2xl border border-[#222] p-5">
        <h3 className="text-lg font-semibold text-white mb-4">P&L by Hour</h3>
        <div ref={barRef} className="h-[220px]" />
      </div>
    </div>
  );
}
