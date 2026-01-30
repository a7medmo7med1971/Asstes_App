import { DataTable } from "@/components/tables/DataTable";
import { RegionAssetChart } from "@/components/charts/RegionAssetChart";
import { BudgetForecastChart } from "@/components/charts/BudgetForecastChart";
import { InteractiveAssetMap } from "@/components/maps/InteractiveAssetMap";
import { assetLifecycleData, maintenanceForecastData, inspectionCycleData } from "@/data/mockData";

const lifecycleColumns = [
  { key: "asset_id", header: "asset_id" },
  { key: "asset_name", header: "asset_name" },
  { key: "asset_type", header: "asset_type" },
  { key: "age_years", header: "age_years" },
  { key: "expected_life_years", header: "expected_life_years" },
  { key: "remaining_life_years", header: "remaining_life_years" },
  { key: "projected_replacement_year", header: "projected_replacement_year" },
  { key: "replacement_cost", header: "replacement_cost", render: (v: number) => v.toLocaleString() },
];

const maintenanceColumns = [
  { key: "asset_id", header: "asset_id" },
  { key: "asset_name", header: "asset_name" },
  { key: "asset_type", header: "asset_type" },
  { key: "condition_score", header: "condition_score" },
  { key: "forecast_condition", header: "forecast_condition" },
  { key: "months_to_threshold", header: "months_to_threshold" },
  { key: "next_maintenance_date", header: "next_maintenance_date" },
  { key: "maintenance_cost", header: "maintenance_cost", render: (v: number) => v.toLocaleString() },
];

const inspectionColumns = [
  { key: "asset_id", header: "asset_id" },
  { key: "asset_name", header: "asset_name" },
  { key: "asset_type", header: "asset_type" },
  { key: "criticality", header: "criticality" },
  { key: "condition_score", header: "condition_score" },
  { key: "risk_score", header: "risk_score" },
  { key: "inspection_interval_months", header: "inspection_interval_months" },
  { key: "last_inspection_date", header: "last_inspection_date" },
  { key: "next_inspection_date", header: "next_inspection_date" },
];

const AssetIntelligence = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Interactive Map */}
      <InteractiveAssetMap />

      {/* Region Asset Chart */}
      <RegionAssetChart />

      {/* Asset Lifecycle Outlook */}
      <DataTable
        title="3. Asset Lifecycle Outlook"
        columns={lifecycleColumns}
        data={assetLifecycleData}
      />

      {/* Maintenance Forecast */}
      <DataTable
        title="4. Maintenance Forecast"
        columns={maintenanceColumns}
        data={maintenanceForecastData}
      />

      {/* Budget Forecast */}
      <BudgetForecastChart />

      {/* Next Inspection Cycle */}
      <DataTable
        title="6. Next Inspection Cycle"
        columns={inspectionColumns}
        data={inspectionCycleData}
      />
    </div>
  );
};

export default AssetIntelligence;
