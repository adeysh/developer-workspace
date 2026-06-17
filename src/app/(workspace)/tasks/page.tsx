"use client";

import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "@/features/tasks/hooks";
import { useState } from "react";
import { type Task, TASK_STATUSES, type TaskStatus } from "@/types/task";
import { useProjects } from "@/features/projects/hooks";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [projectId, setProjectId] = useState<string | null>(null);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<TaskStatus>("todo");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);

  const { data: tasks, isPending, isError, error } = useTasks();
  const { data: projects } = useProjects();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  if (isPending) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return (
      <p>
        Error loading tasks:
        {error.message}
      </p>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    createTaskMutation.mutate(
      {
        title: title.trim(),
        description: description.trim() || null,
        status,
        projectId,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          setStatus("todo");
          setProjectId(null);
        },
      },
    );
  }

  function handleEdit(task: Task) {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
    setEditStatus(task.status);
    setEditProjectId(task.projectId);
  }

  function handleCancelEdit() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("todo");
    setEditProjectId(null);
  }

  function handleSaveEdit() {
    if (!editingTaskId) {
      return;
    }

    if (!editTitle.trim()) {
      return;
    }

    updateTaskMutation.mutate(
      {
        id: editingTaskId,
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

  return (
    <section>
      <h1>Tasks</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          title="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Project dropdown */}
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

        <button type="submit" disabled={createTaskMutation.isPending}>
          {createTaskMutation.isPending ? "Creating..." : "Create Task"}
        </button>
      </form>

      {tasks?.length === 0 && <p>No tasks yet.</p>}

      {tasks?.map((task) => {
        const isEditing = editingTaskId === task.id;

        return (
          <div key={task.id}>
            {isEditing ? (
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
                  disabled={updateTaskMutation.isPending}
                >
                  {updateTaskMutation.isPending ? "Saving..." : "Save"}
                </button>

                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>

                <p>
                  Project:
                  {projects?.find((project) => project.id === task.projectId)
                    ?.name ?? "No Project"}
                </p>

                <button
                  type="button"
                  onClick={() => handleEdit(task)}
                  disabled={updateTaskMutation.isPending}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  disabled={deleteTaskMutation.isPending}
                >
                  {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
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
