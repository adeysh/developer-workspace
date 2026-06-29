import { TopbarSearch } from "./TopbarSearch";
import { TopbarActions } from "./TopbarActions";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-layout-border px-6">
      <TopbarSearch />

      <TopbarActions />
    </header>
  );
}
