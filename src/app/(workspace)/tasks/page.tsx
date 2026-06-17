"use client";

import { useTasks } from "@/features/tasks/hooks";
import { TaskForm, TaskItem } from "@/features/tasks/components";

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

      <TaskForm />

      {tasks?.length === 0 && <p>No tasks yet.</p>}

      {tasks?.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </section>
  );
}
