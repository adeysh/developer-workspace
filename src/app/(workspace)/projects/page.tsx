"use client";

import { useProjects } from "@/features/projects/hooks/use-projects";

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

      {projects?.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </section>
  );
}
