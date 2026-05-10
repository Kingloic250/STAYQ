import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Property } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500 text-white border-emerald-600" },
  pending: { label: "Pending", className: "bg-amber-500 text-white border-amber-600" },
  approved: { label: "Approved", className: "bg-blue-500 text-white border-blue-600" },
  rejected: { label: "Rejected", className: "bg-red-500 text-white border-red-600" },
  sold: { label: "Sold", className: "bg-gray-600 text-white border-gray-700" },
  draft: { label: "Draft", className: "bg-gray-400 text-gray-800 border-gray-500" },
};

interface PropertyCardProps {
  property: Property;
  showActions?: boolean;
  className?: string;
}

export function PropertyCard({ property, showActions = false, className }: PropertyCardProps) {
  const { user, updateSavedProperties } = useAuth();
  const isSaved = user?.savedProperties.includes(property.id) ?? false;

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    const current = user.savedProperties;
    const updated = isSaved
      ? current.filter((id) => id !== property.id)
      : [...current, property.id];
    updateSavedProperties(updated);
  };

  const statusCfg = statusConfig[property.status] ?? statusConfig.active;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden gap-0 py-0 border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative overflow-hidden">
          <Link to={`/property/${property.id}`}>
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge variant="outline" className={cn("text-xs font-medium", statusCfg.className)}>
              {statusCfg.label}
            </Badge>
            {property.featured && (
              <Badge className="bg-amber-500 text-white border-amber-600 text-xs">Featured</Badge>
            )}
          </div>
          {user && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleSave}
              className={cn(
                "absolute right-3 top-3 size-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background",
                isSaved && "text-rose-500 hover:text-rose-500"
              )}
            >
              <Heart className={cn("size-4", isSaved && "fill-current")} />
            </Button>
          )}
          <div className="absolute bottom-3 right-3">
            <span className="rounded-md bg-background/80 backdrop-blur-sm px-2 py-1 text-sm font-bold text-foreground">
              ${property.price.toLocaleString()}
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <Link to={`/property/${property.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
              {property.title}
            </h3>
          </Link>
          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            <span className="truncate text-xs">{property.location}</span>
          </div>

          <div className="mt-3 flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="size-3.5" />
              <span className="text-xs font-medium">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="size-3.5" />
              <span className="text-xs font-medium">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="size-3.5" />
              <span className="text-xs font-medium">{property.area.toLocaleString()} ft²</span>
            </div>
          </div>

          {showActions && (
            <div className="mt-3 flex items-center gap-2">
              <Link to={`/property/${property.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="size-3.5" />
                  View
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface PropertyGridProps {
  properties: Property[];
  showActions?: boolean;
  className?: string;
}

export function PropertyGrid({ properties, showActions, className }: PropertyGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} showActions={showActions} />
      ))}
    </div>
  );
}
