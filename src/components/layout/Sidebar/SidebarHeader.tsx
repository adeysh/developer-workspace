"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { useSidebar } from "@/providers/sidebar-provider";

export function SidebarHeader() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="font-bold">DW</div>

      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>
    </header>
  );
}
