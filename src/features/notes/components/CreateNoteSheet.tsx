"use client";

import { Button } from "@/components/ui";
import { NoteSheet } from "./NoteSheet";
import { NoteForm } from "./NoteForm";

import { useCreateNote } from "../hooks";
import { type NoteFormValues } from "@/types/note";

type CreateNoteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateNoteSheet({ open, onOpenChange }: CreateNoteSheetProps) {
  const createNoteMutation = useCreateNote();

  function handleCreateNote(values: NoteFormValues) {
    createNoteMutation.mutate(values, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  return (
    <NoteSheet
      open={open}
      onOpenChange={onOpenChange}
      title="New Note"
      description="Capture an idea or create a new note."
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            loading={createNoteMutation.isPending}
            type="submit"
            form="note-form"
          >
            Create Note
          </Button>
        </>
      }
    >
      <NoteForm id="note-form" onSubmit={handleCreateNote} />
    </NoteSheet>
  );
}
