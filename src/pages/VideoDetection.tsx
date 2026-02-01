import { useState, useRef } from "react";
import { Video, Play, Pause, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface VideoFile {
  id: number;
  name: string;
  duration: string;
  status: "Completed" | "Processing" | "Queued";
  progress: number;
  url?: string;
}

const initialQueue: VideoFile[] = [
  { id: 1, name: "Highway_Survey_2024.mp4", duration: "45:23", status: "Completed", progress: 100 },
  { id: 2, name: "Bridge_Inspection_N12.mp4", duration: "12:45", status: "Processing", progress: 67 },
  { id: 3, name: "Tunnel_Scan_East.mp4", duration: "28:10", status: "Queued", progress: 0 },
  { id: 4, name: "Urban_Road_Survey.mp4", duration: "1:02:15", status: "Queued", progress: 0 },
];

const VideoDetection = () => {
  const [videoQueue, setVideoQueue] = useState<VideoFile[]>(initialQueue);
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB

    if (file.size > maxSize) {
      toast.error("Video file is too large. Max size is 2GB");
      return;
    }

    const validTypes = ["video/mp4", "video/avi", "video/quicktime", "video/x-msvideo"];
    if (!validTypes.includes(file.type)) {
      toast.error("Unsupported file type. Please upload MP4, AVI, or MOV");
      return;
    }

    const videoUrl = URL.createObjectURL(file);
    const newVideo: VideoFile = {
      id: Date.now(),
      name: file.name,
      duration: "00:00",
      status: "Queued",
      progress: 0,
      url: videoUrl,
    };

    setVideoQueue((prev) => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
    toast.success(`Uploaded video: ${file.name}`);

    // Reset input
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
        dataTransfer.items.add(files[0]);
        input.files = dataTransfer.files;
        handleFileUpload({ target: input } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const selectVideo = (video: VideoFile) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    if (!videoRef.current || !selectedVideo?.url) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Update duration in queue
      if (selectedVideo) {
        const mins = Math.floor(videoRef.current.duration / 60);
        const secs = Math.floor(videoRef.current.duration % 60);
        const durationStr = `${mins}:${secs.toString().padStart(2, "0")}`;
        setVideoQueue((prev) =>
          prev.map((v) => (v.id === selectedVideo.id ? { ...v, duration: durationStr } : v))
        );
      }
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * duration;
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const removeVideo = (id: number) => {
    const video = videoQueue.find((v) => v.id === id);
    if (video?.url) {
      URL.revokeObjectURL(video.url);
    }
    setVideoQueue((prev) => prev.filter((v) => v.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
      setIsPlaying(false);
    }
  };

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
          <div className="aspect-video bg-foreground/5 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
            {selectedVideo?.url ? (
              <video
                ref={videoRef}
                src={selectedVideo.url}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
            ) : (
              <div className="text-center">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Select a video to preview</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={togglePlay}
              disabled={!selectedVideo?.url}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <div 
              className="flex-1 h-2 bg-secondary rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground min-w-[80px] text-right">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Upload Video</h3>
          <div 
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag & drop video here</p>
            <p className="text-xs text-muted-foreground mb-3">MP4, AVI, MOV (Max 2GB)</p>
            <Button size="sm" type="button">Browse</Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/avi,video/quicktime,video/x-msvideo"
            className="hidden"
            onChange={handleFileUpload}
          />
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
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videoQueue.map((video) => (
                <tr 
                  key={video.id} 
                  className={`border-b border-border hover:bg-muted/30 cursor-pointer ${
                    selectedVideo?.id === video.id ? "bg-muted/50" : ""
                  }`}
                  onClick={() => selectVideo(video)}
                >
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
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeVideo(video.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
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
