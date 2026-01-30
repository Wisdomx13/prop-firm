"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar, FiSettings, FiTrendingUp, FiActivity, FiX, FiTarget, FiPercent, FiBarChart2 } from "react-icons/fi";

interface TradeEntry {
  symbol: string;
  type: "LONG" | "SHORT";
  pnl: number;
  size: number;
  duration: string;
}

interface DayData {
  date: string;
  pnl: number;
  trades: number;
  rValue?: number;
  winRate?: number;
  tradeList?: TradeEntry[];
}

interface PnLCalendarProps {
  data: DayData[];
  isDark?: boolean;
}

export default function PnLCalendar({ data, isDark = true }: PnLCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<{ day: number; date: string; pnl: number; trades: number; rValue: number; winRate: number; tradeList: TradeEntry[] } | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Close detail panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(e.target as Node)) {
        setSelectedDay(null);
      }
    };
    if (selectedDay) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedDay]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysOfWeekShort = ["S", "M", "T", "W", "T", "F", "S"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (null | { day: number; date: string; pnl: number; trades: number; rValue: number; winRate: number; tradeList: TradeEntry[] })[][] = [];
  let currentWeek: (null | { day: number; date: string; pnl: number; trades: number; rValue: number; winRate: number; tradeList: TradeEntry[] })[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayData = data.find((d) => d.date === dateStr);
    currentWeek.push({
      day, date: dateStr,
      pnl: dayData?.pnl || 0, trades: dayData?.trades || 0,
      tradeList: dayData?.tradeList || [],
      rValue: dayData?.rValue || 0, winRate: dayData?.winRate || 50,
    });
    if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const navigateMonth = (direction: number) => { setCurrentDate(new Date(year, month + direction, 1)); setSelectedDay(null); };
  const goToThisMonth = () => { setCurrentDate(new Date()); setSelectedDay(null); };

  const handleDayClick = (dayInfo: { day: number; date: string; pnl: number; trades: number; rValue: number; winRate: number; tradeList: TradeEntry[] }) => {
    if (dayInfo.trades === 0) { setSelectedDay(null); return; }
    setSelectedDay((prev) => prev?.date === dayInfo.date ? null : dayInfo);
  };

  const monthData = data.filter((d) => {
    const date = new Date(d.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const totalPnL = monthData.reduce((sum, d) => sum + d.pnl, 0);
  const totalTrades = monthData.reduce((sum, d) => sum + d.trades, 0);
  const tradingDays = monthData.filter((d) => d.trades > 0).length;
  const winDays = monthData.filter((d) => d.pnl > 0).length;
  const lossDays = monthData.filter((d) => d.pnl < 0).length;

  const getWeekStats = (week: typeof weeks[0]) => {
    const weekDays = week.filter((d) => d !== null && d.trades > 0);
    const weekPnL = weekDays.reduce((sum, d) => sum + (d?.pnl || 0), 0);
    return { pnL: weekPnL, tradingDays: weekDays.length };
  };

  const formatPnL = (pnl: number) => {
    if (Math.abs(pnl) >= 1000) return `$${(pnl / 1000).toFixed(1)}K`;
    return `$${Math.abs(pnl).toLocaleString()}`;
  };

  const colors = {
    bg: isDark ? "bg-[#0a0a0a]" : "bg-white",
    bgAlt: isDark ? "bg-[#111]" : "bg-gray-50",
    bgCard: isDark ? "bg-[#0d0d0d]" : "bg-gray-100",
    border: isDark ? "border-[#1a1a1a]" : "border-gray-200",
    borderGold: isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-500",
    textMuted: isDark ? "text-gray-500" : "text-gray-400",
    gold: isDark ? "text-[#FFD700]" : "text-amber-600",
    profitBg: isDark ? "bg-green-500/15" : "bg-green-50",
    profitBorder: isDark ? "border-green-500/30" : "border-green-200",
    profitText: isDark ? "text-green-400" : "text-green-600",
    lossBg: isDark ? "bg-red-500/15" : "bg-red-50",
    lossBorder: isDark ? "border-red-500/30" : "border-red-200",
    lossText: isDark ? "text-red-400" : "text-red-500",
  };

  return (
    <div className={`${colors.bg} rounded-2xl border ${colors.borderGold} overflow-hidden hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]`}>
      {/* Header */}
      <div className={`p-3 sm:p-5 border-b ${colors.border} bg-gradient-to-r ${isDark ? "from-[#0d0d0d] to-[#111]" : "from-gray-50 to-white"}`}>
        {/* Title Row */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
              <FiCalendar className="text-[#FFD700]" size={16} />
            </div>
            <div>
              <h3 className={`font-bold ${colors.text} text-sm sm:text-lg`}>Trading Calendar</h3>
              <p className={`text-[10px] sm:text-xs ${colors.textMuted} hidden sm:block`}>Daily P&L Overview</p>
            </div>
          </div>
          <button className={`p-2 sm:p-2.5 rounded-xl ${isDark ? "bg-[#111] hover:bg-[#1a1a1a]" : "bg-gray-100 hover:bg-gray-200"} border ${colors.border} ${colors.textSecondary} hover:text-[#FFD700] transition-all`}>
            <FiSettings size={14} />
          </button>
        </div>

        {/* Navigation Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Month Navigation */}
          <div className={`flex items-center gap-1 ${isDark ? "bg-[#111]" : "bg-gray-100"} rounded-xl p-1 border ${colors.border}`}>
            <button onClick={() => navigateMonth(-1)} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} ${colors.textSecondary} hover:text-[#FFD700] transition-all`}>
              <FiChevronLeft size={14} />
            </button>
            <span className={`${colors.text} font-semibold text-xs sm:text-sm px-1 sm:px-3 min-w-[90px] sm:min-w-[130px] text-center`}>
              {monthNames[month]} {year}
            </span>
            <button onClick={() => navigateMonth(1)} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? "hover:bg-[#1a1a1a]" : "hover:bg-gray-200"} ${colors.textSecondary} hover:text-[#FFD700] transition-all`}>
              <FiChevronRight size={14} />
            </button>
          </div>

          <button onClick={goToThisMonth} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border ${colors.border} ${colors.text} text-[10px] sm:text-xs font-semibold ${isDark ? "bg-[#111] hover:bg-[#1a1a1a] hover:border-[#FFD700]/30" : "bg-gray-100 hover:bg-gray-200"} transition-all`}>
            Today
          </button>

          {/* Stats - hidden on small, shown on md+ */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${totalPnL >= 0 ? `${isDark ? "bg-green-500/10" : "bg-green-50"} border border-green-500/30` : `${isDark ? "bg-red-500/10" : "bg-red-50"} border border-red-500/30`}`}>
              <FiTrendingUp className={totalPnL >= 0 ? "text-green-400" : "text-red-400"} size={12} />
              <div>
                <p className={`text-[9px] uppercase tracking-wider ${colors.textMuted}`}>P&L</p>
                <p className={`text-xs font-bold ${totalPnL >= 0 ? colors.profitText : colors.lossText}`}>
                  {totalPnL >= 0 ? "+" : "-"}{formatPnL(Math.abs(totalPnL))}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-100"} border ${colors.border}`}>
              <FiActivity className="text-[#FFD700]" size={12} />
              <div>
                <p className={`text-[9px] uppercase tracking-wider ${colors.textMuted}`}>Activity</p>
                <p className={`text-xs font-bold ${colors.text}`}>{tradingDays}d · {totalTrades}t</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-100"} border ${colors.border}`}>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className={`text-xs font-bold ${colors.profitText}`}>{winDays}</span>
              </div>
              <div className={`w-px h-3 ${isDark ? "bg-[#333]" : "bg-gray-300"}`} />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className={`text-xs font-bold ${colors.lossText}`}>{lossDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Row - shown only on small screens */}
        <div className="flex md:hidden items-center gap-2 mt-3 overflow-x-auto">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${totalPnL >= 0 ? `${isDark ? "bg-green-500/10" : "bg-green-50"} border border-green-500/30` : `${isDark ? "bg-red-500/10" : "bg-red-50"} border border-red-500/30`} shrink-0`}>
            <span className={`text-xs font-bold ${totalPnL >= 0 ? colors.profitText : colors.lossText}`}>
              {totalPnL >= 0 ? "+" : "-"}{formatPnL(Math.abs(totalPnL))}
            </span>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${isDark ? "bg-[#111]" : "bg-gray-100"} border ${colors.border} shrink-0`}>
            <span className={`text-xs font-bold ${colors.text}`}>{tradingDays}d · {totalTrades}t</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${isDark ? "bg-[#111]" : "bg-gray-100"} border ${colors.border} shrink-0`}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className={`text-xs font-bold ${colors.profitText}`}>{winDays}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 ml-1" />
            <span className={`text-xs font-bold ${colors.lossText}`}>{lossDays}</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-2 sm:p-5">
        {/* Day Headers - Desktop: full names, Mobile: single letters */}
        {/* Desktop 8-col (with weekly) */}
        <div className="hidden lg:grid grid-cols-8 gap-2 mb-3">
          {daysOfWeek.map((day) => (
            <div key={day} className={`text-center text-xs font-bold ${colors.gold} py-2 tracking-wider`}>{day}</div>
          ))}
          <div className={`text-center text-xs font-bold ${colors.textMuted} py-2`}>Weekly</div>
        </div>
        {/* Mobile 7-col (no weekly column) */}
        <div className="grid lg:hidden grid-cols-7 gap-1 mb-2">
          {daysOfWeekShort.map((day, i) => (
            <div key={i} className={`text-center text-[10px] font-bold ${colors.gold} py-1`}>{day}</div>
          ))}
        </div>

        {/* Calendar Weeks */}
        {weeks.map((week, weekIndex) => {
          const weekStats = getWeekStats(week);

          return (
            <React.Fragment key={weekIndex}>
              {/* Desktop row: 8 cols */}
              <div className="hidden lg:grid grid-cols-8 gap-2 mb-2">
                {week.map((dayInfo, dayIndex) => {
                  if (!dayInfo) return <div key={`empty-${weekIndex}-${dayIndex}`} className={`aspect-[4/3] rounded-xl ${colors.bgCard} border ${colors.border} opacity-50`} />;
                  const isProfit = dayInfo.pnl > 0;
                  const isLoss = dayInfo.pnl < 0;
                  const hasTrades = dayInfo.trades > 0;
                  const isToday = dayInfo.date === new Date().toISOString().split("T")[0];
                  return (
                    <div key={dayInfo.date} onClick={() => handleDayClick(dayInfo)} className={`aspect-[4/3] rounded-xl border p-2 flex flex-col relative transition-all duration-200 cursor-pointer group
                      ${selectedDay?.date === dayInfo.date ? "ring-2 ring-[#FFD700] ring-offset-1 ring-offset-[#0a0a0a] scale-[1.02]" : ""}
                      ${isToday && selectedDay?.date !== dayInfo.date ? "ring-2 ring-[#FFD700]/50 ring-offset-2 ring-offset-[#0a0a0a]" : ""}
                      ${hasTrades ? isProfit ? `${colors.profitBg} ${colors.profitBorder} hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]` : isLoss ? `${colors.lossBg} ${colors.lossBorder} hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]` : `${colors.bgCard} ${colors.border}` : `${colors.bgCard} ${colors.border} hover:border-[#FFD700]/30`}`}>
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs font-bold ${hasTrades ? (isProfit ? colors.profitText : isLoss ? colors.lossText : colors.textMuted) : colors.textMuted}`}>{String(dayInfo.day).padStart(2, "0")}</span>
                      </div>
                      {hasTrades ? (
                        <>
                          <div className={`mb-1 ${isProfit ? colors.profitText : colors.lossText} opacity-70`}><FiCalendar size={12} /></div>
                          <div className={`text-sm font-black ${isProfit ? colors.profitText : colors.lossText}`}>{isLoss ? "-" : ""}{formatPnL(Math.abs(dayInfo.pnl))}</div>
                          <div className={`text-[10px] font-medium ${isProfit ? "text-green-500/80" : "text-red-400/80"}`}>{dayInfo.trades} trade{dayInfo.trades > 1 ? "s" : ""}</div>
                          <div className={`text-[8px] ${isProfit ? "text-green-500/50" : "text-red-400/50"} mt-auto leading-tight font-medium`}>{dayInfo.rValue.toFixed(2)} R · {dayInfo.winRate}%</div>
                        </>
                      ) : <div className="flex-1" />}
                    </div>
                  );
                })}
                {/* Weekly Summary */}
                <div className={`aspect-[4/3] rounded-xl ${colors.bgCard} border ${colors.border} p-2 flex flex-col justify-center items-center hover:border-[#FFD700]/30 transition-all`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.textMuted} mb-1`}>Week {weekIndex + 1}</span>
                  <span className={`text-lg font-black ${weekStats.pnL >= 0 ? colors.profitText : colors.lossText}`}>{weekStats.pnL >= 0 ? "+" : "-"}{formatPnL(Math.abs(weekStats.pnL))}</span>
                  {weekStats.tradingDays > 0 && <span className={`text-[10px] ${colors.textMuted}`}>{weekStats.tradingDays} day{weekStats.tradingDays > 1 ? "s" : ""}</span>}
                </div>
              </div>

              {/* Mobile row: 7 cols, compact */}
              <div className="grid lg:hidden grid-cols-7 gap-1 mb-1">
                {week.map((dayInfo, dayIndex) => {
                  if (!dayInfo) return <div key={`empty-m-${weekIndex}-${dayIndex}`} className={`aspect-square rounded-lg ${colors.bgCard} border ${colors.border} opacity-40`} />;
                  const isProfit = dayInfo.pnl > 0;
                  const isLoss = dayInfo.pnl < 0;
                  const hasTrades = dayInfo.trades > 0;
                  const isToday = dayInfo.date === new Date().toISOString().split("T")[0];
                  return (
                    <div key={`m-${dayInfo.date}`} onClick={() => handleDayClick(dayInfo)} className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-0.5 transition-all cursor-pointer
                      ${selectedDay?.date === dayInfo.date ? "ring-2 ring-[#FFD700] scale-[1.05]" : ""}
                      ${isToday && selectedDay?.date !== dayInfo.date ? "ring-1 ring-[#FFD700]/50" : ""}
                      ${hasTrades ? isProfit ? `${colors.profitBg} ${colors.profitBorder}` : isLoss ? `${colors.lossBg} ${colors.lossBorder}` : `${colors.bgCard} ${colors.border}` : `${colors.bgCard} ${colors.border}`}`}>
                      <span className={`text-[10px] font-bold ${hasTrades ? (isProfit ? colors.profitText : isLoss ? colors.lossText : colors.textMuted) : colors.textMuted}`}>{dayInfo.day}</span>
                      {hasTrades && (
                        <span className={`text-[8px] font-bold ${isProfit ? colors.profitText : colors.lossText}`}>
                          {isLoss ? "-" : ""}{formatPnL(Math.abs(dayInfo.pnl))}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile Weekly Summary - compact bar */}
              <div className={`lg:hidden flex items-center justify-between px-2 py-1 mb-2 rounded-lg ${colors.bgCard} border ${colors.border}`}>
                <span className={`text-[10px] font-bold ${colors.textMuted}`}>Wk {weekIndex + 1}</span>
                <span className={`text-xs font-black ${weekStats.pnL >= 0 ? colors.profitText : colors.lossText}`}>{weekStats.pnL >= 0 ? "+" : "-"}{formatPnL(Math.abs(weekStats.pnL))}</span>
                {weekStats.tradingDays > 0 && <span className={`text-[10px] ${colors.textMuted}`}>{weekStats.tradingDays}d</span>}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Day Detail Panel */}
      {selectedDay && selectedDay.trades > 0 && (
        <div ref={detailRef} className={`mx-2 sm:mx-5 mb-2 sm:mb-5 rounded-xl border ${selectedDay.pnl >= 0 ? colors.profitBorder : colors.lossBorder} ${selectedDay.pnl >= 0 ? colors.profitBg : colors.lossBg} overflow-hidden transition-all duration-300 animate-in`}>
          {/* Detail Header */}
          <div className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b ${selectedDay.pnl >= 0 ? "border-green-500/20" : "border-red-500/20"}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${selectedDay.pnl >= 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
                <FiCalendar className={selectedDay.pnl >= 0 ? "text-green-400" : "text-red-400"} size={16} />
              </div>
              <div>
                <p className={`text-sm sm:text-base font-bold ${colors.text}`}>
                  {new Date(selectedDay.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                </p>
                <p className={`text-[10px] sm:text-xs ${colors.textMuted}`}>
                  {selectedDay.trades} trade{selectedDay.trades > 1 ? "s" : ""} executed
                </p>
              </div>
            </div>
            <button onClick={() => setSelectedDay(null)} className={`p-1.5 rounded-lg ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"} ${colors.textSecondary} hover:text-[#FFD700] transition-all`}>
              <FiX size={16} />
            </button>
          </div>

          {/* Detail Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4">
            <div className={`text-center p-2.5 sm:p-3 rounded-lg ${isDark ? "bg-black/30" : "bg-white/50"} border ${isDark ? "border-white/5" : "border-black/5"}`}>
              <div className={`flex items-center justify-center mb-1.5 ${selectedDay.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                <FiTrendingUp size={14} />
              </div>
              <p className={`text-base sm:text-lg font-black ${selectedDay.pnl >= 0 ? colors.profitText : colors.lossText}`}>
                {selectedDay.pnl >= 0 ? "+" : "-"}{formatPnL(Math.abs(selectedDay.pnl))}
              </p>
              <p className={`text-[10px] sm:text-xs ${colors.textMuted} mt-0.5`}>P&L</p>
            </div>

            <div className={`text-center p-2.5 sm:p-3 rounded-lg ${isDark ? "bg-black/30" : "bg-white/50"} border ${isDark ? "border-white/5" : "border-black/5"}`}>
              <div className={`flex items-center justify-center mb-1.5 ${colors.gold}`}>
                <FiBarChart2 size={14} />
              </div>
              <p className={`text-base sm:text-lg font-black ${colors.text}`}>{selectedDay.trades}</p>
              <p className={`text-[10px] sm:text-xs ${colors.textMuted} mt-0.5`}>Trades</p>
            </div>

            <div className={`text-center p-2.5 sm:p-3 rounded-lg ${isDark ? "bg-black/30" : "bg-white/50"} border ${isDark ? "border-white/5" : "border-black/5"}`}>
              <div className={`flex items-center justify-center mb-1.5 ${colors.gold}`}>
                <FiTarget size={14} />
              </div>
              <p className={`text-base sm:text-lg font-black ${colors.text}`}>{selectedDay.rValue.toFixed(2)}</p>
              <p className={`text-[10px] sm:text-xs ${colors.textMuted} mt-0.5`}>R-Value</p>
            </div>

            <div className={`text-center p-2.5 sm:p-3 rounded-lg ${isDark ? "bg-black/30" : "bg-white/50"} border ${isDark ? "border-white/5" : "border-black/5"}`}>
              <div className={`flex items-center justify-center mb-1.5 ${selectedDay.winRate >= 50 ? "text-green-400" : "text-red-400"}`}>
                <FiPercent size={14} />
              </div>
              <p className={`text-base sm:text-lg font-black ${selectedDay.winRate >= 50 ? colors.profitText : colors.lossText}`}>{selectedDay.winRate}%</p>
              <p className={`text-[10px] sm:text-xs ${colors.textMuted} mt-0.5`}>Win Rate</p>
            </div>
          </div>

          {/* Trade List */}
          {selectedDay.tradeList && selectedDay.tradeList.length > 0 && (
            <div className="mx-3 sm:mx-4 mb-3 sm:mb-4">
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${colors.textMuted} mb-2`}>Trade Log</p>
              <div className="space-y-1.5 sm:space-y-2 max-h-[200px] overflow-y-auto">
                {selectedDay.tradeList.map((trade, idx) => (
                  <div key={idx} className={`flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg ${isDark ? "bg-black/30" : "bg-white/50"} border ${isDark ? "border-white/5" : "border-black/5"}`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold ${trade.type === "LONG" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {trade.type}
                      </div>
                      <div>
                        <p className={`text-xs sm:text-sm font-semibold ${colors.text}`}>{trade.symbol}</p>
                        <p className={`text-[9px] sm:text-[10px] ${colors.textMuted}`}>{trade.size} lots · {trade.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs sm:text-sm font-bold ${trade.pnl >= 0 ? colors.profitText : colors.lossText}`}>
                        {trade.pnl >= 0 ? "+" : ""}{formatPnL(trade.pnl)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avg P&L per trade */}
          <div className={`mx-3 sm:mx-4 mb-3 sm:mb-4 px-3 py-2 rounded-lg ${isDark ? "bg-black/20" : "bg-white/30"} border ${isDark ? "border-white/5" : "border-black/5"} flex items-center justify-between`}>
            <span className={`text-xs ${colors.textMuted}`}>Avg P&L per trade</span>
            <span className={`text-sm font-bold ${selectedDay.pnl >= 0 ? colors.profitText : colors.lossText}`}>
              {selectedDay.pnl >= 0 ? "+" : "-"}{formatPnL(Math.abs(Math.round(selectedDay.pnl / selectedDay.trades)))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
