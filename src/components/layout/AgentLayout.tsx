import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { TopBar } from "./TopBar";

export function AgentLayout() {
  return (
    <SidebarProvider>
      <AgentSidebar />
      <SidebarInset>
        <TopBar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
