import { supabase } from "@/lib/supabase";
import { mapProject, type Project, type ProjectRecord } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as ProjectRecord[]).map(mapProject);
}
