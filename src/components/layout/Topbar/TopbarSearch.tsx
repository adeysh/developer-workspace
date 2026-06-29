"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui";

export function TopbarSearch() {
  return (
    <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input type="search" placeholder="Search..." className="pl-10" />
    </div>
  );
}
