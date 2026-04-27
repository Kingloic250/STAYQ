import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ViewingStatusBadge } from "@/components/common/StatusBadge";
import { useData } from "@/context/DataContext";
import { MOCK_USERS } from "@/data/mock";

export default function AdminViewings() {
  const { viewings, updateViewingStatus } = useData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = viewings.filter((v) => {
    const q = query.toLowerCase();
    const matchQ = !q || v.propertyTitle.toLowerCase().includes(q) || v.userName.toLowerCase().includes(q);
    const matchS = !statusFilter || v.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Viewing Requests</h1>
        <p className="text-muted-foreground">{viewings.length} total viewings across all agents</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search viewings..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </NativeSelect>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => {
                const buyer = MOCK_USERS.find((u) => u.id === v.userId);
                return (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-10 overflow-hidden rounded-md shrink-0">
                          <img src={v.propertyImage} alt="" className="size-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-[160px]">{v.propertyTitle}</p>
                          <Link to={`/property/${v.propertyId}`} className="text-xs text-muted-foreground hover:text-primary">
                            View listing
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {buyer && (
                          <Avatar className="size-6">
                            <AvatarImage src={buyer.avatar} />
                            <AvatarFallback className="text-xs">{buyer.name[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-sm">{v.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{v.agentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        <span>{v.date}</span>
                        <span className="text-muted-foreground">at {v.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ViewingStatusBadge status={v.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {v.status === "pending" && (
                          <>
                            <Button size="xs" onClick={() => updateViewingStatus(v.id, "confirmed")}>Confirm</Button>
                            <Button size="xs" variant="outline" className="text-destructive" onClick={() => updateViewingStatus(v.id, "cancelled")}>Cancel</Button>
                          </>
                        )}
                        {v.status === "confirmed" && (
                          <Button size="xs" variant="outline" onClick={() => updateViewingStatus(v.id, "completed")}>Complete</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground text-sm">No viewings found</p>
          )}
        </div>
      </Card>
    </div>
  );
}
