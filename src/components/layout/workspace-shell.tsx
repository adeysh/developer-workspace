import { Topbar } from "./Topbar/Topbar";
import { Sidebar } from "./Sidebar/Sidebar";

type WorkspaceShellProps = {
  children: React.ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="min-h-0 flex-1 overflow-y-auto px-8 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
