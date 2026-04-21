import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeContext";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "regional", label: "Regional", icon: Globe },
];

function ProfileSection() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-1">Personal Information</h3>
        <p className="text-[12px] text-muted-foreground">Update your name, email, and contact details.</p>
      </div>
      <div className="flex items-center gap-5 pb-5 border-b border-border">
        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-xl font-semibold text-primary">
          JD
        </div>
        <div>
          <Button variant="outline" className="text-[13px] h-9 rounded-xl border-border">
            Change Photo
          </Button>
          <p className="text-[11px] text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "First Name", value: "John" },
          { label: "Last Name", value: "Doe" },
          { label: "Email Address", value: "john@stayq.com" },
          { label: "Phone Number", value: "+1 (555) 123-4567" },
          { label: "Company", value: "StayQ Inc." },
          { label: "Role", value: "Property Manager" },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">{field.label}</label>
            <input
              defaultValue={field.value}
              className="w-full h-10 px-3.5 bg-secondary border border-border rounded-xl text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        ))}
      </div>
      <Button className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-[13px]">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    bookingUpdates: true,
    paymentAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
    smsAlerts: true,
    pushNotifications: true,
  });

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: "bookingUpdates", label: "Booking Updates", desc: "Get notified when booking status changes" },
    { key: "paymentAlerts", label: "Payment Alerts", desc: "Alerts for successful and failed payments" },
    { key: "weeklyReports", label: "Weekly Reports", desc: "Receive a weekly performance summary" },
    { key: "marketingEmails", label: "Marketing Emails", desc: "News, tips, and product updates" },
    { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via text message" },
    { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-1">Notification Preferences</h3>
        <p className="text-[12px] text-muted-foreground">Choose how and when you receive notifications.</p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
            <div>
              <p className="text-[13px] font-medium text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings[item.key] ? "bg-primary" : "bg-secondary"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${settings[item.key] ? "left-5.5 translate-x-0.5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-1">Security Settings</h3>
        <p className="text-[12px] text-muted-foreground">Manage your password and account security.</p>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-secondary/40 rounded-xl">
          <p className="text-[13px] font-medium text-foreground mb-3">Change Password</p>
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label} className="mb-3">
              <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3.5 bg-secondary border border-border rounded-xl text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>
          ))}
          <Button className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-[13px]">
            Update Password
          </Button>
        </div>
        <div className="p-4 bg-secondary/40 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium text-foreground">Two-Factor Authentication</p>
            <p className="text-[11px] text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline" className="h-9 px-4 rounded-xl text-[13px] border-border">
            Enable 2FA
          </Button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-1">Appearance</h3>
        <p className="text-[12px] text-muted-foreground">Customize how StayQ looks for you.</p>
      </div>
      <div>
        <p className="text-[12px] font-medium text-muted-foreground mb-3">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-4 rounded-xl border text-[13px] font-medium capitalize transition-all ${
                theme === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionalSection() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[14px] font-semibold text-foreground mb-1">Regional Settings</h3>
        <p className="text-[12px] text-muted-foreground">Set your timezone, language, and currency.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Language", value: "English (US)" },
          { label: "Timezone", value: "UTC-5 (Eastern Time)" },
          { label: "Currency", value: "USD — US Dollar" },
          { label: "Date Format", value: "MM/DD/YYYY" },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-[12px] font-medium text-muted-foreground mb-1.5">{field.label}</label>
            <select className="w-full h-10 px-3.5 bg-secondary border border-border rounded-xl text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none">
              <option>{field.value}</option>
            </select>
          </div>
        ))}
      </div>
      <Button className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-[13px]">
        <Save className="w-4 h-4 mr-2" />
        Save Preferences
      </Button>
    </div>
  );
}

const sectionComponents = {
  profile: ProfileSection,
  notifications: NotificationsSection,
  security: SecuritySection,
  appearance: AppearanceSection,
  regional: RegionalSection,
};

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || "profile";
  const [active, setActive] = useState(initialSection);
  const ActiveSection = sectionComponents[active];

  const handleSectionChange = (sectionId) => {
    setActive(sectionId);
    setSearchParams({ section: sectionId });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-foreground tracking-tight mb-1">Settings</h1>
        <p className="text-[14px] text-muted-foreground">Manage your account and preferences</p>
      </div>
      <div className="flex gap-6">
        <div className="w-52 shrink-0">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSectionChange(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  active === s.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 min-h-[400px]">
          <ActiveSection />
        </div>
      </div>
    </div>
  );
}