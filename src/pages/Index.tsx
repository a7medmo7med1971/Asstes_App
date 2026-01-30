import { AssetInventoryMap } from "@/components/dashboard/AssetInventoryMap";
import { AssetLifecycleChart } from "@/components/dashboard/AssetLifecycleChart";
import { MaintenanceChart } from "@/components/dashboard/MaintenanceChart";
import { BudgetForecast } from "@/components/dashboard/BudgetForecast";
import { MaintenanceForecast } from "@/components/dashboard/MaintenanceForecast";
import { MaintenanceForecastLine } from "@/components/dashboard/MaintenanceForecastLine";
import { InspectionCalendar } from "@/components/dashboard/InspectionCalendar";

const Index = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Generate asset condition reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Row 1 */}
        <AssetInventoryMap />
        <AssetLifecycleChart />
        <MaintenanceChart />
        <BudgetForecast />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Row 2 */}
        <MaintenanceForecast />
        <MaintenanceForecastLine />
        <InspectionCalendar />
      </div>
    </div>
  );
};

export default Index;
