"use client";

import React from "react";
import { FiTrendingUp, FiTrendingDown, FiTarget, FiActivity, FiAward } from "react-icons/fi";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  subtitle?: string;
}

function MetricCard({ title, value, change, changeType = "neutral", icon, subtitle }: MetricCardProps) {
  const changeColor = changeType === "positive"
    ? "text-green-500"
    : changeType === "negative"
    ? "text-red-500"
    : "text-gray-400";

  return (
    <div className="bg-[#111] rounded-2xl border border-[#222] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${changeColor}`}>
              {changeType === "positive" && "+"}
              {change}
            </p>
          )}
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-xl bg-[#1a1a1a] text-[#FFD700]">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface MetricsCardsProps {
  metrics: {
    balance: number;
    todayPnL: number;
    totalPnL: number;
    winRate: number;
    profitFactor: number;
    totalTrades: number;
    avgWin: number;
    avgLoss: number;
    maxDrawdown: number;
    bestTrade: number;
    worstTrade: number;
    avgRMultiple: number;
  };
}

export default function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="space-y-4">
      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Account Balance"
          value={`$${metrics.balance.toLocaleString()}`}
          icon={<FiActivity size={20} />}
          subtitle="Funded Account"
        />
        <MetricCard
          title="Today's P&L"
          value={`$${Math.abs(metrics.todayPnL).toLocaleString()}`}
          change={`${((metrics.todayPnL / metrics.balance) * 100).toFixed(2)}%`}
          changeType={metrics.todayPnL >= 0 ? "positive" : "negative"}
          icon={metrics.todayPnL >= 0 ? <FiTrendingUp size={20} /> : <FiTrendingDown size={20} />}
        />
        <MetricCard
          title="Total P&L"
          value={`$${Math.abs(metrics.totalPnL).toLocaleString()}`}
          change={`${((metrics.totalPnL / (metrics.balance - metrics.totalPnL)) * 100).toFixed(2)}%`}
          changeType={metrics.totalPnL >= 0 ? "positive" : "negative"}
          icon={<FiAward size={20} />}
        />
        <MetricCard
          title="Win Rate"
          value={`${metrics.winRate.toFixed(1)}%`}
          change={`${metrics.totalTrades} trades`}
          changeType="neutral"
          icon={<FiTarget size={20} />}
        />
      </div>

      {/* Bottom Row - Detailed Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Profit Factor</p>
          <p className="text-xl font-semibold text-white">{metrics.profitFactor.toFixed(2)}</p>
        </div>
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Avg Win</p>
          <p className="text-xl font-semibold text-green-500">${metrics.avgWin.toLocaleString()}</p>
        </div>
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Avg Loss</p>
          <p className="text-xl font-semibold text-red-500">${metrics.avgLoss.toLocaleString()}</p>
        </div>
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Max Drawdown</p>
          <p className="text-xl font-semibold text-orange-500">{metrics.maxDrawdown.toFixed(1)}%</p>
        </div>
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Best Trade</p>
          <p className="text-xl font-semibold text-green-500">${metrics.bestTrade.toLocaleString()}</p>
        </div>
        <div className="bg-[#111] rounded-xl border border-[#222] p-4">
          <p className="text-gray-400 text-xs mb-1">Worst Trade</p>
          <p className="text-xl font-semibold text-red-500">-${Math.abs(metrics.worstTrade).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
