import { useState, useMemo } from "react";
import { properties as initialProperties } from "@/lib/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTableSearch from "@/components/shared/DataTableSearch";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import PropertyForm from "@/components/properties/PropertyForm";
import PropertyDetailModal from "@/components/properties/PropertyDetailModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};
import { Plus, Eye, Pencil, MapPin } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default function Properties() {
  const [properties, setProperties] = useState(initialProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [detailProperty, setDetailProperty] = useState(null);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [properties, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSave = (data) => {
    if (editProperty) {
      setProperties(prev => prev.map(p => p.id === editProperty.id ? { ...p, ...data } : p));
    } else {
      setProperties(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setEditProperty(null);
  };

  return (
    <TooltipProvider>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {properties.length} total properties
            </p>
          </div>
          <Button onClick={() => { setEditProperty(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <DataTableSearch value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search properties..." />
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-full sm:w-40 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="min-h-[300px]">
              {paginated.length === 0 ? (
                <EmptyState title="No properties found" description="Try adjusting your search or add a new property." />
              ) : (
                <ScrollArea className="w-full">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden sm:table-cell">Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <span className="font-medium truncate max-w-[160px]">{p.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate max-w-[180px] text-sm">{p.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="secondary">{p.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">${p.pricePerNight}<span className="text-xs text-muted-foreground">/nt</span></TableCell>
                        <TableCell><StatusBadge status={p.status} /></TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDetailProperty(p)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View details</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditProperty(p); setFormOpen(true); }}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit property</TooltipContent>
                            </Tooltip>
                          </div>
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
        </motion.div>

        <PropertyForm
          open={formOpen}
          onClose={() => { setFormOpen(false); setEditProperty(null); }}
          property={editProperty}
          onSave={handleSave}
        />
        <PropertyDetailModal open={!!detailProperty} onClose={() => setDetailProperty(null)} property={detailProperty} />
      </motion.div>
    </TooltipProvider>
  );
}