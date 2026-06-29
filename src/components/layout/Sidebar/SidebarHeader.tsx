"use client";

import Link from "next/link";
import { Code, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui";
import { useSidebar } from "@/providers/sidebar-provider";

export function SidebarHeader() {
  const { collapsed, toggleSidebar } = useSidebar();

  if (collapsed) {
    return (
      <header className="flex h-16 items-center justify-center border-b border-layout-border">
        <div className="group relative isolate">
          {/* Home Button */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="group-hover:scale-95 group-hover:opacity-0"
          >
            <Link href="/" aria-label="Home">
              <Code className="size-5" />
              <span className="sr-only">Developer Workspace</span>
            </Link>
          </Button>

          {/* Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="pointer-events-none absolute inset-0 scale-95 opacity-0 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
          >
            <PanelLeftOpen className="size-5" />
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-layout-border px-6">
      <Button asChild variant="ghost" size="icon">
        <Link href="/" aria-label="Home">
          <Code className="size-5" />
          <span className="sr-only">Developer Workspace</span>
        </Link>
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Collapse sidebar"
      >
        <PanelLeftClose className="size-5" />
      </Button>
    </header>
  );
}
