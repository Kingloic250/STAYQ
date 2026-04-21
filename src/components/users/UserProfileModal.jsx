import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/shared/StatusBadge";
import { format } from "date-fns";
import { Mail, Calendar, Shield } from "lucide-react";

export default function UserProfileModal({ open, onClose, user }) {
  if (!user) return null;

  const info = [
    { icon: Mail, label: user.email },
    { icon: Calendar, label: `Joined ${format(new Date(user.joinDate), "MMM d, yyyy")}` },
    { icon: Shield, label: user.role === "Host" ? `${user.properties || 0} properties hosted` : `${user.bookings || 0} bookings made` },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center text-center pt-2 pb-2 space-y-3">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <StatusBadge status={user.role} />
              <StatusBadge status={user.status} />
            </div>
          </div>

          <Separator className="w-full" />

          <div className="w-full space-y-2.5 text-left">
            {info.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg">
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}