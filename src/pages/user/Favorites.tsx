import { Heart } from "lucide-react";
import { PropertyGrid } from "@/components/common/PropertyCard";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const { user } = useAuth();
  const { properties } = useData();
  const navigate = useNavigate();

  const saved = properties.filter((p) => user?.savedProperties.includes(p.id));

  if (!user) {
    return (
      <EmptyState
        icon={Heart}
        title="Sign in to view favorites"
        description="Save properties you love and access them anytime."
        actionLabel="Sign In"
        onAction={() => navigate("/login")}
      />
    );
  }

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Properties</h1>
        <p className="text-muted-foreground">{saved.length} saved {saved.length === 1 ? "property" : "properties"}</p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No saved properties"
          description="Browse properties and tap the heart icon to save your favorites here."
          actionLabel="Browse Properties"
          onAction={() => navigate("/search")}
        />
      ) : (
        <PropertyGrid properties={saved} />
      )}
    </div>
  );
}
