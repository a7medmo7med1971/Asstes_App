import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const data = [
  { year: "2024", spend: 200000 },
  { year: "2025", spend: 768000 },
  { year: "2026", spend: 450000 },
  { year: "2027", spend: 550000 },
];

export const BudgetForecastChart = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-semibold text-foreground mb-4">5. Budget Forecast</h3>
      
      {/* Summary Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="table-header">
              <th className="text-left py-2 px-3">planned_year</th>
              <th className="text-left py-2 px-3">planned_spend</th>
              <th className="text-left py-2 px-3">assets</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 px-3">2,025</td>
              <td className="py-2 px-3">768,000</td>
              <td className="py-2 px-3">10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Planned Spend"]} />
            <Line
              type="monotone"
              dataKey="spend"
              stroke="hsl(var(--info))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--info))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
