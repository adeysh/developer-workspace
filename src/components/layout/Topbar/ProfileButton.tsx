"use client";

import { CircleUserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProfileButton() {
  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Profile">
      <CircleUserRound className="size-5" />
    </Button>
  );
}
