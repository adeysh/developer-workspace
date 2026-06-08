import { Topbar } from "./topbar";
import { Sidebar } from "./Sidebar/Sidebar";

type WorkspaceShellProps = {
  children: React.ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
