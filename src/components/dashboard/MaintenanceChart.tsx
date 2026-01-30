import { StatCard } from "./StatCard";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const data = [
  { value: 20 },
  { value: 35 },
  { value: 25 },
  { value: 45 },
  { value: 30 },
  { value: 55 },
  { value: 40 },
  { value: 50 },
];

export const MaintenanceChart = () => {
  return (
    <StatCard title="Maintenance">
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="maintenanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--info))"
              strokeWidth={2}
              fill="url(#maintenanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </StatCard>
  );
};
