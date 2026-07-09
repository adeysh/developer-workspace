"use client";

import * as React from "react";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

type NotesTableProps = {
  children: React.ReactNode;
  className?: string;
};

export function NotesTable({ children, className }: NotesTableProps) {
  return (
    <Card className={cn("overflow-hidden rounded-xl", className)}>
      <div className="divide-y divide-border">{children}</div>
    </Card>
  );
}
