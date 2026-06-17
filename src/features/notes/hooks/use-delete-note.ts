import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { deleteNote } from "@/services/notes";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.NOTES,
      });
    },
  });
}
