import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendUp }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {(subtitle || trend) && (
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                {trend && (
                  <Badge variant="secondary" className={cn(
                    "text-xs font-semibold px-1.5 py-0",
                    trendUp
                      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
                      : "bg-red-50 text-red-600 hover:bg-red-50"
                  )}>
                    {trendUp ? "↑" : "↓"} {trend}
                  </Badge>
                )}
                {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              </div>
            )}
          </div>
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 ml-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}