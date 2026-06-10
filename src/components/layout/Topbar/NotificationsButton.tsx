import { Bell } from "lucide-react";

export function NotificationsButton() {
  return (
    <button
      type="button"
      className="rounded-md p-2 transition-colors hover:bg-muted"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
    </button>
  );
}
