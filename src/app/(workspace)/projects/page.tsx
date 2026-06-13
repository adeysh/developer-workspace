"use client";

import { useState } from "react";
import { PROJECT_STATUSES, type ProjectStatus } from "@/types/project";

import { useProjects, useCreateProject } from "@/features/projects/hooks";

export default function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const { data: projects, isPending, error } = useProjects();
  const createProjectMutation = useCreateProject();

  if (isPending) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects.</div>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    createProjectMutation.mutate(
      {
        name: name.trim(),
        description: description.trim() || null,
        status,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setStatus("active");
        },
      },
    );
  }

  return (
    <section>
      <h1>Projects</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          title="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          {PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button type="submit" disabled={createProjectMutation.isPending}>
          {createProjectMutation.isPending ? "Creating..." : "Create Project"}
        </button>
      </form>

      {projects?.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </section>
  );
}
