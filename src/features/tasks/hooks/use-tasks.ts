import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getTasks } from "@/services/tasks";

export function useTasks() {
  return useQuery({
    queryKey: QUERY_KEYS.TASKS,
    queryFn: getTasks,
  });
}
