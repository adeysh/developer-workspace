"use client";

import { useProjects } from "@/features/projects/hooks";
import type { Note } from "@/types/note";
import { useState } from "react";
import { useDeleteNote, useUpdateNote } from "../hooks";

type NoteItemProps = {
  note: Note;
};

export function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);

  const { data: projects } = useProjects();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();

  function handleEdit() {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditProjectId(note.projectId);

    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditProjectId(note.projectId);

    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (!editTitle.trim()) {
      return;
    }

    if (!editContent.trim()) {
      return;
    }

    updateNoteMutation.mutate(
      {
        id: note.id,
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

  function handleDelete() {
    const confirmed = window.confirm("Delete this note?");

    if (!confirmed) {
      return;
    }

    deleteNoteMutation.mutate(note.id);
  }

  if (isEditing) {
    return (
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
          disabled={
            updateNoteMutation.isPending || deleteNoteMutation.isPending
          }
        >
          {updateNoteMutation.isPending ? "Saving..." : "Save"}
        </button>

        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <h2>{note.title}</h2>

      <p>{note.content}</p>

      <p>
        Project:
        {projects?.find((project) => project.id === note.projectId)?.name ??
          "No Project"}
      </p>

      <button
        type="button"
        onClick={handleEdit}
        disabled={updateNoteMutation.isPending || deleteNoteMutation.isPending}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={updateNoteMutation.isPending || deleteNoteMutation.isPending}
      >
        {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
      </button>

      <hr />
    </>
  );
}
