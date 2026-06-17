"use client";

import { useProjects } from "@/features/projects/hooks";
import { TASK_STATUSES, type Task, type TaskStatus } from "@/types/task";
import { useState } from "react";
import { useDeleteTask, useUpdateTask } from "../hooks";

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<TaskStatus>("todo");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);

  const { data: projects } = useProjects();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  function handleEdit() {
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditStatus(task.status);
    setEditProjectId(task.projectId);

    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditStatus(task.status);
    setEditProjectId(task.projectId);

    setIsEditing(false);
  }

  function handleSaveEdit() {
    if (!editTitle.trim()) {
      return;
    }

    updateTaskMutation.mutate(
      {
        id: task.id,
        title: editTitle.trim(),
        description: editDescription.trim() || null,
        status: editStatus,
        projectId: editProjectId,
      },
      {
        onSuccess: () => {
          handleCancelEdit();
        },
      },
    );
  }

  function handleDelete(taskId: string) {
    const confirmed = window.confirm("Delete this task?");

    if (!confirmed) {
      return;
    }

    deleteTaskMutation.mutate(taskId);
  }

  if (isEditing) {
    return (
      <>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
        />

        <input
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          title="status"
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value as TaskStatus)}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

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
            updateTaskMutation.isPending || deleteTaskMutation.isPending
          }
        >
          {updateTaskMutation.isPending ? "Saving..." : "Save"}
        </button>

        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <p>
        Project:
        {projects?.find((project) => project.id === task.projectId)?.name ??
          "No Project"}
      </p>

      <button
        type="button"
        onClick={handleEdit}
        disabled={updateTaskMutation.isPending}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => handleDelete(task.id)}
        disabled={updateTaskMutation.isPending || deleteTaskMutation.isPending}
      >
        {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
      </button>
      <hr />
    </>
  );
}
