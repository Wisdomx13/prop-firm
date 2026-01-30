"use client";

import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

interface Trade {
  id: string;
  symbol: string;
  type: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  size: number;
  pnl: number;
  pnlPercent: number;
  entryTime: string;
  exitTime: string;
  duration: string;
}

interface TradeHistoryProps {
  trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
  return (
    <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden">
      <div className="p-5 border-b border-[#222]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Recent Trades</h3>
          <button className="text-sm text-[#FFD700] hover:text-[#FFA500] transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0a0a0a]">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Entry
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Exit
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Size
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                P&L
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-[#FFD700]">
                      {trade.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{trade.symbol}</p>
                      <p className="text-xs text-gray-500">{trade.entryTime}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                      trade.type === "LONG"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {trade.type === "LONG" ? (
                      <FiArrowUpRight size={12} />
                    ) : (
                      <FiArrowDownRight size={12} />
                    )}
                    {trade.type}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-gray-300 font-mono text-sm">
                  {trade.entryPrice.toFixed(trade.symbol.includes("JPY") ? 3 : 5)}
                </td>
                <td className="px-5 py-4 text-right text-gray-300 font-mono text-sm">
                  {trade.exitPrice.toFixed(trade.symbol.includes("JPY") ? 3 : 5)}
                </td>
                <td className="px-5 py-4 text-right text-gray-300 text-sm">
                  {trade.size.toFixed(2)} lots
                </td>
                <td className="px-5 py-4 text-right">
                  <div>
                    <p
                      className={`font-semibold ${
                        trade.pnl >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs ${
                        trade.pnlPercent >= 0 ? "text-green-500/70" : "text-red-500/70"
                      }`}
                    >
                      {trade.pnlPercent >= 0 ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 text-right text-gray-400 text-sm">
                  {trade.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
