export type Note = {
  id: string;
  title: string;
  content: string;
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type NoteRecord = {
  id: string;
  title: string;
  content: string;
  project_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateNoteInput = {
  title: string;
  content: string;
  projectId: string | null;
};

export type UpdateNoteInput = {
  id: string;
  title: string;
  content: string;
  projectId: string | null;
};

export function mapNote(record: NoteRecord): Note {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    projectId: record.project_id,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export type NoteFormValues = {
  title: string;
  content: string;
  projectId: string | null;
};
