import { Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ViewingStatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { MOCK_USERS } from "@/data/mock";

export default function Viewings() {
  const { user } = useAuth();
  const { viewings, updateViewingStatus } = useData();
  const navigate = useNavigate();

  if (!user) {
    return (
      <EmptyState
        icon={Calendar}
        title="Sign in to view your viewings"
        description="Track all your scheduled property viewings in one place."
        actionLabel="Sign In"
        onAction={() => navigate("/login")}
      />
    );
  }

  const userViewings = viewings.filter((v) => v.userId === user.id);

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Viewings</h1>
        <p className="text-muted-foreground">{userViewings.length} scheduled {userViewings.length === 1 ? "viewing" : "viewings"}</p>
      </div>

      {userViewings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No viewings scheduled"
          description="Schedule a viewing from any property listing to see it here."
          actionLabel="Browse Properties"
          onAction={() => navigate("/search")}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userViewings.map((v) => {
            const agent = MOCK_USERS.find((u) => u.id === v.agentId);
            return (
              <motion.div key={v.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/60 shadow-sm overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <img src={v.propertyImage} alt="" className="size-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                      <span className="text-sm font-semibold text-background line-clamp-1">{v.propertyTitle}</span>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <ViewingStatusBadge status={v.status} />
                      <span className="text-xs text-muted-foreground">{v.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-4 text-muted-foreground shrink-0" />
                      <span>{v.date} at {v.time}</span>
                    </div>

                    {agent && (
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback>{agent.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Agent: {agent.name}</span>
                      </div>
                    )}

                    {v.notes && (
                      <p className="text-xs text-muted-foreground line-clamp-2 border-t pt-2">{v.notes}</p>
                    )}

                    <div className="flex gap-2">
                      <Link to={`/property/${v.propertyId}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">View Property</Button>
                      </Link>
                      {v.status === "pending" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => updateViewingStatus(v.id, "cancelled")}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
