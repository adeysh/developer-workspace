import { supabase } from "@/lib/supabase";

import {
  mapTask,
  type Task,
  type TaskRecord,
  type UpdateTaskInput,
} from "@/types/task";

export async function updateTask(input: UpdateTaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description,
      status: input.status,
      project_id: input.projectId,
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapTask(data as TaskRecord);
}
