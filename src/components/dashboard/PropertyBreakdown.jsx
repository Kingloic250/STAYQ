import { properties } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const STATUSES = [
  { key: "Available", color: "#10b981", bg: "bg-emerald-500" },
  { key: "Occupied",  color: "#3b82f6", bg: "bg-blue-500" },
  { key: "Maintenance", color: "#f59e0b", bg: "bg-amber-400" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2">
      <p className="font-semibold">{data.name}</p>
      <p className="text-sm text-muted-foreground">{data.value} properties ({data.pct}%)</p>
    </div>
  );
};

export default function PropertyBreakdown() {
  const total = properties.length;

  const counts = STATUSES.map(s => ({
    ...s,
    value: properties.filter(p => p.status === s.key).length,
    pct: Math.round((properties.filter(p => p.status === s.key).length / total) * 100),
    name: s.key,
  })).filter(s => s.value > 0);

  const chartData = counts.map(s => ({ name: s.key, value: s.value, pct: s.pct, fill: s.color }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Property Status</CardTitle>
        <CardDescription>Breakdown of {total} properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-40 h-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={{ position: 'inside' }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">{total}</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
            </div>

          <div className="flex-1 w-full space-y-4">
            {counts.map((s) => (
              <div key={s.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-foreground font-medium">{s.key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{s.value}</span>
                    <span className="text-xs text-muted-foreground">({s.pct}%)</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}