import { ReactNode } from "react";
import GlassCard from "./GlassCard";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | ReactNode;
  change?: string;
  changeType?: "up" | "down";
  icon: LucideIcon;
  glow?: "primary" | "accent" | "danger" | "none";
  delay?: number;
}

export default function StatCard({ label, value, change, changeType, icon: Icon, glow = "none", delay = 0 }: StatCardProps) {
  return (
    <GlassCard glow={glow} delay={delay} className="hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-2 font-medium ${changeType === "up" ? "text-success" : "text-destructive"}`}>
              {changeType === "up" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg transition-transform duration-300 hover:scale-110 ${glow === "primary" ? "gradient-bg" : glow === "accent" ? "gradient-bg-accent" : glow === "danger" ? "gradient-bg-danger" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${glow !== "none" ? "text-background" : "text-foreground"}`} />
        </div>
      </div>
    </GlassCard>
  );
}
