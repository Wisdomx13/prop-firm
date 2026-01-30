import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Trader Dashboard | Pipzen",
  description: "Track your trading performance with advanced analytics, equity curves, and detailed trade history.",
};

export default function DashboardPage() {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
}
