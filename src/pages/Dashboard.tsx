import { useState } from "react";
import { ShieldCheck, ShieldAlert, TrendingUp, Eye, AlertTriangle, Globe, ArrowRight, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";

const trending = [
  { title: "Political deepfake video circulating on social media", category: "Politics", risk: "high" as const, source: "Twitter/X", spread: 84 },
  { title: "Misleading health claims about new supplement", category: "Health", risk: "high" as const, source: "Facebook", spread: 72 },
  { title: "Manipulated economic data shared on news sites", category: "Finance", risk: "medium" as const, source: "News Sites", spread: 56 },
  { title: "Celebrity death hoax trending on Twitter/X", category: "Entertainment", risk: "low" as const, source: "Reddit", spread: 31 },
  { title: "AI-generated image of natural disaster goes viral", category: "Tech", risk: "high" as const, source: "Instagram", spread: 91 },
];

const riskColors = { high: "text-destructive", medium: "text-warning", low: "text-success" };
const riskBg = { high: "bg-destructive/15", medium: "bg-warning/15", low: "bg-success/15" };

const quickActions = [
  { label: "Analyze News", desc: "Check an article or claim", path: "/analyzer", icon: Sparkles, glow: "primary" as const },
  { label: "View Charts", desc: "See detailed visualizations", path: "/charts", icon: TrendingUp, glow: "accent" as const },
  { label: "Take Quiz", desc: "Test your fact-checking skills", path: "/learn", icon: ShieldCheck, glow: "primary" as const },
];

const liveActivity = [
  { text: "New article flagged as fake", time: "Just now", type: "fake" },
  { text: "Trending topic verified as real", time: "2 min ago", type: "real" },
  { text: "Alert: Misinformation spike detected", time: "5 min ago", type: "alert" },
  { text: "User submitted fact-check request", time: "8 min ago", type: "real" },
  { text: "Deepfake image detected and flagged", time: "12 min ago", type: "fake" },
];

export default function Dashboard() {
  const [expandedTrend, setExpandedTrend] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time misinformation monitoring</p>
      </div>

      {/* Stats with animated counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Articles Scanned" value={<AnimatedCounter target={12847} />} change="12% this week" changeType="up" glow="primary" delay={0} />
        <StatCard icon={ShieldAlert} label="Fake Detected" value={<AnimatedCounter target={3214} />} change="8% this week" changeType="up" glow="danger" delay={100} />
        <StatCard icon={ShieldCheck} label="Verified Real" value={<AnimatedCounter target={8903} />} change="5% this week" changeType="up" glow="primary" delay={200} />
        <StatCard icon={TrendingUp} label="Accuracy Rate" value={<AnimatedCounter target={94.7} suffix="%" decimals={1} />} change="1.2% improved" changeType="up" glow="accent" delay={300} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, i) => (
          <Link key={action.path} to={action.path}>
            <GlassCard delay={400 + i * 100} className="group cursor-pointer hover:scale-[1.02] hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${action.glow === "primary" ? "gradient-bg" : "gradient-bg-accent"} transition-transform duration-300 group-hover:scale-110`}>
                  <action.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trending - expandable */}
        <div className="lg:col-span-2">
          <GlassCard delay={700}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-semibold">Trending Misinformation</h3>
            </div>
            <div className="space-y-2">
              {trending.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpandedTrend(expandedTrend === i ? null : i)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <Globe className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskColors[item.risk]} ${riskBg[item.risk]}`}>
                        {item.risk.toUpperCase()}
                      </span>
                      {expandedTrend === i ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                  </button>
                  {expandedTrend === i && (
                    <div className="px-3 py-3 mt-1 rounded-lg bg-secondary/30 animate-fade-in text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source Platform</span>
                        <span className="font-medium">{item.source}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Spread Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full rounded-full gradient-bg-danger transition-all duration-700" style={{ width: `${item.spread}%` }} />
                          </div>
                          <span className="font-medium">{item.spread}%</span>
                        </div>
                      </div>
                      <Link to="/analyzer" className="inline-flex items-center gap-1 text-primary hover:underline font-medium mt-1">
                        Analyze this <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Live Activity Feed */}
        <GlassCard delay={800}>
          <h3 className="text-sm font-semibold mb-4">Live Activity</h3>
          <div className="space-y-3">
            {liveActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 group hover:bg-secondary/30 p-2 rounded-lg transition-colors cursor-default" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === "fake" ? "bg-destructive" : item.type === "alert" ? "bg-warning animate-pulse" : "bg-success"}`} />
                <div>
                  <p className="text-xs font-medium">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
