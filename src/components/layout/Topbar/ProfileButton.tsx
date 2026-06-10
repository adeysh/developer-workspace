import { CircleUserRound } from "lucide-react";

export function ProfileButton() {
  return (
    <button
      type="button"
      className="rounded-md p-2 transition-colors hover:bg-muted"
      aria-label="Profile"
    >
      <CircleUserRound className="h-5 w-5" />
    </button>
  );
}
