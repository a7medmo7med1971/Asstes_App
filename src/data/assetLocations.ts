export interface AssetLocation {
  id: string;
  name: string;
  type: "Pavement" | "Bridge" | "Drainage" | "Signage" | "Lighting" | "Culvert";
  condition: "Good" | "Fair" | "Poor" | "Very Poor";
  lat: number;
  lng: number;
  conditionScore: number;
}

// Abu Dhabi region asset locations
export const assetLocations: AssetLocation[] = [
  {
    id: "P-771",
    name: "SH09 Rural Stretch",
    type: "Pavement",
    condition: "Poor",
    lat: 24.4539,
    lng: 54.3773,
    conditionScore: 49,
  },
  {
    id: "B-220",
    name: "Godavari Overpass",
    type: "Bridge",
    condition: "Fair",
    lat: 24.4839,
    lng: 54.3573,
    conditionScore: 58,
  },
  {
    id: "D-045",
    name: "Kaveri Culvert",
    type: "Culvert",
    condition: "Good",
    lat: 24.4239,
    lng: 54.4173,
    conditionScore: 71,
  },
  {
    id: "D-512",
    name: "Canal Drainage Spur",
    type: "Drainage",
    condition: "Fair",
    lat: 24.4639,
    lng: 54.4373,
    conditionScore: 63,
  },
  {
    id: "A-118",
    name: "NH16 Urban Spur",
    type: "Pavement",
    condition: "Fair",
    lat: 24.4139,
    lng: 54.3273,
    conditionScore: 66,
  },
  {
    id: "A-101",
    name: "NH45 Segment 12",
    type: "Pavement",
    condition: "Good",
    lat: 24.4939,
    lng: 54.4073,
    conditionScore: 78,
  },
  {
    id: "B-803",
    name: "Riverfront Viaduct",
    type: "Bridge",
    condition: "Good",
    lat: 24.5039,
    lng: 54.3673,
    conditionScore: 82,
  },
  {
    id: "S-908",
    name: "Expressway Signage",
    type: "Signage",
    condition: "Good",
    lat: 24.4439,
    lng: 54.3473,
    conditionScore: 74,
  },
  {
    id: "P-120",
    name: "Feeder Road Cluster",
    type: "Pavement",
    condition: "Fair",
    lat: 24.4339,
    lng: 54.3973,
    conditionScore: 60,
  },
  {
    id: "L-332",
    name: "City Lighting Corridor",
    type: "Lighting",
    condition: "Good",
    lat: 24.4739,
    lng: 54.3873,
    conditionScore: 84,
  },
  {
    id: "P-445",
    name: "Corniche Road Section",
    type: "Pavement",
    condition: "Good",
    lat: 24.4620,
    lng: 54.3250,
    conditionScore: 85,
  },
  {
    id: "B-112",
    name: "Marina Bridge",
    type: "Bridge",
    condition: "Very Poor",
    lat: 24.4850,
    lng: 54.4120,
    conditionScore: 35,
  },
];

export const getConditionColor = (condition: AssetLocation["condition"]): string => {
  switch (condition) {
    case "Good":
      return "#4ade80"; // green
    case "Fair":
      return "#facc15"; // yellow
    case "Poor":
      return "#f97316"; // orange
    case "Very Poor":
      return "#ef4444"; // red
    default:
      return "#6b7280"; // gray
  }
};

export const getAssetTypeIcon = (type: AssetLocation["type"]): string => {
  switch (type) {
    case "Pavement":
      return "🛣️";
    case "Bridge":
      return "🌉";
    case "Drainage":
      return "🚰";
    case "Signage":
      return "🪧";
    case "Lighting":
      return "💡";
    case "Culvert":
      return "🔲";
    default:
      return "📍";
  }
};
