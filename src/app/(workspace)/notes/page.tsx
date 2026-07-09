"use client";

import { useState } from "react";
import {
  NotesHeader,
  NotesList,
  NotesSummary,
  NotesToolbar,
} from "@/features/notes/components";
import { useNotes } from "@/features/notes/hooks";
import { CreateNoteSheet } from "@/features/notes/components";
import { EditNoteSheet } from "@/features/notes/components";
import type { Note } from "@/types/note";

export default function NotesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { data: notes, isPending, isError, error } = useNotes();

  if (isPending) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return (
      <p>
        Error loading notes:
        {error.message}
      </p>
    );
  }

  function handleEditNote(note: Note) {
    setEditingNote(note);
  }

  return (
    <>
      <NotesHeader onNewNote={() => setIsCreateOpen(true)} />

      <NotesSummary />

      <NotesToolbar />

      <NotesList notes={notes ?? []} onEdit={handleEditNote} />

      <CreateNoteSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <EditNoteSheet
        note={editingNote}
        open={editingNote !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingNote(null);
          }
        }}
      />
    </>
  );
}
