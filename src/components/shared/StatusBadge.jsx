import { cn } from "@/lib/utils";

const statusStyles = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Occupied: "bg-blue-50 text-blue-700 border-blue-200",
  Maintenance: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  Completed: "bg-slate-100 text-slate-700 border-slate-200",
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Disabled: "bg-red-50 text-red-700 border-red-200",
  Refunded: "bg-purple-50 text-purple-700 border-purple-200",
  Guest: "bg-sky-50 text-sky-700 border-sky-200",
  Host: "bg-violet-50 text-violet-700 border-violet-200",
  Admin: "bg-primary/10 text-primary border-primary/20",
};

export default function StatusBadge({ status }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      statusStyles[status] || "bg-muted text-muted-foreground border-border"
    )}>
      {status}
    </span>
  );
}