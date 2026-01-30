import { createContext, useContext, useState, ReactNode } from "react";
import { AssetLocation } from "@/data/assetLocations";

interface AssetContextType {
  uploadedAssets: AssetLocation[];
  setUploadedAssets: (assets: AssetLocation[]) => void;
  addUploadedAssets: (assets: AssetLocation[]) => void;
  clearUploadedAssets: () => void;
  conditionThreshold: number;
  setConditionThreshold: (value: number) => void;
  forecastHorizon: number;
  setForecastHorizon: (value: number) => void;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedAssets, setUploadedAssets] = useState<AssetLocation[]>([]);
  const [conditionThreshold, setConditionThreshold] = useState(68);
  const [forecastHorizon, setForecastHorizon] = useState(12);

  const addUploadedAssets = (assets: AssetLocation[]) => {
    setUploadedAssets((prev) => [...prev, ...assets]);
  };

  const clearUploadedAssets = () => {
    setUploadedAssets([]);
  };

  return (
    <AssetContext.Provider
      value={{
        uploadedAssets,
        setUploadedAssets,
        addUploadedAssets,
        clearUploadedAssets,
        conditionThreshold,
        setConditionThreshold,
        forecastHorizon,
        setForecastHorizon,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssetContext must be used within an AssetProvider");
  }
  return context;
};
