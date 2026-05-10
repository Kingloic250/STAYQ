export type PropertyStatus = "active" | "pending" | "approved" | "rejected" | "sold" | "draft";
export type PropertyType = "house" | "apartment" | "villa" | "studio" | "penthouse" | "townhouse";
export type UserRole = "user" | "agent" | "admin";
export type ViewingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type MessageStatus = "read" | "unread";

export interface Property {
  id: string;
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
  agentId: string;
  agentName: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  amenities: string[];
  yearBuilt: number;
  parking: number;
  lat?: number;
  lng?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  phone: string;
  createdAt: string;
  status: "active" | "suspended";
  savedProperties: string[];
}

export interface Viewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  agentId: string;
  agentName: string;
  date: string;
  time: string;
  status: ViewingStatus;
  notes: string;
  createdAt: string;
}

export interface Message {
  id: string;
  fromId: string;
  fromName: string;
  fromAvatar: string;
  toId: string;
  toName: string;
  propertyId: string;
  propertyTitle: string;
  subject: string;
  content: string;
  status: MessageStatus;
  createdAt: string;
  thread: MessageThread[];
}

export interface MessageThread {
  id: string;
  fromId: string;
  fromName: string;
  content: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userId: string;
  userName: string;
  agentId: string;
  amount: number;
  status: "pending" | "accepted" | "rejected" | "countered";
  message: string;
  createdAt: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Modern Luxury Villa in Beverly Hills",
    description: "A stunning contemporary villa featuring floor-to-ceiling windows, an infinity pool, and breathtaking canyon views. This masterpiece of modern architecture offers unparalleled luxury living with smart home technology throughout.",
    price: 4500000,
    location: "123 Sunset Blvd, Beverly Hills",
    city: "Beverly Hills",
    state: "CA",
    bedrooms: 5,
    bathrooms: 4,
    area: 5200,
    type: "villa",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    featured: true,
    amenities: ["Pool", "Gym", "Smart Home", "Wine Cellar", "Home Theater", "3-Car Garage"],
    yearBuilt: 2021,
    parking: 3,
  },
  {
    id: "p2",
    title: "Downtown Manhattan Penthouse",
    description: "Exclusive penthouse with 360-degree city views, private rooftop terrace, and concierge service. Features high-end finishes, chef's kitchen, and direct elevator access.",
    price: 8200000,
    location: "1 Central Park West, New York",
    city: "New York",
    state: "NY",
    bedrooms: 4,
    bathrooms: 3,
    area: 3800,
    type: "penthouse",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-22",
    featured: true,
    amenities: ["Rooftop Terrace", "Concierge", "Gym", "Doorman", "Storage"],
    yearBuilt: 2019,
    parking: 2,
  },
  {
    id: "p3",
    title: "Charming Brownstone in Brooklyn Heights",
    description: "Historic brownstone with modern renovations, original hardwood floors, and a private garden. Located in one of Brooklyn's most sought-after neighborhoods.",
    price: 2100000,
    location: "45 Pierrepont St, Brooklyn",
    city: "Brooklyn",
    state: "NY",
    bedrooms: 4,
    bathrooms: 2,
    area: 2400,
    type: "house",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    ],
    agentId: "u3",
    agentName: "Marcus Johnson",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-18",
    featured: false,
    amenities: ["Private Garden", "Fireplace", "Wine Cellar", "Bike Storage"],
    yearBuilt: 1892,
    parking: 0,
  },
  {
    id: "p4",
    title: "Oceanfront Condo in Miami Beach",
    description: "Wake up to stunning ocean views in this beautifully appointed beachfront condo. Features a wrap-around balcony, resort-style amenities, and direct beach access.",
    price: 1850000,
    location: "1000 Ocean Dr, Miami Beach",
    city: "Miami Beach",
    state: "FL",
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    type: "apartment",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
    featured: true,
    amenities: ["Beach Access", "Pool", "Spa", "Fitness Center", "Valet Parking"],
    yearBuilt: 2018,
    parking: 1,
  },
  {
    id: "p5",
    title: "Mountain Retreat in Aspen",
    description: "Ski-in/ski-out luxury chalet with stone fireplaces, vaulted ceilings, and panoramic mountain views. The ultimate alpine escape with world-class finishes.",
    price: 6750000,
    location: "22 Peak Dr, Aspen",
    city: "Aspen",
    state: "CO",
    bedrooms: 6,
    bathrooms: 5,
    area: 6500,
    type: "house",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800",
    ],
    agentId: "u3",
    agentName: "Marcus Johnson",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-21",
    featured: true,
    amenities: ["Ski-in/Ski-out", "Hot Tub", "Fireplace", "Game Room", "Wine Cellar"],
    yearBuilt: 2020,
    parking: 4,
  },
  {
    id: "p6",
    title: "Contemporary Studio in SoHo",
    description: "Stylish studio in the heart of SoHo with exposed brick, industrial touches, and modern fixtures. Perfect for urban professionals seeking a Manhattan lifestyle.",
    price: 680000,
    location: "200 Broadway, New York",
    city: "New York",
    state: "NY",
    bedrooms: 0,
    bathrooms: 1,
    area: 620,
    type: "studio",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-20",
    featured: false,
    amenities: ["Doorman", "Laundry", "Bike Storage"],
    yearBuilt: 1990,
    parking: 0,
  },
  {
    id: "p7",
    title: "Spanish Colonial Estate in Santa Barbara",
    description: "Magnificent Spanish Colonial Revival estate set on 2 acres with ocean views. Features hand-painted tiles, arched doorways, and lush Mediterranean gardens.",
    price: 5400000,
    location: "888 Riviera Dr, Santa Barbara",
    city: "Santa Barbara",
    state: "CA",
    bedrooms: 7,
    bathrooms: 6,
    area: 7200,
    type: "villa",
    status: "pending",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
    ],
    agentId: "u3",
    agentName: "Marcus Johnson",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-23",
    featured: false,
    amenities: ["Pool", "Tennis Court", "Guest House", "Wine Cellar", "Outdoor Kitchen"],
    yearBuilt: 1935,
    parking: 4,
  },
  {
    id: "p8",
    title: "Modern Townhouse in Chicago",
    description: "Sleek and sophisticated townhouse in Lincoln Park with chef's kitchen, private rooftop deck, and attached 2-car garage. Walk to restaurants and lakefront.",
    price: 1250000,
    location: "44 Armitage Ave, Chicago",
    city: "Chicago",
    state: "IL",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    type: "townhouse",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-17",
    featured: false,
    amenities: ["Rooftop Deck", "Garage", "Smart Home", "Fireplace"],
    yearBuilt: 2017,
    parking: 2,
  },
  {
    id: "p9",
    title: "Craftsman Bungalow in Pasadena",
    description: "Lovingly restored 1920s Craftsman bungalow with period details, updated kitchen, and a magical backyard garden. Located in historic San Rafael Hills.",
    price: 1450000,
    location: "77 Oak Knoll Ave, Pasadena",
    city: "Pasadena",
    state: "CA",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "house",
    status: "sold",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    agentId: "u3",
    agentName: "Marcus Johnson",
    createdAt: "2023-12-20",
    updatedAt: "2024-01-10",
    featured: false,
    amenities: ["Garden", "Fireplace", "Workshop", "Storage"],
    yearBuilt: 1924,
    parking: 1,
  },
  {
    id: "p10",
    title: "Glass House in Lake Tahoe",
    description: "Spectacular contemporary glass house on the shores of Lake Tahoe. Walls of glass blur the line between indoors and out, offering unobstructed lake and mountain views.",
    price: 3800000,
    location: "15 Lakeshore Blvd, South Lake Tahoe",
    city: "South Lake Tahoe",
    state: "CA",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: "house",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-22",
    featured: true,
    amenities: ["Lake Access", "Hot Tub", "Dock", "Fireplace", "Ski Storage"],
    yearBuilt: 2023,
    parking: 2,
  },
  {
    id: "p11",
    title: "Historic Loft in Old Town Portland",
    description: "Dramatic warehouse conversion featuring 18-foot ceilings, original timber beams, and massive windows. Thoughtfully designed with industrial chic details.",
    price: 875000,
    location: "321 NW Pearl District, Portland",
    city: "Portland",
    state: "OR",
    bedrooms: 2,
    bathrooms: 2,
    area: 2100,
    type: "apartment",
    status: "draft",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
    ],
    agentId: "u3",
    agentName: "Marcus Johnson",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
    featured: false,
    amenities: ["Rooftop Access", "Bike Storage", "Pet Friendly"],
    yearBuilt: 1908,
    parking: 1,
  },
  {
    id: "p12",
    title: "Waterfront Estate in Newport Beach",
    description: "Premier waterfront estate on the Newport Bay with private dock, boat launch, and spectacular bay views. This trophy property is the pinnacle of coastal luxury.",
    price: 12500000,
    location: "1 Balboa Island Rd, Newport Beach",
    city: "Newport Beach",
    state: "CA",
    bedrooms: 6,
    bathrooms: 7,
    area: 8400,
    type: "villa",
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800",
    ],
    agentId: "u2",
    agentName: "Sarah Mitchell",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-23",
    featured: true,
    amenities: ["Private Dock", "Pool", "Guest House", "Smart Home", "Wine Room", "Home Theater"],
    yearBuilt: 2022,
    parking: 4,
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Thompson",
    email: "user@demo.com",
    password: "demo123",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    phone: "+1 (555) 234-5678",
    createdAt: "2024-01-01",
    status: "active",
    savedProperties: ["p1", "p4", "p10"],
  },
  {
    id: "u2",
    name: "Sarah Mitchell",
    email: "agent@demo.com",
    password: "demo123",
    role: "agent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    phone: "+1 (555) 345-6789",
    createdAt: "2023-06-15",
    status: "active",
    savedProperties: [],
  },
  {
    id: "u3",
    name: "Marcus Johnson",
    email: "agent2@demo.com",
    password: "demo123",
    role: "agent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    phone: "+1 (555) 456-7890",
    createdAt: "2023-08-20",
    status: "active",
    savedProperties: [],
  },
  {
    id: "u4",
    name: "Admin User",
    email: "admin@demo.com",
    password: "demo123",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    phone: "+1 (555) 567-8901",
    createdAt: "2023-01-01",
    status: "active",
    savedProperties: [],
  },
  {
    id: "u5",
    name: "Jennifer Walsh",
    email: "jennifer@example.com",
    password: "demo123",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    phone: "+1 (555) 678-9012",
    createdAt: "2024-01-05",
    status: "active",
    savedProperties: ["p2", "p5"],
  },
  {
    id: "u6",
    name: "Robert Chen",
    email: "robert@example.com",
    password: "demo123",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    phone: "+1 (555) 789-0123",
    createdAt: "2024-01-08",
    status: "suspended",
    savedProperties: [],
  },
];

export const MOCK_VIEWINGS: Viewing[] = [
  {
    id: "v1",
    propertyId: "p1",
    propertyTitle: "Modern Luxury Villa in Beverly Hills",
    propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
    userId: "u1",
    userName: "Alex Thompson",
    userEmail: "user@demo.com",
    agentId: "u2",
    agentName: "Sarah Mitchell",
    date: "2024-02-15",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Interested in the pool area and smart home features",
    createdAt: "2024-01-25",
  },
  {
    id: "v2",
    propertyId: "p4",
    propertyTitle: "Oceanfront Condo in Miami Beach",
    propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    userId: "u1",
    userName: "Alex Thompson",
    userEmail: "user@demo.com",
    agentId: "u2",
    agentName: "Sarah Mitchell",
    date: "2024-02-18",
    time: "2:00 PM",
    status: "pending",
    notes: "Would like to visit during sunset to see the ocean view",
    createdAt: "2024-01-26",
  },
  {
    id: "v3",
    propertyId: "p3",
    propertyTitle: "Charming Brownstone in Brooklyn Heights",
    propertyImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400",
    userId: "u5",
    userName: "Jennifer Walsh",
    userEmail: "jennifer@example.com",
    agentId: "u3",
    agentName: "Marcus Johnson",
    date: "2024-02-10",
    time: "11:00 AM",
    status: "completed",
    notes: "Very interested, considering making an offer",
    createdAt: "2024-01-20",
  },
  {
    id: "v4",
    propertyId: "p5",
    propertyTitle: "Mountain Retreat in Aspen",
    propertyImage: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=400",
    userId: "u5",
    userName: "Jennifer Walsh",
    userEmail: "jennifer@example.com",
    agentId: "u3",
    agentName: "Marcus Johnson",
    date: "2024-02-20",
    time: "3:00 PM",
    status: "pending",
    notes: "Planning a ski trip - want to see the ski-in access",
    createdAt: "2024-01-27",
  },
  {
    id: "v5",
    propertyId: "p2",
    propertyTitle: "Downtown Manhattan Penthouse",
    propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    userId: "u6",
    userName: "Robert Chen",
    userEmail: "robert@example.com",
    agentId: "u2",
    agentName: "Sarah Mitchell",
    date: "2024-02-05",
    time: "4:00 PM",
    status: "cancelled",
    notes: "Cancelled due to scheduling conflict",
    createdAt: "2024-01-22",
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    fromId: "u1",
    fromName: "Alex Thompson",
    fromAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    toId: "u2",
    toName: "Sarah Mitchell",
    propertyId: "p1",
    propertyTitle: "Modern Luxury Villa in Beverly Hills",
    subject: "Inquiry about Beverly Hills Villa",
    content: "Hi Sarah, I'm very interested in the Beverly Hills Villa. Could you tell me more about the smart home features and whether the price is negotiable?",
    status: "read",
    createdAt: "2024-01-25T10:30:00",
    thread: [
      {
        id: "t1",
        fromId: "u1",
        fromName: "Alex Thompson",
        content: "Hi Sarah, I'm very interested in the Beverly Hills Villa. Could you tell me more about the smart home features and whether the price is negotiable?",
        createdAt: "2024-01-25T10:30:00",
      },
      {
        id: "t2",
        fromId: "u2",
        fromName: "Sarah Mitchell",
        content: "Hi Alex! Thank you for your interest. The smart home system includes automated lighting, climate control, security cameras, and entertainment systems all managed from your phone. The listing price reflects current market conditions, but we are open to reasonable offers. Would you like to schedule a viewing?",
        createdAt: "2024-01-25T14:15:00",
      },
      {
        id: "t3",
        fromId: "u1",
        fromName: "Alex Thompson",
        content: "That sounds amazing! Yes, I'd love to schedule a viewing. How about next Saturday morning?",
        createdAt: "2024-01-26T09:00:00",
      },
    ],
  },
  {
    id: "m2",
    fromId: "u5",
    fromName: "Jennifer Walsh",
    fromAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    toId: "u3",
    toName: "Marcus Johnson",
    propertyId: "p5",
    propertyTitle: "Mountain Retreat in Aspen",
    subject: "Questions about Aspen Property",
    content: "Hello Marcus, is the Aspen chalet available for a viewing in late February? We're planning a ski trip and would love to see it in person.",
    status: "unread",
    createdAt: "2024-01-27T16:00:00",
    thread: [
      {
        id: "t4",
        fromId: "u5",
        fromName: "Jennifer Walsh",
        content: "Hello Marcus, is the Aspen chalet available for a viewing in late February? We're planning a ski trip and would love to see it in person.",
        createdAt: "2024-01-27T16:00:00",
      },
    ],
  },
  {
    id: "m3",
    fromId: "u6",
    fromName: "Robert Chen",
    fromAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    toId: "u2",
    toName: "Sarah Mitchell",
    propertyId: "p2",
    propertyTitle: "Downtown Manhattan Penthouse",
    subject: "Offer Submission - Manhattan Penthouse",
    content: "Hi Sarah, after viewing the penthouse, I'd like to submit an offer of $7.9M. The property is beautiful but I feel the price should account for the renovation timeline.",
    status: "read",
    createdAt: "2024-01-23T11:00:00",
    thread: [
      {
        id: "t5",
        fromId: "u6",
        fromName: "Robert Chen",
        content: "Hi Sarah, after viewing the penthouse, I'd like to submit an offer of $7.9M. The property is beautiful but I feel the price should account for the renovation timeline.",
        createdAt: "2024-01-23T11:00:00",
      },
      {
        id: "t6",
        fromId: "u2",
        fromName: "Sarah Mitchell",
        content: "Thank you for your offer, Robert. I've forwarded it to the seller for review. We'll get back to you within 48 hours. Would you be willing to go up to $8.1M?",
        createdAt: "2024-01-23T15:30:00",
      },
    ],
  },
];

export const MOCK_ANALYTICS = {
  totalProperties: 12,
  activeListings: 8,
  totalUsers: 6,
  totalAgents: 2,
  pendingApprovals: 2,
  totalViewings: 5,
  monthlyRevenue: [
    { month: "Aug", revenue: 320000 },
    { month: "Sep", revenue: 450000 },
    { month: "Oct", revenue: 380000 },
    { month: "Nov", revenue: 520000 },
    { month: "Dec", revenue: 610000 },
    { month: "Jan", revenue: 490000 },
  ],
  propertyTypes: [
    { type: "Villa", count: 3, fill: "var(--chart-1)" },
    { type: "House", count: 4, fill: "var(--chart-2)" },
    { type: "Apartment", count: 2, fill: "var(--chart-3)" },
    { type: "Penthouse", count: 1, fill: "var(--chart-4)" },
    { type: "Studio", count: 1, fill: "var(--chart-5)" },
    { type: "Townhouse", count: 1, fill: "var(--chart-1)" },
  ],
  viewingsByStatus: [
    { status: "Confirmed", count: 1 },
    { status: "Pending", count: 2 },
    { status: "Completed", count: 1 },
    { status: "Cancelled", count: 1 },
  ],
  recentActivity: [
    { action: "New property listed", detail: "Modern Luxury Villa in Beverly Hills", time: "2 hours ago" },
    { action: "Viewing scheduled", detail: "Alex Thompson - Beverly Hills Villa", time: "3 hours ago" },
    { action: "Offer submitted", detail: "$7.9M for Manhattan Penthouse", time: "5 hours ago" },
    { action: "New user registered", detail: "Jennifer Walsh joined", time: "1 day ago" },
    { action: "Property approved", detail: "Charming Brownstone in Brooklyn", time: "1 day ago" },
    { action: "Listing pending review", detail: "Spanish Colonial Estate in Santa Barbara", time: "2 days ago" },
  ],
};
