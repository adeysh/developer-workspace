"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/constants/navigation";
import { useSidebar } from "@/providers/sidebar-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarNavItemProps = {
  item: NavigationItem;
};

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const isActive = pathname === item.href;

  return (
    <Button
      asChild
      variant="nav"
      className={cn(
        "w-full",
        collapsed && "justify-center px-0",
        isActive &&
          "shadow-[0_0_16px_rgba(91,92,235,0.18) border border-primary/20 bg-primary/10 text-primary transition-all duration-200 hover:-translate-y-0.5",
      )}
    >
      <Link href={item.href}>
        <item.icon className="size-5" />

        {!collapsed && <span>{item.label}</span>}
      </Link>
    </Button>
  );
}
