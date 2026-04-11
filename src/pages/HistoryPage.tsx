import { Clock, ShieldCheck, ShieldAlert, AlertTriangle, ExternalLink, Trash2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const historyItems = [
  { id: 1, text: "Government announces new climate policy targeting 2030 emissions goals", verdict: "real" as const, confidence: 94, date: "2 hours ago" },
  { id: 2, text: "SHOCKING: Vaccine causes DNA mutation in 90% of recipients", verdict: "fake" as const, confidence: 97, date: "5 hours ago" },
  { id: 3, text: "Local school district implements new STEM curriculum", verdict: "real" as const, confidence: 89, date: "1 day ago" },
  { id: 4, text: "Celebrity secretly controls world government from underground bunker", verdict: "fake" as const, confidence: 99, date: "2 days ago" },
  { id: 5, text: "Study finds moderate coffee consumption linked to health benefits", verdict: "real" as const, confidence: 82, date: "3 days ago" },
  { id: 6, text: "Unverified rumors about tech company layoffs surface online", verdict: "uncertain" as const, confidence: 55, date: "4 days ago" },
];

const vConfig = {
  real: { icon: ShieldCheck, color: "text-success", bg: "bg-success/15", label: "Real" },
  fake: { icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/15", label: "Fake" },
  uncertain: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/15", label: "Uncertain" },
};

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground text-sm mt-1">Your past analyses and saved results</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {historyItems.length} analyses
        </div>
      </div>

      <div className="space-y-3">
        {historyItems.map((item, i) => {
          const v = vConfig[item.verdict];
          const Icon = v.icon;
          return (
            <GlassCard key={item.id} delay={i * 80} className="hover:border-primary/30 cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${v.bg} shrink-0`}>
                  <Icon className={`w-4 h-4 ${v.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.text}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${v.bg} ${v.color}`}>{v.label}</span>
                    <span className="text-xs text-muted-foreground">{item.confidence}% confidence</span>
                    <span className="text-xs text-muted-foreground">• {item.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
