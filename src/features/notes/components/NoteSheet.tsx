"use client";

import * as React from "react";

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type NoteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  children: React.ReactNode;

  footer?: React.ReactNode;
};

export function NoteSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: NoteSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>

          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <SheetBody>{children}</SheetBody>

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
