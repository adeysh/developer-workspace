import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";
import { getNotes } from "@/services/notes";

export function useNotes() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTES,
    queryFn: getNotes,
  });
}
