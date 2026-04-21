import { properties } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import ReactECharts from "echarts-for-react";

const STATUSES = [
  { key: "Available", color: "#10b981" },
  { key: "Occupied", color: "#8b5cf6" },
  { key: "Maintenance", color: "#f59e0b" },
];

const CHART_COLORS = [
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan  
  "#f43f5e", // Rose
];

export default function PropertyBreakdown() {
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const total = properties.length;

  const counts = STATUSES.map(s => ({
    ...s,
    value: properties.filter(p => p.status === s.key).length,
    pct: Math.round((properties.filter(p => p.status === s.key).length / total) * 100),
    name: s.key,
  })).filter(s => s.value > 0);

  const chartData = counts.map((s, index) => ({
    value: s.value,
    name: s.key,
    itemStyle: { color: CHART_COLORS[index % CHART_COLORS.length] },
    pct: s.pct,
  }));

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      borderColor: '#333',
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
      formatter: (params) => {
        if (params.componentSubType === 'pie') {
          return `<strong>${params.name}</strong><br/>${params.value} properties<br/><strong>${params.percent}%</strong>`;
        }
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '50%'],
        data: chartData,
        emphasis: {
          scaleSize: 10,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10,
          },
        },
        itemStyle: {
          borderRadius: [8, 8],
          borderColor: 'hsl(var(--background))',
          borderWidth: 3,
        },
        animationType: 'scale',
        animationEasing: 'cubicOut',
        animationDuration: 800,
        label: {
          show: false,
        },
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Property Status</CardTitle>
        <CardDescription>Breakdown of {total} properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Modern ECharts Pie Chart */}
          <motion.div 
            className="w-full lg:w-80 h-80 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ReactECharts 
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </motion.div>

          {/* Modern Legend */}
          <motion.div 
            className="flex-1 w-full space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {counts.map((s) => (
              <motion.div
                key={s.key}
                variants={itemVariants}
                onMouseEnter={() => setHoveredStatus(s.key)}
                onMouseLeave={() => setHoveredStatus(null)}
                className="group cursor-pointer"
              >
                <div className="space-y-2 p-4 rounded-lg transition-all duration-300 hover:bg-muted/60 hover:shadow-sm border border-transparent hover:border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-5 h-5 rounded-md shrink-0 shadow-lg"
                      style={{ backgroundColor: CHART_COLORS[counts.indexOf(s) % CHART_COLORS.length] }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      />
                      <span className="text-base font-semibold text-foreground">{s.key}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="font-bold text-lg">{s.value}</div>
                        <div className="text-sm font-bold text-foreground/60">{s.pct}%</div>
                      </motion.div>
                    </div>
                  </div>
                  {/* Enhanced progress bar */}
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: CHART_COLORS[counts.indexOf(s) % CHART_COLORS.length] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}