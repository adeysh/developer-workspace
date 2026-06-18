"use client";

import {
  PROJECT_STATUSES,
  type Project,
  type ProjectStatus,
} from "@/types/project";
import { useState } from "react";
import { useDeleteProject, useUpdateProject } from "../hooks";

type ProjectItemProps = {
  project: Project;
};

export function ProjectItem({ project }: ProjectItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<ProjectStatus>("active");

  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  function handleEdit() {
    setEditName(project.name);
    setEditDescription(project.description ?? "");
    setEditStatus(project.status);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditName(project.name);

    setEditDescription(project.description ?? "");

    setEditStatus(project.status);

    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (!editName.trim()) {
      return;
    }

    updateProjectMutation.mutate(
      {
        id: project.id,
        name: editName.trim(),
        description: editDescription.trim() || null,
        status: editStatus,
      },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      },
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    deleteProjectMutation.mutate(project.id);
  }

  if (isEditing) {
    return (
      <>
        <input
          title="name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />

        <input
          title="description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <select
          title="status"
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
        >
          {PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSaveEdit}
          disabled={
            updateProjectMutation.isPending || deleteProjectMutation.isPending
          }
        >
          Save
        </button>

        <button
          type="button"
          onClick={handleCancelEdit}
          disabled={
            updateProjectMutation.isPending || deleteProjectMutation.isPending
          }
        >
          Cancel
        </button>
        <hr />
      </>
    );
  }

  return (
    <>
      <div>{project.name}</div>
      <div>{project.description}</div>
      <div>{project.status}</div>

      <button
        type="button"
        onClick={handleEdit}
        disabled={
          updateProjectMutation.isPending || deleteProjectMutation.isPending
        }
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={
          updateProjectMutation.isPending || deleteProjectMutation.isPending
        }
      >
        {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
      </button>
      <hr />
    </>
  );
}
