import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { TrendingUp, Users, Building2, Eye } from "lucide-react";
import { useData } from "@/context/DataContext";
import { MOCK_ANALYTICS } from "@/data/mock";

const userGrowth = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 178 },
  { month: "Apr", users: 210 },
  { month: "May", users: 265 },
  { month: "Jun", users: 310 },
  { month: "Jul", users: 358 },
  { month: "Aug", users: 412 },
];

const viewingTrend = [
  { month: "Jan", viewings: 34 },
  { month: "Feb", viewings: 45 },
  { month: "Mar", viewings: 52 },
  { month: "Apr", viewings: 61 },
  { month: "May", viewings: 78 },
  { month: "Jun", viewings: 85 },
  { month: "Jul", viewings: 92 },
  { month: "Aug", viewings: 110 },
];

export default function AdminReports() {
  const { properties, users, viewings } = useData();

  const active = properties.filter((p) => p.status === "active").length;
  const totalAgents = users.filter((u) => u.role === "agent").length;

  const stats = [
    { title: "Total Revenue", value: "$284,500", icon: TrendingUp, trend: { value: 18, label: "vs last quarter" } },
    { title: "Active Listings", value: active, icon: Building2, trend: { value: 12, label: "this month" } },
    { title: "Registered Agents", value: totalAgents, icon: Users, trend: { value: 5, label: "this month" } },
    { title: "Total Viewings", value: viewings.length, icon: Eye, trend: { value: 24, label: "this month" } },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Platform performance and insights</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Monthly Revenue</h3>
            <p className="text-xs text-muted-foreground">Platform transaction revenue</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_ANALYTICS.monthlyRevenue} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                    formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">User Growth</h3>
            <p className="text-xs text-muted-foreground">Registered users over time</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="users" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Viewing Requests Trend</h3>
            <p className="text-xs text-muted-foreground">Monthly viewing activity</p>
          </CardHeader>
          <CardContent>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewingTrend} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 12 }}
                  />
                  <Bar dataKey="viewings" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <h3 className="font-semibold">Property Type Distribution</h3>
            <p className="text-xs text-muted-foreground">Breakdown by category</p>
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
    </div>
  );
}
