import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const ControlsPanel = () => {
  const [threshold, setThreshold] = useState([68]);
  const [forecastHorizon, setForecastHorizon] = useState([12]);

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-6">
      <h3 className="font-semibold text-foreground">Controls</h3>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="control-label">Upload asset inventory (.csv)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Drag and drop file here</p>
          <p className="text-xs text-muted-foreground mt-1">Limit 200MB per file • CSV</p>
          <Button variant="outline" size="sm" className="mt-3">
            Browse files
          </Button>
        </div>
      </div>

      {/* Condition Threshold Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="control-label">Condition threshold for action</label>
          <span className="text-sm font-medium text-danger">{threshold[0]}</span>
        </div>
        <div className="px-1">
          <Slider
            value={threshold}
            onValueChange={setThreshold}
            min={40}
            max={90}
            step={1}
            className="[&_[role=slider]]:bg-danger [&_[role=slider]]:border-danger [&_.relative]:bg-primary/20"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">40</span>
            <span className="text-xs text-muted-foreground">90</span>
          </div>
        </div>
      </div>

      {/* Forecast Horizon Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="control-label">Forecast horizon (months)</label>
          <span className="text-sm font-medium text-danger">{forecastHorizon[0]}</span>
        </div>
        <div className="px-1">
          <Slider
            value={forecastHorizon}
            onValueChange={setForecastHorizon}
            min={3}
            max={36}
            step={1}
            className="[&_[role=slider]]:bg-danger [&_[role=slider]]:border-danger [&_.relative]:bg-primary/20"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">3</span>
            <span className="text-xs text-muted-foreground">36</span>
          </div>
        </div>
      </div>
    </div>
  );
};
