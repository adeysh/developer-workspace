"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui";

export function NotificationsButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Notifications"
    >
      <Bell className="size-5" />
    </Button>
  );
}
