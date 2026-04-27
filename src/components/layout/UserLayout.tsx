import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UserSidebar } from "./UserSidebar";
import { TopBar } from "./TopBar";

export function UserLayout() {
  return (
    <SidebarProvider>
      <UserSidebar />
      <SidebarInset>
        <TopBar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
