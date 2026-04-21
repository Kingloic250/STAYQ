import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, CalendarCheck, Users, DollarSign, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { users } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Properties", path: "/properties", icon: Building2 },
  { label: "Bookings", path: "/bookings", icon: CalendarCheck, badge: "3" },
  { label: "Users", path: "/users", icon: Users },
  { label: "Finances", path: "/finances", icon: DollarSign },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);
  
  const logoSrc = theme === "dark" ? "/logow.png" : "/logod.png";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onClose} 
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border flex flex-col lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <img 
              src={logoSrc} 
              alt="StayQ Logo" 
              className="max-h-28 w-40 object-contain" 
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
            Main Menu
          </p>
          {navItems.map(({ label, path, icon: Icon, badge }) => {
            const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onClose();
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge
                    className={cn(
                      "h-5 px-1.5 text-[10px]",
                      isActive
                        ? "bg-white/30 text-black hover:bg-white/30"
                        : "bg-primary/10 text-primary hover:bg-primary/10"
                    )}
                  >
                    {badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator />

         {/* Bottom section */}
         <div className="p-4">
           <div className="flex items-center gap-3 px-2 py-1">
             <Avatar className="h-8 w-8 shrink-0">
               {users[3].avatar ? (
                 <img src={users[3].avatar} alt={users[3].name} />
               ) : (
                 <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                   {users[3].name.charAt(0)}
                 </AvatarFallback>
               )}
             </Avatar>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium truncate">{users[3].name}</p>
               <p className="text-xs text-muted-foreground truncate">{users[3].email}</p>
             </div>
           </div>
         </div>
      </motion.aside>
    </>
  );
}