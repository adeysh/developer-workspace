import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type WorkspaceShellProps = {
  children: React.ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div>
        <Topbar />

        <main>{children}</main>
      </div>
    </div>
  );
}
