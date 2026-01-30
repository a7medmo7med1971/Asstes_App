import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { assetLocations, getConditionColor, getAssetTypeIcon, AssetLocation } from "@/data/assetLocations";
import { useAssetContext } from "@/contexts/AssetContext";

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const conditionFilters = ["All", "Good", "Fair", "Poor", "Very Poor"] as const;
const typeFilters = ["All", "Pavement", "Bridge", "Drainage", "Signage", "Lighting", "Culvert"] as const;

export const InteractiveAssetMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  
  const [selectedCondition, setSelectedCondition] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");

  const { uploadedAssets, conditionThreshold } = useAssetContext();

  // Combine static and uploaded assets
  const allAssets = [...assetLocations, ...uploadedAssets];

  const filteredAssets = allAssets.filter((asset) => {
    const conditionMatch = selectedCondition === "All" || asset.condition === selectedCondition;
    const typeMatch = selectedType === "All" || asset.type === selectedType;
    return conditionMatch && typeMatch;
  });

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Abu Dhabi
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([24.4539, 54.3773], 12);

    // Use CartoDB Voyager for a cleaner, more modern look (similar to Mapbox)
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when filters or assets change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredAssets.forEach((asset) => {
      const color = getConditionColor(asset.condition);
      const icon = getAssetTypeIcon(asset.type);
      const isUploaded = uploadedAssets.some((ua) => ua.id === asset.id);
      const isBelowThreshold = asset.conditionScore < conditionThreshold;

      // Create custom icon with pulse effect for uploaded assets below threshold
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            position: relative;
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid ${isUploaded ? '#3b82f6' : 'white'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            font-size: 14px;
            ${isBelowThreshold ? 'animation: pulse 2s infinite;' : ''}
          ">
            ${icon}
          </div>
          ${isUploaded ? `<div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 10px;
            height: 10px;
            background: #3b82f6;
            border-radius: 50%;
            border: 2px solid white;
          "></div>` : ''}
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([asset.lat, asset.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f2937;">
            ${asset.name}
            ${isUploaded ? '<span style="background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 8px;">Uploaded</span>' : ''}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280;">ID:</span>
              <span style="font-weight: 500; color: #1f2937;">${asset.id}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280;">Type:</span>
              <span style="font-weight: 500; color: #1f2937;">${asset.type}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280;">Condition:</span>
              <span style="
                font-weight: 500;
                color: ${color};
              ">${asset.condition}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280;">Score:</span>
              <span style="font-weight: 500; color: #1f2937;">${asset.conditionScore}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6b7280;">Coords:</span>
              <span style="font-weight: 500; color: #1f2937;">${asset.lat.toFixed(4)}, ${asset.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Fit bounds if we have uploaded assets
    if (uploadedAssets.length > 0 && mapInstanceRef.current) {
      const bounds = L.latLngBounds(filteredAssets.map((a) => [a.lat, a.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredAssets, uploadedAssets, conditionThreshold]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Header with Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-semibold text-foreground">
            1. Asset Locations - Abu Dhabi Region
          </h3>
          <div className="flex flex-wrap gap-2">
            {/* Condition Filter */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {conditionFilters.map((condition) => (
                <option key={condition} value={condition}>
                  {condition === "All" ? "All Conditions" : condition}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {typeFilters.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{filteredAssets.length}</strong> of{" "}
            <strong className="text-foreground">{allAssets.length}</strong> assets
          </span>
          {uploadedAssets.length > 0 && (
            <span className="text-primary">
              <strong>{uploadedAssets.length}</strong> uploaded
            </span>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="h-[400px] w-full" />

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">Condition:</span>
          {[
            { label: "Good", color: "#4ade80" },
            { label: "Fair", color: "#facc15" },
            { label: "Poor", color: "#f97316" },
            { label: "Very Poor", color: "#ef4444" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-4">
            <div className="w-3 h-3 rounded-full border-2 border-primary bg-muted" />
            <span className="text-xs text-muted-foreground">Uploaded Asset</span>
          </div>
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
