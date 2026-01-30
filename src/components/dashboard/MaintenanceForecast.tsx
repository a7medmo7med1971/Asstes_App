import { StatCard } from "./StatCard";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 30 },
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
  { value: 55 },
  { value: 70 },
];

export const MaintenanceForecast = () => {
  return (
    <StatCard title="Maintenance Forecast">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--info))"
              strokeWidth="12"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">$1,2M</p>
        </div>
      </div>
    </StatCard>
  );
};
