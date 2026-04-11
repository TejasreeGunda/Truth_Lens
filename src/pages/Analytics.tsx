import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from "recharts";
import GlassCard from "@/components/GlassCard";
import { TrendingUp, Globe, Users, BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";

const monthlyData = [
  { month: "Jan", fake: 320, real: 780 },
  { month: "Feb", fake: 280, real: 820 },
  { month: "Mar", fake: 410, real: 750 },
  { month: "Apr", fake: 350, real: 810 },
  { month: "May", fake: 480, real: 690 },
  { month: "Jun", fake: 390, real: 770 },
];

const categoryData = [
  { category: "Politics", score: 85 },
  { category: "Health", score: 72 },
  { category: "Science", score: 60 },
  { category: "Finance", score: 78 },
  { category: "Tech", score: 55 },
  { category: "Sports", score: 30 },
];

const accuracyTrend = [
  { week: "W1", accuracy: 91 },
  { week: "W2", accuracy: 92.5 },
  { week: "W3", accuracy: 93.1 },
  { week: "W4", accuracy: 94.7 },
];

const regions = [
  { name: "North America", fake: 35, total: 3200 },
  { name: "Europe", fake: 28, total: 2800 },
  { name: "Asia", fake: 42, total: 4100 },
  { name: "South America", fake: 38, total: 1500 },
  { name: "Africa", fake: 31, total: 900 },
];

const tooltipStyle = { background: "hsl(225,20%,10%)", border: "1px solid hsl(225,15%,22%)", borderRadius: 8, color: "hsl(210,40%,96%)" };

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground text-sm mt-1">Deep dive into misinformation patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={BarChart3} label="Total Analyses" value="24,512" change="18% this month" changeType="up" glow="primary" delay={0} />
        <StatCard icon={Globe} label="Sources Tracked" value="1,847" change="6% growth" changeType="up" glow="accent" delay={100} />
        <StatCard icon={Users} label="Active Users" value="8,293" change="23% this month" changeType="up" glow="primary" delay={200} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={300}>
          <h3 className="text-sm font-semibold mb-4">Monthly Fake vs Real Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,18%)" />
              <XAxis dataKey="month" stroke="hsl(215,15%,55%)" fontSize={12} />
              <YAxis stroke="hsl(215,15%,55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="real" fill="hsl(160,84%,50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fake" fill="hsl(0,72%,55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={400}>
          <h3 className="text-sm font-semibold mb-4">Misinformation by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={categoryData}>
              <PolarGrid stroke="hsl(225,15%,18%)" />
              <PolarAngleAxis dataKey="category" stroke="hsl(215,15%,55%)" fontSize={11} />
              <Radar name="Risk" dataKey="score" stroke="hsl(260,70%,60%)" fill="hsl(260,70%,60%)" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={500}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Model Accuracy Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={accuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,18%)" />
              <XAxis dataKey="week" stroke="hsl(215,15%,55%)" fontSize={12} />
              <YAxis domain={[88, 96]} stroke="hsl(215,15%,55%)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="accuracy" stroke="hsl(160,84%,50%)" strokeWidth={2} dot={{ fill: "hsl(160,84%,50%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={600}>
          <h3 className="text-sm font-semibold mb-4">Regional Misinformation Rates</h3>
          <div className="space-y-3">
            {regions.map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{r.name}</span>
                  <span className="font-medium">{r.fake}% fake rate</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full gradient-bg-danger transition-all duration-700" style={{ width: `${r.fake}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
