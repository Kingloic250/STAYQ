import { Building2, CalendarCheck, DollarSign, TrendingUp } from "lucide-react";
import StatCard from "@/components/shared/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import PropertyBreakdown from "@/components/dashboard/PropertyBreakdown";
import { properties, revenueData } from "@/lib/mockData";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Dashboard() {
  const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
  const occupiedCount = properties.filter(p => p.status === "Occupied").length;
  const occupancyRate = Math.round((occupiedCount / properties.length) * 100);

  return (
    <motion.div 
      className="space-y-6 max-w-7xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
       <motion.div 
         variants={itemVariants}
         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
       >
         <div>
           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">STAYQ</h1>
           <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's your property overview.</p>
         </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <StatCard title="Total Properties" value={properties.length} icon={Building2} trend="+2" trendUp subtitle="from last month" />
        <StatCard title="Active Listings" value={properties.filter(p => p.status === "Available").length} icon={CalendarCheck} trend="+1" trendUp subtitle="available now" />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+12.5%" trendUp subtitle="vs last period" />
        <StatCard title="Occupancy Rate" value={`${occupancyRate}%`} icon={TrendingUp} trend="+5%" trendUp subtitle="improvement" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RevenueChart />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PropertyBreakdown />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RecentBookings />
      </motion.div>
    </motion.div>
  );
}