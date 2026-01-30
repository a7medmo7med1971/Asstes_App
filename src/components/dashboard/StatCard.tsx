import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const StatCard = ({ title, children, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
};
