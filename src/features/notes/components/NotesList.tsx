"use client";

import type { Note } from "@/types/note";

import {
  NotesTable,
  NotesGroup,
  NotesTableHeader,
  NoteItem,
} from "./NotesTable";

type NotesListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
};

export function NotesList({ notes, onEdit }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <NotesTable>
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          No notes yet.
        </div>
      </NotesTable>
    );
  }

  return (
    <NotesTable>
      <NotesGroup title="All Notes" count={notes.length}>
        <NotesTableHeader />

        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onEdit={onEdit} />
        ))}
      </NotesGroup>
    </NotesTable>
  );
}
