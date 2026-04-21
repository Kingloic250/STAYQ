import { bookings } from "@/lib/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RecentBookings() {
  const recent = bookings.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Bookings</CardTitle>
        <CardDescription>Latest guest reservations</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="min-h-[240px]">
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden sm:table-cell">Property</TableHead>
                <TableHead className="hidden md:table-cell">Check-in</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.guestName}</TableCell>
                  <TableCell className="text-muted-foreground hidden sm:table-cell">{b.propertyTitle}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {format(new Date(b.checkIn), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium">${b.totalAmount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={b.status} /></TableCell>
                </TableRow>
              ))}
</TableBody>
            </Table>
          </ScrollArea>
        </div>
        </CardContent>
    </Card>
  );
}