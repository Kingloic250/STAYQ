import { useState, useMemo } from "react";
import { payments, revenueData } from "@/lib/mockData";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTableSearch from "@/components/shared/DataTableSearch";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 6;

export default function Finances() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
  const completedPayments = payments.filter(p => p.status === "Completed");
  const pendingPayments = payments.filter(p => p.status === "Pending");
  const totalCompleted = completedPayments.reduce((a, b) => a + b.amount, 0);
  const totalPending = pendingPayments.reduce((a, b) => a + b.amount, 0);

  const filtered = useMemo(() => {
    return payments.filter(p =>
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.guest.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finances</h1>
          <p className="text-muted-foreground text-sm mt-1">Revenue and payment tracking</p>
        </div>
        <Button variant="outline" onClick={() => toast.success("Export started — your file will download shortly.")}>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+12.5%" trendUp subtitle="6-month total" />
        <StatCard title="Collected" value={`$${totalCompleted.toLocaleString()}`} icon={TrendingUp} trend={`${completedPayments.length} payments`} trendUp subtitle="completed" />
        <StatCard title="Pending" value={`$${totalPending.toLocaleString()}`} icon={CreditCard} subtitle={`${pendingPayments.length} awaiting`} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-base">Payment History</CardTitle>
            <DataTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search payments..." />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="min-h-[300px]">
            {paginated.length === 0 ? (
              <EmptyState title="No payments found" />
            ) : (
              <ScrollArea className="w-full">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="hidden sm:table-cell">Guest</TableHead>
                    <TableHead className="hidden md:table-cell">Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{format(new Date(p.date), "MMM d, yyyy")}</TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{p.description}</TableCell>
                      <TableCell className="text-muted-foreground hidden sm:table-cell">{p.guest}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary" className="font-normal">{p.method}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">${p.amount.toLocaleString()}</TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </ScrollArea>
            )}
          </div>
          <div className="px-6 pb-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}