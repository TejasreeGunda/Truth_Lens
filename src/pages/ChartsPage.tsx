import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from "recharts";
import GlassCard from "@/components/GlassCard";
import { TrendingUp } from "lucide-react";

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

const tooltipStyle = { background: "hsl(225,20%,10%)", border: "1px solid hsl(225,15%,22%)", borderRadius: 8, color: "hsl(210,40%,96%)" };

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Charts & Visualizations</h1>
        <p className="text-muted-foreground text-sm mt-1">All graphs and data visualizations in one place</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2" delay={0}>
          <h3 className="text-sm font-semibold mb-4">Fake vs Real News — Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
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
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="real" stroke="hsl(160,84%,50%)" fill="url(#gReal)" strokeWidth={2} />
              <Area type="monotone" dataKey="fake" stroke="hsl(0,72%,55%)" fill="url(#gFake)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard delay={100}>
          <h3 className="text-sm font-semibold mb-4">Classification Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={200}>
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

        <GlassCard delay={300}>
          <h3 className="text-sm font-semibold mb-4">Misinformation by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={categoryData}>
              <PolarGrid stroke="hsl(225,15%,18%)" />
              <PolarAngleAxis dataKey="category" stroke="hsl(215,15%,55%)" fontSize={11} />
              <Radar name="Risk" dataKey="score" stroke="hsl(260,70%,60%)" fill="hsl(260,70%,60%)" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard delay={400}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">Model Accuracy Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={accuracyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225,15%,18%)" />
            <XAxis dataKey="week" stroke="hsl(215,15%,55%)" fontSize={12} />
            <YAxis domain={[88, 96]} stroke="hsl(215,15%,55%)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="accuracy" stroke="hsl(160,84%,50%)" strokeWidth={2} dot={{ fill: "hsl(160,84%,50%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
