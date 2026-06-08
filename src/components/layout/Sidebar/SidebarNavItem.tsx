"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/constants/navigation";
import { useSidebar } from "@/providers/sidebar-provider";
import { cn } from "@/lib/utils";

type SidebarNavItemProps = {
  item: NavigationItem;
};

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
        isActive ? "bg-muted font-semibold" : "hover:bg-muted",
        collapsed && "justify-center",
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" />

      {!collapsed && (
        <span className={isActive ? "bg-muted font-semibold" : ""}>
          {item.label}
        </span>
      )}
    </Link>
  );
}
