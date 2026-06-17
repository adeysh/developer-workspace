"use client";

import {
  useCreateNote,
  useDeleteNote,
  useNotes,
  useUpdateNote,
} from "@/features/notes/hooks";
import { useProjects } from "@/features/projects/hooks";
import type { Note } from "@/types/note";
import { useState } from "react";

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);

  const { data: notes, isPending, isError, error } = useNotes();
  const { data: projects } = useProjects();
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

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

  function handleEdit(note: Note) {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditProjectId(note.projectId);
  }

  function handleCancelEdit() {
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
    setEditProjectId(null);
  }

  function handleSaveEdit() {
    if (!editingNoteId) {
      return;
    }

    if (!editTitle.trim()) {
      return;
    }

    if (!editContent.trim()) {
      return;
    }

    updateNoteMutation.mutate(
      {
        id: editingNoteId,
        title: editTitle.trim(),
        content: editContent.trim(),
        projectId: editProjectId,
      },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      },
    );
  }

  function handleDelete(noteId: string) {
    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) {
      return;
    }

    deleteNoteMutation.mutate(noteId);
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

      {notes?.map((note) => {
        const isEditing = editingNoteId === note.id;

        return (
          <div key={note.id}>
            {isEditing ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note title"
                />

                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Note content"
                />

                <select
                  title="project"
                  value={editProjectId ?? ""}
                  onChange={(e) => setEditProjectId(e.target.value || null)}
                >
                  <option value="">No Project</option>

                  {projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={updateNoteMutation.isPending}
                >
                  {updateNoteMutation.isPending ? "Saving..." : "Save"}
                </button>

                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>{note.title}</h2>

                <p>{note.content}</p>

                <p>
                  Project:
                  {projects?.find((project) => project.id === note.projectId)
                    ?.name ?? "No Project"}
                </p>

                <button
                  type="button"
                  onClick={() => handleEdit(note)}
                  disabled={updateNoteMutation.isPending}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  disabled={deleteNoteMutation.isPending}
                >
                  {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
                </button>

                <hr />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
