"use client";

import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const { setTheme } = useTheme();

  return <button onClick={() => setTheme("dark")}>Dark</button>;
}
