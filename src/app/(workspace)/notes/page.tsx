"use client";

import { useState } from "react";
import { NoteItem, NotesHeader } from "@/features/notes/components";
import { useNotes } from "@/features/notes/hooks";
import { CreateNoteSheet } from "@/features/notes/components";

export default function NotesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
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

  return (
    <>
      <NotesHeader onNewNote={() => setIsCreateOpen(true)} />

      <CreateNoteSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      {notes?.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      )}
    </>
  );
}
