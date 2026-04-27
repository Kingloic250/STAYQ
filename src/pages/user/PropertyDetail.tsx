import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Bed, Bath, Square, Heart, Share2, Calendar, MessageSquare,
  ChevronLeft, ChevronRight, Car, Home, Star, Check, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { PropertyStatusBadge } from "@/components/common/StatusBadge";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { MOCK_USERS } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, addViewing, sendMessage } = useData();
  const { user, updateSavedProperties } = useAuth();

  const property = properties.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewingOpen, setViewingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  const [viewingDate, setViewingDate] = useState("");
  const [viewingTime, setViewingTime] = useState("10:00 AM");
  const [viewingNotes, setViewingNotes] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");

  if (!property) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <AlertCircle className="size-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Property not found</h2>
        <Button onClick={() => navigate("/search")}>Back to Search</Button>
      </div>
    );
  }

  const agent = MOCK_USERS.find((u) => u.id === property.agentId);
  const isSaved = user?.savedProperties.includes(property.id) ?? false;

  const toggleSave = () => {
    if (!user) { navigate("/login"); return; }
    const current = user.savedProperties;
    const updated = isSaved ? current.filter((i) => i !== property.id) : [...current, property.id];
    updateSavedProperties(updated);
  };

  const handleScheduleViewing = () => {
    if (!user) { navigate("/login"); return; }
    if (!viewingDate) return;
    addViewing({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0] ?? "",
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      agentId: property.agentId,
      agentName: property.agentName,
      date: viewingDate,
      time: viewingTime,
      status: "pending",
      notes: viewingNotes,
    });
    setViewingOpen(false);
    setViewingDate(""); setViewingNotes("");
  };

  const handleSendMessage = () => {
    if (!user) { navigate("/login"); return; }
    if (!messageContent.trim()) return;
    sendMessage({
      fromId: user.id,
      fromName: user.name,
      fromAvatar: user.avatar,
      toId: property.agentId,
      toName: property.agentName,
      propertyId: property.id,
      propertyTitle: property.title,
      subject: `Inquiry about ${property.title}`,
      content: messageContent,
      status: "unread",
    });
    setMessageOpen(false);
    setMessageContent("");
  };

  const prevImage = () => setCurrentImage((i) => (i - 1 + property.images.length) % property.images.length);
  const nextImage = () => setCurrentImage((i) => (i + 1) % property.images.length);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/search" className="hover:text-foreground transition-colors">Search</Link>
        <ChevronRight className="size-4" />
        <span className="text-foreground font-medium truncate">{property.title}</span>
      </div>

      {/* Gallery */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
        <motion.img
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={property.images[currentImage]}
          alt={property.title}
          className="size-full object-cover"
        />
        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, i) => (
                <button key={i} onClick={() => setCurrentImage(i)} className={cn("size-2 rounded-full transition-all", i === currentImage ? "bg-background" : "bg-background/50")} />
              ))}
            </div>
          </>
        )}
        {property.featured && (
          <Badge className="absolute left-3 top-3 bg-primary/90">Featured</Badge>
        )}
      </div>

      {/* Thumbnails */}
      {property.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {property.images.map((img, i) => (
            <button key={i} onClick={() => setCurrentImage(i)} className={cn("shrink-0 overflow-hidden rounded-lg border-2 transition-all", i === currentImage ? "border-primary" : "border-transparent")}>
              <img src={img} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <PropertyStatusBadge status={property.status} />
                <Badge variant="outline" className="capitalize text-xs">{property.type}</Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">{property.title}</h1>
              <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span className="text-sm">{property.location}</span>
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight">${property.price.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={toggleSave}>
                <Heart className={cn("size-4", isSaved && "fill-rose-500 text-rose-500")} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Bed, label: "Bedrooms", value: property.bedrooms || "Studio" },
              { icon: Bath, label: "Bathrooms", value: property.bathrooms },
              { icon: Square, label: "Area", value: `${property.area.toLocaleString()} ft²` },
              { icon: Car, label: "Parking", value: property.parking || "None" },
            ].map((s) => (
              <Card key={s.label} className="border-border/60">
                <CardContent className="flex flex-col items-center p-3 text-center">
                  <s.icon className="size-5 text-muted-foreground mb-1" />
                  <div className="font-semibold text-sm">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Description</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Property Details</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { label: "Property Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                { label: "Year Built", value: property.yearBuilt },
                { label: "City", value: property.city },
                { label: "State", value: property.state },
              ].map((d) => (
                <div key={d.label} className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{d.label}</span>
                  <span className="text-sm font-medium">{d.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {property.amenities.length > 0 && (
            <Card className="border-border/60">
              <CardHeader className="pb-2">
                <h3 className="font-semibold">Amenities</h3>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm">
                    <Check className="size-3.5 text-emerald-500 shrink-0" />
                    {a}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-4">
          {agent && (
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{agent.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">4.9 · Licensed Agent</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={() => { if (!user) navigate("/login"); else setViewingOpen(true); }}>
                    <Calendar className="size-4" />
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => { if (!user) navigate("/login"); else setMessageOpen(true); }}>
                    <MessageSquare className="size-4" />
                    Contact Agent
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={() => { if (!user) navigate("/login"); else setOfferOpen(true); }}>
                    <Home className="size-4" />
                    Make Offer
                  </Button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  {agent.phone}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Schedule Viewing Dialog */}
      <Dialog open={viewingOpen} onOpenChange={setViewingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule a Viewing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Preferred Date</Label>
              <Input type="date" value={viewingDate} onChange={(e) => setViewingDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-1.5">
              <Label>Preferred Time</Label>
              <NativeSelect value={viewingTime} onChange={(e) => setViewingTime(e.target.value)}>
                {["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-1.5">
              <Label>Notes (optional)</Label>
              <Textarea placeholder="Any specific questions or requests..." value={viewingNotes} onChange={(e) => setViewingNotes(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleScheduleViewing} disabled={!viewingDate}>
              Confirm Viewing Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">Send a message about <strong>{property.title}</strong></p>
            <Textarea
              placeholder="Hi, I'm interested in this property..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="min-h-[120px]"
            />
            <Button className="w-full" onClick={handleSendMessage} disabled={!messageContent.trim()}>
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog open={offerOpen} onOpenChange={setOfferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make an Offer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">Listed at <strong>${property.price.toLocaleString()}</strong></p>
            <div className="space-y-1.5">
              <Label>Your Offer ($)</Label>
              <Input type="number" placeholder={String(property.price)} value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Message to Agent</Label>
              <Textarea placeholder="Explain your offer..." value={offerMessage} onChange={(e) => setOfferMessage(e.target.value)} />
            </div>
            <Button className="w-full" onClick={() => { setOfferOpen(false); setOfferAmount(""); setOfferMessage(""); }}>
              Submit Offer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
