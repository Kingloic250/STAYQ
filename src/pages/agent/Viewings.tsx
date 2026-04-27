import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NativeSelect } from "@/components/ui/native-select";
import { ViewingStatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { MOCK_USERS } from "@/data/mock";

export default function AgentViewings() {
  const { user } = useAuth();
  const { viewings, updateViewingStatus } = useData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const myViewings = viewings.filter((v) => v.agentId === user?.id);
  const filtered = myViewings.filter((v) => {
    const q = query.toLowerCase();
    const matchQ = !q || v.propertyTitle.toLowerCase().includes(q) || v.userName.toLowerCase().includes(q);
    const matchS = !statusFilter || v.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Viewings</h1>
        <p className="text-muted-foreground">{myViewings.length} total viewing requests</p>
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

      {filtered.length === 0 ? (
        <EmptyState icon={Calendar} title="No viewings found" description="Viewing requests from buyers will appear here." />
      ) : (
        <div className="space-y-3">
          {filtered.map((v) => {
            const buyer = MOCK_USERS.find((u) => u.id === v.userId);
            return (
              <motion.div key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/60">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="size-12 overflow-hidden rounded-lg shrink-0">
                        <img src={v.propertyImage} alt="" className="size-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm truncate">{v.propertyTitle}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {buyer && (
                                <div className="flex items-center gap-1.5">
                                  <Avatar className="size-5">
                                    <AvatarImage src={buyer.avatar} />
                                    <AvatarFallback className="text-xs">{buyer.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{buyer.name}</span>
                                </div>
                              )}
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">{v.date} at {v.time}</span>
                            </div>
                          </div>
                          <ViewingStatusBadge status={v.status} />
                        </div>
                        {v.notes && <p className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-2">{v.notes}</p>}
                        <div className="mt-3 flex gap-2">
                          {v.status === "pending" && (
                            <>
                              <Button size="sm" onClick={() => updateViewingStatus(v.id, "confirmed")}>
                                Confirm
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive" onClick={() => updateViewingStatus(v.id, "cancelled")}>
                                Decline
                              </Button>
                            </>
                          )}
                          {v.status === "confirmed" && (
                            <Button size="sm" variant="outline" onClick={() => updateViewingStatus(v.id, "completed")}>
                              Mark Completed
                            </Button>
                          )}
                          <Link to={`/property/${v.propertyId}`}>
                            <Button size="sm" variant="ghost">View Property</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
