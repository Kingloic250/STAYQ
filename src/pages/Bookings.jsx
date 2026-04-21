import { useState, useMemo } from "react";
import { bookings } from "@/lib/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTableSearch from "@/components/shared/DataTableSearch";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import BookingDetailModal from "@/components/bookings/BookingDetailModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Eye } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

export default function Bookings() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) || b.propertyTitle.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getCounts = (s) => s === "All" ? bookings.length : bookings.filter(b => b.status === s).length;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage guest reservations</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap" role="tablist">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={statusFilter === s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {s}
              <Badge
                variant="secondary"
                className={`ml-0.5 h-4 px-1.5 text-[10px] ${
                  statusFilter === s ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {getCounts(s)}
              </Badge>
            </button>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <DataTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by guest or property..." />
          </CardHeader>
          <CardContent className="p-0">
            <div className="min-h-[300px]">
              {paginated.length === 0 ? (
                <EmptyState title="No bookings found" />
              ) : (
                <ScrollArea className="w-full">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead className="hidden sm:table-cell">Property</TableHead>
                      <TableHead className="hidden md:table-cell">Check-in</TableHead>
                      <TableHead className="hidden md:table-cell">Check-out</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.guestName}</TableCell>
                        <TableCell className="text-muted-foreground hidden sm:table-cell">{b.propertyTitle}</TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">{format(new Date(b.checkIn), "MMM d, yyyy")}</TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell">{format(new Date(b.checkOut), "MMM d, yyyy")}</TableCell>
                        <TableCell className="font-medium">${b.totalAmount.toLocaleString()}</TableCell>
                        <TableCell><StatusBadge status={b.status} /></TableCell>
                        <TableCell className="text-right">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedBooking(b)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View details</TooltipContent>
                          </Tooltip>
                        </TableCell>
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

        <BookingDetailModal open={!!selectedBooking} onClose={() => setSelectedBooking(null)} booking={selectedBooking} />
      </div>
    </TooltipProvider>
  );
}