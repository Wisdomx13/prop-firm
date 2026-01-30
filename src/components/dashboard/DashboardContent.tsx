"use client";

import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiTrendingUp, FiTrendingDown, FiActivity, FiX, FiCheckCircle, FiXCircle, FiMaximize2,
  FiTarget, FiDollarSign, FiBarChart2, FiZap, FiAlertTriangle, FiLayers,
  FiGlobe, FiAward, FiList, FiSliders, FiPercent, FiFileText, FiLink, FiSmartphone,
  FiShield, FiArrowUp, FiArrowDown, FiRefreshCw, FiUsers, FiChevronDown, FiBell, FiMessageSquare, FiUser,
  FiMoreHorizontal, FiPlus, FiHelpCircle, FiDownload, FiCreditCard, FiKey, FiServer, FiLock, FiCopy, FiExternalLink
} from "react-icons/fi";
import PnLCalendar from "./PnLCalendar";

// Seeded random number generator for consistent SSR/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};


// Generate calendar data for current month with seed
const tradeSymbols = ["EUR/USD", "GBP/JPY", "XAU/USD", "USD/JPY", "BTC/USD", "GBP/USD", "AUD/USD", "EUR/GBP"];
const tradeTypes = ["LONG", "SHORT"] as const;

const generateCalendarData = (seed: number) => {
  const data = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let seedVal = seed;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (dayOfWeek === 0 || dayOfWeek === 6 || date > now) {
      data.push({ date: dateStr, pnl: 0, trades: 0, rValue: 0, winRate: 50, tradeList: [] as { symbol: string; type: "LONG" | "SHORT"; pnl: number; size: number; duration: string }[] });
    } else {
      const tradeCount = Math.floor(seededRandom(seedVal++) * 6) + 1;
      const tradeList: { symbol: string; type: "LONG" | "SHORT"; pnl: number; size: number; duration: string }[] = [];
      let totalPnl = 0;
      let wins = 0;

      for (let t = 0; t < tradeCount; t++) {
        const symbol = tradeSymbols[Math.floor(seededRandom(seedVal++) * tradeSymbols.length)];
        const type = tradeTypes[Math.floor(seededRandom(seedVal++) * 2)];
        const tradePnl = Math.round((seededRandom(seedVal++) - 0.4) * 500);
        const size = parseFloat((seededRandom(seedVal++) * 3 + 0.1).toFixed(2));
        const hours = Math.floor(seededRandom(seedVal++) * 8) + 1;
        const mins = Math.floor(seededRandom(seedVal++) * 59);
        const duration = `${hours}h ${mins}m`;
        totalPnl += tradePnl;
        if (tradePnl > 0) wins++;
        tradeList.push({ symbol, type, pnl: tradePnl, size, duration });
      }

      const rValue = parseFloat((seededRandom(seedVal++) * 2).toFixed(2));
      const winRate = tradeCount > 0 ? Math.round((wins / tradeCount) * 100) : 50;
      data.push({ date: dateStr, pnl: totalPnl, trades: tradeCount, rValue, winRate, tradeList });
    }
  }
  return data;
};

// Sample trades data
const sampleTrades = [
  { id: "1", symbol: "EUR/USD", type: "LONG" as const, entryPrice: 1.08542, exitPrice: 1.08891, size: 2.5, pnl: 872, pnlPercent: 1.74, entryTime: "Jan 24, 09:32", exitTime: "Jan 24, 14:18", duration: "4h 46m" },
  { id: "2", symbol: "GBP/JPY", type: "SHORT" as const, entryPrice: 189.542, exitPrice: 189.123, size: 1.0, pnl: 419, pnlPercent: 0.84, entryTime: "Jan 24, 11:15", exitTime: "Jan 24, 15:42", duration: "4h 27m" },
  { id: "3", symbol: "XAU/USD", type: "LONG" as const, entryPrice: 2025.50, exitPrice: 2019.30, size: 0.5, pnl: -310, pnlPercent: -0.62, entryTime: "Jan 23, 14:22", exitTime: "Jan 23, 16:58", duration: "2h 36m" },
  { id: "4", symbol: "USD/JPY", type: "SHORT" as const, entryPrice: 148.234, exitPrice: 147.891, size: 3.0, pnl: 1029, pnlPercent: 2.06, entryTime: "Jan 23, 08:45", exitTime: "Jan 23, 13:21", duration: "4h 36m" },
  { id: "5", symbol: "BTC/USD", type: "LONG" as const, entryPrice: 42150.00, exitPrice: 42890.00, size: 0.15, pnl: 1110, pnlPercent: 2.22, entryTime: "Jan 22, 10:00", exitTime: "Jan 23, 08:30", duration: "22h 30m" },
];

// Sample stats
const symbolStats = [
  { symbol: "EUR/USD", trades: 45, winRate: 71, pnl: 3250 },
  { symbol: "GBP/JPY", trades: 28, winRate: 64, pnl: 1890 },
  { symbol: "XAU/USD", trades: 22, winRate: 59, pnl: 1420 },
  { symbol: "USD/JPY", trades: 18, winRate: 72, pnl: 1180 },
  { symbol: "BTC/USD", trades: 8, winRate: 75, pnl: 980 },
  { symbol: "EUR/GBP", trades: 6, winRate: 50, pnl: -300 },
];

interface DashboardContentProps {
  activeTab?: string;
  isDark?: boolean;
}

// Ecosystem Content Component with 3D Carousel
function EcosystemContent({ isDark }: { isDark: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Platform data
  const platforms = [
    {
      id: "pipzen",
      name: "PIPZEN",
      shortDesc: "Elite Prop Firm",
      description: "Professional proprietary trading firm offering funded accounts, advanced evaluation programs, and profit-sharing opportunities.",
      url: "https://pipzen.io",
      features: ["Funded Accounts", "Paid After Violation", "Profit Sharing"],
      metric: { value: "FUNDED", label: "Trading" },
      color: "#FFD700",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      logoIcon: "PZ",
      logoPath: "/logos/pipzen.jpg",
    },
    {
      id: "crymadx",
      name: "CRYMADX",
      shortDesc: "Next-Gen Exchange Platform",
      description: "500+ trading pairs with institutional-grade liquidity and lightning-fast execution.",
      url: "https://crymadx.io",
      features: ["500+ Pairs", "Deep Liquidity", "Fast Execution"],
      metric: { value: "500+", label: "Trading Pairs" },
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
      logoIcon: "CX",
      logoPath: "/logos/crymadx.jpg",
    },
    {
      id: "crymadcash",
      name: "CRYMAD CASH",
      shortDesc: "Digital Bank for Crypto & Fiat",
      description: "A full-featured digital bank supporting both crypto and fiat currencies with global payment capabilities.",
      url: "https://production-crmdx.web.app/sign-up",
      features: ["Crypto & Fiat", "Global Payments", "Digital Banking"],
      metric: { value: "GLOBAL", label: "Payments" },
      color: "#00ff88",
      gradient: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",
      logoIcon: "CC",
      logoPath: "/logos/crymadcash.jpg",
    },
    {
      id: "crymadhash",
      name: "CRYMAD HASH",
      shortDesc: "Premium Mining Pool",
      description: "Maximum hash efficiency with automated payouts and real-time performance stats.",
      url: "https://crymadhsh.tech",
      features: ["High Efficiency", "Auto Payouts", "Real-time Stats"],
      metric: { value: "24/7", label: "Mining" },
      color: "#a855f7",
      gradient: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)",
      logoIcon: "CH",
      logoPath: "/logos/crymadhash.png",
    },
  ];

  const centerPlatform = {
    id: "cryptomadness",
    name: "CRYPTOMADNESS",
    tagline: "THE ULTIMATE ECOSYSTEM",
    url: "https://www.cryptomadness.info/",
  };

  // Smooth auto rotation using requestAnimationFrame
  useEffect(() => {
    if (hoveredCard !== null) return;
    if (!carouselRef.current) return;

    let animationId: number;
    let lastTime = 0;
    const rotationSpeed = isMobile ? 0.012 : 0.018;

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      rotationRef.current = (rotationRef.current + rotationSpeed * deltaTime) % 360;

      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [hoveredCard, isMobile]);

  return (
    <div className={`p-4 lg:p-6 ${isDark ? "" : "bg-gray-50"}`}>
      <style jsx global>{`
        .eco-carousel-scene-dash {
          height: 500px;
          perspective: 1200px;
          perspective-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .eco-carousel-ring-dash {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .eco-platform-card-dash {
          position: absolute;
          width: 280px;
          height: 400px;
          left: 50%;
          top: 50%;
          margin-left: -140px;
          margin-top: -200px;
          transform-style: preserve-3d;
          cursor: pointer;
          transition: box-shadow 0.3s ease, filter 0.3s ease;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(5, 5, 5, 0.99) 100%);
          border: 2px solid var(--card-color, #FFD700);
          border-radius: 20px;
          overflow: hidden;
        }
        .eco-platform-card-dash.hovered {
          z-index: 100;
          box-shadow: 0 0 60px var(--card-color, rgba(255, 215, 0, 0.4)), 0 20px 60px rgba(0, 0, 0, 0.5);
          filter: brightness(1.1);
        }
        .eco-holo-shine-dash {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.15), transparent);
          animation: ecoHoloShineDash 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes ecoHoloShineDash {
          0%, 100% { left: -100%; }
          50% { left: 150%; }
        }
        .eco-holo-scanline-dash {
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--card-color, #FFD700), transparent);
          animation: ecoScanlineDash 3s linear infinite;
          pointer-events: none;
          box-shadow: 0 0 20px var(--card-color, rgba(255, 215, 0, 0.5));
        }
        @keyframes ecoScanlineDash {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @media (max-width: 768px) {
          .eco-carousel-scene-dash {
            height: 380px;
            perspective: 800px;
          }
          .eco-platform-card-dash {
            width: 200px;
            height: 300px;
            margin-left: -100px;
            margin-top: -150px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="text-center mb-6">
        <div className={`inline-block p-4 ${isDark ? "bg-[#0a0a0a]/80" : "bg-white/80"} backdrop-blur-xl border border-[#FFD700]/30 rounded-2xl mb-4`}>
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#0a0a0a] border-2 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] mx-auto mb-2 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dxvi5d6dr/image/upload/v1766593144/trrr_hi4sws.png" alt="CryptoMadness" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#FFD700] bg-clip-text text-transparent">
            {centerPlatform.name}
          </h1>
          <p className="text-xs text-[#FFD700] tracking-widest">{centerPlatform.tagline}</p>
          <a
            href={centerPlatform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-sm rounded-full hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all"
          >
            ENTER THE HUB
            <FiLink size={14} />
          </a>
        </div>
        <h2 className="text-xl font-bold text-white mb-1">
          Our <span className="text-[#FFD700]">Ecosystem</span>
        </h2>
        <p className="text-gray-400 text-sm">Four powerful platforms working together</p>
      </div>

      {/* 3D Carousel */}
      <div className="eco-carousel-scene-dash">
        <div ref={carouselRef} className="eco-carousel-ring-dash">
          {platforms.map((platform, index) => {
            const angle = (360 / platforms.length) * index;
            const isHovered = hoveredCard === index;
            const translateZ = isMobile ? 220 : 300;

            return (
              <div
                key={platform.id}
                className={`eco-platform-card-dash ${isHovered ? "hovered" : ""}`}
                style={{
                  "--card-color": platform.color,
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hologram Effects */}
                <div className="eco-holo-shine-dash"></div>
                <div className="eco-holo-scanline-dash"></div>

                {/* Card Content */}
                <div className="relative z-10 p-4 h-full flex flex-col">
                  {/* Logo & Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center" style={{ border: `2px solid ${platform.color}` }}>
                      <Image
                        src={platform.logoPath}
                        alt={platform.name}
                        width={platform.id === "crymadcash" ? 56 : 80}
                        height={platform.id === "crymadcash" ? 56 : 80}
                        className={platform.id === "crymadcash" ? "object-contain w-full h-full" : "object-cover scale-150"}
                      />
                    </div>
                    <span className="px-2 py-1 bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold rounded border border-[#FFD700]/40 flex items-center gap-1">
                      <FiShield size={10} />
                      VERIFIED
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-lg font-bold text-white mb-1">{platform.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">{platform.shortDesc}</p>

                  {/* Metric */}
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-3 text-center mb-3">
                    <span className="block text-xl font-bold" style={{ color: platform.color }}>{platform.metric.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{platform.metric.label}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3 flex-1">
                    {platform.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-300 flex items-center gap-1">
                        <FiZap size={8} style={{ color: platform.color }} />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center text-black font-bold text-sm rounded-lg hover:shadow-lg transition-all"
                    style={{ background: platform.gradient }}
                  >
                    EXPLORE
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Indicators */}
      <div className="flex justify-center gap-3 mt-4 flex-wrap">
        {platforms.map((platform, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
              hoveredCard === index
                ? "bg-[#FFD700]/15 border-[#FFD700]"
                : `${isDark ? "bg-white/5" : "bg-gray-100"} border-white/10 hover:border-[#FFD700]/50`
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: platform.color, boxShadow: `0 0 8px ${platform.color}` }}></span>
            <span className={`text-xs font-medium ${hoveredCard === index ? "text-[#FFD700]" : isDark ? "text-gray-400" : "text-gray-600"}`}>
              {platform.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DashboardContent({ activeTab = "overview", isDark = true }: DashboardContentProps) {
  // Theme-aware colors
  const colors = {
    bg: isDark ? "bg-[#0d0d0d]" : "bg-white",
    bgCard: isDark ? "bg-gradient-to-br from-[#0d0d0d] to-[#111]" : "bg-gradient-to-br from-white to-gray-50",
    bgSecondary: isDark ? "bg-[#111]" : "bg-gray-50",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    textMuted: isDark ? "text-gray-500" : "text-gray-400",
    border: isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/40",
    borderLight: isDark ? "border-[#FFD700]/10" : "border-[#FFD700]/20",
    gradientText: isDark ? "from-white to-gray-400" : "from-gray-900 to-gray-600",
    hoverBg: isDark ? "hover:bg-[#FFD700]/5" : "hover:bg-[#FFD700]/10",
    gold: isDark ? "text-[#FFD700]" : "text-amber-600",
    goldBold: isDark ? "text-[#FFD700]" : "text-amber-700",
  };

  // Use fixed seeds for consistent SSR/client rendering
  const calendarData = useMemo(() => generateCalendarData(67890), []);
  const [selectedDay, setSelectedDay] = useState<{ date: string; pnl: number; trades: number } | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [chartHover, setChartHover] = useState<{ x: number; y: number; day: number; equity: number; pnl: number; percentGain: number } | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Support ticket state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketCategory, setTicketCategory] = useState("general");

  // Challenge type state
  const [challengeType, setChallengeType] = useState<"2-step" | "1-step" | "instant">("2-step");

  // Equity curve data points for smooth interpolation (daily data over 30 days)
  const equityData = useMemo(() => {
    const startBalance = 50000;
    const finalBalance = 53861; // Current balance
    const points = [
      { day: 0, equity: 50000 }, { day: 1, equity: 50200 }, { day: 2, equity: 50450 },
      { day: 3, equity: 50380 }, { day: 4, equity: 50650 }, { day: 5, equity: 50800 },
      { day: 6, equity: 50750 }, { day: 7, equity: 51100 }, { day: 8, equity: 51350 },
      { day: 9, equity: 51200 }, { day: 10, equity: 51500 }, { day: 11, equity: 51750 },
      { day: 12, equity: 51650 }, { day: 13, equity: 51900 }, { day: 14, equity: 52150 },
      { day: 15, equity: 52400 }, { day: 16, equity: 52300 }, { day: 17, equity: 52550 },
      { day: 18, equity: 52800 }, { day: 19, equity: 52700 }, { day: 20, equity: 52950 },
      { day: 21, equity: 53100 }, { day: 22, equity: 53050 }, { day: 23, equity: 53300 },
      { day: 24, equity: 53450 }, { day: 25, equity: 53380 }, { day: 26, equity: 53600 },
      { day: 27, equity: 53750 }, { day: 28, equity: 53780 }, { day: 29, equity: finalBalance },
    ];
    return points.map(p => ({
      ...p,
      pnl: p.equity - startBalance,
      percentGain: ((p.equity - startBalance) / startBalance) * 100,
      y: 60 - ((p.equity - startBalance) / 200) // Scale to SVG coordinates
    }));
  }, []);

  // Throttled mouse tracking for chart performance
  const rafId = useRef<number | null>(null);
  const lastDayIndex = useRef<number>(-1);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Capture values immediately (React synthetic events get nullified after handler)
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentX = relativeX / rect.width;
    const dayIndex = Math.min(Math.max(Math.round(percentX * 29), 0), 29);

    // Only update if day changed (throttle by data point)
    if (dayIndex !== lastDayIndex.current) {
      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        lastDayIndex.current = dayIndex;
        const data = equityData[dayIndex];
        if (data) {
          setChartHover({
            x: percentX * 300,
            y: data.y,
            day: data.day + 1,
            equity: data.equity,
            pnl: data.pnl,
            percentGain: data.percentGain
          });
        }
      });
    }
  }, [equityData]);

  const handleChartMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    lastDayIndex.current = -1;
    setChartHover(null);
  }, []);

  const currentBalance = equityData[equityData.length - 1]?.equity || 50000;
  const totalPnL = currentBalance - 50000;
  const totalTrades = 127;
  const winRate = 68.5;

  // Calculate calendar totals
  const calendarTotals = useMemo(() => {
    const profits = calendarData.filter(d => d.pnl > 0).reduce((sum, d) => sum + d.pnl, 0);
    const losses = Math.abs(calendarData.filter(d => d.pnl < 0).reduce((sum, d) => sum + d.pnl, 0));
    const winDays = calendarData.filter(d => d.pnl > 0).length;
    const lossDays = calendarData.filter(d => d.pnl < 0).length;
    const totalDayTrades = calendarData.reduce((sum, d) => sum + d.trades, 0);
    return { profits, losses, winDays, lossDays, totalDayTrades };
  }, [calendarData]);

  // Render based on active tab
  if (activeTab === "accounts") {
    // Account data
    const accounts = [
      {
        id: "PZ-50K-001",
        size: "$50,000",
        type: "Evaluation",
        status: "active",
        phase: 1,
        balance: 53120,
        startBalance: 50000,
        profit: 3120,
        profitPercent: 6.24,
        profitTarget: 10,
        drawdown: 4.8,
        maxDrawdown: 10,
        dailyLoss: 2.1,
        maxDailyLoss: 5,
        daysActive: 12,
        minTradingDays: 5,
        trades: 47,
        winRate: 68,
        profitFactor: 2.34,
        avgWin: 142.50,
        avgLoss: 68.20,
        riskReward: "1:2.1",
        bestTrade: 485.00,
        worstTrade: -165.00,
        equity: [50000, 50200, 50650, 50400, 51200, 51800, 52100, 51900, 52400, 52800, 53120, 53120],
        recentTrades: [
          { pair: "EUR/USD", result: 145.00, time: "2h ago" },
          { pair: "GBP/JPY", result: -68.00, time: "4h ago" },
          { pair: "XAU/USD", result: 212.00, time: "6h ago" },
        ]
      },
      {
        id: "PZ-100K-002",
        size: "$100,000",
        type: "Funded",
        status: "funded",
        phase: 0,
        balance: 108450,
        startBalance: 100000,
        profit: 8450,
        profitPercent: 8.45,
        profitTarget: 0,
        drawdown: 3.2,
        maxDrawdown: 10,
        dailyLoss: 1.5,
        maxDailyLoss: 5,
        daysActive: 34,
        minTradingDays: 0,
        trades: 156,
        winRate: 72,
        profitFactor: 2.89,
        avgWin: 198.50,
        avgLoss: 72.30,
        riskReward: "1:2.7",
        bestTrade: 1250.00,
        worstTrade: -320.00,
        equity: [100000, 101200, 102800, 103400, 102900, 104500, 105200, 106800, 107400, 107100, 108000, 108450],
        recentTrades: [
          { pair: "NAS100", result: 420.00, time: "1h ago" },
          { pair: "EUR/GBP", result: 85.00, time: "3h ago" },
          { pair: "USD/JPY", result: -42.00, time: "5h ago" },
        ]
      },
      {
        id: "PZ-25K-003",
        size: "$25,000",
        type: "Evaluation",
        status: "phase2",
        phase: 2,
        balance: 26250,
        startBalance: 25000,
        profit: 1250,
        profitPercent: 5.0,
        profitTarget: 5,
        drawdown: 2.8,
        maxDrawdown: 10,
        dailyLoss: 0.8,
        maxDailyLoss: 5,
        daysActive: 8,
        minTradingDays: 5,
        trades: 28,
        winRate: 64,
        profitFactor: 1.95,
        avgWin: 82.50,
        avgLoss: 45.20,
        riskReward: "1:1.8",
        bestTrade: 210.00,
        worstTrade: -95.00,
        equity: [25000, 25100, 25350, 25500, 25400, 25700, 25900, 26100, 26250],
        recentTrades: [
          { pair: "GBP/USD", result: 95.00, time: "30m ago" },
          { pair: "EUR/JPY", result: 62.00, time: "2h ago" },
          { pair: "XAU/USD", result: -45.00, time: "4h ago" },
        ]
      },
    ];

    const getStatusBadge = (status: string, phase: number) => {
      switch (status) {
        case "active":
          return { text: `PHASE ${phase}`, bg: "bg-blue-500/20", text_color: "text-blue-400", border: "border-blue-500/30" };
        case "funded":
          return { text: "FUNDED", bg: "bg-green-500/20", text_color: "text-green-400", border: "border-green-500/30" };
        case "phase2":
          return { text: "PHASE 2", bg: "bg-purple-500/20", text_color: "text-purple-400", border: "border-purple-500/30" };
        case "failed":
          return { text: "FAILED", bg: "bg-red-500/20", text_color: "text-red-400", border: "border-red-500/30" };
        default:
          return { text: "PENDING", bg: "bg-gray-500/20", text_color: "text-gray-400", border: "border-gray-500/30" };
      }
    };

    // Summary calculations
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalProfit = accounts.reduce((sum, acc) => sum + acc.profit, 0);
    const avgWinRate = Math.round(accounts.reduce((sum, acc) => sum + acc.winRate, 0) / accounts.length);
    const totalTrades = accounts.reduce((sum, acc) => sum + acc.trades, 0);

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Portfolio Summary */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
              <FiTrendingUp className="text-black" size={20} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Portfolio Overview</h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>All your trading accounts at a glance</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Accounts */}
            <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 flex items-center justify-center">
                  <FiBarChart2 className="text-[#FFD700]" size={16} />
                </div>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Accounts</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{accounts.length}</p>
              <p className="text-xs text-green-500 mt-1">+1 funded</p>
            </div>

            {/* Total Balance */}
            <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <FiDollarSign className="text-green-500" size={16} />
                </div>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Total Balance</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>${totalBalance.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+${totalProfit.toLocaleString()} profit</p>
            </div>

            {/* Average Win Rate */}
            <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FiTarget className="text-blue-500" size={16} />
                </div>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Avg Win Rate</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{avgWinRate}%</p>
              <p className="text-xs text-blue-400 mt-1">Across all accounts</p>
            </div>

            {/* Total Trades */}
            <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <FiActivity className="text-purple-500" size={16} />
                </div>
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Total Trades</span>
              </div>
              <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{totalTrades}</p>
              <p className="text-xs text-purple-400 mt-1">This month</p>
            </div>
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {accounts.map((account) => {
            const statusBadge = getStatusBadge(account.status, account.phase);
            const profitProgress = account.profitTarget > 0 ? (account.profitPercent / account.profitTarget) * 100 : 100;
            const drawdownProgress = (account.drawdown / account.maxDrawdown) * 100;

            // Generate sparkline path
            const maxEquity = Math.max(...account.equity);
            const minEquity = Math.min(...account.equity);
            const equityRange = maxEquity - minEquity || 1;
            const sparklinePath = account.equity.map((val, i) => {
              const x = (i / (account.equity.length - 1)) * 100;
              const y = 100 - ((val - minEquity) / equityRange) * 100;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ');

            return (
              <div
                key={account.id}
                className={`${isDark ? "bg-[#0a0a0a]/80" : "bg-white"} backdrop-blur-xl rounded-2xl border ${account.status === 'funded' ? 'border-green-500/30' : isDark ? 'border-[#FFD700]/20' : 'border-[#FFD700]/30'} overflow-hidden hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all duration-300 group`}
              >
                {/* Account Header */}
                <div className={`p-5 border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-100"}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${statusBadge.bg} ${statusBadge.text_color} border ${statusBadge.border}`}>
                          {statusBadge.text}
                        </span>
                        {account.status === 'funded' && (
                          <span className="text-xs text-green-400 animate-pulse">● Live</span>
                        )}
                      </div>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} font-mono`}>{account.id}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{account.size}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{account.type}</p>
                    </div>
                  </div>

                  {/* Mini Equity Curve */}
                  <div className={`h-12 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-lg p-2 overflow-hidden`}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                      <defs>
                        <linearGradient id={`gradient-${account.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={account.profit >= 0 ? "#22c55e" : "#ef4444"} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={account.profit >= 0 ? "#22c55e" : "#ef4444"} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`${sparklinePath} L 100 100 L 0 100 Z`}
                        fill={`url(#gradient-${account.id})`}
                      />
                      <path
                        d={sparklinePath}
                        fill="none"
                        stroke={account.profit >= 0 ? "#22c55e" : "#ef4444"}
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </div>

                {/* Balance & Profit */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>Current Balance</p>
                      <p className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>${account.balance.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>P&L</p>
                      <p className={`text-xl font-bold ${account.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {account.profit >= 0 ? "+" : ""}{account.profitPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  {account.profitTarget > 0 && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>Profit Target</span>
                        <span className="text-[#FFD700]">{account.profitPercent.toFixed(2)}% / {account.profitTarget}%</span>
                      </div>
                      <div className={`h-2 ${isDark ? "bg-[#111]" : "bg-gray-100"} rounded-full overflow-hidden`}>
                        <div
                          className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(profitProgress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>Drawdown Used</span>
                      <span className={account.drawdown > 7 ? "text-red-400" : account.drawdown > 5 ? "text-orange-400" : "text-green-400"}>
                        {account.drawdown}% / {account.maxDrawdown}%
                      </span>
                    </div>
                    <div className={`h-2 ${isDark ? "bg-[#111]" : "bg-gray-100"} rounded-full overflow-hidden`}>
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          account.drawdown > 7 ? "bg-red-500" : account.drawdown > 5 ? "bg-orange-500" : "bg-green-500"
                        }`}
                        style={{ width: `${drawdownProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-3 text-center`}>
                      <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{account.winRate}%</p>
                      <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"} uppercase`}>Win Rate</p>
                    </div>
                    <div className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-3 text-center`}>
                      <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{account.profitFactor}</p>
                      <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"} uppercase`}>Profit Factor</p>
                    </div>
                    <div className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-3 text-center`}>
                      <p className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{account.trades}</p>
                      <p className={`text-[10px] ${isDark ? "text-gray-500" : "text-gray-400"} uppercase`}>Trades</p>
                    </div>
                  </div>

                  {/* Detailed Stats Expandable */}
                  <div className={`${isDark ? "bg-[#111]/50" : "bg-gray-50"} rounded-xl p-4 space-y-3`}>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Avg Win</span>
                        <span className="text-green-500 font-medium">${account.avgWin.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Avg Loss</span>
                        <span className="text-red-400 font-medium">-${account.avgLoss.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Best Trade</span>
                        <span className="text-green-500 font-medium">+${account.bestTrade.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Worst Trade</span>
                        <span className="text-red-400 font-medium">${account.worstTrade.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>R:R Ratio</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{account.riskReward}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Days Active</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{account.daysActive}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Trades */}
                  <div>
                    <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider mb-2`}>Recent Trades</p>
                    <div className="space-y-2">
                      {account.recentTrades.map((trade, i) => (
                        <div key={i} className={`flex items-center justify-between ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-lg px-3 py-2`}>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${trade.result >= 0 ? "bg-green-500" : "bg-red-500"}`} />
                            <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{trade.pair}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-semibold ${trade.result >= 0 ? "text-green-500" : "text-red-400"}`}>
                              {trade.result >= 0 ? "+" : ""}{trade.result.toFixed(2)}
                            </span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>{trade.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300 text-sm">
                      View Details
                    </button>
                    <button className={`px-4 py-2.5 ${isDark ? "bg-[#111] border-[#1a1a1a] text-white hover:bg-[#1a1a1a]" : "bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200"} border rounded-xl transition-colors`}>
                      <FiMoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Account Card */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border-2 border-dashed ${isDark ? "border-[#1a1a1a] hover:border-[#FFD700]/50" : "border-gray-200 hover:border-[#FFD700]"} p-6 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-300 group hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]`}>
            <div className={`w-20 h-20 rounded-2xl ${isDark ? "bg-[#111]" : "bg-gray-100"} flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/10 transition-colors`}>
              <FiPlus className={`${isDark ? "text-gray-500" : "text-gray-400"} group-hover:text-[#FFD700] transition-colors`} size={32} />
            </div>
            <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>Start New Challenge</p>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"} text-center mb-4`}>Choose from $5K to $200K account sizes</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["$5K", "$10K", "$25K", "$50K", "$100K", "$200K"].map((size) => (
                <span key={size} className={`text-xs px-3 py-1 rounded-full ${isDark ? "bg-[#111] text-gray-400" : "bg-gray-100 text-gray-500"} group-hover:bg-[#FFD700]/10 group-hover:text-[#FFD700] transition-colors`}>
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Account Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${isDark ? "border-[#1a1a1a]" : "border-gray-200"} border-b`}>
                  <th className={`text-left py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Account</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Balance</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>P&L</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Win Rate</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Profit Factor</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Drawdown</th>
                  <th className={`text-right py-3 ${isDark ? "text-gray-500" : "text-gray-400"} font-medium`}>Trades</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => {
                  const statusBadge = getStatusBadge(account.status, account.phase);
                  return (
                    <tr key={account.id} className={`${isDark ? "border-[#1a1a1a] hover:bg-[#111]/50" : "border-gray-100 hover:bg-gray-50"} border-b transition-colors`}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${statusBadge.bg} ${statusBadge.text_color}`}>
                            {statusBadge.text}
                          </span>
                          <div>
                            <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{account.size}</p>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} font-mono`}>{account.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`text-right py-4 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${account.balance.toLocaleString()}</td>
                      <td className={`text-right py-4 font-semibold ${account.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {account.profit >= 0 ? "+" : ""}{account.profitPercent.toFixed(2)}%
                      </td>
                      <td className={`text-right py-4 ${isDark ? "text-white" : "text-gray-900"}`}>{account.winRate}%</td>
                      <td className={`text-right py-4 ${isDark ? "text-white" : "text-gray-900"}`}>{account.profitFactor}</td>
                      <td className={`text-right py-4 ${account.drawdown > 7 ? "text-red-400" : account.drawdown > 5 ? "text-orange-400" : "text-green-400"}`}>
                        {account.drawdown}%
                      </td>
                      <td className={`text-right py-4 ${isDark ? "text-white" : "text-gray-900"}`}>{account.trades}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "challenges") {
    // Challenge data for different types
    const challengesByType = {
      "2-step": [
        { size: "$5,000", price: 49, originalPrice: 79, popular: false, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 80, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 32, type: "2-step" as const },
        { size: "$10,000", price: 89, originalPrice: 129, popular: false, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 80, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 35, type: "2-step" as const },
        { size: "$25,000", price: 189, originalPrice: 279, popular: false, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 80, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 38, type: "2-step" as const },
        { size: "$50,000", price: 299, originalPrice: 449, popular: true, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 85, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 25, passRate: 41, type: "2-step" as const },
        { size: "$100,000", price: 499, originalPrice: 749, popular: true, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 85, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 25, passRate: 44, type: "2-step" as const },
        { size: "$200,000", price: 899, originalPrice: 1299, popular: false, phase1Target: 8, phase2Target: 5, maxDrawdown: 10, dailyLoss: 5, minDays: 5, maxDays: "Unlimited", leverage: "1:100", profitSplit: 90, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 30, passRate: 47, type: "2-step" as const },
      ],
      "1-step": [
        { size: "$5,000", price: 59, originalPrice: 99, popular: false, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 75, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 15, passRate: 28, type: "1-step" as const },
        { size: "$10,000", price: 109, originalPrice: 159, popular: false, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 75, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 15, passRate: 31, type: "1-step" as const },
        { size: "$25,000", price: 229, originalPrice: 329, popular: false, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 75, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 15, passRate: 34, type: "1-step" as const },
        { size: "$50,000", price: 359, originalPrice: 529, popular: true, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 80, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 37, type: "1-step" as const },
        { size: "$100,000", price: 599, originalPrice: 899, popular: true, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 80, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 40, type: "1-step" as const },
        { size: "$200,000", price: 1099, originalPrice: 1599, popular: false, phase1Target: 10, phase2Target: 0, maxDrawdown: 8, dailyLoss: 4, minDays: 3, maxDays: "Unlimited", leverage: "1:100", profitSplit: 85, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 25, passRate: 43, type: "1-step" as const },
      ],
      "instant": [
        { size: "$2,500", price: 149, originalPrice: 199, popular: false, phase1Target: 0, phase2Target: 0, maxDrawdown: 6, dailyLoss: 3, minDays: 0, maxDays: "Unlimited", leverage: "1:50", profitSplit: 60, scaling: true, newsTrading: false, weekendHolding: true, eaAllowed: true, resetDiscount: 10, passRate: 100, type: "instant" as const },
        { size: "$5,000", price: 279, originalPrice: 399, popular: false, phase1Target: 0, phase2Target: 0, maxDrawdown: 6, dailyLoss: 3, minDays: 0, maxDays: "Unlimited", leverage: "1:50", profitSplit: 60, scaling: true, newsTrading: false, weekendHolding: true, eaAllowed: true, resetDiscount: 10, passRate: 100, type: "instant" as const },
        { size: "$10,000", price: 499, originalPrice: 699, popular: true, phase1Target: 0, phase2Target: 0, maxDrawdown: 6, dailyLoss: 3, minDays: 0, maxDays: "Unlimited", leverage: "1:50", profitSplit: 65, scaling: true, newsTrading: false, weekendHolding: true, eaAllowed: true, resetDiscount: 15, passRate: 100, type: "instant" as const },
        { size: "$25,000", price: 999, originalPrice: 1499, popular: true, phase1Target: 0, phase2Target: 0, maxDrawdown: 6, dailyLoss: 3, minDays: 0, maxDays: "Unlimited", leverage: "1:50", profitSplit: 70, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 15, passRate: 100, type: "instant" as const },
        { size: "$50,000", price: 1799, originalPrice: 2499, popular: false, phase1Target: 0, phase2Target: 0, maxDrawdown: 6, dailyLoss: 3, minDays: 0, maxDays: "Unlimited", leverage: "1:50", profitSplit: 75, scaling: true, newsTrading: true, weekendHolding: true, eaAllowed: true, resetDiscount: 20, passRate: 100, type: "instant" as const },
      ],
    };

    const challenges = challengesByType[challengeType];
    const challengeTypeLabel = challengeType === "2-step" ? "2-Phase Challenge" : challengeType === "1-step" ? "1-Phase Challenge" : "Instant Funded";

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header Section */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                <FiAward className="text-black" size={28} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Trading Challenges</h2>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prove your skills and get funded up to $200,000</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 ${isDark ? "bg-green-500/10" : "bg-green-50"} rounded-xl border ${isDark ? "border-green-500/20" : "border-green-200"}`}>
                <FiCheckCircle className="text-green-500" size={16} />
                <span className={`text-sm ${isDark ? "text-green-400" : "text-green-600"}`}>Instant Payouts</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 ${isDark ? "bg-blue-500/10" : "bg-blue-50"} rounded-xl border ${isDark ? "border-blue-500/20" : "border-blue-200"}`}>
                <FiZap className="text-blue-500" size={16} />
                <span className={`text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}>Up to 90% Profit Split</span>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Type Selector */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white"} backdrop-blur-xl rounded-xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-3 sm:p-4`}>
          <h3 className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}>Select Challenge Type</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { id: "2-step" as const, label: "2-Step", desc: "Best for beginners", Icon: FiLayers, color: "from-blue-500 to-cyan-500" },
              { id: "1-step" as const, label: "1-Step", desc: "Faster funding", Icon: FiTarget, color: "from-purple-500 to-pink-500" },
              { id: "instant" as const, label: "Instant", desc: "No evaluation", Icon: FiZap, color: "from-[#FFD700] to-[#FFA500]" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setChallengeType(type.id)}
                className={`relative p-2 sm:p-3 rounded-lg border transition-all duration-300 overflow-hidden group ${
                  challengeType === type.id
                    ? `border-[#FFD700] bg-gradient-to-br ${isDark ? "from-[#FFD700]/15 to-[#FFA500]/5" : "from-[#FFD700]/20 to-[#FFA500]/5"} shadow-[0_0_20px_rgba(255,215,0,0.15)]`
                    : `${isDark ? "border-[#1a1a1a] hover:border-[#FFD700]/50 bg-[#0d0d0d]" : "border-gray-200 hover:border-[#FFD700]/50 bg-gray-50"}`
                }`}
              >
                {challengeType === type.id && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <FiCheckCircle className="text-black" size={10} />
                  </div>
                )}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-1.5 flex items-center justify-center mx-auto ${challengeType === type.id ? "bg-[#FFD700]/20 border border-[#FFD700]/30" : isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"}`}>
                  <type.Icon className={challengeType === type.id ? "text-[#FFD700]" : isDark ? "text-gray-400" : "text-gray-600"} size={16} />
                </div>
                <p className={`text-xs sm:text-sm font-semibold ${challengeType === type.id ? "text-[#FFD700]" : isDark ? "text-white" : "text-gray-900"}`}>{type.label}</p>
                <p className={`text-[9px] sm:text-[10px] ${isDark ? "text-gray-500" : "text-gray-500"} mt-0.5 hidden sm:block`}>{type.desc}</p>
                {challengeType === type.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white"} backdrop-blur-xl rounded-xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-3 sm:p-4`}>
          <h3 className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-3`}>How It Works</h3>
          <div className={`grid grid-cols-2 ${challengeType === "instant" ? "md:grid-cols-3" : "md:grid-cols-4"} gap-2 sm:gap-3`}>
            {(challengeType === "2-step" ? [
              { step: 1, title: "Choose Challenge", desc: "Select your account size", icon: FiTarget },
              { step: 2, title: "Pass Phase 1", desc: "Hit 8% profit target", icon: FiTrendingUp },
              { step: 3, title: "Pass Phase 2", desc: "Hit 5% profit target", icon: FiCheckCircle },
              { step: 4, title: "Get Funded", desc: "Trade with real capital", icon: FiDollarSign },
            ] : challengeType === "1-step" ? [
              { step: 1, title: "Choose Challenge", desc: "Select your account size", icon: FiTarget },
              { step: 2, title: "Pass Evaluation", desc: "Hit 10% profit target", icon: FiTrendingUp },
              { step: 3, title: "Get Verified", desc: "Complete KYC process", icon: FiCheckCircle },
              { step: 4, title: "Get Funded", desc: "Trade with real capital", icon: FiDollarSign },
            ] : [
              { step: 1, title: "Choose Account", desc: "Select your account size", icon: FiTarget },
              { step: 2, title: "Complete Payment", desc: "One-time fee, no phases", icon: FiCreditCard },
              { step: 3, title: "Start Trading", desc: "Instantly access your account", icon: FiDollarSign },
            ]).map((item, i, arr) => (
              <div key={i} className="relative">
                <div className={`${isDark ? "bg-[#0d0d0d]" : "bg-gray-50"} rounded-lg p-2.5 sm:p-3 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center mx-auto mb-2 border border-[#FFD700]/30">
                    <item.icon className="text-[#FFD700]" size={16} />
                  </div>
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#FFD700] text-black text-[10px] font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-0.5`}>{item.title}</p>
                  <p className={`text-[10px] sm:text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>{item.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-1.5 transform -translate-y-1/2 text-[#FFD700]/30">
                    <FiChevronDown className="rotate-[-90deg]" size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Cards with Flip Effect */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <div
              key={i}
              className="group h-[520px] sm:h-[580px] lg:h-[640px]"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Face */}
                <div
                  className={`absolute inset-0 backdrop-blur-xl rounded-2xl border-2 overflow-hidden group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ${
                    challenge.popular
                      ? `border-[#FFD700] ${isDark ? "bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#FFD700]/10" : "bg-gradient-to-br from-white via-gray-50 to-[#FFD700]/10"} shadow-[0_0_40px_rgba(255,215,0,0.25)]`
                      : `border-[#FFD700]/30 ${isDark ? "bg-gradient-to-br from-[#0a0a0a] to-[#111]" : "bg-white"} hover:border-[#FFD700]/60 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]`
                  }`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Header */}
                  <div className={`p-3 sm:p-5 border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-100"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{challenge.size}</p>
                        <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{challengeTypeLabel}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"} line-through`}>${challenge.originalPrice}</span>
                          <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>${challenge.price}</span>
                        </div>
                        <span className="text-xs text-green-500 font-medium">Save {Math.round((1 - challenge.price / challenge.originalPrice) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Phase Breakdown */}
                  <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                    {/* Instant Funded Badge */}
                    {challengeType === "instant" && (
                      <div className={`bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 rounded-xl p-4 border border-[#FFD700]/30`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                            <FiZap className="text-black" size={20} />
                          </div>
                          <div>
                            <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Instant Funded Account</p>
                            <p className="text-xs text-[#FFD700]">No evaluation required</p>
                          </div>
                        </div>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Start trading immediately with real capital. No profit targets to hit before getting funded.</p>
                      </div>
                    )}

                    {/* Phase 1 - Show for 2-step and 1-step */}
                    {challengeType !== "instant" && (
                      <div className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-3 sm:p-4`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${challengeType === "1-step" ? "bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"}`}>
                            {challengeType === "1-step" ? "EVALUATION" : "PHASE 1"}
                          </span>
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{challengeType === "1-step" ? "One-Time" : "Evaluation"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>Profit Target</p>
                            <p className={`${colors.goldBold} font-bold`}>{challenge.phase1Target}%</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>Min Trading Days</p>
                            <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold`}>{challenge.minDays}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Phase 2 - Only show for 2-step */}
                    {challengeType === "2-step" && (
                      <div className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-3 sm:p-4`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30`}>
                            PHASE 2
                          </span>
                          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Verification</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>Profit Target</p>
                            <p className={`${colors.goldBold} font-bold`}>{challenge.phase2Target}%</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>Min Trading Days</p>
                            <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold`}>{challenge.minDays}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rules Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Max Drawdown</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{challenge.maxDrawdown}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Daily Loss</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{challenge.dailyLoss}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Leverage</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{challenge.leverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Time Limit</span>
                        <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>{challenge.maxDays}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className={`${isDark ? "bg-[#111]/50" : "bg-gray-50"} rounded-xl p-3 sm:p-4`}>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider mb-3`}>Features</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "News Trading", enabled: challenge.newsTrading },
                          { label: "Weekend Holding", enabled: challenge.weekendHolding },
                          { label: "EA/Bots Allowed", enabled: challenge.eaAllowed },
                          { label: "Scaling Plan", enabled: challenge.scaling },
                        ].map((feature, j) => (
                          <div key={j} className="flex items-center gap-2">
                            {feature.enabled ? (
                              <FiCheckCircle className="text-green-500" size={14} />
                            ) : (
                              <FiXCircle className="text-red-400" size={14} />
                            )}
                            <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="flex items-center justify-center pt-2">
                      <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"} flex items-center gap-2`}>
                        <FiRefreshCw size={12} />
                        Hover to see more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" : "bg-white"} backdrop-blur-xl rounded-2xl border ${
                    challenge.popular
                      ? `border-[#FFD700]/50 shadow-[0_0_30px_rgba(255,215,0,0.15)]`
                      : isDark ? "border-[#1a1a1a]" : "border-gray-200"
                  } overflow-hidden group-hover:[transform:rotateY(0deg)] [transform:rotateY(-180deg)] transition-transform duration-700 flex flex-col`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Back Header */}
                  <div className="p-6 text-center border-b border-[#FFD700]/20">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] mb-4">
                      <FiAward className="text-black" size={32} />
                    </div>
                    <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{challenge.size}</p>
                    <p className={`text-lg font-semibold text-[#FFD700] mt-1`}>Account Challenge</p>
                  </div>

                  {/* Back Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    {/* Key Benefits */}
                    <div className="space-y-4">
                      <p className={`text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>What You Get</p>
                      <div className="space-y-3">
                        {[
                          { icon: FiDollarSign, text: `Up to ${challenge.profitSplit}% Profit Split` },
                          { icon: FiTrendingUp, text: "Scale up to $2,000,000" },
                          { icon: FiZap, text: "24-Hour Payouts" },
                          { icon: FiShield, text: "No Hidden Fees" },
                          { icon: FiUsers, text: "24/7 Support" },
                        ].map((benefit, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${isDark ? "bg-[#FFD700]/10 border-[#FFD700]/20" : "bg-amber-50 border-amber-200"} flex items-center justify-center border`}>
                              <benefit.icon className="text-[#FFD700]" size={14} />
                            </div>
                            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="space-y-4 mt-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className={`text-lg ${isDark ? "text-gray-500" : "text-gray-400"} line-through`}>${challenge.originalPrice}</span>
                          <span className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>${challenge.price}</span>
                        </div>
                        <span className="text-sm text-green-500 font-medium">Save {Math.round((1 - challenge.price / challenge.originalPrice) * 100)}% Today</span>
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]">
                        <span>Start Challenge Now</span>
                        <FiArrowUp className="rotate-45" size={20} />
                      </button>

                      {/* Reset Discount */}
                      <p className={`text-center text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <FiRefreshCw className="inline mr-1" size={12} />
                        {challenge.resetDiscount}% discount on reset
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Why Choose Pipzen?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FiZap, title: "Fast Payouts", desc: "Get paid within 24 hours of requesting withdrawal" },
              { icon: FiShield, title: "No Hidden Fees", desc: "One-time fee, no monthly charges or commissions" },
              { icon: FiTrendingUp, title: "Scale to $2M", desc: "Grow your account with our scaling program" },
              { icon: FiUsers, title: "24/7 Support", desc: "Dedicated support team ready to help anytime" },
            ].map((benefit, i) => (
              <div key={i} className={`${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                <div className={`w-10 h-10 rounded-xl ${isDark ? "bg-[#FFD700]/10 border-[#FFD700]/20" : "bg-amber-50 border-amber-200"} flex items-center justify-center mb-3 border`}>
                  <benefit.icon className={colors.gold} size={18} />
                </div>
                <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>{benefit.title}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className={`${isDark ? "bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/5" : "bg-gradient-to-r from-amber-50 to-orange-50"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-amber-300"} p-6 flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${isDark ? "bg-[#FFD700]/20" : "bg-amber-100"} flex items-center justify-center`}>
              <FiHelpCircle className={colors.goldBold} size={24} />
            </div>
            <div>
              <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Have questions?</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Check our FAQ or contact support for help</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className={`px-5 py-2.5 ${isDark ? "bg-[#111] text-white border-[#1a1a1a]" : "bg-white text-gray-900 border-gray-200"} border rounded-xl font-medium hover:border-[#FFD700]/50 transition-colors`}>
              View FAQ
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-xl font-medium hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "competitions") {
    return (
      <div className="p-6 space-y-6">
        <div className={`${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-2xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} p-6`}>
          <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Active Competitions</h3>
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full ${isDark ? "bg-[#111]" : "bg-gray-100"} flex items-center justify-center mx-auto mb-4`}>
              <FiTrendingUp className={colors.goldBold} size={28} />
            </div>
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>No active competitions</p>
            <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>Check back soon for upcoming trading competitions</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "leaderboard") {
    // Leaderboard data
    const topTraders = [
      { rank: 1, name: "CryptoWolf", country: "🇺🇸", avatar: "CW", profit: 28450, returnPct: 28.45, winRate: 78, trades: 156, accountSize: "$100K", streak: 12, badge: "Diamond" },
      { rank: 2, name: "ForexKing", country: "🇬🇧", avatar: "FK", profit: 22180, returnPct: 22.18, winRate: 74, trades: 203, accountSize: "$100K", streak: 8, badge: "Platinum" },
      { rank: 3, name: "GoldMaster", country: "🇩🇪", avatar: "GM", profit: 19650, returnPct: 19.65, winRate: 71, trades: 178, accountSize: "$100K", streak: 6, badge: "Platinum" },
      { rank: 4, name: "ScalpNinja", country: "🇯🇵", avatar: "SN", profit: 16890, returnPct: 16.89, winRate: 82, trades: 412, accountSize: "$100K", streak: 15, badge: "Gold" },
      { rank: 5, name: "SwingTrader", country: "🇦🇺", avatar: "ST", profit: 14520, returnPct: 14.52, winRate: 68, trades: 89, accountSize: "$100K", streak: 4, badge: "Gold" },
      { rank: 6, name: "PipHunter", country: "🇨🇦", avatar: "PH", profit: 12340, returnPct: 12.34, winRate: 65, trades: 267, accountSize: "$100K", streak: 3, badge: "Silver" },
      { rank: 7, name: "TrendRider", country: "🇫🇷", avatar: "TR", profit: 11280, returnPct: 11.28, winRate: 63, trades: 145, accountSize: "$100K", streak: 5, badge: "Silver" },
      { rank: 8, name: "AlphaTrader", country: "🇸🇬", avatar: "AT", profit: 9870, returnPct: 9.87, winRate: 61, trades: 198, accountSize: "$100K", streak: 2, badge: "Silver" },
      { rank: 9, name: "MarketMaven", country: "🇳🇱", avatar: "MM", profit: 8650, returnPct: 8.65, winRate: 59, trades: 134, accountSize: "$100K", streak: 4, badge: "Bronze" },
      { rank: 10, name: "ChartMaster", country: "🇨🇭", avatar: "CM", profit: 7420, returnPct: 7.42, winRate: 57, trades: 112, accountSize: "$100K", streak: 1, badge: "Bronze" },
    ];

    const yourPosition = { rank: 47, name: "You", profit: 3120, returnPct: 6.24, winRate: 68, trades: 47 };

    const getBadgeColor = (badge: string) => {
      switch (badge) {
        case "Diamond": return { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" };
        case "Platinum": return { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" };
        case "Gold": return { bg: "bg-[#FFD700]/20", text: "text-[#FFD700]", border: "border-[#FFD700]/30" };
        case "Silver": return { bg: "bg-gray-400/20", text: "text-gray-300", border: "border-gray-400/30" };
        default: return { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" };
      }
    };

    const getRankStyle = (rank: number) => {
      if (rank === 1) return { bg: "from-[#FFD700] to-[#FFA500]", shadow: "shadow-[0_0_30px_rgba(255,215,0,0.4)]", size: "w-20 h-20" };
      if (rank === 2) return { bg: "from-gray-300 to-gray-400", shadow: "shadow-[0_0_20px_rgba(192,192,192,0.3)]", size: "w-16 h-16" };
      if (rank === 3) return { bg: "from-orange-400 to-orange-600", shadow: "shadow-[0_0_20px_rgba(205,127,50,0.3)]", size: "w-14 h-14" };
      return { bg: "from-gray-600 to-gray-700", shadow: "", size: "w-10 h-10" };
    };

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                <FiAward className="text-black" size={28} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Global Leaderboard</h2>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Top performers across all funded accounts</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Daily", "Weekly", "Monthly", "All Time"].map((period, i) => (
                <button
                  key={period}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    i === 2
                      ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                      : isDark ? "bg-[#111] text-gray-400 hover:text-white border border-[#1a1a1a]" : "bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prize Pool Banner */}
        <div className={`relative overflow-hidden ${isDark ? "bg-gradient-to-r from-[#FFD700]/10 via-[#0a0a0a] to-[#FFA500]/10" : "bg-gradient-to-r from-[#FFD700]/20 via-white to-[#FFA500]/20"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Monthly Prize Pool</p>
              <p className={`text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent`}>$25,000</p>
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`}>Top 10 traders share the rewards</p>
            </div>
            <div className="flex gap-4">
              <div className={`${isDark ? "bg-[#111]/80" : "bg-white/80"} backdrop-blur-sm rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>1,247</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Active Traders</p>
              </div>
              <div className={`${isDark ? "bg-[#111]/80" : "bg-white/80"} backdrop-blur-sm rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>18 days</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Until Reset</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 pb-8`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-8 text-center`}>Top Performers</h3>
          <div className="flex items-end justify-center gap-4 md:gap-8 pt-6">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className={`${getRankStyle(2).size} rounded-2xl bg-gradient-to-br ${getRankStyle(2).bg} flex items-center justify-center ${getRankStyle(2).shadow} mb-3`}>
                <span className="text-black font-bold text-lg">{topTraders[1].avatar}</span>
              </div>
              <span className="text-2xl mb-1">{topTraders[1].country}</span>
              <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{topTraders[1].name}</p>
              <p className="text-green-500 font-bold">+${topTraders[1].profit.toLocaleString()}</p>
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>+{topTraders[1].returnPct}%</p>
              <div className={`mt-3 h-24 w-20 ${isDark ? "bg-gray-400/20" : "bg-gray-200"} rounded-t-xl flex items-center justify-center`}>
                <span className="text-3xl font-bold text-gray-400">2</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <svg className={`w-10 h-10 ${isDark ? "text-[#FFD700]" : "text-amber-500"}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                  </svg>
                </div>
                <div className={`${getRankStyle(1).size} rounded-2xl bg-gradient-to-br ${getRankStyle(1).bg} flex items-center justify-center ${getRankStyle(1).shadow} mb-3`}>
                  <span className="text-black font-bold text-2xl">{topTraders[0].avatar}</span>
                </div>
              </div>
              <span className="text-3xl mb-1">{topTraders[0].country}</span>
              <p className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>{topTraders[0].name}</p>
              <p className="text-green-500 font-bold text-xl">+${topTraders[0].profit.toLocaleString()}</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>+{topTraders[0].returnPct}%</p>
              <div className={`mt-3 h-32 w-24 ${isDark ? "bg-gradient-to-b from-[#FFD700]/30 to-[#FFD700]/10 border-[#FFD700]/30" : "bg-gradient-to-b from-amber-200 to-amber-50 border-amber-300"} rounded-t-xl flex items-center justify-center border-t border-x`}>
                <span className={`text-4xl font-bold ${colors.goldBold}`}>1</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className={`${getRankStyle(3).size} rounded-2xl bg-gradient-to-br ${getRankStyle(3).bg} flex items-center justify-center ${getRankStyle(3).shadow} mb-3`}>
                <span className="text-black font-bold">{topTraders[2].avatar}</span>
              </div>
              <span className="text-2xl mb-1">{topTraders[2].country}</span>
              <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{topTraders[2].name}</p>
              <p className="text-green-500 font-bold">+${topTraders[2].profit.toLocaleString()}</p>
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>+{topTraders[2].returnPct}%</p>
              <div className={`mt-3 h-16 w-20 bg-orange-500/20 rounded-t-xl flex items-center justify-center border-t border-x border-orange-500/30`}>
                <span className="text-3xl font-bold text-orange-400">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Your Position */}
        <div className={`${isDark ? "bg-gradient-to-r from-[#FFD700]/5 to-transparent" : "bg-gradient-to-r from-[#FFD700]/10 to-transparent"} rounded-2xl border ${isDark ? "border-[#FFD700]/30" : "border-[#FFD700]/40"} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <FiUser className="text-black" size={20} />
              </div>
              <div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Your Position</p>
                <p className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>#{yourPosition.rank} of 1,247</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-green-500 font-bold text-lg">+${yourPosition.profit.toLocaleString()}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Profit</p>
              </div>
              <div className="text-center">
                <p className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>{yourPosition.returnPct}%</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Return</p>
              </div>
              <div className="text-center">
                <p className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>{yourPosition.winRate}%</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Win Rate</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all">
              View Stats
            </button>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} overflow-hidden`}>
          <div className={`p-4 border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} flex items-center justify-between`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Full Rankings</h3>
            <div className="flex gap-2">
              <select className={`${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-lg px-3 py-1.5 text-sm`}>
                <option>All Account Sizes</option>
                <option>$50K+</option>
                <option>$100K+</option>
                <option>$200K</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${isDark ? "bg-[#111]" : "bg-gray-50"}`}>
                  <th className={`text-left py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Rank</th>
                  <th className={`text-left py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Trader</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider`}>Profit</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider hidden md:table-cell`}>Return</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider hidden lg:table-cell`}>Win Rate</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider hidden lg:table-cell`}>Trades</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider hidden xl:table-cell`}>Streak</th>
                  <th className={`text-right py-3 px-4 text-xs font-semibold ${isDark ? "text-gray-500" : "text-gray-400"} uppercase tracking-wider hidden xl:table-cell`}>Badge</th>
                </tr>
              </thead>
              <tbody>
                {topTraders.map((trader) => {
                  const badgeStyle = getBadgeColor(trader.badge);
                  return (
                    <tr
                      key={trader.rank}
                      className={`${isDark ? "border-[#1a1a1a] hover:bg-[#111]/50" : "border-gray-100 hover:bg-gray-50"} border-b transition-colors`}
                    >
                      <td className="py-4 px-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          trader.rank === 1 ? "bg-[#FFD700]/20 text-[#FFD700]" :
                          trader.rank === 2 ? "bg-gray-400/20 text-gray-300" :
                          trader.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                          isDark ? "bg-[#111] text-gray-400" : "bg-gray-100 text-gray-500"
                        }`}>
                          {trader.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${
                            trader.rank <= 3
                              ? `bg-gradient-to-br ${getRankStyle(trader.rank).bg}`
                              : isDark ? "bg-[#111]" : "bg-gray-100"
                          } flex items-center justify-center`}>
                            <span className={`font-bold text-sm ${trader.rank <= 3 ? "text-black" : isDark ? "text-gray-400" : "text-gray-500"}`}>
                              {trader.avatar}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{trader.name}</span>
                              <span>{trader.country}</span>
                            </div>
                            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{trader.accountSize} Account</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <p className="text-green-500 font-bold">+${trader.profit.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4 text-right hidden md:table-cell">
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>+{trader.returnPct}%</p>
                      </td>
                      <td className="py-4 px-4 text-right hidden lg:table-cell">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-[#111] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                              style={{ width: `${trader.winRate}%` }}
                            />
                          </div>
                          <span className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{trader.winRate}%</span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-right hidden lg:table-cell ${isDark ? "text-white" : "text-gray-900"}`}>
                        {trader.trades}
                      </td>
                      <td className="py-4 px-4 text-right hidden xl:table-cell">
                        <div className="flex items-center justify-end gap-2">
                          <FiZap className={trader.streak >= 5 ? (isDark ? "text-[#FFD700]" : "text-amber-500") : "text-gray-500"} size={14} />
                          <span className={`${trader.streak >= 5 ? (isDark ? "text-[#FFD700]" : "text-amber-600") : isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {trader.streak} days
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right hidden xl:table-cell">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${badgeStyle.bg} ${badgeStyle.text} border ${badgeStyle.border}`}>
                          {trader.badge}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={`p-4 border-t ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} flex items-center justify-between`}>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Showing 1-10 of 1,247 traders</p>
            <div className="flex gap-2">
              <button className={`px-3 py-1.5 ${isDark ? "bg-[#111] text-gray-400 border-[#1a1a1a] hover:text-[#FFD700]" : "bg-gray-100 text-gray-500 border-gray-200 hover:text-amber-600"} border rounded-lg text-sm transition-colors`}>
                Previous
              </button>
              <button className={`px-3 py-1.5 ${isDark ? "bg-[#111] text-gray-400 border-[#1a1a1a] hover:text-[#FFD700]" : "bg-gray-100 text-gray-500 border-gray-200 hover:text-amber-600"} border rounded-lg text-sm transition-colors`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "calendar") {
    // Economic events data
    const economicEvents = [
      { time: "08:30", currency: "USD", event: "Non-Farm Payrolls", impact: "high", forecast: "185K", previous: "175K", actual: "192K" },
      { time: "08:30", currency: "USD", event: "Unemployment Rate", impact: "high", forecast: "3.8%", previous: "3.7%", actual: "3.9%" },
      { time: "10:00", currency: "USD", event: "ISM Manufacturing PMI", impact: "high", forecast: "49.5", previous: "47.8", actual: "-" },
      { time: "14:00", currency: "USD", event: "FOMC Meeting Minutes", impact: "high", forecast: "-", previous: "-", actual: "-" },
      { time: "02:00", currency: "GBP", event: "Bank of England Rate Decision", impact: "high", forecast: "5.25%", previous: "5.25%", actual: "-" },
      { time: "04:30", currency: "EUR", event: "ECB Press Conference", impact: "high", forecast: "-", previous: "-", actual: "-" },
      { time: "21:30", currency: "AUD", event: "Employment Change", impact: "medium", forecast: "25.0K", previous: "32.6K", actual: "-" },
      { time: "09:30", currency: "GBP", event: "GDP m/m", impact: "medium", forecast: "0.2%", previous: "0.1%", actual: "-" },
      { time: "05:00", currency: "JPY", event: "BOJ Policy Rate", impact: "high", forecast: "-0.1%", previous: "-0.1%", actual: "-" },
      { time: "08:15", currency: "USD", event: "ADP Non-Farm Employment", impact: "medium", forecast: "150K", previous: "164K", actual: "-" },
      { time: "10:30", currency: "USD", event: "Crude Oil Inventories", impact: "medium", forecast: "-1.2M", previous: "2.7M", actual: "-" },
      { time: "13:00", currency: "USD", event: "10-Year Bond Auction", impact: "low", forecast: "-", previous: "4.28%", actual: "-" },
    ];

    const getImpactColor = (impact: string) => {
      switch (impact) {
        case "high": return "bg-red-500";
        case "medium": return "bg-orange-500";
        case "low": return "bg-yellow-500";
        default: return "bg-gray-500";
      }
    };

    const getCurrencyFlag = (currency: string) => {
      const flags: Record<string, string> = {
        USD: "🇺🇸",
        EUR: "🇪🇺",
        GBP: "🇬🇧",
        JPY: "🇯🇵",
        AUD: "🇦🇺",
        CAD: "🇨🇦",
        CHF: "🇨🇭",
        NZD: "🇳🇿",
      };
      return flags[currency] || "🌍";
    };

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Economic Calendar</h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Market-moving events and news releases</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>High</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>Medium</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>Low</span>
                </span>
              </div>
              <button className="px-4 py-2 bg-[#FFD700] text-black font-medium rounded-lg text-sm hover:bg-[#FFD700]/90 transition-colors">
                Today
              </button>
            </div>
          </div>
        </div>

        {/* Date Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Mon 27", "Tue 28", "Wed 29", "Thu 30", "Fri 31"].map((day, i) => (
            <button
              key={day}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                i === 1
                  ? "bg-[#FFD700] text-black"
                  : isDark
                  ? "bg-[#0a0a0a] text-gray-400 hover:text-white border border-[#1a1a1a] hover:border-[#FFD700]/30"
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-[#FFD700]/50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} overflow-hidden overflow-x-auto`}>
          {/* Table Header */}
          <div className={`grid grid-cols-12 gap-4 px-6 py-3 min-w-[700px] ${isDark ? "bg-[#111]" : "bg-gray-50"} border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
            <div className={`col-span-1 text-xs font-semibold ${colors.goldBold}`}>TIME</div>
            <div className={`col-span-2 text-xs font-semibold ${colors.goldBold}`}>CURRENCY</div>
            <div className={`col-span-4 text-xs font-semibold ${colors.goldBold}`}>EVENT</div>
            <div className={`col-span-1 text-xs font-semibold ${colors.goldBold} text-center`}>IMPACT</div>
            <div className={`col-span-1 text-xs font-semibold ${colors.goldBold} text-right`}>FORECAST</div>
            <div className={`col-span-1 text-xs font-semibold ${colors.goldBold} text-right`}>PREVIOUS</div>
            <div className={`col-span-2 text-xs font-semibold ${colors.goldBold} text-right`}>ACTUAL</div>
          </div>

          {/* Events */}
          {economicEvents.map((event, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 gap-4 px-6 py-4 min-w-[700px] border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-100"} hover:bg-[#FFD700]/5 transition-colors group`}
            >
              <div className={`col-span-1 text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {event.time}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-lg">{getCurrencyFlag(event.currency)}</span>
                <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{event.currency}</span>
              </div>
              <div className="col-span-4">
                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} group-hover:text-[#FFD700] transition-colors`}>
                  {event.event}
                </p>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)}`}></span>
              </div>
              <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {event.forecast}
              </div>
              <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {event.previous}
              </div>
              <div className="col-span-2 text-right">
                {event.actual === "-" ? (
                  <span className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>Pending</span>
                ) : (
                  <span className={`text-sm font-semibold ${
                    parseFloat(event.actual) > parseFloat(event.forecast) ? "text-green-500" : "text-red-500"
                  }`}>
                    {event.actual}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming High Impact Events */}
        <div className={`${isDark ? "bg-gradient-to-br from-red-500/10 via-[#0a0a0a]/80 to-[#0a0a0a]" : "bg-gradient-to-br from-red-500/10 via-white/90 to-white"} backdrop-blur-xl rounded-2xl border border-red-500/20 p-6`}>
          <div className="flex items-center gap-2 mb-4">
            <FiAlertTriangle className="text-red-500" size={20} />
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Upcoming High Impact Events</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { event: "FOMC Rate Decision", time: "Wed 14:00 EST", currency: "USD" },
              { event: "UK CPI y/y", time: "Thu 02:00 EST", currency: "GBP" },
              { event: "BOJ Policy Meeting", time: "Fri 23:00 EST", currency: "JPY" },
            ].map((item, i) => (
              <div key={i} className={`${isDark ? "bg-[#0a0a0a]/80" : "bg-white/80"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getCurrencyFlag(item.currency)}</span>
                  <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{item.currency}</span>
                </div>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"} text-sm`}>{item.event}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "download") {
    return (
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: "cTrader", desc: "Advanced trading platform", Icon: FiBarChart2, color: "#FFD700" },
            { name: "MatchTrader", desc: "Social trading platform", Icon: FiLink, color: "#22c55e" },
            { name: "DXTrade", desc: "Web-based trading", Icon: FiGlobe, color: "#3b82f6" },
            { name: "Mobile App", desc: "Trade on the go", Icon: FiSmartphone, color: "#a855f7" },
          ].map((platform, i) => (
            <div key={i} className={`${isDark ? "bg-[#0a0a0a] border-[#1a1a1a]" : "bg-white border-gray-200"} rounded-2xl border p-6 hover:border-[#FFD700]/30 transition-colors`}>
              <div className="mb-3"><platform.Icon size={32} style={{ color: platform.color }} /></div>
              <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>{platform.name}</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>{platform.desc}</p>
              <button className={`px-4 py-2 ${isDark ? "bg-[#111] text-[#FFD700] hover:bg-[#1a1a1a]" : "bg-gray-100 text-amber-600 hover:bg-gray-200"} font-medium rounded-lg transition-colors`}>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "ecosystem") {
    return <EcosystemContent isDark={isDark} />;
  }

  // Trading Rules Tab
  if (activeTab === "rules") {
    const tradingRules = [
      {
        category: "Account Rules",
        rules: [
          { title: "Maximum Daily Loss", value: "5%", desc: "Maximum loss allowed in a single trading day based on starting balance" },
          { title: "Maximum Overall Loss", value: "10%", desc: "Maximum total drawdown allowed from initial balance" },
          { title: "Profit Target", value: "10%", desc: "Required profit to pass the challenge phase" },
          { title: "Minimum Trading Days", value: "5 days", desc: "Minimum number of active trading days required" },
        ]
      },
      {
        category: "Trading Restrictions",
        rules: [
          { title: "Weekend Holding", value: "Allowed", desc: "Positions can be held over the weekend" },
          { title: "News Trading", value: "Allowed", desc: "Trading during high-impact news events is permitted" },
          { title: "Expert Advisors (EAs)", value: "Allowed", desc: "Automated trading systems are permitted" },
          { title: "Copy Trading", value: "Not Allowed", desc: "Copying trades from other accounts is prohibited" },
        ]
      },
      {
        category: "Payout Rules",
        rules: [
          { title: "Profit Split", value: "80/20", desc: "You keep 80% of profits, scaling up to 90%" },
          { title: "Payout Frequency", value: "Bi-weekly", desc: "Request payouts every 14 days" },
          { title: "Minimum Payout", value: "$100", desc: "Minimum amount required for withdrawal" },
          { title: "Payout Processing", value: "24-48 hours", desc: "Time to process approved withdrawals" },
        ]
      }
    ];

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Trading Rules & Guidelines</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Understand the rules to successfully complete your challenge</p>
        </div>

        {/* Rules Grid */}
        {tradingRules.map((section, idx) => (
          <div key={idx} className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
              {section.category}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {section.rules.map((rule, i) => (
                <div key={i} className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} hover:border-[#FFD700]/30 transition-colors`}>
                  <div className="flex items-start justify-between mb-2">
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{rule.title}</p>
                    <span className={`px-3 py-1 ${isDark ? "bg-[#FFD700]/20 text-[#FFD700]" : "bg-amber-100 text-amber-700"} text-sm font-semibold rounded-lg`}>{rule.value}</span>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Important Notice */}
        <div className={`${isDark ? "bg-gradient-to-br from-[#FFD700]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" : "bg-gradient-to-br from-amber-50 via-white to-white"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/30" : "border-amber-300"} p-6`}>
          <div className="flex items-start gap-3">
            <FiAlertTriangle className={colors.goldBold + " flex-shrink-0 mt-1"} size={20} />
            <div>
              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>Important Notice</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Violation of any trading rules may result in account termination. Please ensure you fully understand all rules before trading.
                If you have any questions, contact our support team for clarification.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FAQ Tab
  if (activeTab === "faq") {
    const faqs = [
      {
        category: "Getting Started",
        questions: [
          { q: "How do I start a challenge?", a: "Select a challenge from the Challenges page, complete the payment, and you'll receive your trading credentials within minutes." },
          { q: "What platforms are supported?", a: "We support cTrader, MatchTrader, and DXTrade. You can download any platform from the Download section." },
          { q: "Can I trade on mobile?", a: "Yes! All our platforms have mobile apps available for iOS and Android devices." },
        ]
      },
      {
        category: "Trading Rules",
        questions: [
          { q: "What is the maximum daily loss?", a: "The maximum daily loss is 5% of your starting balance. This resets at midnight server time." },
          { q: "Can I hold trades over the weekend?", a: "Yes, weekend holding is allowed. However, be aware of potential gaps when markets reopen." },
          { q: "Are Expert Advisors (EAs) allowed?", a: "Yes, EAs are allowed. However, copy trading from other accounts or signal services is prohibited." },
        ]
      },
      {
        category: "Payouts & Profits",
        questions: [
          { q: "How often can I request a payout?", a: "Funded traders can request payouts every 14 days (bi-weekly)." },
          { q: "What is the profit split?", a: "The standard profit split is 80/20 (you keep 80%). This can scale up to 90% based on performance." },
          { q: "How long does payout processing take?", a: "Payouts are typically processed within 24-48 business hours after approval." },
        ]
      },
      {
        category: "Account Management",
        questions: [
          { q: "Can I reset my challenge?", a: "Yes, you can reset your challenge at any time for a discounted fee before breaching any rules." },
          { q: "What happens if I breach a rule?", a: "If you breach a trading rule, your challenge will end. You can purchase a new challenge to try again." },
          { q: "Can I have multiple accounts?", a: "Yes, you can have up to 3 active funded accounts simultaneously." },
        ]
      }
    ];

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Frequently Asked Questions</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Find answers to common questions about our prop firm</p>
        </div>

        {/* FAQ Categories */}
        {faqs.map((section, idx) => (
          <div key={idx} className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <span className="w-2 h-2 bg-[#FFD700] rounded-full"></span>
              {section.category}
            </h3>
            <div className="space-y-3">
              {section.questions.map((faq, i) => {
                const faqId = `${idx}-${i}`;
                return (
                  <div key={i} className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} overflow-hidden`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === faqId ? null : faqId)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FFD700]/5 transition-colors"
                    >
                      <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{faq.q}</span>
                      <FiChevronDown className={`text-[#FFD700] transition-transform ${openFaq === faqId ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === faqId && (
                      <div className={`px-4 pb-4 ${isDark ? "text-gray-400" : "text-gray-500"} text-sm border-t ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} pt-3`}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact Support */}
        <div className={`${isDark ? "bg-gradient-to-br from-[#FFD700]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" : "bg-gradient-to-br from-[#FFD700]/20 via-white/90 to-white"} backdrop-blur-xl rounded-2xl border border-[#FFD700]/30 p-6 text-center`}>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-3`}>Can&apos;t find what you&apos;re looking for?</p>
          <a
            href="mailto:support@pipzen.com"
            className="inline-block px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-xl hover:bg-[#FFD700]/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  // Support Ticket Tab
  if (activeTab === "support") {
    const existingTickets = [
      { id: "#TKT-2024-0125", subject: "Payout request status", status: "resolved", date: "Jan 25, 2024", category: "Payouts" },
      { id: "#TKT-2024-0118", subject: "Platform connection issue", status: "closed", date: "Jan 18, 2024", category: "Technical" },
      { id: "#TKT-2024-0112", subject: "Account verification", status: "closed", date: "Jan 12, 2024", category: "Account" },
    ];

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Support Center</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Submit a ticket or check the status of your existing requests</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* New Ticket Form */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Submit New Ticket</h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Category</label>
                <select
                  value={ticketCategory || "general"}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Related</option>
                  <option value="payout">Payout Request</option>
                  <option value="billing">Billing Issue</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Subject</label>
                <input
                  type="text"
                  value={ticketSubject || ""}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Message</label>
                <textarea
                  value={ticketMessage || ""}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white placeholder-gray-600" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50 resize-none`}
                />
              </div>

              <button className="w-full px-6 py-3 bg-[#FFD700] text-black font-semibold rounded-xl hover:bg-[#FFD700]/90 transition-colors flex items-center justify-center gap-2">
                <FiMessageSquare size={18} />
                Submit Ticket
              </button>
            </div>
          </div>

          {/* Existing Tickets */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Your Tickets</h3>

            <div className="space-y-3">
              {existingTickets.map((ticket, i) => (
                <div key={i} className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{ticket.subject}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{ticket.id} • {ticket.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                      ticket.status === "resolved"
                        ? "bg-green-500/20 text-green-500"
                        : ticket.status === "open"
                        ? "bg-[#FFD700]/20 text-[#FFD700]"
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>
                  <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} bg-[#FFD700]/10 px-2 py-1 rounded`}>{ticket.category}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className={`mt-6 pt-6 border-t ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-3`}>Need immediate assistance?</p>
              <div className="flex gap-3">
                <button className={`flex-1 px-4 py-2 ${isDark ? "bg-[#111] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"} border rounded-xl text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} hover:border-[#FFD700]/30 transition-colors`}>
                  Live Chat
                </button>
                <button className={`flex-1 px-4 py-2 ${isDark ? "bg-[#111] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"} border rounded-xl text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} hover:border-[#FFD700]/30 transition-colors`}>
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Settings Tab
  if (activeTab === "settings") {
    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Settings</h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>Manage your account preferences and security</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <FiUser className="text-[#FFD700]" />
              Profile Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Full Name</label>
                <input
                  type="text"
                  defaultValue="John Trader"
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Email Address</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}
                />
              </div>
              <button className="px-6 py-2.5 bg-[#FFD700] text-black font-semibold rounded-xl hover:bg-[#FFD700]/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <FiShield className="text-[#FFD700]" />
              Security
            </h3>

            <div className="space-y-4">
              <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 flex items-center justify-between`}>
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Two-Factor Authentication</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Add an extra layer of security</p>
                </div>
                <button className="px-4 py-2 bg-green-500/20 text-green-500 text-sm font-medium rounded-lg">Enabled</button>
              </div>

              <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 flex items-center justify-between`}>
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Login Notifications</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Get notified of new logins</p>
                </div>
                <button className="px-4 py-2 bg-green-500/20 text-green-500 text-sm font-medium rounded-lg">Enabled</button>
              </div>

              <div className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4`}>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-3`}>Change Password</p>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className={`w-full ${isDark ? "bg-[#0a0a0a] border-[#1a1a1a] text-white placeholder-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"} border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700]/50`}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className={`w-full ${isDark ? "bg-[#0a0a0a] border-[#1a1a1a] text-white placeholder-gray-600" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"} border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FFD700]/50`}
                  />
                  <button className="px-4 py-2 bg-[#FFD700]/20 text-[#FFD700] text-sm font-medium rounded-lg hover:bg-[#FFD700]/30 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Credentials - Premium Section */}
          <div className={`${isDark ? "bg-gradient-to-br from-[#0a0a0a]/90 via-[#111]/80 to-[#0a0a0a]/90" : "bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90"} backdrop-blur-xl rounded-2xl border-2 ${isDark ? "border-[#FFD700]/40" : "border-[#FFD700]/50"} p-6 relative overflow-hidden lg:col-span-2`}>
            {/* Premium Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full">
              <span className="text-xs font-bold text-black">FUNDED TRADER</span>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FFA500]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1 flex items-center gap-2`}>
                <div className="p-2 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 rounded-xl">
                  <FiKey className="text-[#FFD700]" size={20} />
                </div>
                Trading Credentials
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}>Your cTrader trading account login details</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Login ID */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDark ? "text-[#FFD700]/80" : "text-[#B8860B]"}`}>Login ID</label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-[#FFD700]/50" : "text-[#B8860B]/50"}`}>
                      <FiUser size={18} />
                    </div>
                    <input
                      type="text"
                      value="88451792"
                      readOnly
                      className={`w-full ${isDark ? "bg-[#111]/80 border-[#FFD700]/20 text-white" : "bg-gray-50/80 border-[#FFD700]/30 text-gray-900"} border-2 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#FFD700]/60 font-mono text-lg tracking-wider`}
                    />
                    <button
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${isDark ? "hover:bg-[#FFD700]/10" : "hover:bg-[#FFD700]/20"} rounded-lg transition-colors`}
                      title="Copy Login"
                    >
                      <FiCopy className="text-[#FFD700]" size={16} />
                    </button>
                  </div>
                </div>

                {/* Server */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDark ? "text-[#FFD700]/80" : "text-[#B8860B]"}`}>Server</label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-[#FFD700]/50" : "text-[#B8860B]/50"}`}>
                      <FiServer size={18} />
                    </div>
                    <input
                      type="text"
                      value="PipzenLive-Server01"
                      readOnly
                      className={`w-full ${isDark ? "bg-[#111]/80 border-[#FFD700]/20 text-white" : "bg-gray-50/80 border-[#FFD700]/30 text-gray-900"} border-2 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#FFD700]/60 font-mono text-lg`}
                    />
                    <button
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${isDark ? "hover:bg-[#FFD700]/10" : "hover:bg-[#FFD700]/20"} rounded-lg transition-colors`}
                      title="Copy Server"
                    >
                      <FiCopy className="text-[#FFD700]" size={16} />
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDark ? "text-[#FFD700]/80" : "text-[#B8860B]"}`}>Password</label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-[#FFD700]/50" : "text-[#B8860B]/50"}`}>
                      <FiLock size={18} />
                    </div>
                    <input
                      type="password"
                      value="xK9#mPq2$vL5"
                      readOnly
                      className={`w-full ${isDark ? "bg-[#111]/80 border-[#FFD700]/20 text-white" : "bg-gray-50/80 border-[#FFD700]/30 text-gray-900"} border-2 rounded-xl pl-12 pr-12 py-3.5 focus:outline-none focus:border-[#FFD700]/60 font-mono text-lg tracking-widest`}
                    />
                    <button
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 ${isDark ? "hover:bg-[#FFD700]/10" : "hover:bg-[#FFD700]/20"} rounded-lg transition-colors`}
                      title="Copy Password"
                    >
                      <FiCopy className="text-[#FFD700]" size={16} />
                    </button>
                  </div>
                </div>

                {/* Platform Link */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDark ? "text-[#FFD700]/80" : "text-[#B8860B]"}`}>Platform</label>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-[#FFD700]/50" : "text-[#B8860B]/50"}`}>
                      <FiExternalLink size={18} />
                    </div>
                    <input
                      type="text"
                      value="cTrader"
                      readOnly
                      className={`w-full ${isDark ? "bg-[#111]/80 border-[#FFD700]/20 text-white" : "bg-gray-50/80 border-[#FFD700]/30 text-gray-900"} border-2 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#FFD700]/60 font-medium text-lg`}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#FFD700]/20">
                <a
                  href="https://ctrader.com/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                >
                  <FiDownload size={16} />
                  Download cTrader
                </a>
                <button className={`flex items-center gap-2 px-5 py-2.5 ${isDark ? "bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20" : "bg-[#FFD700]/20 text-[#B8860B] hover:bg-[#FFD700]/30"} font-semibold rounded-xl transition-all`}>
                  <FiCopy size={16} />
                  Copy All Credentials
                </button>
                <button className={`flex items-center gap-2 px-5 py-2.5 ${isDark ? "bg-white/5 text-gray-400 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} font-medium rounded-xl transition-all`}>
                  <FiRefreshCw size={16} />
                  Request New Password
                </button>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <FiBell className="text-[#FFD700]" />
              Notifications
            </h3>

            <div className="space-y-3">
              {[
                { label: "Trade Alerts", desc: "Get notified when trades are executed" },
                { label: "Daily P&L Summary", desc: "Receive daily performance reports" },
                { label: "Risk Warnings", desc: "Alerts when approaching drawdown limits" },
                { label: "Payout Updates", desc: "Notifications about payout status" },
                { label: "News & Updates", desc: "Platform updates and announcements" },
              ].map((item, i) => (
                <div key={i} className={`${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl p-4 flex items-center justify-between`}>
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{item.label}</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 4} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD700]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Preferences */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
              <FiSliders className="text-[#FFD700]" />
              Trading Preferences
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Default Leverage</label>
                <select className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}>
                  <option>1:100</option>
                  <option>1:50</option>
                  <option>1:30</option>
                  <option>1:10</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Timezone</label>
                <select className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (London)</option>
                  <option>UTC+1 (Central European)</option>
                  <option>UTC+8 (Singapore)</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Currency Display</label>
                <select className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFD700]/50`}>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <button className="px-6 py-2.5 bg-[#FFD700] text-black font-semibold rounded-xl hover:bg-[#FFD700]/90 transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "referral") {
    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Stats Cards with Glassmorphism */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-5 relative overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/10 rounded-full blur-2xl" />
            <p className={`text-xs ${isDark ? "text-[#FFD700]/70" : "text-[#B8860B]"} mb-1 font-medium`}>Total Referrals</p>
            <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>131</p>
            <p className="text-xs text-[#FFD700] mt-1">All Levels Combined</p>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-5 relative overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
            <p className={`text-xs ${isDark ? "text-[#FFD700]/70" : "text-[#B8860B]"} mb-1 font-medium`}>Total Earned</p>
            <p className="text-3xl font-bold text-green-500">$2,840</p>
            <p className="text-xs text-[#FFD700] mt-1">+$320 this month</p>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-5 relative overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/15 rounded-full blur-2xl" />
            <p className={`text-xs ${isDark ? "text-[#FFD700]/70" : "text-[#B8860B]"} mb-1 font-medium`}>Pending Payout</p>
            <p className="text-3xl font-bold text-[#FFD700]">$420</p>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`}>Next payout: 3 days</p>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-5 relative overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/10 rounded-full blur-2xl" />
            <p className={`text-xs ${isDark ? "text-[#FFD700]/70" : "text-[#B8860B]"} mb-1 font-medium`}>Your Link</p>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-sm text-[#FFD700] truncate font-mono">pipzen.com/ref/TRADER123</code>
              <button className="p-1.5 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 rounded-lg transition-colors">
                <FiLink size={14} className="text-[#FFD700]" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Tree Referral Network Visualization */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-8 sm:p-10 lg:p-12 relative`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

          <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-3 text-center relative`}>
            Referral Network Structure
          </h3>
          <p className={`text-center ${isDark ? "text-gray-500" : "text-gray-400"} text-sm mb-10`}>
            Hover over any box to see commission details • All levels have unlimited referrals
          </p>

          {/* Horizontal Tree Structure */}
          <div className="relative overflow-visible pb-8">
            <div className="min-w-[900px] mx-auto px-4 overflow-x-auto">

              {/* Master Referee (YOU) - Top Center */}
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer z-10">
                  <div className="absolute inset-0 bg-[#FFD700] rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black px-10 py-4 rounded-xl font-bold shadow-lg text-center">
                    <span className="text-base">Master Referee</span>
                    <p className="text-xs opacity-70 mt-1">(YOU)</p>
                  </div>
                  {/* Hover tooltip - appears to the RIGHT */}
                  <div className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 ${isDark ? "bg-[#111]" : "bg-white"} rounded-xl p-5 border ${isDark ? "border-[#FFD700]/30" : "border-[#FFD700]/40"} shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-[200] min-w-[260px]`}>
                    <p className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>You (Master Referee)</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>Earn commissions from all 3 levels</p>
                    <div className={`space-y-3 pt-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-500">Level 1 (Direct)</span>
                        <span className="text-green-500 font-bold">6%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-500">Level 2 (Sub-refs)</span>
                        <span className="text-blue-500 font-bold">3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-500">Level 3 (Tier 3)</span>
                        <span className="text-purple-500 font-bold">1%</span>
                      </div>
                      <div className={`flex justify-between text-sm pt-3 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                        <span className={isDark ? "text-white" : "text-gray-900"}>Total Potential</span>
                        <span className="text-[#FFD700] font-bold">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical line from Master to horizontal branch */}
                <div className="w-1 h-12 bg-gradient-to-b from-[#FFD700] to-[#22c55e] rounded-full" />

                {/* Horizontal branch line */}
                <div className="w-[800px] h-1 bg-gradient-to-r from-[#22c55e]/30 via-[#22c55e] to-[#22c55e]/30 rounded-full relative">
                  {/* Vertical connectors to Level 1 boxes */}
                  <div className="absolute left-0 top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[14%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[28%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[42%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[56%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[70%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute left-[84%] top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                  <div className="absolute right-0 top-0 w-1 h-6 bg-[#22c55e] rounded-full" />
                </div>
              </div>

              {/* Level 1: Direct Referrals - Green (Person 1-8) */}
              <div className="flex justify-between px-0 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className="relative group cursor-pointer z-10 hover:z-[300]">
                      <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white px-4 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all min-w-[85px] text-center">
                        <span>Person {num}</span>
                        <p className="text-[11px] opacity-80 mt-1">6% Commission</p>
                      </div>
                      {/* Hover tooltip - floats on top of everything */}
                      <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 ${isDark ? "bg-[#111]" : "bg-white"} rounded-xl p-5 border ${isDark ? "border-green-500/30" : "border-green-500/40"} shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-[9999] min-w-[220px]`}>
                        <p className="text-base font-bold text-green-500 mb-2">Direct Referral — 6%</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>Someone you personally invited</p>
                        <div className={`space-y-2 pt-3 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                          <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>If they buy $299 challenge:</p>
                          <div className="flex justify-between text-sm">
                            <span className={isDark ? "text-gray-400" : "text-gray-500"}>You earn</span>
                            <span className="text-green-500 font-bold">$17.94</span>
                          </div>
                        </div>
                        <p className="text-xs text-[#FFD700] mt-3 font-semibold">∞ UNLIMITED REFERRALS</p>
                      </div>
                    </div>
                    {/* Vertical line to sub-referrals */}
                    <div className="w-1 h-10 bg-gradient-to-b from-[#22c55e] to-[#3b82f6] rounded-full" />
                  </div>
                ))}
              </div>

              {/* Level 2: Sub-Referrals - Blue */}
              <div className="flex justify-between px-0 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((parentNum) => (
                  <div key={parentNum} className="flex flex-col items-center">
                    {/* Sub-referral boxes for each person */}
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((subNum) => (
                        <div key={subNum} className="relative group cursor-pointer z-10 hover:z-50">
                          {/* Glow effect on hover */}
                          <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
                          <div className="relative bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white w-[28px] h-[24px] rounded-lg text-[9px] flex items-center justify-center font-bold shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 transition-all duration-200 border border-blue-400/30">
                            {parentNum}.{subNum}
                          </div>
                          {/* Hover tooltip - appears BELOW to avoid overlap with Level 1 */}
                          <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-4 ${isDark ? "bg-[#111]" : "bg-white"} rounded-xl p-5 border ${isDark ? "border-blue-500/30" : "border-blue-500/40"} shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] min-w-[220px]`}>
                            <p className="text-base font-bold text-blue-500 mb-2">Sub-Referral {parentNum}.{subNum} — 3%</p>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>Person {parentNum}&apos;s referral #{subNum}</p>
                            <div className={`space-y-2 pt-3 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>If they buy $299 challenge:</p>
                              <div className="flex justify-between text-sm">
                                <span className={isDark ? "text-gray-400" : "text-gray-500"}>You earn</span>
                                <span className="text-blue-500 font-bold">$8.97</span>
                              </div>
                            </div>
                            <p className="text-xs text-[#FFD700] mt-3 font-semibold">∞ UNLIMITED REFERRALS</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Vertical lines to tier 3 */}
                    <div className="flex gap-1.5 mt-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1 h-6 bg-gradient-to-b from-[#3b82f6] to-[#a855f7] rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Level 3: Tier 3 - Purple */}
              <div className="flex justify-between px-0 mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((parentNum) => (
                  <div key={parentNum} className="flex flex-col items-center">
                    {/* Tier 3 boxes for each sub-referral branch */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5, 6].map((tier3Num) => (
                        <div key={tier3Num} className="relative group cursor-pointer z-10">
                          {/* Glow effect on hover */}
                          <div className="absolute inset-0 bg-purple-500 rounded blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
                          <div className="relative bg-gradient-to-br from-[#a855f7] to-[#9333ea] text-white w-[16px] h-[14px] rounded text-[6px] flex items-center justify-center font-medium shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] hover:scale-125 transition-all duration-200 border border-purple-400/30" />
                          {/* Hover tooltip - appears ABOVE for every card */}
                          <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-4 ${isDark ? "bg-[#111]" : "bg-white"} rounded-xl p-5 border ${isDark ? "border-purple-500/30" : "border-purple-500/40"} shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 min-w-[220px]`}>
                            <p className="text-base font-bold text-purple-500 mb-2">Tier 3 Referral — 1%</p>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-4`}>Deep network passive income</p>
                            <div className={`space-y-2 pt-3 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                              <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>If they buy $299 challenge:</p>
                              <div className="flex justify-between text-sm">
                                <span className={isDark ? "text-gray-400" : "text-gray-500"}>You earn</span>
                                <span className="text-purple-500 font-bold">$2.99</span>
                              </div>
                            </div>
                            <p className="text-xs text-[#FFD700] mt-3 font-semibold">∞ UNLIMITED REFERRALS</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* More indicator */}
              <div className="flex justify-center mt-8">
                <div className={`px-6 py-3 ${isDark ? "bg-[#111]/80" : "bg-gray-100"} rounded-full border ${isDark ? "border-[#FFD700]/20" : "border-gray-300"}`}>
                  <span className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Network continues infinitely at all levels...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className={`mt-10 ${isDark ? "bg-[#111]/80" : "bg-gray-50/80"} rounded-xl p-5 border ${isDark ? "border-[#FFD700]/10" : "border-gray-200"}`}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg shadow-sm" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Master Referee (You)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-sm" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Level 1: Direct — <span className="text-green-500 font-bold">6%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-lg shadow-sm" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Level 2: Sub-Refs — <span className="text-blue-500 font-bold">3%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#a855f7] to-[#9333ea] rounded-lg shadow-sm" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Level 3: Tier 3 — <span className="text-purple-500 font-bold">1%</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Referral Link Section */}
        <div className={`${isDark ? "bg-gradient-to-br from-[#FFD700]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" : "bg-gradient-to-br from-[#FFD700]/20 via-white/90 to-white"} backdrop-blur-xl rounded-2xl border border-[#FFD700]/30 p-8 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="relative">
            <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>Share Your Referral Link</h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6 text-sm`}>
              Earn up to 6% commission on direct referrals and passive income from your entire network
            </p>
            <div className={`${isDark ? "bg-[#0a0a0a]/80" : "bg-white/90"} backdrop-blur rounded-xl p-4 border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"}`}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value="https://pipzen.com/ref/TRADER123"
                  readOnly
                  className={`flex-1 ${isDark ? "bg-[#111] border-[#FFD700]/20 text-white" : "bg-gray-50 border-[#FFD700]/30 text-gray-900"} border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#FFD700]/50`}
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                  <FiLink size={18} />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prop firm challenge data
  const challengeData = {
    phase: "Phase 1",
    status: "Active",
    startingBalance: 50000,
    currentBalance: currentBalance,
    profitTarget: 10, // 10%
    profitTargetAmount: 5000,
    currentProfit: totalPnL,
    currentProfitPercent: (totalPnL / 50000) * 100,
    maxDrawdown: 10, // 10%
    maxDrawdownAmount: 5000,
    currentDrawdown: 4.8,
    dailyLossLimit: 5, // 5%
    dailyLossAmount: 2500,
    currentDailyLoss: 0.5,
    daysActive: 12,
    minTradingDays: 5,
    daysRemaining: 18,
  };

  // KYC Verification Tab
  if (activeTab === "kyc") {
    const kycStatus = {
      overall: "pending", // pending, in_review, approved, rejected
      identity: { status: "approved", document: "Passport", uploadedAt: "Jan 15, 2024" },
      address: { status: "in_review", document: "Utility Bill", uploadedAt: "Jan 20, 2024" },
      selfie: { status: "pending", document: null, uploadedAt: null },
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "approved": return { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" };
        case "in_review": return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" };
        case "rejected": return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" };
        default: return { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" };
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case "approved": return <FiCheckCircle className="text-green-400" size={20} />;
        case "in_review": return <FiRefreshCw className="text-yellow-400 animate-spin" size={20} />;
        case "rejected": return <FiXCircle className="text-red-400" size={20} />;
        default: return <FiShield className="text-gray-400" size={20} />;
      }
    };

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} flex items-center gap-3`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                  <FiShield className="text-black" size={24} />
                </div>
                KYC Verification
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-2`}>Complete your identity verification to unlock full platform features</p>
            </div>
            <div className={`px-4 py-2 rounded-xl ${getStatusColor(kycStatus.overall).bg} ${getStatusColor(kycStatus.overall).border} border`}>
              <span className={`text-sm font-semibold ${getStatusColor(kycStatus.overall).text} capitalize`}>
                {kycStatus.overall === "in_review" ? "Under Review" : kycStatus.overall}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>Verification Progress</h3>
          <div className="flex items-center justify-between mb-8">
            {["Identity", "Address", "Selfie"].map((step, i) => {
              const stepStatus = i === 0 ? kycStatus.identity.status : i === 1 ? kycStatus.address.status : kycStatus.selfie.status;
              const isCompleted = stepStatus === "approved";
              const isActive = stepStatus === "in_review" || (stepStatus === "pending" && (i === 0 || (i === 1 && kycStatus.identity.status === "approved") || (i === 2 && kycStatus.address.status === "approved")));
              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${isCompleted ? "bg-gradient-to-br from-green-500 to-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : isActive ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-[0_0_20px_rgba(255,215,0,0.4)]" : isDark ? "bg-[#1a1a1a]" : "bg-gray-200"}`}>
                    {isCompleted ? <FiCheckCircle className="text-white" size={24} /> : <span className={`font-bold ${isActive ? "text-black" : isDark ? "text-gray-500" : "text-gray-400"}`}>{i + 1}</span>}
                  </div>
                  <span className={`text-sm font-medium ${isCompleted ? "text-green-400" : isActive ? "text-[#FFD700]" : isDark ? "text-gray-500" : "text-gray-400"}`}>{step}</span>
                  {i < 2 && (
                    <div className={`absolute h-1 w-[calc(33%-2rem)] ${isCompleted ? "bg-green-500" : isDark ? "bg-[#1a1a1a]" : "bg-gray-200"}`} style={{ left: `calc(${(i + 1) * 33}% - 4rem)`, top: "1.5rem" }} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FFD700] to-green-500 rounded-full transition-all duration-500" style={{ width: `${(kycStatus.identity.status === "approved" ? 33 : 0) + (kycStatus.address.status === "approved" ? 33 : kycStatus.address.status === "in_review" ? 16 : 0) + (kycStatus.selfie.status === "approved" ? 34 : 0)}%` }} />
          </div>
        </div>

        {/* Document Upload Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Identity Document */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-300`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${kycStatus.identity.status === "approved" ? "bg-green-500/10" : "bg-[#FFD700]/10"} rounded-full blur-2xl`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Identity Document</h4>
                {getStatusIcon(kycStatus.identity.status)}
              </div>
              <div className={`p-4 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border ${getStatusColor(kycStatus.identity.status).border} mb-4`}>
                <div className="flex items-center gap-3">
                  <FiFileText className={getStatusColor(kycStatus.identity.status).text} size={24} />
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{kycStatus.identity.document}</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Uploaded {kycStatus.identity.uploadedAt}</p>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-2 rounded-lg ${getStatusColor(kycStatus.identity.status).bg} text-center`}>
                <span className={`text-sm font-medium ${getStatusColor(kycStatus.identity.status).text} capitalize`}>
                  {kycStatus.identity.status === "in_review" ? "Under Review" : kycStatus.identity.status}
                </span>
              </div>
            </div>
          </div>

          {/* Address Proof */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-300`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${kycStatus.address.status === "approved" ? "bg-green-500/10" : "bg-yellow-500/10"} rounded-full blur-2xl`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Proof of Address</h4>
                {getStatusIcon(kycStatus.address.status)}
              </div>
              <div className={`p-4 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border ${getStatusColor(kycStatus.address.status).border} mb-4`}>
                <div className="flex items-center gap-3">
                  <FiFileText className={getStatusColor(kycStatus.address.status).text} size={24} />
                  <div>
                    <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{kycStatus.address.document}</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Uploaded {kycStatus.address.uploadedAt}</p>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-2 rounded-lg ${getStatusColor(kycStatus.address.status).bg} text-center`}>
                <span className={`text-sm font-medium ${getStatusColor(kycStatus.address.status).text} capitalize`}>
                  {kycStatus.address.status === "in_review" ? "Under Review" : kycStatus.address.status}
                </span>
              </div>
            </div>
          </div>

          {/* Selfie Verification */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-300`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Selfie Verification</h4>
                {getStatusIcon(kycStatus.selfie.status)}
              </div>
              <div className={`p-8 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border-2 border-dashed ${isDark ? "border-[#FFD700]/30" : "border-[#FFD700]/50"} mb-4 text-center cursor-pointer hover:border-[#FFD700] transition-colors group`}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiUser className="text-[#FFD700]" size={32} />
                </div>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Click to upload selfie</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`}>Hold your ID next to your face</p>
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300">
                Upload Selfie
              </button>
            </div>
          </div>
        </div>

        {/* Requirements Info */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4 flex items-center gap-2`}>
            <FiHelpCircle className="text-[#FFD700]" />
            Document Requirements
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Identity Document", items: ["Valid Passport or National ID", "Clear, unobstructed photo", "All corners visible", "Not expired"] },
              { title: "Proof of Address", items: ["Utility bill or Bank statement", "Dated within last 3 months", "Full name and address visible", "Official document only"] },
              { title: "Selfie Requirements", items: ["Face clearly visible", "Hold ID next to face", "Good lighting conditions", "No filters or editing"] },
            ].map((section, i) => (
              <div key={i} className={`p-4 rounded-xl ${isDark ? "bg-[#111]/80" : "bg-gray-50"}`}>
                <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-3`}>{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} flex items-start gap-2`}>
                      <FiCheckCircle className="text-[#FFD700] mt-0.5 flex-shrink-0" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Withdrawal Tab
  if (activeTab === "withdrawal") {
    const withdrawalMethods = [
      { id: "bank", name: "Bank Transfer", icon: "🏦", fee: "0%", time: "1-3 business days", min: 50, max: 50000 },
      { id: "crypto", name: "Cryptocurrency", icon: "₿", fee: "0%", time: "Instant - 24 hours", min: 20, max: 100000 },
      { id: "paypal", name: "PayPal", icon: "💳", fee: "2%", time: "Instant", min: 10, max: 10000 },
    ];

    const withdrawalHistory = [
      { id: "WD001", date: "Jan 25, 2024", amount: 2500, method: "Bank Transfer", status: "completed", txId: "TX89234..." },
      { id: "WD002", date: "Jan 18, 2024", amount: 1800, method: "Cryptocurrency", status: "completed", txId: "0x8f3a2..." },
      { id: "WD003", date: "Jan 10, 2024", amount: 3200, method: "Bank Transfer", status: "completed", txId: "TX78123..." },
      { id: "WD004", date: "Jan 05, 2024", amount: 500, method: "PayPal", status: "completed", txId: "PP45678..." },
    ];

    const availableBalance = 8750.00;
    const pendingWithdrawal = 0;
    const totalWithdrawn = 8000.00;

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Available Balance</p>
              <p className="text-3xl font-bold text-green-400">${availableBalance.toLocaleString()}</p>
              <p className="text-xs text-[#FFD700] mt-2">Ready to withdraw</p>
            </div>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Pending Withdrawal</p>
              <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>${pendingWithdrawal.toLocaleString()}</p>
              <p className="text-xs text-yellow-400 mt-2">Processing</p>
            </div>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Total Withdrawn</p>
              <p className="text-3xl font-bold text-[#FFD700]">${totalWithdrawn.toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-2">Lifetime earnings</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Request Withdrawal */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center gap-2`}>
              <FiDollarSign className="text-[#FFD700]" />
              Request Withdrawal
            </h3>

            {/* Amount Input */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-2`}>Amount (USD)</label>
              <div className="relative">
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className={`w-full ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl pl-10 pr-4 py-4 text-2xl font-bold focus:outline-none focus:border-[#FFD700]/50`}
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[25, 50, 75, 100].map(percent => (
                  <button key={percent} className={`flex-1 px-3 py-2 ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-lg text-sm font-medium hover:border-[#FFD700]/50 transition-colors`}>
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            {/* Withdrawal Method */}
            <div className="mb-6">
              <label className={`block text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} mb-3`}>Select Method</label>
              <div className="space-y-3">
                {withdrawalMethods.map(method => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 ${isDark ? "bg-[#111] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"} border rounded-xl cursor-pointer hover:border-[#FFD700]/50 transition-all group`}>
                    <input type="radio" name="withdrawal-method" className="sr-only" />
                    <span className="text-2xl">{method.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{method.name}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{method.time} • Fee: {method.fee}</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-500 group-hover:border-[#FFD700] transition-colors flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full px-6 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 text-lg">
              Request Withdrawal
            </button>
          </div>

          {/* Withdrawal History */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center gap-2`}>
              <FiList className="text-[#FFD700]" />
              Recent Withdrawals
            </h3>

            <div className="space-y-3">
              {withdrawalHistory.map(withdrawal => (
                <div key={withdrawal.id} className={`p-4 ${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} hover:border-[#FFD700]/30 transition-colors`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <FiArrowUp className="text-green-400" size={20} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>${withdrawal.amount.toLocaleString()}</p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{withdrawal.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-lg capitalize">{withdrawal.status}</span>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`}>{withdrawal.date}</p>
                    </div>
                  </div>
                  <div className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"} font-mono`}>TX: {withdrawal.txId}</div>
                </div>
              ))}
            </div>

            <button className={`w-full mt-4 px-4 py-3 ${isDark ? "bg-[#111] border-[#1a1a1a] text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border rounded-xl text-sm font-medium hover:border-[#FFD700]/50 transition-colors`}>
              View All Transactions
            </button>
          </div>
        </div>

        {/* Important Notice */}
        <div className={`${isDark ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200"} border rounded-2xl p-6`}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <FiAlertTriangle className="text-yellow-500" size={20} />
            </div>
            <div>
              <h4 className={`font-semibold ${isDark ? "text-yellow-400" : "text-yellow-700"} mb-2`}>Important Information</h4>
              <ul className={`text-sm ${isDark ? "text-yellow-400/80" : "text-yellow-600"} space-y-1`}>
                <li>• Withdrawals are processed within 24-48 hours on business days</li>
                <li>• Minimum withdrawal amount is $50 for bank transfers</li>
                <li>• Ensure your KYC verification is complete before requesting withdrawals</li>
                <li>• Withdrawal requests made after 5 PM UTC will be processed next business day</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Certificates Tab
  if (activeTab === "certificates") {
    const certificates = [
      { id: "CERT001", type: "Phase 1 Completion", account: "$100K Challenge", date: "Jan 20, 2024", status: "issued", downloadUrl: "#" },
      { id: "CERT002", type: "Phase 2 Completion", account: "$100K Challenge", date: "Jan 28, 2024", status: "issued", downloadUrl: "#" },
      { id: "CERT003", type: "Funded Trader", account: "$100K Funded", date: "Feb 01, 2024", status: "issued", downloadUrl: "#" },
      { id: "CERT004", type: "First Payout", account: "$100K Funded", date: "Feb 15, 2024", status: "pending", downloadUrl: null },
    ];

    const achievements = [
      { title: "Challenge Champion", desc: "Completed Phase 1 in record time", icon: "🏆", earned: true },
      { title: "Consistent Trader", desc: "10 consecutive profitable days", icon: "📈", earned: true },
      { title: "Risk Master", desc: "Never exceeded 50% of max drawdown", icon: "🛡️", earned: true },
      { title: "Volume King", desc: "Execute 500+ trades", icon: "👑", earned: false },
      { title: "Profit Milestone", desc: "Reach $10,000 in total profits", icon: "💰", earned: false },
      { title: "Elite Trader", desc: "Maintain 70%+ win rate for 30 days", icon: "⭐", earned: false },
    ];

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} flex items-center gap-3`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <FiAward className="text-black" size={24} />
              </div>
              Certificates & Achievements
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mt-2`}>Download your trading certificates and track your achievements</p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center gap-2`}>
            <FiFileText className="text-[#FFD700]" />
            Your Certificates
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <div key={cert.id} className={`p-5 ${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl border ${cert.status === "issued" ? "border-[#FFD700]/30" : isDark ? "border-[#1a1a1a]" : "border-gray-200"} hover:border-[#FFD700]/50 transition-all duration-300 group relative overflow-hidden`}>
                {cert.status === "issued" && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/10 rounded-full blur-2xl" />
                )}
                {/* Pipzen Logo Watermark */}
                <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Image src="/logo.svg" alt="" width={40} height={40} className={cert.status !== "issued" ? "grayscale" : ""} />
                </div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${cert.status === "issued" ? "" : isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} flex items-center justify-center overflow-hidden`}>
                        {cert.status === "issued" ? (
                          <Image src="/logo.svg" alt="Pipzen" width={48} height={48} className="object-contain" />
                        ) : (
                          <FiAward className={isDark ? "text-gray-500" : "text-gray-400"} size={24} />
                        )}
                      </div>
                      <div>
                        <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{cert.type}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{cert.account}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${cert.status === "issued" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {cert.status === "issued" ? "Issued" : "Pending"}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between pt-4 border-t ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={isDark ? "text-gray-500" : "text-gray-400"}>ID:</span>
                      <span className={`font-mono ${isDark ? "text-gray-400" : "text-gray-500"}`}>{cert.id}</span>
                    </div>
                    <div className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{cert.date}</div>
                  </div>

                  {cert.status === "issued" && (
                    <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                      <FiDownload size={18} />
                      Download Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center gap-2`}>
            <span className="text-2xl">🏅</span>
            Trading Achievements
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, i) => (
              <div key={i} className={`p-5 ${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl border ${achievement.earned ? "border-[#FFD700]/30" : isDark ? "border-[#1a1a1a]" : "border-gray-200"} relative overflow-hidden transition-all duration-300 ${achievement.earned ? "hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]" : "opacity-60"}`}>
                {achievement.earned && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/10 rounded-full blur-2xl" />
                )}
                <div className="relative text-center">
                  <div className={`text-4xl mb-3 ${!achievement.earned && "grayscale"}`}>{achievement.icon}</div>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>{achievement.title}</p>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{achievement.desc}</p>
                  {achievement.earned && (
                    <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-[#FFD700]/20 rounded-full">
                      <FiCheckCircle className="text-[#FFD700]" size={12} />
                      <span className="text-[#FFD700] text-xs font-medium">Earned</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className={`${isDark ? "bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10" : "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20"} rounded-2xl border ${isDark ? "border-[#FFD700]/30" : "border-[#FFD700]/40"} p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>Share Your Success</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Showcase your achievements on social media</p>
            </div>
            <div className="flex gap-3">
              <button className={`px-4 py-2 ${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-lg text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} hover:bg-[#FFD700]/20 transition-colors flex items-center gap-2`}>
                <FiLink size={16} />
                Copy Link
              </button>
              <button className="px-4 py-2 bg-[#1DA1F2] rounded-lg text-sm font-medium text-white hover:bg-[#1DA1F2]/80 transition-colors">
                Share on Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Billing History Tab
  if (activeTab === "billing") {
    const billingHistory = [
      { id: "INV001", date: "Jan 01, 2024", description: "$100K Challenge - Phase 1", amount: 499, status: "paid", method: "Credit Card", card: "•••• 4242" },
      { id: "INV002", date: "Dec 15, 2023", description: "$50K Challenge - Phase 1", amount: 299, status: "paid", method: "PayPal", card: "john@email.com" },
      { id: "INV003", date: "Nov 20, 2023", description: "$25K Challenge - Phase 1", amount: 199, status: "paid", method: "Crypto", card: "0x8f3a..." },
      { id: "INV004", date: "Oct 10, 2023", description: "$10K Challenge - Phase 1", amount: 99, status: "refunded", method: "Credit Card", card: "•••• 5678" },
      { id: "INV005", date: "Sep 05, 2023", description: "$100K Challenge Reset", amount: 99, status: "paid", method: "Credit Card", card: "•••• 4242" },
    ];

    const paymentMethods = [
      { id: "card1", type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
      { id: "card2", type: "Mastercard", last4: "5678", expiry: "08/24", isDefault: false },
    ];

    const totalSpent = billingHistory.filter(b => b.status === "paid").reduce((acc, b) => acc + b.amount, 0);

    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Total Spent</p>
              <p className="text-3xl font-bold text-[#FFD700]">${totalSpent.toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-2">Lifetime purchases</p>
            </div>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Active Subscriptions</p>
              <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>2</p>
              <p className="text-xs text-[#FFD700] mt-2">Funded accounts</p>
            </div>
          </div>
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>Payment Methods</p>
              <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{paymentMethods.length}</p>
              <p className="text-xs text-purple-400 mt-2">Cards saved</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Billing History Table */}
          <div className={`lg:col-span-2 ${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} flex items-center gap-2`}>
                <FiFileText className="text-[#FFD700]" />
                Billing History
              </h3>
              <button className={`px-4 py-2 ${isDark ? "bg-[#111] border-[#1a1a1a]" : "bg-gray-50 border-gray-200"} border rounded-lg text-sm font-medium ${isDark ? "text-white" : "text-gray-900"} hover:border-[#FFD700]/50 transition-colors`}>
                Download All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`text-left text-xs ${isDark ? "text-gray-500" : "text-gray-400"} border-b ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                    <th className="pb-3 font-medium">Invoice</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {billingHistory.map(invoice => (
                    <tr key={invoice.id} className={`${isDark ? "hover:bg-[#111]/50" : "hover:bg-gray-50"} transition-colors`}>
                      <td className={`py-4 font-mono text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{invoice.id}</td>
                      <td className={`py-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{invoice.date}</td>
                      <td className={`py-4 text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{invoice.description}</td>
                      <td className={`py-4 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>${invoice.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${invoice.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="p-2 hover:bg-[#FFD700]/10 rounded-lg transition-colors">
                          <FiDownload className={isDark ? "text-gray-400" : "text-gray-500"} size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-6 flex items-center gap-2`}>
              <FiCreditCard className="text-[#FFD700]" />
              Payment Methods
            </h3>

            <div className="space-y-4">
              {paymentMethods.map(card => (
                <div key={card.id} className={`p-4 ${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl border ${card.isDefault ? "border-[#FFD700]/30" : isDark ? "border-[#1a1a1a]" : "border-gray-200"} relative overflow-hidden`}>
                  {card.isDefault && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-medium rounded">Default</span>
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-8 rounded ${card.type === "Visa" ? "bg-blue-600" : "bg-red-500"} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{card.type === "Visa" ? "VISA" : "MC"}</span>
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>•••• {card.last4}</p>
                      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Expires {card.expiry}</p>
                    </div>
                  </div>
                </div>
              ))}

              <button className={`w-full p-4 ${isDark ? "bg-[#111]/80 border-[#1a1a1a]" : "bg-gray-50 border-gray-200"} border-2 border-dashed rounded-xl text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"} hover:border-[#FFD700]/50 hover:text-[#FFD700] transition-all flex items-center justify-center gap-2`}>
                <FiPlus size={18} />
                Add Payment Method
              </button>
            </div>

            {/* Billing Address */}
            <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
              <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-3`}>Billing Address</h4>
              <div className={`p-4 ${isDark ? "bg-[#111]/80" : "bg-gray-50"} rounded-xl`}>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>John Trader</p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>123 Trading Street</p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>New York, NY 10001</p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>United States</p>
                <button className="mt-3 text-[#FFD700] text-sm font-medium hover:text-[#FFA500] transition-colors">Edit Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile Tab
  if (activeTab === "profile") {
    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Profile Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} overflow-hidden`}>
          {/* Cover Banner */}
          <div className="h-36 sm:h-40 bg-gradient-to-r from-[#0a0a0a] via-[#FFD700]/20 to-[#0a0a0a] relative overflow-hidden">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#FFA500]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

            {/* PIPZEN Watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="text-5xl sm:text-7xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700]/20 via-[#FFD700]/40 to-[#FFD700]/20 select-none">
                  PIPZEN
                </span>
                {/* Glow effect behind text */}
                <span className="absolute inset-0 text-5xl sm:text-7xl font-black tracking-[0.3em] text-[#FFD700]/10 blur-sm select-none">
                  PIPZEN
                </span>
              </div>
            </div>

            {/* Scan Line Animation */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent animate-[scan_3s_ease-in-out_infinite]" style={{ top: "30%" }} />
            </div>

            {/* Corner Accents */}
            <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#FFD700]/40" />
            <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[#FFD700]/40" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[#FFD700]/40" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#FFD700]/40" />

            {/* Status Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-[#FFD700]/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[#FFD700]">VERIFIED</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] border-4 border-[#0a0a0a]">
                <FiUser className="text-black" size={40} />
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>John Trader</h2>
                <p className="text-[#FFD700] font-medium">Funded Trader</p>
              </div>
              <button className="px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-xl hover:bg-[#FFA500] transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
                <FiUser className="text-[#FFD700]" size={18} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Personal Information</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Full Name", value: "John Trader" },
                { label: "Email", value: "john@example.com" },
                { label: "Phone", value: "+1 (555) 123-4567" },
                { label: "Country", value: "United States" },
                { label: "Timezone", value: "EST (UTC-5)" },
                { label: "Member Since", value: "January 2024" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[#1a1a1a] last:border-0">
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.label}</span>
                  <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Stats */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
                <FiBarChart2 className="text-[#FFD700]" size={18} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Trading Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Trades", value: "247", color: "text-[#FFD700]" },
                { label: "Win Rate", value: "68%", color: "text-green-400" },
                { label: "Total Profit", value: "$12,847", color: "text-green-400" },
                { label: "Avg. Trade", value: "$52.05", color: "text-[#FFD700]" },
                { label: "Best Trade", value: "+$1,250", color: "text-green-400" },
                { label: "Worst Trade", value: "-$380", color: "text-red-400" },
              ].map((stat, i) => (
                <div key={i} className={`p-4 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"} mb-1`}>{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Account Status */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
                <FiShield className="text-[#FFD700]" size={18} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Account Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-400" size={20} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Email Verified</span>
                </div>
                <span className="text-xs text-green-400 font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-400" size={20} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>KYC Status</span>
                </div>
                <span className="text-xs text-green-400 font-medium">Approved</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiAward className="text-[#FFD700]" size={20} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Account Tier</span>
                </div>
                <span className="text-xs text-[#FFD700] font-medium">Gold</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
                <FiShield className="text-[#FFD700]" size={18} />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Security</h3>
            </div>
            <div className="space-y-3">
              <button className={`w-full flex items-center justify-between p-4 ${isDark ? "bg-[#111] hover:bg-[#1a1a1a]" : "bg-gray-50 hover:bg-gray-100"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} transition-colors`}>
                <div className="flex items-center gap-3">
                  <FiShield className={isDark ? "text-gray-400" : "text-gray-500"} size={18} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Change Password</span>
                </div>
                <FiChevronDown className={`${isDark ? "text-gray-500" : "text-gray-400"} -rotate-90`} size={18} />
              </button>
              <button className={`w-full flex items-center justify-between p-4 ${isDark ? "bg-[#111] hover:bg-[#1a1a1a]" : "bg-gray-50 hover:bg-gray-100"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} transition-colors`}>
                <div className="flex items-center gap-3">
                  <FiSmartphone className={isDark ? "text-gray-400" : "text-gray-500"} size={18} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Two-Factor Auth</span>
                </div>
                <span className="text-xs text-green-400 font-medium">Enabled</span>
              </button>
              <button className={`w-full flex items-center justify-between p-4 ${isDark ? "bg-[#111] hover:bg-[#1a1a1a]" : "bg-gray-50 hover:bg-gray-100"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} transition-colors`}>
                <div className="flex items-center gap-3">
                  <FiActivity className={isDark ? "text-gray-400" : "text-gray-500"} size={18} />
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Login History</span>
                </div>
                <FiChevronDown className={`${isDark ? "text-gray-500" : "text-gray-400"} -rotate-90`} size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Help Center Tab
  if (activeTab === "help") {
    return (
      <div className={`p-4 lg:p-6 space-y-6 ${isDark ? "" : "bg-gray-50"}`}>
        {/* Help Header */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">
              <FiHelpCircle className="text-black" size={28} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Help Center</h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Get help and support for your trading journey</p>
            </div>
          </div>

          {/* Search */}
          <div className={`flex items-center gap-3 px-4 py-3 ${isDark ? "bg-[#111]" : "bg-gray-100"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
            <FiGlobe className={isDark ? "text-gray-500" : "text-gray-400"} size={20} />
            <input type="text" placeholder="Search for help articles..." className={`flex-1 bg-transparent outline-none ${isDark ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400"}`} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FiMessageSquare, title: "Live Chat", desc: "Chat with support", color: "from-blue-500/20 to-cyan-500/10", iconColor: "text-blue-400" },
            { icon: FiBell, title: "Submit Ticket", desc: "Create support ticket", color: "from-purple-500/20 to-pink-500/10", iconColor: "text-purple-400" },
            { icon: FiFileText, title: "Documentation", desc: "Read our guides", color: "from-green-500/20 to-emerald-500/10", iconColor: "text-green-400" },
            { icon: FiUsers, title: "Community", desc: "Join Discord", color: "from-[#FFD700]/20 to-[#FFA500]/10", iconColor: "text-[#FFD700]" },
          ].map((item, i) => (
            <button key={i} className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#1a1a1a] hover:border-[#FFD700]/30" : "border-gray-200 hover:border-[#FFD700]/50"} p-5 text-left transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 border border-white/10`}>
                <item.icon className={item.iconColor} size={22} />
              </div>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>{item.title}</h3>
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{item.desc}</p>
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              { q: "How do I start a new challenge?", a: "Go to the Challenges tab and select your preferred account size and challenge type." },
              { q: "What are the profit targets?", a: "Phase 1 requires 8% profit, Phase 2 requires 5% profit for 2-step challenges." },
              { q: "How do withdrawals work?", a: "You can request withdrawals from your funded account once you meet the minimum trading requirements." },
              { q: "What is the maximum drawdown?", a: "The maximum drawdown limit is 10% of your initial account balance." },
              { q: "Can I trade news events?", a: "Yes, news trading is allowed on all challenge types." },
            ].map((faq, i) => (
              <div key={i} className={`p-4 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"}`}>
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{faq.q}</p>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-[#FFD700]/30"} p-6`}>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>Contact Us</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className={`p-4 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
              <FiBell className="text-[#FFD700] mx-auto mb-2" size={24} />
              <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Email</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>support@pipzen.com</p>
            </div>
            <div className={`p-4 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
              <FiMessageSquare className="text-[#FFD700] mx-auto mb-2" size={24} />
              <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Live Chat</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>24/7 Available</p>
            </div>
            <div className={`p-4 ${isDark ? "bg-[#111]" : "bg-gray-50"} rounded-xl border ${isDark ? "border-[#1a1a1a]" : "border-gray-200"} text-center`}>
              <FiUsers className="text-[#FFD700] mx-auto mb-2" size={24} />
              <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Discord</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Join Community</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Overview
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Challenge Status Banner - Glassmorphism */}
      <div className={`${isDark ? "bg-[#0a0a0a]/60" : "bg-white/80"} backdrop-blur-xl rounded-2xl border ${colors.border} p-5 relative overflow-hidden hover:border-[#FFD700]/40 transition-all duration-500 group`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl group-hover:bg-[#FFD700]/15 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-[#FFD700] text-black text-xs font-bold rounded-lg">
                {challengeData.phase.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 text-sm font-medium">{challengeData.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-green-400">Trading Days:</span>
              <span className={`${colors.text} font-bold text-lg`}>{challengeData.daysActive}</span>
            </div>
          </div>

          {/* Progress Bars Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Profit Target */}
            <div className={`${isDark ? "bg-[#0a0a0a]/50" : "bg-gray-50/80"} backdrop-blur-sm rounded-xl p-4 border ${colors.borderLight} hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`${colors.textSecondary} text-sm`}>Profit Target</span>
                <span className="text-[#FFD700] text-xs font-semibold">{challengeData.profitTarget}% target</span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className={`text-2xl font-bold ${colors.text}`}>{challengeData.currentProfitPercent.toFixed(1)}%</span>
                <span className="text-green-500 text-sm">+${challengeData.currentProfit.toLocaleString()}</span>
              </div>
              <div className={`h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full overflow-hidden`}>
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-[#FFD700] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((challengeData.currentProfitPercent / challengeData.profitTarget) * 100, 100)}%` }}
                />
              </div>
              <p className={`text-xs ${colors.textMuted} mt-2`}>
                ${(challengeData.profitTargetAmount - challengeData.currentProfit).toLocaleString()} to target
              </p>
            </div>

            {/* Max Drawdown */}
            <div className={`${isDark ? "bg-[#0a0a0a]/50" : "bg-gray-50/80"} backdrop-blur-sm rounded-xl p-4 border ${colors.borderLight} hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`${colors.textSecondary} text-sm`}>Max Drawdown</span>
                <span className={`text-xs font-semibold ${challengeData.currentDrawdown > 7 ? "text-red-500" : challengeData.currentDrawdown > 5 ? "text-orange-500" : "text-green-500"}`}>
                  {challengeData.maxDrawdown}% limit
                </span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className={`text-2xl font-bold ${colors.text}`}>{challengeData.currentDrawdown}%</span>
                <span className={`text-sm ${challengeData.currentDrawdown > 7 ? "text-red-500" : "text-green-500"}`}>
                  {(challengeData.maxDrawdown - challengeData.currentDrawdown).toFixed(1)}% remaining
                </span>
              </div>
              <div className={`h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    challengeData.currentDrawdown > 7 ? "bg-red-500" :
                    challengeData.currentDrawdown > 5 ? "bg-orange-500" : "bg-green-500"
                  }`}
                  style={{ width: `${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 100}%` }}
                />
              </div>
              <p className={`text-xs ${colors.textMuted} mt-2`}>
                ${(challengeData.maxDrawdownAmount * (1 - challengeData.currentDrawdown / challengeData.maxDrawdown)).toLocaleString()} buffer left
              </p>
            </div>

            {/* Daily Loss Limit */}
            <div className={`${isDark ? "bg-[#0a0a0a]/50" : "bg-gray-50/80"} backdrop-blur-sm rounded-xl p-4 border ${colors.borderLight} hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`${colors.textSecondary} text-sm`}>Daily Loss Limit</span>
                <span className={`text-xs font-semibold ${challengeData.currentDailyLoss > 3 ? "text-red-500" : "text-green-500"}`}>
                  {challengeData.dailyLossLimit}% limit
                </span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className={`text-2xl font-bold ${colors.text}`}>{challengeData.currentDailyLoss}%</span>
                <span className="text-green-500 text-sm">
                  {(challengeData.dailyLossLimit - challengeData.currentDailyLoss).toFixed(1)}% remaining
                </span>
              </div>
              <div className={`h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    challengeData.currentDailyLoss > 3 ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${(challengeData.currentDailyLoss / challengeData.dailyLossLimit) * 100}%` }}
                />
              </div>
              <p className={`text-xs ${colors.textMuted} mt-2`}>
                ${(challengeData.dailyLossAmount * (1 - challengeData.currentDailyLoss / challengeData.dailyLossLimit)).toLocaleString()} can risk today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 1: Charts Row - EXPANDED EQUITY CURVE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Multi-line Performance Chart - EXPANDED */}
        <div
          onClick={() => setExpandedCard("equity")}
          className={`lg:col-span-2 ${isDark ? "bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60" : "bg-gradient-to-br from-white/90 to-gray-50/80"} backdrop-blur-xl rounded-2xl border ${colors.border} p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] group relative overflow-hidden cursor-pointer`}
        >
          {/* Animated glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFD700]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />

          {/* Chart Header with Values */}
          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-green-400" size={24} style={{ filter: "drop-shadow(0 0 6px #22c55e)" }} />
              <div>
                <p className={`${colors.text} font-semibold`}>EQUITY CURVE</p>
                <p className={`text-xs ${colors.textMuted}`}>Click to expand full view</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[#FFD700] font-bold text-2xl">${currentBalance.toLocaleString()}</p>
              <FiMaximize2 className={`${colors.textMuted} group-hover:text-[#FFD700] transition-colors`} size={18} />
            </div>
          </div>

          {/* Legend with live values - ENHANCED */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs relative">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.1)]">
              <div className="w-3 h-3 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
              <span className="text-[#FFD700] font-medium">Equity</span>
              <span className={`${colors.text} font-bold text-sm`}>${(currentBalance/1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]" />
              <span className="text-green-400 font-medium">Target</span>
              <span className={`${colors.text} font-bold text-sm`}>$55K</span>
              <span className="text-green-400 text-[10px]">(+10%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              <span className="text-red-400 font-medium">DD Limit</span>
              <span className={`${colors.text} font-bold text-sm`}>$45K</span>
              <span className="text-red-400 text-[10px]">(-10%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-blue-400 font-medium">Daily DD</span>
              <span className={`${colors.text} font-bold text-sm`}>$47.5K</span>
              <span className="text-blue-400 text-[10px]">(-5%)</span>
            </div>
          </div>

          {/* SVG Line Chart - SMOOTH HOVER */}
          <div
            className="h-44 relative cursor-crosshair"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
          >
            <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="300" y2="20" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="0.5" />
              <line x1="0" y1="40" x2="300" y2="40" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="0.5" />
              <line x1="0" y1="60" x2="300" y2="60" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="0.5" />
              <line x1="0" y1="80" x2="300" y2="80" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="0.5" />
              <line x1="0" y1="100" x2="300" y2="100" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="0.5" />
              {/* Target line - Green with label */}
              <line x1="0" y1="15" x2="300" y2="15" stroke="#22c55e" strokeWidth="2" strokeDasharray="8,4" />
              <text x="305" y="18" fill="#22c55e" fontSize="8" fontWeight="bold">TARGET</text>
              {/* Daily DD line - Blue */}
              <line x1="0" y1="75" x2="300" y2="75" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="305" y="78" fill="#3b82f6" fontSize="7">DAILY</text>
              {/* Max DD Limit line - Red with label */}
              <line x1="0" y1="105" x2="300" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4" />
              <text x="305" y="108" fill="#ef4444" fontSize="8" fontWeight="bold">MAX DD</text>
              {/* Starting balance line */}
              <line x1="0" y1="60" x2="300" y2="60" stroke="#ffffff" strokeWidth="1" strokeDasharray="2,6" strokeOpacity="0.3" />
              {/* Equity curve - Using real data points */}
              <polyline
                fill="none"
                stroke="#FFD700"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={equityData.map((d, i) => `${(i / 29) * 300},${d.y}`).join(' ')}
              />
              {/* Area fill */}
              <polygon
                fill="url(#goldGradientExpanded)"
                points={`${equityData.map((d, i) => `${(i / 29) * 300},${d.y}`).join(' ')} 300,120 0,120`}
              />
              {/* Hover indicator - simplified for performance */}
              {chartHover && (
                <g>
                  <line
                    x1={chartHover.x} y1={0} x2={chartHover.x} y2={120}
                    stroke="#FFD700" strokeWidth="1" opacity="0.5"
                  />
                  <circle
                    cx={chartHover.x} cy={chartHover.y} r="5"
                    fill="#FFD700"
                  />
                  <circle
                    cx={chartHover.x} cy={chartHover.y} r="8"
                    fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5"
                  />
                </g>
              )}
              {/* Current position dot */}
              <circle cx="300" cy={equityData[29]?.y || 22} r="5" fill="#FFD700" />
              <circle cx="300" cy={equityData[29]?.y || 22} r="8" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
              <defs>
                <linearGradient id="goldGradientExpanded" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#FFD700" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Hover Tooltip - simplified for performance */}
            {chartHover && (
              <div
                className="absolute bg-[#0a0a0a] border border-[#FFD700]/40 rounded-lg p-2.5 z-20 pointer-events-none"
                style={{
                  left: `${Math.min(Math.max(chartHover.x / 3, 5), 65)}%`,
                  top: "8px",
                  transform: "translateX(-50%)"
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FFD700] font-bold text-sm">Day {chartHover.day}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${chartHover.pnl >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {chartHover.percentGain >= 0 ? '+' : ''}{chartHover.percentGain.toFixed(2)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equity:</span>
                    <span className="text-white font-bold">${chartHover.equity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">P&L:</span>
                    <span className={`font-bold ${chartHover.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {chartHover.pnl >= 0 ? '+' : ''}${chartHover.pnl.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To Target:</span>
                    <span className="text-[#FFD700] font-bold">${(55000 - chartHover.equity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">DD Buffer:</span>
                    <span className="text-orange-400 font-bold">${(chartHover.equity - 45000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 font-medium">
              <span className="text-green-400">$55K</span>
              <span>$52.5K</span>
              <span className="text-white">$50K</span>
              <span className="text-blue-400">$47.5K</span>
              <span className="text-red-400">$45K</span>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-3 px-4">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>Today</span>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#1a1a1a]">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">To Target</p>
              <p className="text-green-400 font-black text-sm">${(55000 - currentBalance).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">DD Buffer</p>
              <p className="text-[#FFD700] font-black text-sm">${(currentBalance - 45000).toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Today P&L</p>
              <p className="text-green-400 font-black text-sm">+$342</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total P&L</p>
              <p className="text-green-400 font-black text-sm">+${totalPnL.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Stacked Cards */}
        <div className="space-y-4">
          {/* Account Balance Card - Expandable */}
          <div
            onClick={() => setExpandedCard("balance")}
            className={`${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] cursor-pointer group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiDollarSign className="text-[#FFD700]" size={20} />
                  <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"} font-bold tracking-widest uppercase`}>ACCOUNT BALANCE</p>
                </div>
                <p className="text-3xl font-black text-[#FFD700] tracking-tight">${(currentBalance / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-400 font-bold mt-1">+${totalPnL.toLocaleString()} ({((totalPnL/50000)*100).toFixed(1)}%)</p>
              </div>
              <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
            </div>
          </div>

          {/* Total Trades Card - Expandable */}
          <div
            onClick={() => setExpandedCard("trades")}
            className={`${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] cursor-pointer group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiZap className="text-[#FFD700]" size={20} />
                  <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"} font-bold tracking-widest uppercase`}>TOTAL TRADES</p>
                </div>
                <p className={`text-3xl font-black ${isDark ? "text-white" : "text-gray-900"} tracking-tight`}>{totalTrades}</p>
                <p className="text-xs text-[#FFD700] font-bold mt-1">{winRate}% win rate</p>
              </div>
              <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end justify-between h-10 gap-1 mt-3">
              {[65, 45, 80, 55, 70, 40, 85, 60].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#FFD700] rounded-t"
                  style={{ height: `${height}%`, opacity: 0.5 + (height / 100) * 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Middle Row - Progress Circles, Calendar, Session Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Circular Progress Gauges - SHARP & CLEAN */}
        <div
          onClick={() => setExpandedCard("metrics")}
          className={`lg:col-span-4 ${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-5 hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] relative overflow-hidden cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold flex items-center gap-2 tracking-wide`}>
              <FiBarChart2 className="text-[#FFD700]" size={18} /> KEY METRICS
            </p>
            <FiMaximize2 className="text-gray-500 hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3">
            {/* Profit Target Gauge */}
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300 cursor-pointer`}>
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="5" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#FFD700"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${(challengeData.currentProfitPercent / challengeData.profitTarget) * 151} 151`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-[#FFD700]">
                  {Math.round((challengeData.currentProfitPercent / challengeData.profitTarget) * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold text-sm tracking-wide`}>PROFIT TARGET</p>
                  <span className="text-[#FFD700] text-[10px] font-black bg-[#FFD700]/20 px-1.5 py-0.5 rounded"><FiTarget size={10} /></span>
                </div>
                <p className="text-xs text-[#FFD700] font-semibold mt-0.5">{challengeData.currentProfitPercent.toFixed(1)}% / {challengeData.profitTarget}%</p>
                <div className={`w-full h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full mt-2 overflow-hidden`}>
                  <div className="h-full bg-[#FFD700] rounded-full" style={{ width: `${(challengeData.currentProfitPercent / challengeData.profitTarget) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Win Rate Gauge */}
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border border-green-500/20 hover:border-green-500/40 transition-all duration-300 cursor-pointer`}>
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="5" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#22c55e"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${(winRate / 100) * 151} 151`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-green-500">
                  {winRate}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold text-sm tracking-wide`}>WIN RATE</p>
                  <span className="text-green-500 text-[10px] font-black bg-green-500/20 px-1.5 py-0.5 rounded"><FiCheckCircle size={10} /></span>
                </div>
                <p className="text-xs text-green-500 font-semibold mt-0.5">{Math.round(totalTrades * winRate / 100)} wins of {totalTrades}</p>
                <div className={`w-full h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full mt-2 overflow-hidden`}>
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${winRate}%` }} />
                </div>
              </div>
            </div>

            {/* Drawdown Gauge */}
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-50"} border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 cursor-pointer`}>
              <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="5" fill="none" />
                  <circle
                    cx="28" cy="28" r="24"
                    stroke="#f97316"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 151} 151`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-orange-500">
                  {Math.round((challengeData.currentDrawdown / challengeData.maxDrawdown) * 100)}%
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`${isDark ? "text-white" : "text-gray-900"} font-bold text-sm tracking-wide`}>DRAWDOWN</p>
                  <span className="text-orange-500 text-[10px] font-black bg-orange-500/20 px-1.5 py-0.5 rounded"><FiAlertTriangle size={10} /></span>
                </div>
                <p className="text-xs text-orange-500 font-semibold mt-0.5">{challengeData.currentDrawdown}% / {challengeData.maxDrawdown}% max</p>
                <div className={`w-full h-2 ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"} rounded-full mt-2 overflow-hidden`}>
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(challengeData.currentDrawdown / challengeData.maxDrawdown) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Calendar - Redesigned to match reference */}
        <div className="lg:col-span-8">
          <PnLCalendar data={calendarData} isDark={isDark} />
        </div>
      </div>

      {/* ROW 3: Big Stats Row - SHARP & CLEAN */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "BALANCE", value: `$${(currentBalance / 1000).toFixed(1)}K`, color: "#FFD700", Icon: FiDollarSign, pulse: true },
          { label: "PROFIT", value: `+$${(totalPnL / 1000).toFixed(1)}K`, color: "#22c55e", Icon: FiTrendingUp, pulse: false },
          { label: "TRADES", value: totalTrades.toString(), color: "#FFD700", Icon: FiZap, pulse: false },
          { label: "WIN RATE", value: `${winRate}%`, color: "#22c55e", Icon: FiTarget, pulse: true },
          { label: "AVG WIN", value: "$187", color: "#22c55e", Icon: FiCheckCircle, pulse: false },
          { label: "AVG LOSS", value: "$89", color: "#ef4444", Icon: FiTrendingDown, pulse: false },
        ].map((stat, i) => (
          <div key={i} className={`${isDark ? "bg-[#0a0a0a]" : "bg-white"} rounded-2xl border ${isDark ? "border-[#FFD700]/20" : "border-gray-200"} p-4 text-center relative overflow-hidden hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] cursor-pointer group`}>
            {/* Background glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)` }}
            />
            <div className="relative">
              {/* Icon */}
              <div className="mb-3 flex justify-center">
                <stat.Icon size={22} style={{ color: stat.color }} />
              </div>
              {/* Circular progress ring */}
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="42" stroke={isDark ? "#1a1a1a" : "#e5e7eb"} strokeWidth="4" fill="none" />
                  <circle
                    cx="48" cy="48" r="42"
                    stroke={stat.color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * ((i + 1) * 15) / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-black tracking-tight whitespace-nowrap" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              </div>
              <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"} font-bold tracking-widest uppercase`}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ROW 4: Bottom Stats with Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Session Distribution - ENHANCED */}
        <div
          onClick={() => setExpandedCard("sessions")}
          className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden group cursor-pointer"
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl group-hover:bg-[#FFD700]/10 transition-all duration-500" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiGlobe className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">SESSION PERFORMANCE</p>
            </div>
            <FiMaximize2 className="text-gray-500 group-hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3 relative">
            {[
              { session: "London", trades: 45, winRate: 72, color: "#FFD700", abbr: "UK", gradient: "from-[#FFD700] to-[#FFA500]" },
              { session: "New York", trades: 38, winRate: 68, color: "#22c55e", abbr: "US", gradient: "from-green-500 to-emerald-400" },
              { session: "Asian", trades: 28, winRate: 64, color: "#3b82f6", abbr: "AS", gradient: "from-blue-500 to-cyan-400" },
              { session: "Sydney", trades: 16, winRate: 56, color: "#a855f7", abbr: "AU", gradient: "from-purple-500 to-pink-400" },
            ].map((session, i) => (
              <div key={i} className="p-2 bg-[#0a0a0a]/50 rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 cursor-pointer group/item">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${session.color}20`, color: session.color }}>{session.abbr}</span>
                    <span className="text-white font-medium text-sm">{session.session}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">{session.trades}t</span>
                    <span className="text-xs font-bold" style={{ color: session.color }}>{session.winRate}%</span>
                  </div>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${session.gradient} transition-all duration-500 group-hover/item:shadow-[0_0_10px_rgba(255,215,0,0.3)]`}
                    style={{ width: `${session.winRate}%` }}
                  />
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Symbol Performance Bars - ENHANCED */}
        <div
          onClick={() => setExpandedCard("symbols")}
          className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden cursor-pointer"
        >
          {/* Background accent */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiActivity className="text-green-400" size={20} />
              <p className="text-white font-semibold">SYMBOL PERFORMANCE</p>
            </div>
            <FiMaximize2 className="text-gray-500 hover:text-[#FFD700] transition-colors" size={16} />
          </div>

          <div className="space-y-3 relative">
            {symbolStats.slice(0, 5).map((symbol, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FFD700]/5 transition-all duration-300 cursor-pointer group">
                {/* Rank badge */}
                <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-[#FFD700]/20 text-[#FFD700]" : i === 1 ? "bg-gray-500/20 text-gray-400" : "bg-[#1a1a1a] text-gray-500"}`}>
                  {i + 1}
                </div>
                <span className="text-sm text-white font-medium w-20">{symbol.symbol}</span>
                <div className="flex-1 h-8 bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    style={{
                      width: `${Math.max((symbol.pnl / 3500) * 100, 5)}%`,
                      background: symbol.pnl >= 0 ? "linear-gradient(90deg, #22c55e60, #22c55e)" : "linear-gradient(90deg, #ef444460, #ef4444)"
                    }}
                  />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-[10px] text-gray-400">{symbol.winRate}% win</span>
                    <span className={`text-xs font-bold ${symbol.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid - ENHANCED */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiFileText className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">QUICK STATS</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
            {[
              { label: "Profit Factor", value: "2.34", color: "#FFD700", Icon: FiPercent, good: true },
              { label: "Best Trade", value: "$1,110", color: "#22c55e", Icon: FiAward, good: true },
              { label: "Worst Trade", value: "-$310", color: "#ef4444", Icon: FiTrendingDown, good: false },
              { label: "Avg RRR", value: "1:2.1", color: "#FFD700", Icon: FiTarget, good: true },
              { label: "Sharpe Ratio", value: "1.85", color: "#22c55e", Icon: FiSliders, good: true },
              { label: "Expectancy", value: "$98", color: "#FFD700", Icon: FiDollarSign, good: true },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-gradient-to-br from-[#111]/80 to-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:scale-105 cursor-pointer group relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex justify-center mb-1"><stat.Icon size={18} style={{ color: stat.color }} /></div>
                  <p className="text-xl font-bold transition-all duration-300" style={{ color: stat.color, textShadow: `0 0 8px ${stat.color}30` }}>{stat.value}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
                  {stat.good && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 5: Recent Activity - ENHANCED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Trades */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiList className="text-blue-400" size={20} />
              <p className="text-white font-semibold">RECENT TRADES</p>
            </div>
            <span className="text-xs text-[#FFD700] cursor-pointer hover:text-[#FFD700]/80 flex items-center gap-1">View All <FiActivity size={12} /></span>
          </div>

          <div className="space-y-2 relative">
            {sampleTrades.slice(0, 4).map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-[#111]/80 to-transparent backdrop-blur-sm rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 hover:translate-x-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  {/* Animated indicator */}
                  <div className={`w-1.5 h-12 rounded-full relative overflow-hidden ${trade.pnl >= 0 ? "bg-green-500/30" : "bg-red-500/30"}`}>
                    <div className={`absolute bottom-0 w-full rounded-full transition-all duration-500 group-hover:h-full ${trade.pnl >= 0 ? "bg-green-500 h-3/4" : "bg-red-500 h-1/2"}`} style={{ boxShadow: trade.pnl >= 0 ? "0 0 10px #22c55e" : "0 0 10px #ef4444" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium text-sm">{trade.symbol}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${trade.type === "LONG" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {trade.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{trade.entryTime} · {trade.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`} style={{ textShadow: trade.pnl >= 0 ? "0 0 8px #22c55e50" : "0 0 8px #ef444450" }}>
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                  </p>
                  <p className={`text-xs ${trade.pnl >= 0 ? "text-green-400/70" : "text-red-400/70"}`}>
                    {trade.pnl >= 0 ? "+" : ""}{trade.pnlPercent}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 backdrop-blur-xl rounded-2xl border border-[#FFD700]/20 p-5 hover:border-[#FFD700]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <FiAward className="text-[#FFD700]" size={20} />
              <p className="text-white font-semibold">TOP PERFORMERS</p>
            </div>
            <span className="text-xs text-[#FFD700] cursor-pointer hover:text-[#FFD700]/80 flex items-center gap-1">View Stats <FiTrendingUp size={12} /></span>
          </div>

          <div className="space-y-2 relative">
            {symbolStats.slice(0, 4).map((symbol, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gradient-to-r from-[#111]/80 to-transparent backdrop-blur-sm rounded-xl border border-transparent hover:border-[#FFD700]/20 transition-all duration-300 hover:bg-[#FFD700]/5 hover:translate-x-1 cursor-pointer group">
                <div className="flex items-center gap-3">
                  {/* Animated rank badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 ${
                    i === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]" :
                    i === 1 ? "bg-gradient-to-br from-gray-400 to-gray-500 text-black shadow-[0_0_10px_rgba(156,163,175,0.3)]" :
                    i === 2 ? "bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-[0_0_10px_rgba(180,83,9,0.3)]" :
                    "bg-[#1a1a1a] text-gray-400"
                  }`}>
                    #{i + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{symbol.symbol}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{symbol.trades} trades</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className="text-green-400">{symbol.winRate}% win</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${symbol.pnl >= 0 ? "text-green-500" : "text-red-500"}`} style={{ textShadow: symbol.pnl >= 0 ? "0 0 8px #22c55e50" : "0 0 8px #ef444450" }}>
                    {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                  </p>
                  {i === 0 && <span className="text-[10px] text-[#FFD700] flex items-center gap-0.5"><FiTrendingUp size={10} /> Hot</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4" onClick={() => setSelectedDay(null)}>
          <div
            className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] rounded-2xl border border-[#FFD700]/30 p-6 max-w-md w-full shadow-[0_0_60px_rgba(255,215,0,0.2)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFD700]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              onClick={() => setSelectedDay(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all duration-300 z-10"
            >
              <FiX className="text-gray-400 hover:text-white" size={16} />
            </button>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDay.pnl >= 0 ? "bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30" : "bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30"}`}>
                  {selectedDay.pnl >= 0 ? (
                    <FiCheckCircle className="text-green-500" size={24} />
                  ) : (
                    <FiXCircle className="text-red-500" size={24} />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {new Date(selectedDay.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </p>
                  <p className={`text-sm font-medium ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {selectedDay.pnl >= 0 ? "Profitable Day" : "Loss Day"}
                  </p>
                </div>
              </div>

              {/* Main P&L Display */}
              <div className={`text-center py-6 px-4 rounded-xl mb-6 ${selectedDay.pnl >= 0 ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <p className="text-gray-400 text-sm mb-1">Day P&L</p>
                <p className={`text-4xl font-bold ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {selectedDay.pnl >= 0 ? "+" : ""}${Math.abs(selectedDay.pnl).toLocaleString()}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {selectedDay.pnl >= 0 ? "+" : ""}{((selectedDay.pnl / 50000) * 100).toFixed(2)}% of starting balance
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#1a1a1a]/80 rounded-xl p-4 border border-[#FFD700]/10">
                  <p className="text-gray-400 text-xs">Trades Taken</p>
                  <p className="text-[#FFD700] text-2xl font-bold">{selectedDay.trades}</p>
                </div>
                <div className="bg-[#1a1a1a]/80 rounded-xl p-4 border border-[#FFD700]/10">
                  <p className="text-gray-400 text-xs">Avg Per Trade</p>
                  <p className={`text-2xl font-bold ${selectedDay.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${Math.abs(Math.round(selectedDay.pnl / selectedDay.trades))}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Session</span>
                  <span className="text-white font-medium">London/NY</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Win Rate</span>
                  <span className={`font-medium ${selectedDay.pnl >= 0 ? "text-green-500" : "text-orange-500"}`}>
                    {selectedDay.pnl >= 0 ? Math.round(60 + Math.random() * 30) : Math.round(20 + Math.random() * 30)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Best Trade</span>
                  <span className="text-green-500 font-medium">+${Math.round(Math.abs(selectedDay.pnl) * 0.6)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Worst Trade</span>
                  <span className="text-red-500 font-medium">-${Math.round(Math.abs(selectedDay.pnl) * 0.2)}</span>
                </div>
              </div>

              {/* Footer Action */}
              <button
                onClick={() => setSelectedDay(null)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300"
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Card Modals */}
      {expandedCard && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[200] p-4" onClick={() => setExpandedCard(null)}>
          <div
            className="bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] rounded-2xl border border-[#FFD700]/30 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_80px_rgba(255,215,0,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setExpandedCard(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center hover:border-[#FFD700]/50 hover:bg-[#FFD700]/10 transition-all duration-300 z-10"
            >
              <FiX className="text-gray-400 hover:text-white" size={20} />
            </button>

            {/* Equity Curve Expanded */}
            {expandedCard === "equity" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FiTrendingUp className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Equity Curve Analysis</h2>
                    <p className="text-gray-400">Detailed performance over time</p>
                  </div>
                </div>

                {/* Main Chart */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-6 border border-[#FFD700]/10 mb-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30">
                      <div className="w-4 h-4 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700]" />
                      <span className="text-[#FFD700] font-medium">Equity</span>
                      <span className="text-white font-bold">${currentBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <span className="text-green-400 font-medium">Profit Target</span>
                      <span className="text-white font-bold">$55,000</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/30">
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                      <span className="text-red-400 font-medium">Max DD Limit</span>
                      <span className="text-white font-bold">$45,000</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      <span className="text-blue-400 font-medium">Daily DD</span>
                      <span className="text-white font-bold">$47,500</span>
                    </div>
                  </div>

                  {/* Large Chart */}
                  <div className="h-80 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      {/* Grid */}
                      {[0, 40, 80, 120, 160, 200].map((y) => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1a1a1a" strokeWidth="1" />
                      ))}
                      {/* Target line */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#22c55e" strokeWidth="2" strokeDasharray="10,5" />
                      <text x="405" y="24" fill="#22c55e" fontSize="10" fontWeight="bold">TARGET $55K</text>
                      {/* Starting line */}
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#ffffff" strokeWidth="1" strokeDasharray="5,10" strokeOpacity="0.3" />
                      <text x="405" y="104" fill="#ffffff" fontSize="10" opacity="0.5">START $50K</text>
                      {/* Daily DD */}
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                      <text x="405" y="154" fill="#3b82f6" fontSize="10">DAILY $47.5K</text>
                      {/* Max DD */}
                      <line x1="0" y1="180" x2="400" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" />
                      <text x="405" y="184" fill="#ef4444" fontSize="10" fontWeight="bold">MAX DD $45K</text>
                      {/* Equity curve */}
                      <polyline
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="3"
                        points="0,100 20,98 40,95 60,90 80,92 100,88 120,85 140,80 160,82 180,78 200,75 220,70 240,68 260,65 280,67 300,62 320,58 340,55 360,52 380,48 400,45"
                        style={{ filter: "drop-shadow(0 0 8px #FFD700)" }}
                      />
                      <polygon
                        fill="url(#modalGradient)"
                        points="0,100 20,98 40,95 60,90 80,92 100,88 120,85 140,80 160,82 180,78 200,75 220,70 240,68 260,65 280,67 300,62 320,58 340,55 360,52 380,48 400,45 400,200 0,200"
                      />
                      <circle cx="400" cy="45" r="8" fill="#FFD700" style={{ filter: "drop-shadow(0 0 12px #FFD700)" }} />
                      <defs>
                        <linearGradient id="modalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Current Balance", value: `$${currentBalance.toLocaleString()}`, color: "#FFD700", Icon: FiDollarSign },
                    { label: "Total P&L", value: `+$${totalPnL.toLocaleString()}`, color: "#22c55e", Icon: FiTrendingUp },
                    { label: "To Target", value: `$${(55000 - currentBalance).toLocaleString()}`, color: "#22c55e", Icon: FiTarget },
                    { label: "DD Buffer", value: `$${(currentBalance - 45000).toLocaleString()}`, color: "#f97316", Icon: FiShield },
                    { label: "Max Drawdown", value: "4.8%", color: "#f97316", Icon: FiTrendingDown },
                    { label: "Peak Equity", value: `$${(currentBalance + 200).toLocaleString()}`, color: "#FFD700", Icon: FiArrowUp },
                    { label: "Lowest Point", value: "$48,500", color: "#ef4444", Icon: FiArrowDown },
                    { label: "Recovery Factor", value: "2.4x", color: "#22c55e", Icon: FiRefreshCw },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-4 border border-[#FFD700]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <stat.Icon size={16} style={{ color: stat.color }} />
                        <span className="text-xs text-gray-400">{stat.label}</span>
                      </div>
                      <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Balance Expanded */}
            {expandedCard === "balance" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiDollarSign className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Account Balance Details</h2>
                    <p className="text-gray-400">Complete financial overview</p>
                  </div>
                </div>

                {/* Main Balance Display */}
                <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-xl p-8 border border-[#FFD700]/20 mb-6 text-center">
                  <p className="text-gray-400 mb-2">Current Account Balance</p>
                  <p className="text-5xl font-bold text-[#FFD700] mb-4">${currentBalance.toLocaleString()}</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-green-400 text-lg">+${totalPnL.toLocaleString()}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-green-400 text-lg">+{((totalPnL/50000)*100).toFixed(2)}%</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FiDollarSign className="text-[#FFD700]" /> Balance Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Starting Balance</span><span className="text-white">$50,000</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Realized P&L</span><span className="text-green-400">+${totalPnL.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Unrealized P&L</span><span className="text-green-400">+$0</span></div>
                      <div className="border-t border-[#FFD700]/10 pt-3 flex justify-between"><span className="text-white font-medium">Total Equity</span><span className="text-[#FFD700] font-bold">${currentBalance.toLocaleString()}</span></div>
                    </div>
                  </div>
                  <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FiTarget className="text-green-500" /> Challenge Progress
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Profit Target</span><span className="text-[#FFD700]">$55,000 (10%)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current Progress</span><span className="text-green-400">{((totalPnL/5000)*100).toFixed(1)}%</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Remaining</span><span className="text-white">${(5000 - totalPnL).toLocaleString()}</span></div>
                      <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FFD700] to-green-500 rounded-full" style={{ width: `${(totalPnL/5000)*100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily P&L History */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                  <h3 className="text-white font-semibold mb-4">Recent P&L History</h3>
                  <div className="space-y-2">
                    {[
                      { date: "Today", pnl: 342, balance: currentBalance },
                      { date: "Yesterday", pnl: -128, balance: currentBalance - 342 },
                      { date: "Jan 25", pnl: 567, balance: currentBalance - 342 + 128 },
                      { date: "Jan 24", pnl: 289, balance: currentBalance - 342 + 128 - 567 },
                      { date: "Jan 23", pnl: -89, balance: currentBalance - 342 + 128 - 567 - 289 },
                    ].map((day, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#111]/50 rounded-lg">
                        <span className="text-gray-400">{day.date}</span>
                        <span className={day.pnl >= 0 ? "text-green-400" : "text-red-400"}>{day.pnl >= 0 ? "+" : ""}${day.pnl}</span>
                        <span className="text-white">${day.balance.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trades Expanded */}
            {expandedCard === "trades" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiZap className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Trading Statistics</h2>
                    <p className="text-gray-400">Complete trade analysis</p>
                  </div>
                </div>

                {/* Main Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Trades", value: totalTrades.toString(), color: "#FFD700" },
                    { label: "Win Rate", value: `${winRate}%`, color: "#22c55e" },
                    { label: "Profit Factor", value: "2.34", color: "#22c55e" },
                    { label: "Avg RRR", value: "1:2.1", color: "#FFD700" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-[#0a0a0a]/80 to-[#111]/60 rounded-xl p-5 border border-[#FFD700]/10 text-center">
                      <p className="text-3xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Win/Loss Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-500/5 rounded-xl p-5 border border-green-500/20">
                    <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                      <FiCheckCircle /> Winning Trades
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Total Wins</span><span className="text-green-400">{Math.round(totalTrades * winRate / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Gross Profit</span><span className="text-green-400">+$8,420</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Avg Win</span><span className="text-green-400">+$187</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Largest Win</span><span className="text-green-400">+$1,110</span></div>
                    </div>
                  </div>
                  <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/20">
                    <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                      <FiXCircle /> Losing Trades
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Total Losses</span><span className="text-red-400">{Math.round(totalTrades * (100 - winRate) / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Gross Loss</span><span className="text-red-400">-$3,600</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Avg Loss</span><span className="text-red-400">-$89</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Largest Loss</span><span className="text-red-400">-$310</span></div>
                    </div>
                  </div>
                </div>

                {/* Recent Trades Table */}
                <div className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                  <h3 className="text-white font-semibold mb-4">Recent Trades</h3>
                  <div className="space-y-2">
                    {sampleTrades.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-[#111]/50 rounded-lg hover:bg-[#FFD700]/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full ${trade.pnl >= 0 ? "bg-green-500" : "bg-red-500"}`} />
                          <div>
                            <p className="text-white font-medium">{trade.symbol}</p>
                            <p className="text-xs text-gray-500">{trade.type} · {trade.size} lots</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Entry</p>
                          <p className="text-white">{trade.entryPrice}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Exit</p>
                          <p className="text-white">{trade.exitPrice}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${trade.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                          </p>
                          <p className="text-xs text-gray-500">{trade.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Expanded */}
            {expandedCard === "metrics" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <FiBarChart2 className="text-[#FFD700]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Key Metrics Details</h2>
                    <p className="text-gray-400">In-depth performance metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Profit Target */}
                  <div className="bg-[#FFD700]/5 rounded-xl p-6 border border-[#FFD700]/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#FFD700] font-semibold">Profit Target</h3>
                      <span className="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded flex items-center gap-1"><FiTarget size={10} /> TARGET</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#FFD700" strokeWidth="8" fill="none"
                          strokeDasharray={`${((totalPnL/5000) * 352)} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #FFD700)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#FFD700]">{((totalPnL/5000)*100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Target</span><span className="text-white">$5,000 (10%)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current</span><span className="text-green-400">+${totalPnL.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Remaining</span><span className="text-[#FFD700]">${(5000-totalPnL).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="bg-green-500/5 rounded-xl p-6 border border-green-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-green-400 font-semibold">Win Rate</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded flex items-center gap-1"><FiCheckCircle size={10} /> GOOD</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#22c55e" strokeWidth="8" fill="none"
                          strokeDasharray={`${(winRate/100) * 352} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #22c55e)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-400">{winRate}%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Total Trades</span><span className="text-white">{totalTrades}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Wins</span><span className="text-green-400">{Math.round(totalTrades * winRate / 100)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Losses</span><span className="text-red-400">{Math.round(totalTrades * (100-winRate) / 100)}</span></div>
                    </div>
                  </div>

                  {/* Drawdown */}
                  <div className="bg-orange-500/5 rounded-xl p-6 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-orange-400 font-semibold">Drawdown</h3>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded flex items-center gap-1"><FiAlertTriangle size={10} /> WATCH</span>
                    </div>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#1a1a1a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#f97316" strokeWidth="8" fill="none"
                          strokeDasharray={`${(4.8/10) * 352} 352`} strokeLinecap="round"
                          style={{ filter: "drop-shadow(0 0 8px #f97316)" }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-orange-400">48%</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Max Allowed</span><span className="text-white">10% ($5,000)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Current DD</span><span className="text-orange-400">4.8% ($2,400)</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Buffer Left</span><span className="text-green-400">5.2% ($2,600)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Expanded */}
            {expandedCard === "sessions" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <FiGlobe className="text-blue-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Session Performance</h2>
                    <p className="text-gray-400">Trading performance by market session</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { session: "London", abbr: "UK", trades: 45, wins: 32, pnl: 2450, winRate: 71, avgTrade: 54, color: "#FFD700" },
                    { session: "New York", abbr: "US", trades: 38, wins: 26, pnl: 1890, winRate: 68, avgTrade: 50, color: "#22c55e" },
                    { session: "Asian", abbr: "AS", trades: 28, wins: 18, pnl: 980, winRate: 64, avgTrade: 35, color: "#3b82f6" },
                    { session: "Sydney", abbr: "AU", trades: 16, wins: 9, pnl: 420, winRate: 56, avgTrade: 26, color: "#a855f7" },
                  ].map((session, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${session.color}20`, color: session.color }}>{session.abbr}</div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{session.session} Session</h3>
                          <p className="text-xs text-gray-500">{session.trades} trades executed</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                        <div className="text-center p-2 sm:p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-base sm:text-lg font-bold" style={{ color: session.color }}>{session.winRate}%</p>
                          <p className="text-[10px] text-gray-500">Win Rate</p>
                        </div>
                        <div className="text-center p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-lg font-bold text-green-400">+${session.pnl}</p>
                          <p className="text-[10px] text-gray-500">Total P&L</p>
                        </div>
                        <div className="text-center p-3 bg-[#111]/50 rounded-lg">
                          <p className="text-lg font-bold text-white">${session.avgTrade}</p>
                          <p className="text-[10px] text-gray-500">Avg Trade</p>
                        </div>
                      </div>
                      <div className="h-4 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${session.winRate}%`, background: `linear-gradient(90deg, ${session.color}80, ${session.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Symbols Expanded */}
            {expandedCard === "symbols" && (
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <FiActivity className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Symbol Performance</h2>
                    <p className="text-gray-400">Detailed analysis by trading instrument</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {symbolStats.map((symbol, i) => (
                    <div key={i} className="bg-[#0a0a0a]/50 rounded-xl p-5 border border-[#FFD700]/10 hover:border-[#FFD700]/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                            i === 0 ? "bg-[#FFD700] text-black" : i === 1 ? "bg-gray-400 text-black" : i === 2 ? "bg-amber-700 text-white" : "bg-[#1a1a1a] text-gray-400"
                          }`}>#{i + 1}</div>
                          <div>
                            <p className="text-white font-semibold text-lg">{symbol.symbol}</p>
                            <p className="text-xs text-gray-500">{symbol.trades} trades</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${symbol.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {symbol.pnl >= 0 ? "+" : ""}${symbol.pnl}
                          </p>
                          <p className="text-xs text-gray-500">{symbol.winRate}% win rate</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-white">{symbol.trades}</p>
                          <p className="text-[10px] text-gray-500">Trades</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-green-400">{Math.round(symbol.trades * symbol.winRate / 100)}</p>
                          <p className="text-[10px] text-gray-500">Wins</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-red-400">{Math.round(symbol.trades * (100 - symbol.winRate) / 100)}</p>
                          <p className="text-[10px] text-gray-500">Losses</p>
                        </div>
                        <div className="text-center p-2 bg-[#111]/50 rounded-lg">
                          <p className="text-sm font-bold text-[#FFD700]">${Math.round(symbol.pnl / symbol.trades)}</p>
                          <p className="text-[10px] text-gray-500">Avg P&L</p>
                        </div>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-[#FFD700] rounded-full" style={{ width: `${symbol.winRate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
