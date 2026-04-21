import { Menu, Bell, Search, User, Settings, LogOut, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { users } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopBar({ onMenuClick }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 lg:px-8 bg-card">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search properties, bookings..."
            className="pl-9 bg-background/50 w-full rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">New Booking</span>
              <span className="text-sm text-muted-foreground">Sarah Johnson booked Oceanfront Villa</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Payment Received</span>
              <span className="text-sm text-muted-foreground">$2,700 for Booking #1</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Review Submitted</span>
              <span className="text-sm text-muted-foreground">Mike left a 5-star review</span>
              <span className="text-xs text-muted-foreground">3 hours ago</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {users[3].avatar ? (
                    <img src={users[3].avatar} alt={users[3].name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {users[3].name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 space-y-1">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 py-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    {users[3].avatar ? (
                      <img src={users[3].avatar} alt={users[3].name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {users[3].name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{users[3].name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{users[3].email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="flex items-center gap-3 py-3" onClick={() => navigate('/settings?section=profile')}>
                <User className="mr-2 w-4 h-4" />
                <span className="flex-1">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 py-3" onClick={() => navigate('/settings')}>
                <Settings className="mr-2 w-4 h-4" />
                <span className="flex-1">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 py-3" onClick={() => navigate('/help')}>
                <BookOpen className="mr-2 w-4 h-4" />
                <span className="flex-1">Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="flex items-center gap-3 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer" onClick={logout}>
                <LogOut className="mr-2 w-4 h-4" />
                <span className="flex-1">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  );
}
