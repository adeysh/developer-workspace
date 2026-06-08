// sidebar-nav.tsx

import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import { SidebarNavItem } from "@/components/layout/Sidebar/SidebarNavItem";

export function SidebarNav() {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-2">
      {MAIN_NAVIGATION_ITEMS.map((item) => (
        <SidebarNavItem key={item.href} item={item} />
      ))}
    </nav>
  );
}
