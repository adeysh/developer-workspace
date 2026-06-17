"use client";

import { useNotes } from "@/features/notes/hooks";
import { useProjects } from "@/features/projects/hooks";

export default function NotesPage() {
  const { data: notes, isPending, isError, error } = useNotes();
  const { data: projects } = useProjects();

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
    <section>
      <h1>Notes</h1>

      {notes?.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>

          <p>{note.content}</p>

          <p>
            Project:
            {projects?.find((project) => project.id === note.projectId)?.name ??
              "No Project"}
          </p>

          <hr />
        </div>
      ))}
    </section>
  );
}
