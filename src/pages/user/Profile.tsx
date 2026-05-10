import { User, Mail, Phone, Shield, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { properties, viewings, messages } = useData();
  const navigate = useNavigate();

  if (!user) {
    return (
      <EmptyState
        icon={User}
        title="Sign in to view your profile"
        description="Create an account or sign in to manage your profile."
        actionLabel="Sign In"
        onAction={() => navigate("/login")}
      />
    );
  }

  const savedCount = properties.filter((p) => user.savedProperties.includes(p.id)).length;
  const viewingCount = viewings.filter((v) => v.userId === user.id).length;
  const messageCount = messages.filter((m) => m.fromId === user.id || m.toId === user.id).length;

  const roleLabel = user.role === "user" ? "Buyer" : user.role === "agent" ? "Agent" : "Administrator";

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="border-border/60">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">{roleLabel}</Badge>
                <span className="text-sm text-muted-foreground">Member since {user.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
            {[
              { label: "Saved", value: savedCount },
              { label: "Viewings", value: viewingCount },
              { label: "Messages", value: messageCount },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <h3 className="font-semibold">Account Information</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1.5">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue={user.name} className="pl-9" readOnly />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue={user.email} className="pl-9" type="email" readOnly />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue={user.phone} className="pl-9" readOnly />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Account Type</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue={roleLabel} className="pl-9" readOnly />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Member Since</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input defaultValue={user.createdAt} className="pl-9" readOnly />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">Profile editing is available in a future update.</p>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-destructive">Danger Zone</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Sign out of your account on this device.</p>
          <Button variant="destructive" onClick={() => { logout(); navigate("/"); }}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
