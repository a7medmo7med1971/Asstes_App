import { StatCard } from "./StatCard";

const legendItems = [
  { label: "Good", color: "bg-chart-good" },
  { label: "Fair", color: "bg-chart-fair" },
  { label: "Poor", color: "bg-chart-poor" },
  { label: "Very Poor", color: "bg-chart-veryPoor" },
];

export const AssetInventoryMap = () => {
  return (
    <StatCard title="Asset inventory" className="col-span-1">
      <div className="relative">
        {/* Simplified Map Visualization */}
        <svg viewBox="0 0 200 160" className="w-full h-40">
          {/* Map regions with different conditions */}
          <path
            d="M40 20 L80 15 L90 40 L70 60 L45 55 Z"
            fill="hsl(var(--chart-good))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M80 15 L120 10 L130 35 L90 40 Z"
            fill="hsl(var(--chart-fair))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M120 10 L160 20 L155 50 L130 35 Z"
            fill="hsl(var(--chart-good))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M45 55 L70 60 L75 90 L50 95 L35 80 Z"
            fill="hsl(var(--chart-fair))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M70 60 L90 40 L110 55 L100 85 L75 90 Z"
            fill="hsl(var(--chart-poor))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M90 40 L130 35 L135 65 L110 55 Z"
            fill="hsl(var(--chart-good))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M130 35 L155 50 L150 80 L135 65 Z"
            fill="hsl(var(--chart-fair))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M75 90 L100 85 L105 115 L80 120 Z"
            fill="hsl(var(--chart-veryPoor))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M100 85 L135 65 L140 100 L115 110 L105 115 Z"
            fill="hsl(var(--chart-poor))"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M135 65 L150 80 L145 105 L140 100 Z"
            fill="hsl(var(--chart-good))"
            stroke="white"
            strokeWidth="1"
          />
        </svg>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StatCard>
  );
};
