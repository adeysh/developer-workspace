"use client";

import { LayoutList } from "lucide-react";
import { cn, notesTableColumns } from "@/lib/utils";

const headerClass =
  "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function NotesTableHeader() {
  return (
    <div
      className={cn(
        "grid items-center border-b border-border bg-muted/30 px-6 py-3",
        notesTableColumns,
      )}
    >
      <div className={headerClass}>Note</div>
      <div className={headerClass}>Project</div>
      <div className={headerClass}>Updated</div>

      <div className="flex justify-end">
        <LayoutList className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
