"use client";

import { useProjects } from "@/features/projects/hooks";
import { type NoteFormValues } from "@/types/note";
import { useState } from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

type NoteFormProps = {
  initialValues?: NoteFormValues;
  onSubmit: (values: NoteFormValues) => void;
  id?: string;
};

export function NoteForm({
  id = "note-form",
  initialValues,
  onSubmit,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [projectId, setProjectId] = useState<string | null>(
    initialValues?.projectId ?? null,
  );

  const { data: projects } = useProjects();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (!content.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      projectId,
    });
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="note-title"
          className="text-sm font-medium text-foreground"
        >
          Title
        </label>

        <Input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="note-content"
          className="text-sm font-medium text-foreground"
        >
          Content
        </label>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="note-project"
          className="text-sm font-medium text-foreground"
        >
          Project
        </label>

        <Select
          value={projectId ?? ""}
          onValueChange={(value) => setProjectId(value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="No Project" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="">No Project</SelectItem>

            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
