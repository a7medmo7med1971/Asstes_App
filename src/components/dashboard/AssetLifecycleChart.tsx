import { StatCard } from "./StatCard";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "1", value: 40, color: "hsl(var(--chart-good))" },
  { name: "2", value: 65, color: "hsl(var(--chart-fair))" },
  { name: "3", value: 85, color: "hsl(var(--chart-poor))" },
  { name: "4", value: 55, color: "hsl(var(--chart-good))" },
  { name: "5", value: 75, color: "hsl(var(--warning))" },
];

export const AssetLifecycleChart = () => {
  return (
    <StatCard title="Asset lifecycle">
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20}>
            <XAxis dataKey="name" hide />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-2xl font-bold text-foreground mt-2">3,258</p>
    </StatCard>
  );
};
