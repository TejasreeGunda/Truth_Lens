import { Bell, BellRing, Shield, AlertTriangle, TrendingUp, Settings } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const alerts = [
  { id: 1, title: "Viral misinformation about election results detected", category: "Politics", severity: "critical" as const, time: "5 min ago", read: false },
  { id: 2, title: "Health misinformation spike in Southeast Asia region", category: "Health", severity: "high" as const, time: "1 hour ago", read: false },
  { id: 3, title: "New deepfake detection model update available", category: "System", severity: "info" as const, time: "3 hours ago", read: true },
  { id: 4, title: "Financial scam articles trending on social platforms", category: "Finance", severity: "high" as const, time: "6 hours ago", read: true },
  { id: 5, title: "Weekly misinformation report generated", category: "Report", severity: "info" as const, time: "1 day ago", read: true },
];

const sevConfig = {
  critical: { color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/30", dot: "bg-destructive" },
  high: { color: "text-warning", bg: "bg-warning/15", border: "border-warning/30", dot: "bg-warning" },
  info: { color: "text-primary", bg: "bg-primary/15", border: "border-primary/30", dot: "bg-primary" },
};

export default function AlertsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground text-sm mt-1">Stay informed about trending misinformation</p>
        </div>
        <button className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard delay={0}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/15"><AlertTriangle className="w-4 h-4 text-destructive" /></div>
            <div>
              <p className="text-xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Unread Critical</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={100}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/15"><BellRing className="w-4 h-4 text-warning" /></div>
            <div>
              <p className="text-xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Total Alerts</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={200}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/15"><TrendingUp className="w-4 h-4 text-primary" /></div>
            <div>
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">This Week</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Alert list */}
      <div className="space-y-3">
        {alerts.map((a, i) => {
          const sev = sevConfig[a.severity];
          return (
            <GlassCard key={a.id} delay={300 + i * 80} className={`${!a.read ? `border ${sev.border}` : ""} hover:border-primary/30 cursor-pointer`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${sev.bg} shrink-0 relative`}>
                  {a.severity === "critical" ? <AlertTriangle className={`w-4 h-4 ${sev.color}`} /> :
                   a.severity === "high" ? <Shield className={`w-4 h-4 ${sev.color}`} /> :
                   <Bell className={`w-4 h-4 ${sev.color}`} />}
                  {!a.read && <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${sev.dot} animate-pulse`} />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${!a.read ? "text-foreground" : "text-muted-foreground"}`}>{a.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sev.bg} ${sev.color} font-medium`}>{a.severity}</span>
                    <span className="text-xs text-muted-foreground">{a.category}</span>
                    <span className="text-xs text-muted-foreground">• {a.time}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
