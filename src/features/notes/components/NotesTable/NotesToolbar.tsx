"use client";

import { LayoutGrid, List, Search, SplitSquareVertical } from "lucide-react";

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

export function NotesToolbar() {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
          <Button variant="secondary" size="sm">
            <List className="size-4" />
            List
          </Button>

          <Button variant="ghost" size="sm">
            <LayoutGrid className="size-4" />
            Grid
          </Button>

          <Button variant="ghost" size="sm">
            <SplitSquareVertical className="size-4" />
            Split
          </Button>
        </div>

        {/* Right */}
        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:justify-end">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Project" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-tags">
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-tags">All Tags</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="updated">
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="updated">Updated</SelectItem>

              <SelectItem value="created">Created</SelectItem>

              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Search notes..." className="pl-9" />
          </div>
        </div>
      </div>
    </section>
  );
}
