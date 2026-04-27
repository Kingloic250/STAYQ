import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { StatCard } from "@/components/common/StatCard";
import { PropertyStatusBadge } from "@/components/common/StatusBadge";
import { useData } from "@/context/DataContext";
import { MOCK_ANALYTICS } from "@/data/mock";

export default function AdminDashboard() {
  const { properties, users } = useData();

  const pending = properties.filter((p) => p.status === "pending");
  const active = properties.filter((p) => p.status === "active");

  const stats = [
    { title: "Total Properties", value: properties.length, icon: Building2, trend: { value: 14, label: "this month" } },
    { title: "Active Listings", value: active.length, icon: TrendingUp, trend: { value: 8, label: "vs last month" } },
    { title: "Registered Users", value: users.length, icon: Users, trend: { value: 22, label: "this month" } },
    { title: "Pending Approvals", value: pending.length, icon: Clock, iconClassName: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Monthly Revenue</h3>
            <p className="text-xs text-muted-foreground">Platform transactions</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_ANALYTICS.monthlyRevenue} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Types */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Property Types</h3>
            <p className="text-xs text-muted-foreground">Distribution by type</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_ANALYTICS.propertyTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    dataKey="count"
                    nameKey="type"
                  >
                    {MOCK_ANALYTICS.propertyTypes.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }} />
                  <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Pending Approvals</h3>
                <p className="text-xs text-muted-foreground">{pending.length} listings need review</p>
              </div>
              <Link to="/admin/properties">
                <Button variant="ghost" size="xs">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {pending.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                <div className="size-10 rounded-md overflow-hidden shrink-0">
                  <img src={p.images[0]} alt="" className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">by {p.agentName}</p>
                </div>
                <PropertyStatusBadge status={p.status} />
              </div>
            ))}
            {pending.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">All caught up!</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Recent Activity</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_ANALYTICS.recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 size-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
