"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui";

export function NotesHeader() {
  return (
    <section className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <h1 className="text-h2 font-bold text-foreground">Notes</h1>

        <p className="max-w-2xl text-body text-muted-foreground">
          Capture ideas, store knowledge, and keep everything organized.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Plus className="size-4" />
          New Note
        </Button>

        <Button variant="outline">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>
    </section>
  );
}
