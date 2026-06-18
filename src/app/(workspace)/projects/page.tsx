"use client";

import { useProjects } from "@/features/projects/hooks";
import { ProjectForm, ProjectItem } from "@/features/projects/components";

export default function ProjectsPage() {
  const { data: projects, isPending, error } = useProjects();

  if (isPending) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error loading projects.</div>;
  }

  return (
    <section>
      <h1>Projects</h1>

      <ProjectForm />

      {projects?.length === 0 && <p>No projects yet.</p>}

      {projects?.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </section>
  );
}
