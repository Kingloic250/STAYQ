import { useState } from "react";
import { PlusCircle, X, ImagePlus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import type { Property, PropertyType, PropertyStatus } from "@/data/mock";

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: PropertyType;
  status: PropertyStatus;
  images: string[];
  amenities: string[];
  yearBuilt: number;
  parking: number;
  featured: boolean;
}

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  mode?: "add" | "edit";
}

const AMENITY_OPTIONS = [
  "Pool", "Gym", "Smart Home", "Wine Cellar", "Home Theater",
  "Garage", "Garden", "Fireplace", "Rooftop Terrace", "Doorman",
  "Concierge", "Hot Tub", "Tennis Court", "Guest House", "Spa",
  "Beach Access", "Lake Access", "Ski Storage", "Bike Storage", "Pet Friendly",
];

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
  { value: "townhouse", label: "Townhouse" },
];

export function PropertyForm({ initialData, onSubmit, onCancel, isSubmitting, mode = "add" }: PropertyFormProps) {
  const [form, setForm] = useState<PropertyFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? 0,
    location: initialData?.location ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    bedrooms: initialData?.bedrooms ?? 3,
    bathrooms: initialData?.bathrooms ?? 2,
    area: initialData?.area ?? 1500,
    type: initialData?.type ?? "house",
    status: initialData?.status ?? "draft",
    images: initialData?.images ?? [],
    amenities: initialData?.amenities ?? [],
    yearBuilt: initialData?.yearBuilt ?? 2020,
    parking: initialData?.parking ?? 1,
    featured: initialData?.featured ?? false,
  });
  const [newImageUrl, setNewImageUrl] = useState("");

  const set = (field: keyof PropertyFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addImage = () => {
    if (newImageUrl.trim()) {
      set("images", [...form.images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) =>
    set("images", form.images.filter((_, i) => i !== index));

  const toggleAmenity = (amenity: string) => {
    const current = form.amenities;
    set(
      "amenities",
      current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Basic Information</h3>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Modern Luxury Villa..."
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the property..."
              className="min-h-[100px]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="type">Property Type</Label>
              <NativeSelect
                id="type"
                value={form.type}
                onChange={(e) => set("type", e.target.value as PropertyType)}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </NativeSelect>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="status">Listing Status</Label>
            <NativeSelect
              id="status"
              value={form.status}
              onChange={(e) => set("status", e.target.value as PropertyStatus)}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="pending">Pending Review</option>
            </NativeSelect>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Location</h3>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="location">Full Address</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="123 Main St, City"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => set("city", e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="state">State</Label>
              <Input id="state" value={form.state} onChange={(e) => set("state", e.target.value)} required />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Property Details</h3>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="grid gap-1.5">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" type="number" min={0} value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" type="number" min={1} value={form.bathrooms} onChange={(e) => set("bathrooms", Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="area">Area (ft²)</Label>
            <Input id="area" type="number" min={1} value={form.area} onChange={(e) => set("area", Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="yearBuilt">Year Built</Label>
            <Input id="yearBuilt" type="number" value={form.yearBuilt} onChange={(e) => set("yearBuilt", Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="parking">Parking Spaces</Label>
            <Input id="parking" type="number" min={0} value={form.parking} onChange={(e) => set("parking", Number(e.target.value))} />
          </div>
          <div className="flex items-end gap-2 pb-1">
            <Checkbox
              id="featured"
              checked={form.featured}
              onCheckedChange={(v) => set("featured", !!v)}
            />
            <Label htmlFor="featured" className="cursor-pointer">Featured Listing</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Images</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL..."
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addImage}>
              <PlusCircle className="size-4" />
              Add
            </Button>
          </div>
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {form.images.map((url, i) => (
                <div key={i} className="group relative aspect-video overflow-hidden rounded-md border">
                  <img src={url} alt="" className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {form.images.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-muted-foreground">
              <ImagePlus className="mb-2 size-8 opacity-40" />
              <p className="text-sm">Add image URLs above</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Amenities</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AMENITY_OPTIONS.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={form.amenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer text-sm font-normal">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "add" ? "Create Listing" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
