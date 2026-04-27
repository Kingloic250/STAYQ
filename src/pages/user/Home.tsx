import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, Shield, Users, Star, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/common/PropertyCard";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";

const HERO_STATS = [
  { icon: Building2, label: "Properties", value: "12,000+" },
  { icon: Users, label: "Happy Buyers", value: "3,500+" },
  { icon: TrendingUp, label: "Avg. ROI", value: "18.4%" },
  { icon: Star, label: "Agent Rating", value: "4.9/5" },
];

const CITIES = [
  { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400", listings: 342 },
  { name: "Los Angeles", image: "https://images.unsplash.com/photo-1610387680938-4e9b21fa86d2?w=400", listings: 289 },
  { name: "Miami", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400", listings: 178 },
  { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400", listings: 203 },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every property is verified by our team for accuracy and legitimacy.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description: "Work with licensed professionals who know your local market inside and out.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Access real-time market data, price trends, and neighborhood analytics.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const { properties } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const featured = properties.filter((p) => p.featured && (p.status === "active" || p.status === "approved")).slice(0, 4);
  const recent = properties.filter((p) => p.status === "active" || p.status === "approved").slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground to-foreground/80 px-4 py-20 md:py-32 text-background">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600"
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-background/30 bg-background/10 text-background backdrop-blur-sm">
              <MapPin className="size-3" />
              Premium Properties Nationwide
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance leading-tight md:text-6xl lg:text-7xl">
              Find Your{" "}
              <span className="text-background/70">Dream Home</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-background/80 leading-relaxed">
              Discover premium properties across the country. From cozy studios to luxury estates — your perfect home is waiting.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by city, property type, or keyword..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 pl-9 bg-background text-foreground"
                />
              </div>
              <Button type="submit" size="lg" variant="secondary">
                Search
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Villa", "Apartment", "House", "Penthouse"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => navigate(`/search?type=${t.toLowerCase()}`)}
                  className="rounded-full border border-background/30 bg-background/10 px-3 py-1 text-xs text-background backdrop-blur-sm transition-colors hover:bg-background/20"
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-background/10 p-4 backdrop-blur-sm border border-background/20">
                <stat.icon className="mb-1 size-5 text-background/70" />
                <div className="text-2xl font-bold text-background">{stat.value}</div>
                <div className="text-sm text-background/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured Properties</h2>
              <p className="mt-1 text-muted-foreground">Handpicked premium listings</p>
            </div>
            <Link to="/search">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-muted/30 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Explore by City</h2>
            <p className="mt-1 text-muted-foreground">Discover properties in top markets</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((city) => (
              <motion.button
                key={city.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/search?city=${encodeURIComponent(city.name)}`)}
                className="group relative overflow-hidden rounded-xl"
              >
                <img src={city.image} alt={city.name} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-left">
                  <div className="text-lg font-bold text-background">{city.name}</div>
                  <div className="text-sm text-background/80">{city.listings} listings</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Latest Listings</h2>
              <p className="mt-1 text-muted-foreground">Fresh on the market</p>
            </div>
            <Link to="/search">
              <Button variant="ghost" size="sm">
                See all <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recent.slice(0, 8).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-muted/30 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold tracking-tight">Why Choose RealHaven?</h2>
          <p className="mt-2 text-muted-foreground">Everything you need for a confident home purchase</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {WHY_US.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border bg-background p-6 text-left shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <item.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="px-4 py-16 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">Ready to get started?</h2>
            <p className="mt-2 text-muted-foreground">Sign in to save favorites, schedule viewings, and send offers.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/login">
                <Button size="lg">Sign In</Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline">Browse Properties</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
