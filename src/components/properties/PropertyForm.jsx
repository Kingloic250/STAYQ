import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const AMENITIES = ["WiFi", "AC", "Pool", "Hot Tub", "Parking", "Gym", "Fireplace", "BBQ", "Laundry", "Beach Access", "Garden", "Patio", "Doorman", "Concierge", "Fire Pit"];

export default function PropertyForm({ open, onClose, property, onSave }) {
  const [form, setForm] = useState(property || {
    title: "", description: "", address: "", type: "Apartment",
    bedrooms: 1, bathrooms: 1, amenities: [], pricePerNight: 100, status: "Available",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
  });

  const toggleAmenity = (a) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter(x => x !== a)
        : [...prev.amenities, a]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{property ? "Edit Property" : "Add Property"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="pr-1">
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="h-20" />
              </div>
              <div className="space-y-1.5">
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Property Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Apartment", "Villa", "Cabin", "Penthouse", "Studio", "Bungalow", "Townhouse"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Occupied">Occupied</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Bedrooms</Label>
                  <Input type="number" min={1} value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: +e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Bathrooms</Label>
                  <Input type="number" min={1} value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: +e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Price/Night ($)</Label>
                  <Input type="number" min={1} value={form.pricePerNight} onChange={(e) => setForm({ ...form, pricePerNight: +e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Amenities</Label>
                <div className="flex flex-wrap gap-1.5">
                  {AMENITIES.map(a => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        form.amenities.includes(a)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border hover:border-primary/40"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={(e) => {
            e.preventDefault();
            onSave(form);
            onClose();
          }}>{property ? "Save Changes" : "Add Property"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}