import { Video, Play, Pause, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";

const videoQueue = [
  { id: 1, name: "Highway_Survey_2024.mp4", duration: "45:23", status: "Completed", progress: 100 },
  { id: 2, name: "Bridge_Inspection_N12.mp4", duration: "12:45", status: "Processing", progress: 67 },
  { id: 3, name: "Tunnel_Scan_East.mp4", duration: "28:10", status: "Queued", progress: 0 },
  { id: 4, name: "Urban_Road_Survey.mp4", duration: "1:02:15", status: "Queued", progress: 0 },
];

const VideoDetection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Video Detection</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Videos Analyzed">
          <p className="text-3xl font-bold text-foreground">156</p>
        </StatCard>
        <StatCard title="Total Hours">
          <p className="text-3xl font-bold text-foreground">842h</p>
        </StatCard>
        <StatCard title="Detections">
          <p className="text-3xl font-bold text-warning">1,234</p>
        </StatCard>
        <StatCard title="Processing">
          <p className="text-3xl font-bold text-info">3</p>
        </StatCard>
      </div>

      {/* Video Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="aspect-video bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Select a video to preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Play className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Pause className="w-4 h-4" />
            </Button>
            <Progress value={0} className="flex-1" />
            <span className="text-sm text-muted-foreground">00:00 / 00:00</span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Upload Video</h3>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag & drop video</p>
            <p className="text-xs text-muted-foreground mb-3">MP4, AVI, MOV (Max 2GB)</p>
            <Button size="sm">Browse</Button>
          </div>
        </div>
      </div>

      {/* Video Queue */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Processing Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="text-left py-3 px-4">Video Name</th>
                <th className="text-left py-3 px-4">Duration</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Progress</th>
              </tr>
            </thead>
            <tbody>
              {videoQueue.map((video) => (
                <tr key={video.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 text-sm text-primary">{video.name}</td>
                  <td className="py-3 px-4 text-sm">{video.duration}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm ${
                        video.status === "Completed"
                          ? "text-success"
                          : video.status === "Processing"
                          ? "text-info"
                          : "text-muted-foreground"
                      }`}
                    >
                      {video.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={video.progress} className="w-24 h-2" />
                      <span className="text-sm text-muted-foreground">{video.progress}%</span>
                    </div>
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

export default VideoDetection;
