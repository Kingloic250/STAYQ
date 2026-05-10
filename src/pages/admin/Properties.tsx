import { useState } from "react";
import { Search, Check, X, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { PropertyStatusBadge } from "@/components/common/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { useData } from "@/context/DataContext";

export default function AdminProperties() {
  const { properties, updatePropertyStatus, deleteProperty } = useData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = properties.filter((p) => {
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.agentName.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    const matchS = !statusFilter || p.status === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Property Management</h1>
        <p className="text-muted-foreground">{properties.length} total listings</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search properties..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
        </div>
        <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="sold">Sold</option>
          <option value="draft">Draft</option>
        </NativeSelect>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-10 overflow-hidden rounded-md shrink-0">
                        <img src={p.images[0]} alt="" className="size-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate max-w-[180px]">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.city}, {p.state}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.agentName}</TableCell>
                  <TableCell className="text-sm font-medium">${p.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="capitalize text-sm">{p.type}</span>
                  </TableCell>
                  <TableCell>
                    <PropertyStatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {p.status === "pending" && (
                        <>
                          <Button size="xs" onClick={() => updatePropertyStatus(p.id, "approved")} className="gap-1">
                            <Check className="size-3" />
                            Approve
                          </Button>
                          <Button size="xs" variant="outline" className="text-destructive gap-1" onClick={() => updatePropertyStatus(p.id, "rejected")}>
                            <X className="size-3" />
                            Reject
                          </Button>
                        </>
                      )}
                      {p.status === "approved" && (
                        <Button size="xs" onClick={() => updatePropertyStatus(p.id, "active")}>Activate</Button>
                      )}
                      <Link to={`/property/${p.id}`}>
                        <Button size="icon-xs" variant="ghost">
                          <Eye className="size-3" />
                        </Button>
                      </Link>
                      <Button size="icon-xs" variant="ghost" className="text-destructive" onClick={() => setDeletingId(p.id)}>
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-muted-foreground text-sm">No properties found</p>
          )}
        </div>
      </Card>

      <ConfirmDialog
        open={!!deletingId}
        onOpenChange={(o) => !o && setDeletingId(null)}
        title="Delete Property"
        description="This will permanently remove the listing from the platform."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => { if (deletingId) { deleteProperty(deletingId); setDeletingId(null); } }}
      />
    </div>
  );
}
