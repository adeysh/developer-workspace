"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";
import type { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  iconColor?: "purple" | "blue" | "green" | "orange" | "pink";
  trailing?: React.ReactNode;
  className?: string;
};

const iconStyles = {
  purple: "bg-tag-purple-bg text-tag-purple-text",
  blue: "bg-tag-blue-bg text-tag-blue-text",
  green: "bg-tag-green-bg text-tag-green-text",
  orange: "bg-tag-orange-bg text-tag-orange-text",
  pink: "bg-tag-pink-bg text-tag-pink-text",
};

export function SummaryCard({
  title,
  value,
  description,
  icon,
  iconColor = "purple",
  trailing,
  className,
}: SummaryCardProps) {
  const Icon = icon;

  return (
    <Card
      className={cn(
        "group h-full transition-all duration-200",
        "hover:-translate-y-0.5",
        "hover:border-layout-border",
        "hover:[box-shadow:var(--shadow-hover)]",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col gap-5 p-6">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              iconStyles[iconColor],
            )}
          >
            <Icon className="size-6" />
          </div>

          {trailing}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <h3 className="text-h2 leading-tight font-bold text-foreground">
            {value}
          </h3>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
