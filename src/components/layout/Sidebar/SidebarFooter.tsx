import { FOOTER_NAVIGATION_ITEMS } from "@/constants/navigation";
import { SidebarNavItem } from "@/components/layout/Sidebar/SidebarNavItem";

export function SidebarFooter() {
  return (
    <nav className="border-t p-2">
      {FOOTER_NAVIGATION_ITEMS.map((item) => (
        <SidebarNavItem key={item.href} item={item} />
      ))}
    </nav>
  );
}
