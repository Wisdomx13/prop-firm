/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { create } from "zustand";

type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const useTabStore = create<TabContextType>((set) => ({
  activeTab: "",
  setActiveTab: (tab) => set((state) => ({ ...state, activeTab: tab })),
}));

interface TabProps {
  defaultTab: string;
  children: React.ReactNode;
}

export const Tab = ({ defaultTab, children }: TabProps) => {
  const setActiveTab = useTabStore((state) => state.setActiveTab);

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab]);

  return <>{children}</>;
};

interface TabContentProps {
  children: React.ReactNode;
  name: string;
}

export const TabContent = ({ children, name }: TabContentProps) => {
  const activeTab = useTabStore((state) => state.activeTab);

  if (name !== activeTab) return;
  return <>{children}</>;
};

interface TabTriggerProps {
  name: string;
  children: React.ReactNode;
}
export const TabTrigger = ({ name, children }: TabTriggerProps) => {
  const { activeTab, setActiveTab } = useTabStore((state) => state);
  const isActive = activeTab == name;

  return (
    <button
      onClick={() => setActiveTab(name)}
      aria-label="tab selector"
      className={`flex-1 py-3 rounded-2xl border  border-yellow-400 cursor-pointer  text-lg md:text-xl lg:text-2xl font-bold hover:bg-[#FFD700] hover:text-black hover:transition-colors capitalize ${
        isActive ? "bg-[#FFD700] text-black" : "bg-transparent text-white"
      }`}
    >
      {children}
    </button>
  );
};

export const TabHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-3 mb-3">
      {children}
    </div>
  );
};
