import { supabase } from "@/lib/supabase";

import {
  mapProject,
  type Project,
  type ProjectRecord,
  type UpdateProjectInput,
} from "@/types/project";

export async function updateProject(
  input: UpdateProjectInput,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update({
      name: input.name,
      description: input.description,
      status: input.status,
    })
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProject(data as ProjectRecord);
}
