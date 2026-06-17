import { supabase } from "@/lib/supabase";

import {
  mapNote,
  type CreateNoteInput,
  type Note,
  type NoteRecord,
} from "@/types/note";

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const { data, error } = await supabase
    .from("notes")
    .insert({
      title: input.title,
      content: input.content,
      project_id: input.projectId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapNote(data as NoteRecord);
}
