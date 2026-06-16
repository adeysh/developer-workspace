import { supabase } from "@/lib/supabase";

import {
  mapTask,
  type CreateTaskInput,
  type Task,
  type TaskRecord,
} from "@/types/task";

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description,
      status: input.status,
      project_id: input.projectId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapTask(data as TaskRecord);
}
