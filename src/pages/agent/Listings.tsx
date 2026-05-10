import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/native-select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PropertyStatusBadge } from "@/components/common/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { PropertyForm } from "@/components/common/PropertyForm";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import type { Property } from "@/data/mock";
import { Building2 } from "lucide-react";

export default function AgentListings() {
  const { user } = useAuth();
  const { properties, updateProperty, deleteProperty } = useData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const myProps = properties.filter((p) => p.agentId === user?.id);

  const filtered = myProps.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleEdit = (data: Parameters<typeof updateProperty>[1]) => {
    if (!editingProperty) return;
    updateProperty(editingProperty.id, data);
    setEditingProperty(null);
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteProperty(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground">{myProps.length} total properties</p>
        </div>
        <Link to="/agent/add-property">
          <Button>
            <Plus className="size-4" />
            Add Listing
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <NativeSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="sold">Sold</option>
        </NativeSelect>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Building2}
          title={myProps.length === 0 ? "No listings yet" : "No results found"}
          description={myProps.length === 0 ? "Create your first property listing to get started." : "Try adjusting your search or filters."}
          actionLabel={myProps.length === 0 ? "Add First Listing" : undefined}
          onAction={myProps.length === 0 ? () => {} : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden border-border/60 shadow-sm">
                <div className="relative h-40 overflow-hidden">
                  <img src={p.images[0]} alt="" className="size-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <PropertyStatusBadge status={p.status} />
                  </div>
                  {p.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary/90 text-xs">Featured</Badge>
                  )}
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.city}, {p.state}</p>
                    <p className="text-sm font-bold mt-1">${p.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Link to={`/property/${p.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="size-3.5" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => setEditingProperty(p)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeletingId(p.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingProperty} onOpenChange={(o) => !o && setEditingProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <PropertyForm
              initialData={editingProperty}
              onSubmit={handleEdit}
              onCancel={() => setEditingProperty(null)}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deletingId}
        onOpenChange={(o) => !o && setDeletingId(null)}
        title="Delete Listing"
        description="Are you sure you want to delete this listing? This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
