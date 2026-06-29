"use client";

import { NoteItem, NotesHeader } from "@/features/notes/components";
import { useNotes } from "@/features/notes/hooks";

export default function NotesPage() {
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
      <NotesHeader />

      {notes?.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      )}
    </>
  );
}
