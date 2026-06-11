import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getProjects } from "@/services/projects/get-projects";

export function useProjects() {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: getProjects,
  });
}
