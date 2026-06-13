import { supabase } from "@/lib/supabase";

import {
  mapProject,
  type CreateProjectInput,
  type Project,
  type ProjectRecord,
} from "@/types/project";

export async function createProject(
  input: CreateProjectInput,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: input.name,
      description: input.description,
      status: input.status,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProject(data as ProjectRecord);
}
