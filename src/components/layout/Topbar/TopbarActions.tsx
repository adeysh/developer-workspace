import { ThemeToggle } from "./ThemeToggle";
import { NotificationsButton } from "./NotificationsButton";
import { ProfileButton } from "./ProfileButton";

export function TopbarActions() {
  return (
    <div className="flex items-center gap-2">
      <NotificationsButton />

      <ThemeToggle />

      <ProfileButton />
    </div>
  );
}
