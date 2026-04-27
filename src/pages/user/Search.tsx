import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PropertyCard } from "@/components/common/PropertyCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useData } from "@/context/DataContext";

const VISIBLE_STATUSES = ["active", "approved"] as const;

export default function Search() {
  const [searchParams] = useSearchParams();
  const { properties } = useData();

  const initialQuery = searchParams.get("q") ?? "";
  const initialType = searchParams.get("type") ?? "";
  const initialCity = searchParams.get("city") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<string>(initialType);
  const [city, setCity] = useState(initialCity);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = properties.filter((p) =>
      VISIBLE_STATUSES.includes(p.status as "active" | "approved")
    );

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }
    if (type) result = result.filter((p) => p.type === type);
    if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (minBeds > 0) result = result.filter((p) => p.bedrooms >= minBeds);

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return result;
  }, [properties, query, type, city, minPrice, maxPrice, minBeds, sortBy]);

  const activeFilters: string[] = [];
  if (type) activeFilters.push(`Type: ${type}`);
  if (city) activeFilters.push(`City: ${city}`);
  if (minBeds > 0) activeFilters.push(`${minBeds}+ beds`);
  if (maxPrice < 15000000) activeFilters.push(`Max: $${(maxPrice / 1000000).toFixed(1)}M`);

  const clearFilter = (label: string) => {
    if (label.startsWith("Type")) setType("");
    else if (label.startsWith("City")) setCity("");
    else if (label.includes("beds")) setMinBeds(0);
    else if (label.startsWith("Max")) setMaxPrice(15000000);
  };

  const Filters = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Property Type</Label>
        <NativeSelect value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="studio">Studio</option>
          <option value="penthouse">Penthouse</option>
          <option value="townhouse">Townhouse</option>
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <Input
          placeholder="Filter by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Price Range</Label>
          <span className="text-xs text-muted-foreground">
            ${(minPrice / 1000000).toFixed(1)}M – ${(maxPrice / 1000000).toFixed(1)}M
          </span>
        </div>
        <Slider
          min={0}
          max={15000000}
          step={100000}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => { setMinPrice(min); setMaxPrice(max); }}
        />
      </div>

      <div className="space-y-2">
        <Label>Min Bedrooms</Label>
        <NativeSelect value={String(minBeds)} onChange={(e) => setMinBeds(Number(e.target.value))}>
          <option value="0">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </NativeSelect>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => { setType(""); setCity(""); setMinPrice(0); setMaxPrice(15000000); setMinBeds(0); }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-4 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search Properties</h1>
        <p className="text-muted-foreground">{filtered.length} properties found</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title, city, or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <NativeSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="hidden sm:block w-40"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low–High</option>
          <option value="price-desc">Price: High–Low</option>
          <option value="newest">Newest First</option>
        </NativeSelect>
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge className="ml-1 size-5 justify-center p-0 text-[10px]">{activeFilters.length}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Filters />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <Badge key={f} variant="secondary" className="gap-1 pl-2 pr-1">
              {f}
              <button onClick={() => clearFilter(f)} className="ml-1">
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop filter panel */}
        <div className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20 rounded-xl border bg-card p-4 shadow-sm">
            <h3 className="mb-4 font-semibold text-sm">Filters</h3>
            <Filters />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title="No properties found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
