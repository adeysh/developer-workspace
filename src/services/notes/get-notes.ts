import { supabase } from "@/lib/supabase";

import { mapNote, type Note, type NoteRecord } from "@/types/note";

export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data as NoteRecord[]).map(mapNote);
}
