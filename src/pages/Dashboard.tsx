import { ShieldCheck, ShieldAlert, TrendingUp, Eye, AlertTriangle, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";

const areaData = [
  { day: "Mon", fake: 42, real: 85 },
  { day: "Tue", fake: 55, real: 78 },
  { day: "Wed", fake: 38, real: 92 },
  { day: "Thu", fake: 67, real: 80 },
  { day: "Fri", fake: 49, real: 88 },
  { day: "Sat", fake: 73, real: 75 },
  { day: "Sun", fake: 58, real: 82 },
];

const pieData = [
  { name: "Verified Real", value: 62, color: "hsl(160, 84%, 50%)" },
  { name: "Likely Fake", value: 25, color: "hsl(0, 72%, 55%)" },
  { name: "Uncertain", value: 13, color: "hsl(38, 92%, 55%)" },
];

const trending = [
  { title: "Political deepfake video circulating on social media", category: "Politics", risk: "high" as const },
  { title: "Misleading health claims about new supplement", category: "Health", risk: "high" as const },
  { title: "Manipulated economic data shared on news sites", category: "Finance", risk: "medium" as const },
  { title: "Celebrity death hoax trending on Twitter/X", category: "Entertainment", risk: "low" as const },
];

const riskColors = { high: "text-destructive", medium: "text-warning", low: "text-success" };
const riskBg = { high: "bg-destructive/15", medium: "bg-warning/15", low: "bg-success/15" };

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time misinformation monitoring</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Articles Scanned" value="12,847" change="12% this week" changeType="up" glow="primary" delay={0} />
        <StatCard icon={ShieldAlert} label="Fake Detected" value="3,214" change="8% this week" changeType="up" glow="danger" delay={100} />
        <StatCard icon={ShieldCheck} label="Verified Real" value="8,903" change="5% this week" changeType="up" glow="primary" delay={200} />
        <StatCard icon={TrendingUp} label="Accuracy Rate" value="94.7%" change="1.2% improved" changeType="up" glow="accent" delay={300} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2" delay={400}>
          <h3 className="text-sm font-semibold mb-4">Fake vs Real News — Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="gReal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,84%,50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,84%,50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gFake" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0,72%,55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(0,72%,55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,18%)" />
              <XAxis dataKey="day" stroke="hsl(215,15%,55%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(225,20%,10%)", border: "1px solid hsl(225,15%,22%)", borderRadius: 8, color: "hsl(210,40%,96%)" }} />
              <Area type="monotone" dataKey="real" stroke="hsl(160,84%,50%)" fill="url(#gReal)" strokeWidth={2} />
              <Area type="monotone" dataKey="fake" stroke="hsl(0,72%,55%)" fill="url(#gFake)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={500}>
          <h3 className="text-sm font-semibold mb-4">Classification Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((e) => (
              <div key={e.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                  <span className="text-muted-foreground">{e.name}</span>
                </div>
                <span className="font-semibold">{e.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Trending */}
      <GlassCard delay={600}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-semibold">Trending Misinformation</h3>
        </div>
        <div className="space-y-3">
          {trending.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${riskColors[item.risk]} ${riskBg[item.risk]}`}>
                {item.risk.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
