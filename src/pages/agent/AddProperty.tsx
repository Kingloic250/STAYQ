import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyForm, type PropertyFormData } from "@/components/common/PropertyForm";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";

export default function AddProperty() {
  const { user } = useAuth();
  const { addProperty } = useData();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (data: PropertyFormData) => {
    if (!user) return;
    setSubmitting(true);
    addProperty({
      ...data,
      agentId: user.id,
      agentName: user.name,
      featured: data.featured ?? false,
    });
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Listing created successfully!");
      navigate("/agent/listings");
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Listing</h1>
        <p className="text-muted-foreground">Create a new property listing for your portfolio</p>
      </div>
      <PropertyForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/agent/listings")}
        isSubmitting={submitting}
        mode="add"
      />
    </div>
  );
}
