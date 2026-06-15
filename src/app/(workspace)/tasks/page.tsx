"use client";

import { useTasks } from "@/features/tasks/hooks";

export default function TasksPage() {
  const { data: tasks, isPending, isError, error } = useTasks();

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

  return (
    <section>
      <h1>Tasks</h1>

      {tasks?.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <p>
            Project:
            {task.projectId ?? "No Project"}
          </p>
          <hr />
        </div>
      ))}
    </section>
  );
}
