"use client";

import { useState } from "react";
import { Project, PROJECT_STATUSES, type ProjectStatus } from "@/types/project";

import {
  useProjects,
  useCreateProject,
  useUpdateProject,
} from "@/features/projects/hooks";

export default function ProjectsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<ProjectStatus>("active");

  const { data: projects, isPending, error } = useProjects();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();

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

  function handleEdit(project: Project) {
    setEditingProjectId(project.id);
    setEditName(project.name);
    setEditDescription(project.description ?? "");
    setEditStatus(project.status);
  }

  function handleCancelEdit() {
    setEditingProjectId(null);
    setEditName("");
    setEditDescription("");
    setEditStatus("active");
  }

  function handleSaveEdit() {
    if (!editingProjectId) {
      return;
    }

    if (!editName.trim()) {
      return;
    }

    updateProjectMutation.mutate(
      {
        id: editingProjectId,
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

      {projects?.map((project) => {
        const isEditing = editingProjectId === project.id;

        return (
          <div key={project.id}>
            {isEditing ? (
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
                  onChange={(e) =>
                    setEditStatus(e.target.value as ProjectStatus)
                  }
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
                  disabled={updateProjectMutation.isPending}
                >
                  Save
                </button>

                <button type="button" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <hr />
              </>
            ) : (
              <>
                <div>{project.name}</div>
                <div>{project.description}</div>
                <div>{project.status}</div>

                <button type="button" onClick={() => handleEdit(project)}>
                  Edit
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
