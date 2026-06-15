export const TASK_STATUSES = ["todo", "in_progress", "completed"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskRecord = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateTaskInput = {
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: string | null;
};

export type UpdateTaskInput = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  projectId: string | null;
};

export function mapTask(record: TaskRecord): Task {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    status: record.status as TaskStatus,
    projectId: record.project_id,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
