"use client";

import { useCreateNote, useNotes } from "@/features/notes/hooks";
import { useProjects } from "@/features/projects/hooks";
import { useState } from "react";

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  const { data: notes, isPending, isError, error } = useNotes();
  const { data: projects } = useProjects();
  const createNoteMutation = useCreateNote();

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (!content.trim()) {
      return;
    }

    createNoteMutation.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        projectId,
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          setProjectId(null);
        },
      },
    );
  }

  return (
    <section>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
        />

        <select
          title="project"
          value={projectId ?? ""}
          onChange={(e) => setProjectId(e.target.value || null)}
        >
          <option value="">No Project</option>

          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={createNoteMutation.isPending}>
          {createNoteMutation.isPending ? "Creating..." : "Create Note"}
        </button>
      </form>

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
