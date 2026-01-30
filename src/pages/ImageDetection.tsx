import { Image, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";

const detectionResults = [
  { id: 1, name: "Bridge_Scan_001.jpg", status: "Completed", defects: 3, confidence: 94 },
  { id: 2, name: "Pavement_Sector_A.jpg", status: "Completed", defects: 7, confidence: 89 },
  { id: 3, name: "Drainage_North.jpg", status: "Processing", defects: 0, confidence: 0 },
  { id: 4, name: "Road_Surface_12.jpg", status: "Completed", defects: 2, confidence: 96 },
];

const ImageDetection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Image Detection</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Images Processed">
          <p className="text-3xl font-bold text-foreground">2,847</p>
          <p className="text-sm text-muted-foreground mt-1">+124 this week</p>
        </StatCard>
        <StatCard title="Defects Detected">
          <p className="text-3xl font-bold text-danger">456</p>
          <p className="text-sm text-muted-foreground mt-1">Across all assets</p>
        </StatCard>
        <StatCard title="Avg Confidence">
          <p className="text-3xl font-bold text-success">92.3%</p>
          <p className="text-sm text-muted-foreground mt-1">Model accuracy</p>
        </StatCard>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-4">Upload Images for Analysis</h2>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
          <p className="text-sm text-muted-foreground mb-4">Supports: JPG, PNG, TIFF (Max 50MB per file)</p>
          <Button>
            <Image className="w-4 h-4 mr-2" />
            Select Images
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recent Analysis Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="text-left py-3 px-4">File Name</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Defects</th>
                <th className="text-left py-3 px-4">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {detectionResults.map((result) => (
                <tr key={result.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 text-sm text-primary">{result.name}</td>
                  <td className="py-3 px-4">
                    {result.status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 text-sm text-success">
                        <CheckCircle2 className="w-4 h-4" />
                        {result.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-warning">
                        <AlertTriangle className="w-4 h-4" />
                        {result.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">{result.defects || "-"}</td>
                  <td className="py-3 px-4">
                    {result.confidence > 0 ? (
                      <div className="flex items-center gap-2">
                        <Progress value={result.confidence} className="w-20 h-2" />
                        <span className="text-sm">{result.confidence}%</span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;
