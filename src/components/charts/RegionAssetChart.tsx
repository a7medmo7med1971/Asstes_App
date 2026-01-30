import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

const data = [
  { region: "Central", Bridge: 45, Culvert: 0, Drainage: 0, Lighting: 0, Pavement: 0, Signage: 0 },
  { region: "East", Bridge: 0, Culvert: 0, Drainage: 0, Lighting: 0, Pavement: 65, Signage: 0 },
  { region: "North", Bridge: 35, Culvert: 0, Drainage: 0, Lighting: 0, Pavement: 0, Signage: 0 },
  { region: "South", Bridge: 0, Culvert: 0, Drainage: 0, Lighting: 0, Pavement: 0, Signage: 25 },
  { region: "West", Bridge: 0, Culvert: 0, Drainage: 40, Lighting: 0, Pavement: 0, Signage: 0 },
];

const assetTypes = [
  { key: "Bridge", color: "hsl(var(--info))" },
  { key: "Culvert", color: "hsl(var(--chart-fair))" },
  { key: "Drainage", color: "hsl(var(--warning))" },
  { key: "Lighting", color: "hsl(var(--chart-poor))" },
  { key: "Pavement", color: "hsl(var(--chart-good))" },
  { key: "Signage", color: "hsl(var(--primary))" },
];

export const RegionAssetChart = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={20}>
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="region"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <Tooltip />
            {assetTypes.map((type) => (
              <Bar key={type.key} dataKey={type.key} fill={type.color} stackId="stack" radius={[0, 4, 4, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {assetTypes.map((type) => (
          <div key={type.key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: type.color }} />
            <span className="text-xs text-muted-foreground">{type.key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
