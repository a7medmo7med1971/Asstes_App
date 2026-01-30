import { Radio, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const realtimeStats = [
  { label: "Active Sensors", value: "1,247", icon: Radio, color: "text-success" },
  { label: "Alerts Today", value: "23", icon: AlertCircle, color: "text-danger" },
  { label: "Systems Online", value: "98.5%", icon: CheckCircle2, color: "text-success" },
  { label: "Avg Response", value: "1.2s", icon: Clock, color: "text-info" },
];

const RealtimeDetection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Realtime Detection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realtimeStats.map((stat) => (
          <StatCard key={stat.label} title={stat.label}>
            <div className="flex items-center gap-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
            </div>
          </StatCard>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-4">Live Monitoring Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Radio className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Sensor Feed {i}</p>
                <span className="inline-flex items-center gap-1 text-xs text-success mt-1">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Live
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealtimeDetection;
