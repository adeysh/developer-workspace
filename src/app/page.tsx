"use client";

import { useSidebar } from "@/providers/sidebar-provider";

export default function Home() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <main className="p-8">
      <p>{collapsed ? "Collapsed" : "Expanded"}</p>

      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </main>
  );
}
