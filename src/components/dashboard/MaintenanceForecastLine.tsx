import { StatCard } from "./StatCard";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 30 },
  { value: 45 },
  { value: 35 },
  { value: 55 },
  { value: 50 },
  { value: 65 },
  { value: 60 },
  { value: 75 },
];

export const MaintenanceForecastLine = () => {
  return (
    <StatCard title="Maintenance forecast">
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--info))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-2xl font-bold text-foreground mt-2">$1,2M</p>
    </StatCard>
  );
};
