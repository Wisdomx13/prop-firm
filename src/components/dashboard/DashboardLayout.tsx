"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiHome,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiCalendar,
  FiBarChart2,
  FiDownload,
  FiGlobe,
  FiGift,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiSun,
  FiMoon,
  FiBook,
  FiHelpCircle,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";
import DashboardContent from "./DashboardContent";
import { useTheme } from "@/context/ThemeContext";

const mainMenuItems = [
  { icon: FiHome, label: "Overview", id: "overview" },
  { icon: FiUsers, label: "Accounts", id: "accounts" },
  { icon: FiAward, label: "Challenges", id: "challenges" },
  { icon: FiBarChart2, label: "Competitions", id: "competitions" },
  { icon: FiTrendingUp, label: "Leaderboard", id: "leaderboard" },
  { icon: FiCalendar, label: "Economic Calendar", id: "calendar" },
];

const accountMenuItems = [
  { icon: FiShield, label: "KYC Verification", id: "kyc" },
  { icon: FiCreditCard, label: "Withdrawal", id: "withdrawal" },
  { icon: FiFileText, label: "Certificates", id: "certificates" },
  { icon: FiCreditCard, label: "Billing History", id: "billing" },
];

const supportMenuItems = [
  { icon: FiBook, label: "Trading Rules", id: "rules" },
  { icon: FiHelpCircle, label: "FAQ", id: "faq" },
  { icon: FiMessageSquare, label: "Support Ticket", id: "support" },
  { icon: FiSettings, label: "Settings", id: "settings" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  // Sample notifications
  const notifications = [
    { id: 1, title: "Challenge Passed!", message: "Congratulations! You've passed Phase 1.", time: "2 mins ago", type: "success", unread: true },
    { id: 2, title: "Withdrawal Processed", message: "Your withdrawal of $1,250 has been sent.", time: "1 hour ago", type: "info", unread: true },
    { id: 3, title: "New Competition", message: "Weekly trading competition starts tomorrow.", time: "3 hours ago", type: "event", unread: false },
    { id: 4, title: "KYC Reminder", message: "Please complete your KYC verification.", time: "1 day ago", type: "warning", unread: false },
  ];

  const referralMenuItem = { icon: FiGift, label: "Referral", id: "referral" };
  const ecosystemMenuItem = { icon: FiGlobe, label: "Ecosystem", id: "ecosystem" };
  const allMenuItems = [...mainMenuItems, ecosystemMenuItem, ...accountMenuItems, ...supportMenuItems, referralMenuItem];

  // Theme-aware colors
  const colors = {
    bg: isDark ? "bg-[#050505]" : "bg-gray-100",
    bgSecondary: isDark ? "bg-[#0a0a0a]" : "bg-white",
    bgCard: isDark ? "bg-[#0a0a0a]/80" : "bg-white/90",
    bgHover: isDark ? "bg-white/5" : "bg-gray-100",
    text: isDark ? "text-white" : "text-gray-900",
    textSecondary: isDark ? "text-gray-400" : "text-gray-600",
    border: isDark ? "border-[#FFD700]/10" : "border-[#FFD700]/30",
    tooltipBg: isDark ? "bg-[#0a0a0a]/90" : "bg-white/95",
    tooltipBorder: isDark ? "border-r-[#0a0a0a]/90" : "border-r-white/95",
  };

  // Handle menu item click - expand sidebar if collapsed
  const handleMenuClick = (id: string) => {
    setActiveTab(id);
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
  };

  return (
    <div className={`min-h-screen ${colors.bg} flex transition-colors duration-300`}>
      {/* Sidebar - Desktop with Glassmorphism */}
      <aside className={`hidden md:flex flex-col ${sidebarCollapsed ? "w-[5vw] min-w-[70px] max-w-[80px]" : "w-[18vw] min-w-[200px] max-w-[260px]"} ${colors.bgCard} backdrop-blur-xl border-r ${colors.border} transition-all duration-300 relative z-[150] overflow-visible`}>
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFD700]/5 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className={`p-4 border-b ${colors.border} relative`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300 overflow-hidden">
              <Image src="/logo.svg" alt="Pipzen" width={40} height={40} className="object-contain" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent tracking-wide">PIPZEN</span>
            )}
          </Link>
        </div>

        {/* Collapse Button - NOW AT TOP */}
        <div className={`p-3 border-b ${colors.border}`}>
          <div className="relative group">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/5 backdrop-blur-sm text-[#FFD700] hover:from-[#FFD700]/20 hover:to-[#FFA500]/10 rounded-xl transition-all duration-300 cursor-pointer border border-[#FFD700]/20 hover:border-[#FFD700]/40 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]`}
            >
              {sidebarCollapsed ? <FiChevronRight size={20} className="animate-pulse" /> : <FiChevronLeft size={20} />}
              {!sidebarCollapsed && <span className="text-sm font-medium">Collapse</span>}
            </button>
            {sidebarCollapsed && (
              <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                Expand Sidebar
                <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-visible scrollbar-thin scrollbar-thumb-[#FFD700]/20 scrollbar-track-transparent">
          {/* MAIN Section */}
          {!sidebarCollapsed && (
            <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
              MAIN
            </p>
          )}
          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                      : `${colors.textSecondary} hover:${colors.text} ${colors.bgHover} border border-transparent hover:border-white/10`
                  }`}
                >
                  <item.icon size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
                {/* Tooltip on hover when collapsed */}
                {sidebarCollapsed && (
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                    {item.label}
                    <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ECOSYSTEM Section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
                ECOSYSTEM
              </p>
            )}
            <div className="space-y-1">
              <div className="relative group">
                <button
                  onClick={() => handleMenuClick("ecosystem")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                    activeTab === "ecosystem"
                      ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                      : `${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10 border border-transparent hover:border-[#FFD700]/30`
                  }`}
                >
                  <FiGlobe size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === "ecosystem" ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                  {!sidebarCollapsed && <span className="text-sm font-medium">Ecosystem</span>}
                </button>
                {/* Tooltip on hover when collapsed */}
                {sidebarCollapsed && (
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                    Ecosystem
                    <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACCOUNT Section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
                ACCOUNT
              </p>
            )}
            <div className="space-y-1">
              {accountMenuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : `${colors.textSecondary} hover:${colors.text} ${colors.bgHover} border border-transparent hover:border-white/10`
                    }`}
                  >
                    <item.icon size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                  {/* Tooltip on hover when collapsed */}
                  {sidebarCollapsed && (
                    <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                      {item.label}
                      <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SUPPORT Section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
                SUPPORT
              </p>
            )}
            <div className="space-y-1">
              {supportMenuItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                        : `${colors.textSecondary} hover:${colors.text} ${colors.bgHover} border border-transparent hover:border-white/10`
                    }`}
                  >
                    <item.icon size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === item.id ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                  {/* Tooltip on hover when collapsed */}
                  {sidebarCollapsed && (
                    <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                      {item.label}
                      <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* REFERRAL Section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">
                REFERRAL
              </p>
            )}
            <div className="relative group">
              <button
                onClick={() => handleMenuClick("referral")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  activeTab === "referral"
                    ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]"
                    : `${colors.textSecondary} hover:${colors.text} ${colors.bgHover} border border-transparent hover:border-white/10`
                }`}
              >
                <FiGift size={20} className={`flex-shrink-0 transition-all duration-300 ${activeTab === "referral" ? "drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" : ""}`} />
                {!sidebarCollapsed && <span className="text-sm font-medium">Referral</span>}
              </button>
              {/* Tooltip on hover when collapsed */}
              {sidebarCollapsed && (
                <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                  Referral
                  <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Sign Out - at bottom */}
        <div className={`p-3 border-t ${colors.border} mt-auto`}>
          <div className="relative group">
            <Link
              href="/signin"
              className={`w-full flex items-center gap-3 px-3 py-2.5 ${colors.textSecondary} hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20`}
            >
              <FiLogOut size={20} className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
            </Link>
            {sidebarCollapsed && (
              <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 ${colors.tooltipBg} backdrop-blur-xl border border-[#FFD700]/20 rounded-lg ${colors.text} text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                Sign Out
                <div className={`absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent ${colors.tooltipBorder}`} />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className={`md:hidden fixed inset-0 ${isDark ? "bg-black/70" : "bg-black/50"} backdrop-blur-md z-[150]`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 w-[75vw] max-w-[280px] ${isDark ? "bg-[#0a0a0a]/95" : "bg-white/95"} backdrop-blur-xl border-r ${colors.border} z-[200] transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${colors.border}`}>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] overflow-hidden">
              <Image src="/logo.svg" alt="Pipzen" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">PIPZEN</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className={`p-2 ${colors.textSecondary} hover:${colors.text} hover:bg-white/10 rounded-lg transition-all`}>
            <FiX size={24} />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2">MAIN</p>
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                  : `${colors.textSecondary} hover:${colors.text} hover:bg-white/5`
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2 mt-4">ECOSYSTEM</p>
          <button
            onClick={() => { setActiveTab("ecosystem"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
              activeTab === "ecosystem"
                ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                : `${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10`
            }`}
          >
            <FiGlobe size={20} />
            <span className="text-sm font-medium">Ecosystem</span>
          </button>
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2 mt-4">ACCOUNT</p>
          {accountMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                  : `${colors.textSecondary} hover:${colors.text} hover:bg-white/5`
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2 mt-4">SUPPORT</p>
          {supportMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                  : `${colors.textSecondary} hover:${colors.text} hover:bg-white/5`
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          <p className="text-[10px] font-semibold text-[#FFD700]/50 uppercase tracking-wider px-3 mb-2 mt-4">REFERRAL</p>
          <button
            onClick={() => { setActiveTab("referral"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 mb-1 ${
              activeTab === "referral"
                ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/10 text-[#FFD700] border border-[#FFD700]/30"
                : `${colors.textSecondary} hover:${colors.text} hover:bg-white/5`
            }`}
          >
            <FiGift size={20} />
            <span className="text-sm font-medium">Referral</span>
          </button>
        </nav>
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${colors.border}`}>
          <Link href="/signin" className={`flex items-center gap-3 px-3 py-2.5 ${colors.textSecondary} hover:text-red-400 rounded-xl transition-all duration-300`}>
            <FiLogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-auto overflow-y-auto relative z-[50]">
        {/* Top Header with Glassmorphism */}
        <header className={`sticky top-0 z-[120] ${isDark ? "bg-[#0a0a0a]/70" : "bg-white/70"} backdrop-blur-xl border-b ${colors.border}`}>
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`md:hidden p-2 ${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all duration-300`}
            >
              <FiMenu size={22} />
            </button>

            {/* Page Title */}
            <div className="hidden md:block">
              <h1 className={`text-lg font-semibold ${isDark ? "bg-gradient-to-r from-white to-gray-400" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}>
                {allMenuItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative p-2.5 ${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all duration-300 group`}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setNotificationOpen(!notificationOpen); setProfileOpen(false); }}
                  className={`relative p-2.5 ${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all duration-300 ${notificationOpen ? "text-[#FFD700] bg-[#FFD700]/10" : ""}`}
                >
                  <FiBell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                </button>

                {/* Notification Panel */}
                {notificationOpen && (
                  <>
                    <div className="fixed inset-0 z-[150]" onClick={() => setNotificationOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-[90vw] sm:w-[380px] max-w-[95vw] ${isDark ? "bg-[#0a0a0a]/95" : "bg-white/95"} backdrop-blur-xl rounded-2xl border ${colors.border} shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[200] overflow-hidden`}>
                      <div className={`px-4 py-3 border-b ${colors.border} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 flex items-center justify-center border border-[#FFD700]/30">
                            <FiBell className="text-[#FFD700]" size={14} />
                          </div>
                          <span className={`font-semibold ${colors.text}`}>Notifications</span>
                        </div>
                        <span className="text-xs px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] rounded-full font-medium">{notifications.filter(n => n.unread).length} new</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`px-4 py-3 border-b ${colors.border} hover:bg-[#FFD700]/5 transition-all cursor-pointer ${notif.unread ? (isDark ? "bg-[#FFD700]/5" : "bg-[#FFD700]/10") : ""}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                notif.type === "success" ? "bg-green-500/20 text-green-400" :
                                notif.type === "warning" ? "bg-orange-500/20 text-orange-400" :
                                notif.type === "event" ? "bg-purple-500/20 text-purple-400" :
                                "bg-blue-500/20 text-blue-400"
                              }`}>
                                {notif.type === "success" ? <FiAward size={18} /> :
                                 notif.type === "warning" ? <FiShield size={18} /> :
                                 notif.type === "event" ? <FiCalendar size={18} /> :
                                 <FiCreditCard size={18} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm font-semibold ${colors.text} truncate`}>{notif.title}</p>
                                  {notif.unread && <div className="w-2 h-2 rounded-full bg-[#FFD700]" />}
                                </div>
                                <p className={`text-xs ${colors.textSecondary} mt-0.5 line-clamp-2`}>{notif.message}</p>
                                <p className="text-[10px] text-[#FFD700]/70 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={`px-4 py-3 border-t ${colors.border}`}>
                        <button className="w-full py-2 text-sm font-medium text-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl transition-all">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setNotificationOpen(false); }}
                  className={`flex items-center gap-3 pl-3 ml-2 border-l ${colors.border} cursor-pointer hover:opacity-90 transition-all`}
                >
                  <div className="hidden sm:block text-right">
                    <p className={`text-sm font-medium ${colors.text}`}>John Trader</p>
                    <p className="text-xs bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent font-medium">Funded Trader</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all duration-300 ${profileOpen ? "ring-2 ring-[#FFD700] ring-offset-2 ring-offset-[#0a0a0a]" : ""}`}>
                    <FiUser className="text-black" size={18} />
                  </div>
                </button>

                {/* Profile Dropdown Panel */}
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-[150]" onClick={() => setProfileOpen(false)} />
                    <div className={`absolute right-0 mt-2 w-[85vw] sm:w-[280px] max-w-[90vw] ${isDark ? "bg-[#0a0a0a]/95" : "bg-white/95"} backdrop-blur-xl rounded-2xl border ${colors.border} shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[200] overflow-hidden`}>
                      {/* Profile Header */}
                      <div className={`px-4 py-4 border-b ${colors.border} bg-gradient-to-r ${isDark ? "from-[#FFD700]/10 to-transparent" : "from-[#FFD700]/20 to-transparent"}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                            <FiUser className="text-black" size={24} />
                          </div>
                          <div>
                            <p className={`font-bold ${colors.text}`}>John Trader</p>
                            <p className="text-sm bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent font-semibold">Funded Trader</p>
                            <p className={`text-xs ${colors.textSecondary} mt-0.5`}>john@example.com</p>
                          </div>
                        </div>
                        {/* Account Balance */}
                        <div className={`mt-3 p-3 rounded-xl ${isDark ? "bg-[#111]" : "bg-gray-100"} border ${colors.border}`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs ${colors.textSecondary}`}>Account Balance</span>
                            <span className="text-lg font-bold text-[#FFD700]">$52,847.50</span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {[
                          { icon: FiUser, label: "My Profile", id: "profile" },
                          { icon: FiSettings, label: "Settings", id: "settings" },
                          { icon: FiShield, label: "KYC Verification", id: "kyc" },
                          { icon: FiCreditCard, label: "Billing", id: "billing" },
                          { icon: FiHelpCircle, label: "Help Center", id: "help" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setProfileOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl ${colors.textSecondary} hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-all`}
                          >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Sign Out */}
                      <div className={`p-2 border-t ${colors.border}`}>
                        <Link
                          href="/signin"
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <FiLogOut size={18} />
                          <span className="text-sm font-medium">Sign Out</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - z-index lower than sidebar for tooltips */}
        <main className={`flex-1 overflow-auto ${isDark ? "bg-gradient-to-b from-[#050505] to-[#0a0a0a]" : "bg-gradient-to-b from-gray-100 to-gray-50"} relative z-[100]`}>
          <DashboardContent activeTab={activeTab} isDark={isDark} />
        </main>
      </div>
    </div>
  );
}
