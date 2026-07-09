"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type NotesGroupProps = {
  title: string;
  count: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function NotesGroup({
  title,
  count,
  children,
  actions,
  className,
}: NotesGroupProps) {
  return (
    <section className={cn(className)}>
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="size-6">
            <ChevronDown className="size-4" />
          </Button>

          <h2 className="text-sm font-semibold text-foreground">{title}</h2>

          <Badge variant="secondary">{count}</Badge>
        </div>

        {actions}
      </header>

      <div className="bg-card">{children}</div>
    </section>
  );
}
