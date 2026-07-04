import { FileText, FolderKanban, FolderOpen, NotebookPen } from "lucide-react";

import { SummaryCard } from "./SummaryCard";
import { useNotes } from "../hooks";

export function NotesSummary() {
  const { data: notes = [] } = useNotes();

  const total = notes.length;
  const linked = notes.filter((note) => note.projectId !== null).length;
  const unassigned = total - linked;
  const projectCount = new Set(
    notes.map((note) => note.projectId).filter(Boolean),
  ).size;

  return (
    <div className="grid gap-6 py-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Notes"
        value={total}
        description="Across all projects"
        icon={NotebookPen}
        iconColor="purple"
      />

      <SummaryCard
        title="Linked Notes"
        value={linked}
        description="Assigned to projects"
        icon={FolderOpen}
        iconColor="green"
      />

      <SummaryCard
        title="Unassigned"
        value={unassigned}
        description="Without a project"
        icon={FileText}
        iconColor="orange"
      />

      <SummaryCard
        title="Projects"
        value={projectCount}
        description="Containing notes"
        icon={FolderKanban}
        iconColor="blue"
      />
    </div>
  );
}
