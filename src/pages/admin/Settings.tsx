import { useState } from "react";
import { Save, Globe, Shield, Bell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState("RealHaven");
  const [supportEmail, setSupportEmail] = useState("support@realhaven.com");
  const [description, setDescription] = useState("Find your perfect home with RealHaven. Browse thousands of listings from trusted agents.");
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [notifyNewListings, setNotifyNewListings] = useState(true);
  const [notifyViewings, setNotifyViewings] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">Configure global platform preferences</p>
      </div>

      {/* General */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">General</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Platform Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Listing Policy */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">Listing Policy</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Require Listing Approval</p>
              <p className="text-xs text-muted-foreground">New listings must be reviewed before going live</p>
            </div>
            <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Allow Agent Registration</p>
              <p className="text-xs text-muted-foreground">Users can sign up as agents</p>
            </div>
            <Switch checked={allowRegistration} onCheckedChange={setAllowRegistration} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">Admin Notifications</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">New Listings</p>
              <p className="text-xs text-muted-foreground">Notify when agents submit new listings</p>
            </div>
            <Switch checked={notifyNewListings} onCheckedChange={setNotifyNewListings} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Viewing Requests</p>
              <p className="text-xs text-muted-foreground">Notify on new viewing requests</p>
            </div>
            <Switch checked={notifyViewings} onCheckedChange={setNotifyViewings} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Messages</p>
              <p className="text-xs text-muted-foreground">Notify on new platform messages</p>
            </div>
            <Switch checked={notifyMessages} onCheckedChange={setNotifyMessages} />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <h3 className="font-semibold">Security</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground">Take the platform offline for maintenance</p>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
