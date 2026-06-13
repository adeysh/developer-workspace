export const PROJECT_STATUSES = ["active", "completed", "archived"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Project = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProjectRecord = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export function mapProject(record: ProjectRecord): Project {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    status: record.status as ProjectStatus,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export type CreateProjectInput = {
  name: string;
  description: string | null;
  status: ProjectStatus;
};

export type UpdateProjectInput = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
};
