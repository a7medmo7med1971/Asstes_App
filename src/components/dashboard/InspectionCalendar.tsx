import { useState } from "react";
import { StatCard } from "./StatCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

export const InspectionCalendar = () => {
  const [currentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const today = 15; // Highlighted date

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <StatCard title="Next inspection cycle" className="col-span-1 lg:col-span-2">
      <div className="max-w-xs">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-muted rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">{monthName}</span>
          <button className="p-1 hover:bg-muted rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="text-xs text-muted-foreground py-1">
              {day}
            </div>
          ))}
          {days.map((day, i) => (
            <div
              key={i}
              className={`text-xs py-1.5 rounded ${
                day === today
                  ? "bg-primary text-primary-foreground font-medium"
                  : day
                  ? "hover:bg-muted cursor-pointer"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </StatCard>
  );
};
