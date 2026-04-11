import GlassCard from "./GlassCard";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: LucideIcon;
  glow?: "primary" | "accent" | "danger" | "none";
  delay?: number;
}

export default function StatCard({ label, value, change, changeType, icon: Icon, glow = "none", delay = 0 }: StatCardProps) {
  return (
    <GlassCard glow={glow} delay={delay}>
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
        <div className={`p-2.5 rounded-lg ${glow === "primary" ? "gradient-bg" : glow === "accent" ? "gradient-bg-accent" : glow === "danger" ? "gradient-bg-danger" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${glow !== "none" ? "text-background" : "text-foreground"}`} />
        </div>
      </div>
    </GlassCard>
  );
}
