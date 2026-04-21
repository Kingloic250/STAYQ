import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusBadge from "@/components/shared/StatusBadge";
import { MapPin, BedDouble, Bath, Tag } from "lucide-react";

export default function PropertyDetailModal({ open, onClose, property }) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4 pr-1">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-52 object-cover rounded-lg"
            />

            <div className="flex items-center justify-between">
              <StatusBadge status={property.status} />
              <span className="text-xl font-bold text-primary">
                ${property.pricePerNight}
                <span className="text-sm font-normal text-muted-foreground">/night</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              {property.address}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>

            <Separator />

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: BedDouble, label: "Beds", value: property.bedrooms },
                { icon: Bath, label: "Baths", value: property.bathrooms },
                { icon: Tag, label: "Type", value: property.type },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {property.amenities?.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Amenities</p>
                <div className="flex flex-wrap gap-1.5">
                  {property.amenities.map(a => (
                    <Badge key={a} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 font-normal">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}