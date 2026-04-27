import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PropertyStatus, ViewingStatus } from "@/data/mock";

const propertyStatusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  pending: { label: "Pending Review", className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  approved: { label: "Approved", className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30" },
  rejected: { label: "Rejected", className: "bg-destructive/15 text-destructive border-destructive/30" },
  sold: { label: "Sold", className: "bg-secondary text-secondary-foreground border-border" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
};

const viewingStatusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  confirmed: { label: "Confirmed", className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  completed: { label: "Completed", className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export function PropertyStatusBadge({ status }: { status: PropertyStatus }) {
  const cfg = propertyStatusConfig[status] ?? propertyStatusConfig.active;
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", cfg.className)}>
      {cfg.label}
    </Badge>
  );
}

export function ViewingStatusBadge({ status }: { status: ViewingStatus }) {
  const cfg = viewingStatusConfig[status] ?? viewingStatusConfig.pending;
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", cfg.className)}>
      {cfg.label}
    </Badge>
  );
}

export function UserStatusBadge({ status }: { status: "active" | "suspended" }) {
  if (status === "active") {
    return (
      <Badge variant="outline" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 text-xs">
        Active
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/30 text-xs">
      Suspended
    </Badge>
  );
}
