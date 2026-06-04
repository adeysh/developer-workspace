"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const query = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return "React Query Works";
    },
  });

  return <div>{query.data}</div>;
}
