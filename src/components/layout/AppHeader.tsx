import { BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MobileSidebar } from "./MobileSidebar";

export const AppHeader = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground hidden sm:block">
            Asset Intelligence
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">Status:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="text-sm text-muted-foreground">Category:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-24 h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="bridge">Bridge</SelectItem>
              <SelectItem value="pavement">Pavement</SelectItem>
              <SelectItem value="drainage">Drainage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile menu toggle */}
        <MobileSidebar />
      </div>
    </header>
  );
};
