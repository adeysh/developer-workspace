"use client";

import { Button } from "@/components/ui";
import { NoteSheet } from "./NoteSheet";
import { NoteForm } from "./NoteForm";

import { useDeleteNote, useUpdateNote } from "../hooks";
import type { Note, NoteFormValues } from "@/types/note";

type EditNoteSheetProps = {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditNoteSheet({
  note,
  open,
  onOpenChange,
}: EditNoteSheetProps) {
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  function handleSubmit(values: NoteFormValues) {
    if (!note) return;

    updateNoteMutation.mutate(
      {
        id: note.id,
        ...values,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  }

  function handleDelete() {
    if (!note) return;

    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) return;

    deleteNoteMutation.mutate(note.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }

  const isBusy = updateNoteMutation.isPending || deleteNoteMutation.isPending;

  return (
    <NoteSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Note"
      description="Update your note."
      footer={
        <>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={deleteNoteMutation.isPending}
            disabled={isBusy}
          >
            Delete
          </Button>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isBusy}
          >
            Cancel
          </Button>

          <Button
            form="edit-note-form"
            type="submit"
            loading={updateNoteMutation.isPending}
            disabled={isBusy}
          >
            Save Changes
          </Button>
        </>
      }
    >
      {note && (
        <NoteForm
          key={note?.id}
          id="edit-note-form"
          initialValues={{
            title: note?.title ?? "",
            content: note?.content ?? "",
            projectId: note?.projectId ?? null,
          }}
          onSubmit={handleSubmit}
        />
      )}
    </NoteSheet>
  );
}
