import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/shared/StatusBadge";
import { format } from "date-fns";
import { CalendarDays, User, MapPin, Users } from "lucide-react";

export default function BookingDetailModal({ open, onClose, booking }) {
  if (!booking) return null;

  const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));

  const details = [
    { icon: User, label: booking.guestName, sub: booking.guestEmail },
    { icon: MapPin, label: booking.propertyTitle, sub: null },
    { icon: CalendarDays, label: `${format(new Date(booking.checkIn), "MMM d")} — ${format(new Date(booking.checkOut), "MMM d, yyyy")}`, sub: `${nights} nights` },
    { icon: Users, label: `${booking.guests} guests`, sub: null },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            Booking #{booking.id}
            <StatusBadge status={booking.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="space-y-3">
            {details.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per night</span>
              <span>${Math.round(booking.totalAmount / nights).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span>{nights} nights</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm font-semibold">
              <span>Total Amount</span>
              <span className="text-primary text-base">${booking.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}