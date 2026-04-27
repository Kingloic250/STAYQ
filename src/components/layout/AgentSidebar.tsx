import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListChecks, PlusCircle, Calendar, MessageSquare, User, LogOut, Building2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/agent/dashboard" },
  { label: "My Listings", icon: ListChecks, path: "/agent/listings" },
  { label: "Add Property", icon: PlusCircle, path: "/agent/add-property" },
  { label: "Viewings", icon: Calendar, path: "/agent/viewings" },
  { label: "Messages", icon: MessageSquare, path: "/agent/messages" },
  { label: "Profile", icon: User, path: "/agent/profile" },
];

export function AgentSidebar() {
  const { user, logout } = useAuth();
  const { messages } = useData();
  const navigate = useNavigate();
  const { isMobile, setOpenMobile } = useSidebar();

  const unreadCount = messages.filter(
    (m) => m.toId === user?.id && m.status === "unread"
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNav = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-4" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <span className="block font-semibold text-sidebar-foreground">RealHaven</span>
            <span className="block text-xs text-muted-foreground">Agent Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.path}
                      onClick={handleNav}
                      className={({ isActive }) =>
                        cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium")
                      }
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                  {item.label === "Messages" && unreadCount > 0 && (
                    <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-medium text-sidebar-foreground">{user?.name}</span>
            <span className="truncate text-xs text-muted-foreground">Agent</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
