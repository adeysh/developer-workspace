"use client";

import { useProjects } from "@/features/projects/hooks";
import { useState } from "react";
import { useCreateNote } from "../hooks";

export function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  const { data: projects } = useProjects();
  const createNoteMutation = useCreateNote();

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
  );
}
