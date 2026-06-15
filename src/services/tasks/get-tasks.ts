import { supabase } from "@/lib/supabase";
import { mapTask, type Task, type TaskRecord } from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as TaskRecord[]).map(mapTask);
}
