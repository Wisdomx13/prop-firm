"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface EquityCurveProps {
  data: { date: string; equity: number; pnl: number }[];
  initialBalance?: number;
  profitTarget?: number;
  maxDrawdown?: number;
  dailyLossLimit?: number;
}

export default function EquityCurve({
  data,
  initialBalance = 50000,
  profitTarget = 10,
  maxDrawdown = 10,
  dailyLossLimit = 5,
}: EquityCurveProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [activeFilter, setActiveFilter] = useState("1M");
  const [hoverData, setHoverData] = useState<{
    date: string;
    equity: number;
    pnl: number;
    percentChange: number;
  } | null>(null);

  // Calculate threshold values
  const profitTargetValue = initialBalance * (1 + profitTarget / 100);
  const maxDrawdownValue = initialBalance * (1 - maxDrawdown / 100);
  const dailyLossValue = initialBalance * (1 - dailyLossLimit / 100);

  // Current stats
  const currentEquity = data[data.length - 1]?.equity || initialBalance;
  const totalPnL = currentEquity - initialBalance;
  const percentChange = ((currentEquity - initialBalance) / initialBalance) * 100;
  const progressToTarget = Math.min((percentChange / profitTarget) * 100, 100);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current, "dark");

    const dates = data.map((d) => d.date);
    const equityData = data.map((d) => d.equity);

    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(20, 20, 20, 0.95)",
        borderColor: "rgba(255, 215, 0, 0.3)",
        borderWidth: 1,
        padding: 0,
        formatter: (params: unknown) => {
          const p = params as { dataIndex: number; name: string; value: number }[];
          if (!p || !p[0]) return "";

          const idx = p[0].dataIndex;
          const item = data[idx];
          if (!item) return "";

          const pnlFromStart = item.equity - initialBalance;
          const pctChange = ((item.equity - initialBalance) / initialBalance) * 100;
          const progressPct = Math.min((pctChange / profitTarget) * 100, 100);

          // Update hover state
          setHoverData({
            date: item.date,
            equity: item.equity,
            pnl: pnlFromStart,
            percentChange: pctChange,
          });

          return `
            <div style="padding: 16px; min-width: 200px;">
              <div style="color: #888; font-size: 12px; margin-bottom: 8px;">${item.date}</div>

              <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;">
                <span style="color: #FFD700; font-size: 24px; font-weight: 700;">$${item.equity.toLocaleString()}</span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #666;">P&L</span>
                <span style="color: ${pnlFromStart >= 0 ? "#22c55e" : "#ef4444"}; font-weight: 600;">
                  ${pnlFromStart >= 0 ? "+" : ""}$${pnlFromStart.toLocaleString()}
                </span>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="color: #666;">Change</span>
                <span style="color: ${pctChange >= 0 ? "#22c55e" : "#ef4444"}; font-weight: 600;">
                  ${pctChange >= 0 ? "+" : ""}${pctChange.toFixed(2)}%
                </span>
              </div>

              <div style="background: #1a1a1a; border-radius: 8px; padding: 10px; margin-top: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <span style="color: #888; font-size: 11px;">Progress to Target</span>
                  <span style="color: #FFD700; font-size: 11px; font-weight: 600;">${progressPct.toFixed(0)}%</span>
                </div>
                <div style="height: 4px; background: #333; border-radius: 2px; overflow: hidden;">
                  <div style="height: 100%; width: ${progressPct}%; background: linear-gradient(90deg, #FFD700, #FFA500); border-radius: 2px;"></div>
                </div>
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: 15,
        right: 15,
        top: 60,
        bottom: 40,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#555",
          fontSize: 11,
          interval: Math.floor(dates.length / 6),
        },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#555",
          fontSize: 11,
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
        },
        splitLine: {
          lineStyle: { color: "rgba(255,255,255,0.04)", type: "dashed" },
        },
        min: (value: { min: number }) => Math.floor(value.min * 0.95),
        max: (value: { max: number }) => Math.ceil(Math.max(value.max * 1.05, profitTargetValue * 1.02)),
      },
      series: [
        // Profit Target Line
        {
          name: "Profit Target",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#22c55e",
            width: 2,
            type: "dashed",
          },
          data: dates.map(() => profitTargetValue),
          markPoint: {
            symbol: "rect",
            symbolSize: [80, 24],
            symbolOffset: [50, 0],
            data: [
              {
                name: "Profit Target Label",
                coord: [dates.length - 1, profitTargetValue],
                value: `+${profitTarget}%`,
                itemStyle: { color: "rgba(34, 197, 94, 0.15)" },
                label: {
                  show: true,
                  formatter: `+${profitTarget}%`,
                  color: "#22c55e",
                  fontSize: 11,
                  fontWeight: "bold",
                },
              },
            ],
          },
        },
        // Max Drawdown Line
        {
          name: "Max Drawdown",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#ef4444",
            width: 2,
            type: "dashed",
          },
          data: dates.map(() => maxDrawdownValue),
          markPoint: {
            symbol: "rect",
            symbolSize: [80, 24],
            symbolOffset: [50, 0],
            data: [
              {
                name: "Max Drawdown Label",
                coord: [dates.length - 1, maxDrawdownValue],
                value: `-${maxDrawdown}%`,
                itemStyle: { color: "rgba(239, 68, 68, 0.15)" },
                label: {
                  show: true,
                  formatter: `-${maxDrawdown}%`,
                  color: "#ef4444",
                  fontSize: 11,
                  fontWeight: "bold",
                },
              },
            ],
          },
        },
        // Daily Loss Limit Line
        {
          name: "Daily Loss",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#f59e0b",
            width: 1.5,
            type: "dashed",
          },
          data: dates.map(() => dailyLossValue),
        },
        // Starting Balance Line
        {
          name: "Starting Balance",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "rgba(255,255,255,0.15)",
            width: 1,
            type: "dotted",
          },
          data: dates.map(() => initialBalance),
        },
        // Main Equity Curve
        {
          name: "Equity",
          type: "line",
          smooth: 0.3,
          symbol: "none",
          sampling: "lttb",
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#FFD700" },
              { offset: 1, color: "#FFA500" },
            ]),
            shadowColor: "rgba(255, 215, 0, 0.4)",
            shadowBlur: 12,
            shadowOffsetY: 4,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 215, 0, 0.35)" },
              { offset: 0.4, color: "rgba(255, 215, 0, 0.15)" },
              { offset: 1, color: "rgba(255, 215, 0, 0)" },
            ]),
          },
          emphasis: {
            lineStyle: { width: 4 },
          },
          data: equityData,
        },
      ],
    };

    chartInstance.current.setOption(option);

    // Reset hover data when mouse leaves
    chartInstance.current.on("globalout", () => {
      setHoverData(null);
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, initialBalance, profitTarget, maxDrawdown, dailyLossLimit, profitTargetValue, maxDrawdownValue, dailyLossValue]);

  const filters = ["1D", "1W", "1M", "ALL"];

  return (
    <div className="bg-[#0c0c0c] rounded-2xl border border-[#1a1a1a] overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Trading Journey</h3>
            <div className="flex items-center gap-3">
              {/* Legend */}
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-green-500" style={{ borderStyle: "dashed" }}></span>
                <span className="text-[11px] text-gray-500">Profit Target (+{profitTarget}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-red-500" style={{ borderStyle: "dashed" }}></span>
                <span className="text-[11px] text-gray-500">Max Drawdown (-{maxDrawdown}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-amber-500" style={{ borderStyle: "dashed" }}></span>
                <span className="text-[11px] text-gray-500">Daily Loss (-{dailyLossLimit}%)</span>
              </div>
            </div>
          </div>

          {/* Time Filters */}
          <div className="flex gap-1 bg-[#151515] rounded-lg p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeFilter === filter
                    ? "bg-[#FFD700] text-black"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div ref={chartRef} className="w-full h-[350px]" />

        {/* Current Equity Overlay */}
        <div className="absolute bottom-16 right-8 text-right">
          <p className="text-xs text-gray-500 mb-1">Current Equity</p>
          <p className="text-3xl font-bold text-[#FFD700]">
            ${(hoverData?.equity || currentEquity).toLocaleString()}
          </p>
          <p className={`text-sm font-semibold ${(hoverData?.percentChange ?? percentChange) >= 0 ? "text-green-500" : "text-red-500"}`}>
            {(hoverData?.percentChange ?? percentChange) >= 0 ? "+" : ""}
            {(hoverData?.percentChange ?? percentChange).toFixed(2)}%{" "}
            <span className="text-gray-500">
              ({(hoverData?.pnl ?? totalPnL) >= 0 ? "+" : ""}${(hoverData?.pnl ?? totalPnL).toLocaleString()})
            </span>
          </p>
        </div>

        {/* Phase Indicator */}
        <div className="absolute top-4 right-8 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#252525]">
          <p className="text-[#FFD700] font-bold text-sm">PHASE 1</p>
          <p className="text-gray-400 text-xs">{progressToTarget.toFixed(0)}% to target</p>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-5 py-4 border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting Balance</p>
            <p className="text-white font-semibold">${initialBalance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Profit Target</p>
            <p className="text-green-500 font-semibold">${profitTargetValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Max Drawdown</p>
            <p className="text-red-500 font-semibold">${maxDrawdownValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Progress</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all"
                  style={{ width: `${Math.min(progressToTarget, 100)}%` }}
                />
              </div>
              <span className="text-[#FFD700] font-semibold text-sm">{progressToTarget.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
