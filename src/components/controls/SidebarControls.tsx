import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAssetContext } from "@/contexts/AssetContext";
import { AssetLocation } from "@/data/assetLocations";
import { toast } from "sonner";

const parseCSVToAssets = (csvText: string): AssetLocation[] => {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].toLowerCase().split(",").map((h) => h.trim());
  const assets: AssetLocation[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length < headers.length) continue;

    const getVal = (key: string) => {
      const idx = headers.findIndex((h) => h.includes(key));
      return idx >= 0 ? values[idx] : "";
    };

    const conditionScore = parseFloat(getVal("condition") || getVal("score")) || 50;
    let condition: AssetLocation["condition"] = "Fair";
    if (conditionScore >= 70) condition = "Good";
    else if (conditionScore >= 50) condition = "Fair";
    else if (conditionScore >= 30) condition = "Poor";
    else condition = "Very Poor";

    const type = (getVal("type") || "Pavement") as AssetLocation["type"];

    const asset: AssetLocation = {
      id: getVal("id") || `U-${Date.now()}-${i}`,
      name: getVal("name") || `Uploaded Asset ${i}`,
      type: ["Pavement", "Bridge", "Drainage", "Signage", "Lighting", "Culvert"].includes(type) 
        ? type 
        : "Pavement",
      condition,
      lat: parseFloat(getVal("lat") || getVal("latitude")) || 24.4539 + (Math.random() - 0.5) * 0.1,
      lng: parseFloat(getVal("lng") || getVal("lon") || getVal("longitude")) || 54.3773 + (Math.random() - 0.5) * 0.1,
      conditionScore,
    };

    assets.push(asset);
  }

  return assets;
};

export const SidebarControls = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    addUploadedAssets,
    conditionThreshold,
    setConditionThreshold,
    forecastHorizon,
    setForecastHorizon,
  } = useAssetContext();

  const handleFileChange = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast.error("يرجى رفع ملف CSV فقط");
      return;
    }

    setUploadedFile(file);
    const text = await file.text();
    const assets = parseCSVToAssets(text);

    if (assets.length > 0) {
      addUploadedAssets(assets);
      toast.success(`تم إضافة ${assets.length} أصل إلى الخريطة`);
    } else {
      toast.error("لم يتم العثور على بيانات صالحة في الملف");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-3 py-4 space-y-5 border-t border-sidebar-border">
      <h3 className="font-semibold text-sm text-foreground">Controls</h3>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">
          Upload asset inventory (.csv)
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
          />
          <Upload className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-xs text-muted-foreground">Drag and drop file here</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Limit 200MB per file • CSV
          </p>
          <Button variant="outline" size="sm" className="mt-2 text-xs h-7">
            Browse files
          </Button>
        </div>

        {uploadedFile && (
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs truncate flex-1">{uploadedFile.name}</span>
            <button onClick={removeFile} className="text-muted-foreground hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Condition Threshold Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-muted-foreground">
            Condition threshold for action
          </label>
          <span className="text-xs font-medium text-destructive">{conditionThreshold}</span>
        </div>
        <Slider
          value={[conditionThreshold]}
          onValueChange={(v) => setConditionThreshold(v[0])}
          min={40}
          max={90}
          step={1}
          className="[&_[role=slider]]:bg-destructive [&_[role=slider]]:border-destructive"
        />
        <div className="flex justify-between">
          <span className="text-[10px] text-muted-foreground">40</span>
          <span className="text-[10px] text-muted-foreground">90</span>
        </div>
      </div>

      {/* Forecast Horizon Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs text-muted-foreground">
            Forecast horizon (months)
          </label>
          <span className="text-xs font-medium text-destructive">{forecastHorizon}</span>
        </div>
        <Slider
          value={[forecastHorizon]}
          onValueChange={(v) => setForecastHorizon(v[0])}
          min={3}
          max={36}
          step={1}
          className="[&_[role=slider]]:bg-destructive [&_[role=slider]]:border-destructive"
        />
        <div className="flex justify-between">
          <span className="text-[10px] text-muted-foreground">3</span>
          <span className="text-[10px] text-muted-foreground">36</span>
        </div>
      </div>
    </div>
  );
};
