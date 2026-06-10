"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebar } from "@/providers/sidebar-provider";

export function SidebarHeader() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="text-lg font-semibold">DW</div>

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="rounded-md p-2 transition-colors hover:bg-muted"
      >
        {collapsed ? (
          <PanelLeftOpen className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </button>
    </header>
  );
}
