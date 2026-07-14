"use client";

import { CalendarClock, MoreHorizontal } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import type { Note } from "@/types/note";
import { cn, notesTableColumns } from "@/lib/utils";

type NoteItemProps = {
  rowNumber: number;
  note: Note;
  projectName?: string;
  onEdit: (note: Note) => void;
};

export function NoteItem({
  rowNumber,
  note,
  projectName,
  onEdit,
}: NoteItemProps) {
  return (
    <div
      className={cn(
        "group grid items-center px-6 py-4 transition-colors duration-200",
        "hover:border-layout-border hover:bg-muted/30",
        notesTableColumns,
      )}
    >
      {/* Serial no */}
      <div className="text-sm font-medium text-muted-foreground">
        {rowNumber}
      </div>

      {/* Note */}
      <div className="min-w-0 space-y-1">
        <h3 className="truncate text-body font-semibold text-foreground">
          {note.title}
        </h3>

        <p className="line-clamp-2 text-small leading-relaxed text-muted-foreground">
          {note.content}
        </p>
      </div>

      {/* Project */}
      <div>
        <Badge variant="secondary">{projectName ?? "No Project"}</Badge>
      </div>

      {/* Updated */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarClock className="size-4" />

        <span>Today</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={() => onEdit(note)}>
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
