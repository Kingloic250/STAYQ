import { Outlet } from "react-router-dom";
import { UserTopBar } from "./UserTopBar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <UserTopBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
