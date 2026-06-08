"use client";

import { useSidebar } from "@/providers/sidebar-provider";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";

import { cn } from "@/lib/utils";

export function Sidebar() {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        "transition-all duration-200",
        collapsed ? "w-18" : "w-60",
        "flex",
        "h-screen",
        "flex-col",
        "border-r",
        "bg-background",
      )}
    >
      <SidebarHeader />

      <SidebarNav />

      <SidebarFooter />
    </aside>
  );
}
