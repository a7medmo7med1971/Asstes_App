import { useState, useRef } from "react";
import { Image, Upload, CheckCircle2, AlertTriangle, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageFile {
  id: number;
  name: string;
  status: "Completed" | "Processing" | "Queued";
  defects: number;
  confidence: number;
  url?: string;
}

const initialResults: ImageFile[] = [
  { id: 1, name: "Bridge_Scan_001.jpg", status: "Completed", defects: 3, confidence: 94 },
  { id: 2, name: "Pavement_Sector_A.jpg", status: "Completed", defects: 7, confidence: 89 },
  { id: 3, name: "Drainage_North.jpg", status: "Processing", defects: 0, confidence: 0 },
  { id: 4, name: "Road_Surface_12.jpg", status: "Completed", defects: 2, confidence: 96 },
];

const ImageDetection = () => {
  const [imageResults, setImageResults] = useState<ImageFile[]>(initialResults);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const maxSize = 50 * 1024 * 1024; // 50MB
    const validTypes = ["image/jpeg", "image/png", "image/tiff"];

    Array.from(files).forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`Image ${file.name} is too large. Max size is 50MB`);
        return;
      }

      if (!validTypes.includes(file.type)) {
        toast.error(`File type ${file.name} is not supported. Please upload JPG, PNG, or TIFF`);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      const newImage: ImageFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        status: "Queued",
        defects: 0,
        confidence: 0,
        url: imageUrl,
      };

      setImageResults((prev) => [newImage, ...prev]);
      toast.success(`Image uploaded: ${file.name}`);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        Array.from(files).forEach((file) => dataTransfer.items.add(file));
        input.files = dataTransfer.files;
        handleFileUpload({ target: input } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = (id: number) => {
    const image = imageResults.find((img) => img.id === id);
    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }
    setImageResults((prev) => prev.filter((img) => img.id !== id));
    toast.success("Image deleted");
  };

  const openPreview = (image: ImageFile) => {
    if (image.url) {
      setSelectedImage(image);
      setPreviewOpen(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Image Detection</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Images Processed">
          <p className="text-3xl font-bold text-foreground">
            {imageResults.filter(i => i.status === "Completed").length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Out of total {imageResults.length}
          </p>
        </StatCard>
        <StatCard title="Defects Detected">
          <p className="text-3xl font-bold text-danger">
            {imageResults.reduce((sum, i) => sum + i.defects, 0)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Across all assets</p>
        </StatCard>
        <StatCard title="Avg Confidence">
          <p className="text-3xl font-bold text-success">
            {imageResults.filter(i => i.confidence > 0).length > 0 
              ? Math.round(
                  imageResults.filter(i => i.confidence > 0)
                    .reduce((sum, i) => sum + i.confidence, 0) /
                  imageResults.filter(i => i.confidence > 0).length
                )
              : 0}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">Model accuracy</p>
        </StatCard>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-4">Upload Images for Analysis</h2>
        <div 
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            Drag & drop images here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports: JPG, PNG, TIFF (Max 50MB per file)
          </p>
          <Button type="button">
            <Image className="w-4 h-4 mr-2" />
            Select Images
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/tiff"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
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
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {imageResults.map((result) => (
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
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {result.url && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openPreview(result)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeImage(result.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
          </DialogHeader>
          {selectedImage?.url && (
            <img 
              src={selectedImage.url} 
              alt={selectedImage.name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageDetection;
