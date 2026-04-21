export const properties = [
  { id: 1, title: "Oceanfront Villa", description: "Stunning beachfront property with panoramic ocean views, private pool, and direct beach access.", address: "142 Coastal Drive, Malibu, CA", type: "Villa", bedrooms: 4, bathrooms: 3, amenities: ["Pool", "WiFi", "AC", "Beach Access", "Parking"], pricePerNight: 450, status: "Available", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop" },
  { id: 2, title: "Downtown Loft", description: "Modern industrial loft in the heart of downtown with exposed brick and city skyline views.", address: "88 Main Street, New York, NY", type: "Apartment", bedrooms: 2, bathrooms: 1, amenities: ["WiFi", "AC", "Gym", "Doorman"], pricePerNight: 220, status: "Occupied", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop" },
  { id: 3, title: "Mountain Cabin Retreat", description: "Cozy log cabin nestled in the mountains, perfect for a relaxing getaway with hiking trails nearby.", address: "7 Pine Ridge Road, Aspen, CO", type: "Cabin", bedrooms: 3, bathrooms: 2, amenities: ["Fireplace", "WiFi", "Hot Tub", "Parking", "BBQ"], pricePerNight: 310, status: "Available", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop" },
  { id: 4, title: "Luxury Penthouse Suite", description: "Exclusive penthouse with rooftop terrace, private elevator, and 360-degree city views.", address: "1200 Skyline Blvd, Miami, FL", type: "Penthouse", bedrooms: 5, bathrooms: 4, amenities: ["Pool", "WiFi", "AC", "Gym", "Concierge", "Parking"], pricePerNight: 780, status: "Occupied", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop" },
  { id: 5, title: "Charming Studio", description: "Bright and airy studio apartment in a trendy neighborhood close to restaurants and shops.", address: "34 Elm Avenue, Austin, TX", type: "Studio", bedrooms: 1, bathrooms: 1, amenities: ["WiFi", "AC", "Laundry"], pricePerNight: 95, status: "Maintenance", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
  { id: 6, title: "Seaside Bungalow", description: "Quaint bungalow steps from the shore with a wrap-around porch and tropical garden.", address: "56 Shoreline Way, Key West, FL", type: "Bungalow", bedrooms: 2, bathrooms: 1, amenities: ["WiFi", "AC", "Patio", "Beach Access"], pricePerNight: 185, status: "Available", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
  { id: 7, title: "Urban Townhouse", description: "Spacious townhouse with a private garden, modern kitchen, and close to public transit.", address: "901 Oak Street, Chicago, IL", type: "Townhouse", bedrooms: 3, bathrooms: 2, amenities: ["WiFi", "AC", "Garden", "Parking", "Laundry"], pricePerNight: 265, status: "Occupied", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop" },
  { id: 8, title: "Desert Oasis", description: "Contemporary desert home with infinity pool, stargazing deck, and stunning sunset views.", address: "22 Cactus Lane, Scottsdale, AZ", type: "Villa", bedrooms: 4, bathrooms: 3, amenities: ["Pool", "WiFi", "AC", "Hot Tub", "Fire Pit"], pricePerNight: 395, status: "Available", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop" },
];

export const bookings = [
  { id: 1, guestName: "Sarah Johnson", guestEmail: "sarah@email.com", propertyId: 1, propertyTitle: "Oceanfront Villa", checkIn: "2026-04-22", checkOut: "2026-04-28", status: "Confirmed", totalAmount: 2700, guests: 4 },
  { id: 2, guestName: "Michael Chen", guestEmail: "michael@email.com", propertyId: 2, propertyTitle: "Downtown Loft", checkIn: "2026-04-18", checkOut: "2026-04-23", status: "Confirmed", totalAmount: 1100, guests: 2 },
  { id: 3, guestName: "Emily Davis", guestEmail: "emily@email.com", propertyId: 4, propertyTitle: "Luxury Penthouse Suite", checkIn: "2026-05-01", checkOut: "2026-05-05", status: "Pending", totalAmount: 3120, guests: 6 },
  { id: 4, guestName: "James Wilson", guestEmail: "james@email.com", propertyId: 3, propertyTitle: "Mountain Cabin Retreat", checkIn: "2026-03-10", checkOut: "2026-03-15", status: "Completed", totalAmount: 1550, guests: 3 },
  { id: 5, guestName: "Lisa Anderson", guestEmail: "lisa@email.com", propertyId: 6, propertyTitle: "Seaside Bungalow", checkIn: "2026-04-25", checkOut: "2026-04-30", status: "Confirmed", totalAmount: 925, guests: 2 },
  { id: 6, guestName: "Robert Taylor", guestEmail: "robert@email.com", propertyId: 7, propertyTitle: "Urban Townhouse", checkIn: "2026-03-01", checkOut: "2026-03-04", status: "Cancelled", totalAmount: 795, guests: 4 },
  { id: 7, guestName: "Amanda Martinez", guestEmail: "amanda@email.com", propertyId: 8, propertyTitle: "Desert Oasis", checkIn: "2026-05-10", checkOut: "2026-05-17", status: "Pending", totalAmount: 2765, guests: 5 },
  { id: 8, guestName: "David Brown", guestEmail: "david@email.com", propertyId: 1, propertyTitle: "Oceanfront Villa", checkIn: "2026-02-14", checkOut: "2026-02-20", status: "Completed", totalAmount: 2700, guests: 3 },
];

export const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", role: "Guest", status: "Active", joinDate: "2025-06-15", bookings: 3 },
  { id: 2, name: "Michael Chen", email: "michael@email.com", role: "Host", status: "Active", joinDate: "2025-03-22", properties: 4 },
  { id: 3, name: "Emily Davis", email: "emily@email.com", role: "Guest", status: "Active", joinDate: "2025-09-10", bookings: 1 },
  { id: 4, name: "James Wilson", email: "james@email.com", role: "Admin", status: "Active", joinDate: "2024-12-01", bookings: 0 },
  { id: 5, name: "Lisa Anderson", email: "lisa@email.com", role: "Host", status: "Active", joinDate: "2025-07-08", properties: 2 },
  { id: 6, name: "Robert Taylor", email: "robert@email.com", role: "Guest", status: "Disabled", joinDate: "2025-01-19", bookings: 5 },
  { id: 7, name: "Amanda Martinez", email: "amanda@email.com", role: "Guest", status: "Active", joinDate: "2025-11-30", bookings: 2 },
  { id: 8, name: "David Brown", email: "david@email.com", role: "Host", status: "Active", joinDate: "2025-04-14", properties: 6 },
];

export const revenueData = [
  { month: "Nov", revenue: 18200 },
  { month: "Dec", revenue: 24500 },
  { month: "Jan", revenue: 19800 },
  { month: "Feb", revenue: 22100 },
  { month: "Mar", revenue: 28400 },
  { month: "Apr", revenue: 31200 },
];

export const payments = [
  { id: 1, date: "2026-04-18", description: "Booking #2 — Downtown Loft", guest: "Michael Chen", amount: 1100, status: "Completed", method: "Credit Card" },
  { id: 2, date: "2026-04-15", description: "Booking #1 — Oceanfront Villa", guest: "Sarah Johnson", amount: 2700, status: "Completed", method: "Credit Card" },
  { id: 3, date: "2026-04-12", description: "Booking #5 — Seaside Bungalow", guest: "Lisa Anderson", amount: 925, status: "Pending", method: "PayPal" },
  { id: 4, date: "2026-04-08", description: "Booking #3 — Luxury Penthouse", guest: "Emily Davis", amount: 3120, status: "Pending", method: "Bank Transfer" },
  { id: 5, date: "2026-03-28", description: "Booking #7 — Desert Oasis", guest: "Amanda Martinez", amount: 2765, status: "Pending", method: "Credit Card" },
  { id: 6, date: "2026-03-15", description: "Booking #4 — Mountain Cabin", guest: "James Wilson", amount: 1550, status: "Completed", method: "Credit Card" },
  { id: 7, date: "2026-03-01", description: "Booking #6 — Urban Townhouse", guest: "Robert Taylor", amount: 795, status: "Refunded", method: "Credit Card" },
  { id: 8, date: "2026-02-20", description: "Booking #8 — Oceanfront Villa", guest: "David Brown", amount: 2700, status: "Completed", method: "PayPal" },
];