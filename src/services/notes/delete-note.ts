import { supabase } from "@/lib/supabase";

export async function deleteNote(noteId: string): Promise<void> {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    throw new Error(error.message);
  }
}
