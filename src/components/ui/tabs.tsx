"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base glass styling
        "bg-white/5 backdrop-blur-md border border-white/10",
        "text-white/70 text-sm md:text-base lg:text-lg font-semibold",
        // Active state - gold glass glow
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FFD700]/95 data-[state=active]:to-[#B8860B]/95",
        "data-[state=active]:text-black data-[state=active]:border-[#FFD700]/50",
        "data-[state=active]:shadow-[0_0_25px_rgba(255,215,0,0.35),0_4px_15px_rgba(0,0,0,0.3)]",
        // Layout
        "inline-flex flex-1 items-center justify-center gap-1.5",
        "py-3 md:py-4 px-4 md:px-6 rounded-xl",
        // Transitions & hover
        "transition-all duration-300 ease-out",
        "hover:bg-white/10 hover:border-[#FFD700]/30",
        // Focus & disabled
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50",
        "disabled:pointer-events-none disabled:opacity-50",
        // SVG handling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
