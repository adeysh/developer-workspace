import { supabase } from "@/lib/supabase";

import {
  mapNote,
  type Note,
  type NoteRecord,
  type UpdateNoteInput,
} from "@/types/note";

export async function updateNote(input: UpdateNoteInput): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: input.title,
      content: input.content,
      project_id: input.projectId,
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapNote(data as NoteRecord);
}
