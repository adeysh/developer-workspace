import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { updateTask } from "@/services/tasks";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TASKS,
      });
    },
  });
}
