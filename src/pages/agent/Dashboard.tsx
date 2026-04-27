import { motion } from "framer-motion";
import { Building2, Calendar, MessageSquare, Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "@/components/common/StatCard";
import { PropertyStatusBadge, ViewingStatusBadge } from "@/components/common/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

const MONTHLY_DATA = [
  { month: "Aug", views: 42 },
  { month: "Sep", views: 65 },
  { month: "Oct", views: 58 },
  { month: "Nov", views: 83 },
  { month: "Dec", views: 91 },
  { month: "Jan", views: 76 },
];

export default function AgentDashboard() {
  const { user } = useAuth();
  const { properties, viewings, messages } = useData();

  const myProps = properties.filter((p) => p.agentId === user?.id);
  const myViewings = viewings.filter((v) => v.agentId === user?.id);
  const myMessages = messages.filter((m) => m.toId === user?.id || m.fromId === user?.id);
  const unread = myMessages.filter((m) => m.status === "unread" && m.toId === user?.id).length;
  const pendingViewings = myViewings.filter((v) => v.status === "pending").length;

  const stats = [
    { title: "Active Listings", value: myProps.filter((p) => p.status === "active").length, icon: Building2, trend: { value: 12, label: "vs last month" } },
    { title: "Total Viewings", value: myViewings.length, icon: Calendar, trend: { value: 8, label: "vs last month" } },
    { title: "Unread Messages", value: unread, icon: MessageSquare },
    { title: "Pending Viewings", value: pendingViewings, icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Link to="/agent/add-property">
          <Button>Add New Listing</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2 border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Monthly Property Views</h3>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                  <Bar dataKey="views" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Viewings */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recent Viewings</h3>
              <Link to="/agent/viewings">
                <Button variant="ghost" size="xs">See all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {myViewings.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-start gap-3">
                <div className="size-8 rounded-lg overflow-hidden shrink-0">
                  <img src={v.propertyImage} alt="" className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{v.propertyTitle}</p>
                  <p className="text-xs text-muted-foreground">{v.userName} · {v.date}</p>
                </div>
                <ViewingStatusBadge status={v.status} />
              </div>
            ))}
            {myViewings.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No viewings yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* My Listings Quick View */}
      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">My Listings</h3>
            <Link to="/agent/listings">
              <Button variant="ghost" size="xs">Manage all</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {myProps.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                <div className="size-10 rounded-md overflow-hidden shrink-0">
                  <img src={p.images[0]} alt="" className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">${p.price.toLocaleString()}</p>
                </div>
                <PropertyStatusBadge status={p.status} />
                <Link to={`/property/${p.id}`}>
                  <Button variant="ghost" size="icon-sm">
                    <Eye className="size-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
            {myProps.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="mx-auto mb-2 size-8 opacity-40" />
                <p className="text-sm">No listings yet</p>
                <Link to="/agent/add-property">
                  <Button variant="outline" size="sm" className="mt-2">Add First Listing</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
