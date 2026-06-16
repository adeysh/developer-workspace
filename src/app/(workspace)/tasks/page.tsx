"use client";

import { useTasks, useCreateTask } from "@/features/tasks/hooks";
import { useState } from "react";
import { TASK_STATUSES, type TaskStatus } from "@/types/task";
import { useProjects } from "@/features/projects/hooks";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [projectId, setProjectId] = useState<string | null>(null);

  const { data: tasks, isPending, isError, error } = useTasks();
  const { data: projects } = useProjects();
  const createTaskMutation = useCreateTask();

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

      {tasks?.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <p>
            Project:
            {projects?.find((project) => project.id === task.projectId)?.name ??
              "No Project"}
          </p>
          <hr />
        </div>
      ))}
    </section>
  );
}
