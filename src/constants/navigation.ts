import { ROUTES } from "./routes";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  NotebookPen,
  Settings,
  LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const MAIN_NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: ROUTES.PROJECTS,
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: ROUTES.TASKS,
    icon: CheckSquare,
  },
  {
    label: "Notes",
    href: ROUTES.NOTES,
    icon: NotebookPen,
  },
];

export const FOOTER_NAVIGATION_ITEMS = [
  {
    label: "Settings",
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];
